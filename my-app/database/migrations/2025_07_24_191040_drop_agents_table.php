<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // La contrainte dans tickets a déjà été mise à jour par la migration précédente

        // Supprimer d'abord la contrainte de clé étrangère dans users si elle existe
        if (Schema::hasColumn('users', 'agent_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropForeign(['agent_id']);
                $table->dropColumn('agent_id');
            });
        }

        // Supprimer la table agents
        Schema::dropIfExists('agents');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Recréer la table agents si nécessaire
        Schema::create('agents', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('email')->unique();
            $table->string('matricule')->unique();
            $table->string('password')->nullable();
            $table->enum('statut', ['connecte', 'deconnecte', 'en_pause'])->default('deconnecte');
            $table->foreignId('guichet_id')->nullable()->constrained('guichets');
            $table->timestamp('derniere_activite')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }
};
