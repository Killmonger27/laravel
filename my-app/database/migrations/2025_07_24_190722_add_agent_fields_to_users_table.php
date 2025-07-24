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
        Schema::table('users', function (Blueprint $table) {
            // Champs pour les agents
            $table->enum('statut', ['connecte', 'deconnecte', 'en_pause'])->default('deconnecte')->after('role');
            $table->foreignId('guichet_id')->nullable()->constrained('guichets')->after('statut');
            $table->timestamp('derniere_activite')->nullable()->after('guichet_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['guichet_id']);
            $table->dropColumn(['statut', 'guichet_id', 'derniere_activite']);
        });
    }
};
