<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Guichet;
use App\Models\Service;

class GuichetSeeder extends Seeder
{
    public function run()
    {
        $services = Service::all();

        $guichets = [
            ['numero' => 'G01', 'nom' => 'Guichet Principal 1', 'service_id' => $services->where('code', 'DEP')->first()->id],
            ['numero' => 'G02', 'nom' => 'Guichet Principal 2', 'service_id' => $services->where('code', 'RET')->first()->id],
            ['numero' => 'G03', 'nom' => 'Guichet Information', 'service_id' => $services->where('code', 'INF')->first()->id],
            ['numero' => 'G04', 'nom' => 'Guichet Crédit', 'service_id' => $services->where('code', 'CRE')->first()->id],
        ];

        foreach ($guichets as $guichet) {
            Guichet::firstOrCreate(
                ['numero' => $guichet['numero']],
                $guichet
            );
        }
    }
}
