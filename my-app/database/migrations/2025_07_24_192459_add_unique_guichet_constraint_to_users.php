<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Créer un index unique partiel qui ne s'applique qu'aux agents avec guichet_id non null
        DB::statement('CREATE UNIQUE INDEX unique_guichet_for_agents ON users (guichet_id) WHERE role = "agent" AND guichet_id IS NOT NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP INDEX IF EXISTS unique_guichet_for_agents');
    }
};
