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
        // 1. Ajouter les champs agent à la table users s'ils n'existent pas déjà
        if (!Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table) {
                $table->enum('role', ['admin', 'agent'])->default('agent')->after('email');
                $table->string('matricule')->unique()->nullable()->after('role');
            });
        }
        
        if (!Schema::hasColumn('users', 'statut')) {
            Schema::table('users', function (Blueprint $table) {
                $table->enum('statut', ['connecte', 'deconnecte', 'en_pause'])->default('deconnecte')->after('matricule');
                $table->foreignId('guichet_id')->nullable()->constrained('guichets')->after('statut');
                $table->timestamp('derniere_activite')->nullable()->after('guichet_id');
            });
        }
        
        // 2. Mettre à jour la table tickets pour supprimer la référence aux agents
        // et remettre agent_id à NULL (il référencera maintenant users)
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropForeign(['agent_id']);
        });
        
        // Vider les données agent_id existantes car elles ne correspondent plus
        DB::statement('UPDATE tickets SET agent_id = NULL WHERE agent_id IS NOT NULL');
        
        // Ajouter la nouvelle contrainte vers users
        Schema::table('tickets', function (Blueprint $table) {
            $table->foreign('agent_id')->references('id')->on('users');
        });
        
        // 3. Supprimer la contrainte agent_id dans users si elle existe
        if (Schema::hasColumn('users', 'agent_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropForeign(['agent_id']);
                $table->dropColumn('agent_id');
            });
        }
        
        // 4. Supprimer la table agents
        Schema::dropIfExists('agents');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Recréer la table agents
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
        
        // Remettre la contrainte dans tickets vers agents
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropForeign(['agent_id']);
            $table->foreign('agent_id')->references('id')->on('agents');
        });
        
        // Supprimer les champs agent de users
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['guichet_id']);
            $table->dropColumn(['role', 'matricule', 'statut', 'guichet_id', 'derniere_activite']);
        });
    }
};
