<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ticket;
use App\Models\Service;
use App\Models\User;
use App\Models\Guichet;

class TicketTestSeeder extends Seeder
{
    public function run()
    {
        $services = Service::all();
        $agents = User::where('role', 'agent')->get();
        $guichets = Guichet::all();

        // Connecter quelques agents aux guichets (mise à jour directe du guichet_id)
        if ($agents->count() >= 3 && $guichets->count() >= 3) {
            $agents[0]->update(['guichet_id' => $guichets[0]->id, 'statut' => 'connecte']);
            $agents[1]->update(['guichet_id' => $guichets[1]->id, 'statut' => 'connecte']);
            $agents[2]->update(['guichet_id' => $guichets[2]->id, 'statut' => 'connecte']);
        }

        // Créer quelques tickets de test
        $ticketsTest = [
            ['service' => 'DEP', 'nom' => 'Amadou Diallo', 'telephone' => '77123456', 'statut' => 'en_attente'],
            ['service' => 'DEP', 'nom' => 'Fatou Traoré', 'telephone' => '76234567', 'statut' => 'en_attente'],
            ['service' => 'RET', 'nom' => 'Ibrahim Koné', 'telephone' => '75345678', 'statut' => 'appele'],
            ['service' => 'INF', 'nom' => 'Mariam Sangaré', 'telephone' => '78456789', 'statut' => 'en_cours'],
            ['service' => 'DEP', 'nom' => 'Ousmane Sidibé', 'telephone' => '79567890', 'statut' => 'en_attente'],
            ['service' => 'RET', 'nom' => 'Aïcha Coulibaly', 'telephone' => '70678901', 'statut' => 'en_attente'],
        ];

        foreach ($ticketsTest as $index => $ticketData) {
            $service = $services->where('code', $ticketData['service'])->first();

            $ticket = Ticket::create([
                'numero' => Ticket::genererNumero($service->code),
                'service_id' => $service->id,
                'nom_client' => $ticketData['nom'],
                'telephone_client' => $ticketData['telephone'],
                'statut' => $ticketData['statut'],
                'position' => $index + 1,
                'created_at' => now()->subMinutes(rand(5, 30))
            ]);

            // Assigner aux guichets selon le statut
            if ($ticketData['statut'] === 'appele') {
                $guichet = $guichets->where('service_id', $service->id)->first();
                $ticket->update([
                    'guichet_id' => $guichet->id,
                    'agent_id' => $guichet->agent->id,
                    'heure_appel' => now()->subMinutes(2)
                ]);
            } elseif ($ticketData['statut'] === 'en_cours') {
                $guichet = $guichets->where('service_id', $service->id)->first();
                $ticket->update([
                    'guichet_id' => $guichet->id,
                    'agent_id' => $guichet->agent->id,
                    'heure_appel' => now()->subMinutes(5),
                    'heure_debut' => now()->subMinutes(2)
                ]);
                $guichet->update(['statut' => 'occupe']);
            }
        }
    }
}
