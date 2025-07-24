<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run()
    {
        $services = [
            ['nom' => 'Dépôt', 'code' => 'DEP', 'description' => 'Service de dépôt d\'argent', 'duree_estimee' => 5],
            ['nom' => 'Retrait', 'code' => 'RET', 'description' => 'Service de retrait d\'argent', 'duree_estimee' => 3],
            ['nom' => 'Information', 'code' => 'INF', 'description' => 'Service d\'information bancaire', 'duree_estimee' => 10],
            ['nom' => 'Crédit', 'code' => 'CRE', 'description' => 'Service de demande de crédit', 'duree_estimee' => 15],
        ];

        foreach ($services as $service) {
            Service::firstOrCreate(
                ['code' => $service['code']],
                $service
            );
        }
    }
}
