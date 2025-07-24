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
        // Supprimer la contrainte de clé étrangère vers agents
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropForeign(['agent_id']);
        });

        // Mettre à jour les données : transférer les agent_id vers user_id
        // Vous pourriez avoir besoin d'ajuster cette requête selon vos données
        DB::statement('UPDATE tickets SET agent_id = NULL WHERE agent_id IS NOT NULL');

        // Ajouter la nouvelle contrainte vers users
        Schema::table('tickets', function (Blueprint $table) {
            $table->foreign('agent_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Supprimer la contrainte vers users
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropForeign(['agent_id']);
        });

        // Recréer la contrainte vers agents
        Schema::table('tickets', function (Blueprint $table) {
            $table->foreign('agent_id')->references('id')->on('agents');
        });
    }
};
