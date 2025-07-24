<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuichetController extends Controller
{
    /**
     * Interface de guichet pour un agent connecté
     */
    public function index(Request $request)
    {
        $agent = $request->user();

        // Vérifier que l'agent a un guichet assigné
        if (!$agent->guichet_id) {
            return redirect()->route('dashboard')->with('error', 'Aucun guichet assigné. Contactez l\'administrateur.');
        }

        // Charger les informations de l'agent avec son guichet et service
        $agent->load(['guichet.service']);

        // Ticket en cours pour cet agent
        $ticketEnCours = Ticket::where('agent_id', $agent->id)
                              ->where('statut', 'en_cours')
                              ->with(['service', 'guichet'])
                              ->first();

        // Tickets en attente pour le service de ce guichet
        $ticketsEnAttente = Ticket::where('service_id', $agent->guichet->service_id)
                                 ->where('statut', 'en_attente')
                                 ->orderBy('created_at')
                                 ->with(['service'])
                                 ->get();

        // Tickets appelés pour ce guichet
        $ticketsAppeles = Ticket::where('guichet_id', $agent->guichet_id)
                               ->where('statut', 'appele')
                               ->with(['service'])
                               ->get();

        return Inertia::render('GuichetInterface', [
            'agent' => $agent,
            'guichet' => $agent->guichet,
            'service' => $agent->guichet->service,
            'ticketEnCours' => $ticketEnCours,
            'ticketsEnAttente' => $ticketsEnAttente,
            'ticketsAppeles' => $ticketsAppeles,
            'statistiques' => [
                'tickets_traites_aujourdhui' => Ticket::where('agent_id', $agent->id)
                                                      ->whereDate('heure_fin', today())
                                                      ->where('statut', 'termine')
                                                      ->count(),
                'temps_moyen_traitement' => $this->calculerTempsMoyenTraitement($agent->id),
                'tickets_en_attente_total' => $ticketsEnAttente->count(),
            ]
        ]);
    }

    /**
     * Appeler le prochain ticket
     */
    public function appellerProchain(Request $request)
    {
        $agent = $request->user();

        if (!$agent->guichet_id) {
            return redirect()->back()->with('error', 'Aucun guichet assigné');
        }

        // Vérifier qu'il n'y a pas déjà un ticket en cours
        $ticketEnCours = Ticket::where('agent_id', $agent->id)
                              ->where('statut', 'en_cours')
                              ->first();

        if ($ticketEnCours) {
            return redirect()->back()->with('error', 'Un ticket est déjà en cours de traitement');
        }

        // Trouver le prochain ticket en attente pour le service
        $prochainTicket = Ticket::where('service_id', $agent->guichet->service_id)
                               ->where('statut', 'en_attente')
                               ->orderBy('created_at')
                               ->first();

        if (!$prochainTicket) {
            return redirect()->back()->with('error', 'Aucun ticket en attente');
        }

        // Assigner le ticket à l'agent et changer son statut
        $prochainTicket->update([
            'guichet_id' => $agent->guichet_id,
            'agent_id' => $agent->id,
            'statut' => 'appele',
            'heure_appel' => now()
        ]);

        // Mettre à jour le statut du guichet
        $agent->guichet->update(['statut' => 'occupe']);

        return redirect()->back()->with('success', 'Ticket ' . $prochainTicket->numero . ' appelé avec succès');
    }

    /**
     * Commencer le traitement d'un ticket
     */
    public function commencerTicket(Request $request, Ticket $ticket)
    {
        $agent = $request->user();

        // Vérifier que le ticket appartient à cet agent
        if ($ticket->agent_id !== $agent->id) {
            return redirect()->back()->with('error', 'Ce ticket ne vous appartient pas');
        }

        $ticket->update([
            'statut' => 'en_cours',
            'heure_debut' => now()
        ]);

        return redirect()->back()->with('success', 'Traitement du ticket ' . $ticket->numero . ' commencé');
    }

    /**
     * Terminer le traitement d'un ticket
     */
    public function terminerTicket(Request $request, Ticket $ticket)
    {
        $agent = $request->user();

        // Vérifier que le ticket appartient à cet agent
        if ($ticket->agent_id !== $agent->id) {
            return redirect()->back()->with('error', 'Ce ticket ne vous appartient pas');
        }

        $ticket->update([
            'statut' => 'termine',
            'heure_fin' => now()
        ]);

        // Libérer le guichet
        $agent->guichet->update(['statut' => 'libre']);

        return redirect()->back()->with('success', 'Ticket ' . $ticket->numero . ' terminé avec succès');
    }

    /**
     * Dashboard moderne pour l'agent
     */
    public function dashboard()
    {
        $user = auth()->user();

        // Vérifier que l'agent a un guichet assigné
        if (!$user->guichet_id) {
            return redirect('/dashboard')->with('error', 'Aucun guichet assigné. Contactez l\'administrateur.');
        }

        $guichet = $user->guichet->load('service');

        // Récupérer les tickets en attente pour ce service
        $ticketsEnAttente = Ticket::where('service_id', $guichet->service_id)
            ->where('statut', 'en_attente')
            ->with('service')
            ->orderBy('created_at')
            ->get();

        // Récupérer le ticket actuellement en cours pour cet agent
        $ticketEnCours = Ticket::where('agent_id', $user->id)
            ->whereIn('statut', ['appele', 'en_cours'])
            ->with('service')
            ->first();

        // Calculer les statistiques du jour
        $today = now()->toDateString();
        $ticketsTraites = Ticket::where('agent_id', $user->id)
            ->whereDate('created_at', $today)
            ->where('statut', 'termine')
            ->count();

        // Calculer le temps moyen de traitement
        $tempsMovenMinutes = Ticket::where('agent_id', $user->id)
            ->whereDate('created_at', $today)
            ->where('statut', 'termine')
            ->whereNotNull('heure_debut')
            ->whereNotNull('heure_fin')
            ->selectRaw('AVG((julianday(heure_fin) - julianday(heure_debut)) * 24 * 60) as temps_moyen')
            ->value('temps_moyen');

        $tempsMoyen = $tempsMovenMinutes ? round($tempsMovenMinutes) . ' min' : '0 min';

        // Calculer la performance (pourcentage de tickets traités vs reçus)
        $ticketsRecus = Ticket::where('service_id', $guichet->service_id)
            ->whereDate('created_at', $today)
            ->count();

        $performance = $ticketsRecus > 0 ? round(($ticketsTraites / $ticketsRecus) * 100) . '%' : '100%';

        $statistiques = [
            'tickets_traites' => $ticketsTraites,
            'temps_moyen' => $tempsMoyen,
            'performance' => $performance,
            'tickets_en_attente' => $ticketsEnAttente->count(),
            'services_actifs' => 2, // Statique pour l'instant
        ];

        return Inertia::render('GuichetDashboardNew', [
            'guichet' => $guichet,
            'ticketsEnAttente' => $ticketsEnAttente,
            'ticketEnCours' => $ticketEnCours,
            'statistiques' => $statistiques,
        ]);
    }

    /**
     * Calculer le temps moyen de traitement pour un agent
     */
    private function calculerTempsMoyenTraitement($agentId)
    {
        // Pour SQLite, utiliser julianday pour calculer la différence en minutes
        $tickets = Ticket::where('agent_id', $agentId)
                        ->where('statut', 'termine')
                        ->whereNotNull('heure_debut')
                        ->whereNotNull('heure_fin')
                        ->selectRaw('AVG((julianday(heure_fin) - julianday(heure_debut)) * 24 * 60) as temps_moyen')
                        ->first();

        return $tickets->temps_moyen ? round($tickets->temps_moyen, 1) : 0;
    }
}
