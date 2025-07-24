<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Ticket;
use App\Models\Guichet;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function dashboard()
    {
        $today = now()->toDateString();

        // Statistiques générales
        $totalAgents = User::where('role', 'agent')->count();
        $agentsConnectes = User::where('role', 'agent')
            ->where('statut', 'connecte')
            ->count();

        $totalGuichets = Guichet::count();
        $guichetsActifs = Guichet::where('statut', 'occupe')->count();

        // Statistiques des tickets du jour
        $ticketsAujourdhui = Ticket::whereDate('created_at', $today)->count();
        $ticketsTermines = Ticket::whereDate('created_at', $today)
            ->where('statut', 'termine')
            ->count();
        $ticketsEnAttente = Ticket::where('statut', 'en_attente')->count();
        $ticketsEnCours = Ticket::where('statut', 'en_cours')->count();

        // Temps moyen de traitement du jour
        $tempsMoyenMinutes = Ticket::whereDate('created_at', $today)
            ->where('statut', 'termine')
            ->whereNotNull('heure_debut')
            ->whereNotNull('heure_fin')
            ->selectRaw('AVG((julianday(heure_fin) - julianday(heure_debut)) * 24 * 60) as temps_moyen')
            ->value('temps_moyen');

        $tempsMoyen = $tempsMoyenMinutes ? round($tempsMoyenMinutes) . ' min' : '0 min';

        // Taux de satisfaction (pourcentage de tickets terminés)
        $tauxSatisfaction = $ticketsAujourdhui > 0
            ? round(($ticketsTermines / $ticketsAujourdhui) * 100)
            : 100;

        // Statistiques par service
        $statistiquesServices = Service::withCount([
            'tickets as tickets_aujourdhui' => function ($query) use ($today) {
                $query->whereDate('created_at', $today);
            },
            'tickets as tickets_termines' => function ($query) use ($today) {
                $query->whereDate('created_at', $today)
                      ->where('statut', 'termine');
            },
            'tickets as tickets_en_attente' => function ($query) {
                $query->where('statut', 'en_attente');
            }
        ])->get();

        // Agents avec leurs statistiques
        $agentsStatistiques = User::where('role', 'agent')
            ->with(['guichet.service'])
            ->withCount([
                'tickets as tickets_traites' => function ($query) use ($today) {
                    $query->whereDate('created_at', $today)
                          ->where('statut', 'termine');
                }
            ])
            ->get();

        // Activité récente (derniers tickets)
        $activiteRecente = Ticket::with(['service', 'guichet', 'agent'])
            ->whereDate('created_at', $today)
            ->orderBy('updated_at', 'desc')
            ->limit(10)
            ->get();

        // Graphique : tickets par heure (compatible SQLite)
        $ticketsParHeure = Ticket::whereDate('created_at', $today)
            ->selectRaw('strftime("%H", created_at) as heure, COUNT(*) as count')
            ->groupBy('heure')
            ->pluck('count', 'heure')
            ->toArray();

        // Compléter les heures manquantes avec 0
        $heuresCompletes = [];
        for ($i = 8; $i <= 18; $i++) {
            $heuresCompletes[$i] = $ticketsParHeure[$i] ?? 0;
        }

        return Inertia::render('UnifiedAdminDashboard', [
            'statistiques' => [
                'agents_total' => $totalAgents,
                'agents_connectes' => $agentsConnectes,
                'guichets_total' => $totalGuichets,
                'guichets_actifs' => $guichetsActifs,
                'tickets_aujourdhui' => $ticketsAujourdhui,
                'tickets_termines' => $ticketsTermines,
                'tickets_en_attente' => $ticketsEnAttente,
                'tickets_en_cours' => $ticketsEnCours,
                'temps_moyen_global' => $tempsMoyen,
                'taux_satisfaction' => $tauxSatisfaction,
                'services_actifs' => Service::count(),
                'tickets_traites_aujourdhui' => $ticketsTermines,
            ],
            'statistiques_services' => $statistiquesServices,
            'agents_statistiques' => $agentsStatistiques,
            'activite_recente' => $activiteRecente,
            'tickets_par_heure' => $heuresCompletes,
        ]);
    }
}
