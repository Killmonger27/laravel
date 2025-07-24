<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Créer un administrateur par défaut
        User::firstOrCreate(
            ['email' => 'admin@banque.com'],
            [
                'name' => 'Administrateur',
                'email' => 'admin@banque.com',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // Créer un agent de test avec guichet assigné
        $guichet = \App\Models\Guichet::where('numero', 'G01')->first();
        
        User::firstOrCreate(
            ['matricule' => 'AGT001'],
            [
                'name' => 'Agent Test',
                'email' => 'agent001@banque.com',
                'matricule' => 'AGT001',
                'password' => Hash::make('agent123'),
                'role' => 'agent',
                'statut' => 'deconnecte',
                'guichet_id' => $guichet?->id,
                'email_verified_at' => now(),
            ]
        );

        // Créer d'autres agents pour les autres guichets
        $agents = [
            ['matricule' => 'AGT002', 'name' => 'Agent Retrait', 'guichet' => 'G02'],
            ['matricule' => 'AGT003', 'name' => 'Agent Information', 'guichet' => 'G03'],
            ['matricule' => 'AGT004', 'name' => 'Agent Crédit', 'guichet' => 'G04'],
        ];

        foreach ($agents as $agentData) {
            $guichet = \App\Models\Guichet::where('numero', $agentData['guichet'])->first();
            
            User::firstOrCreate(
                ['matricule' => $agentData['matricule']],
                [
                    'name' => $agentData['name'],
                    'email' => strtolower($agentData['matricule']) . '@banque.com',
                    'matricule' => $agentData['matricule'],
                    'password' => Hash::make('agent123'),
                    'role' => 'agent',
                    'statut' => 'deconnecte',
                    'guichet_id' => $guichet?->id,
                    'email_verified_at' => now(),
                ]
            );
        }
    }
}
