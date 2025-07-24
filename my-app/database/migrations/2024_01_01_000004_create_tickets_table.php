<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('numero')->unique();
            $table->foreignId('service_id')->constrained('services');
            $table->foreignId('guichet_id')->nullable()->constrained('guichets');
            $table->foreignId('agent_id')->nullable()->constrained('agents');
            $table->string('nom_client');
            $table->string('telephone_client')->nullable();
            $table->enum('statut', ['en_attente', 'appele', 'en_cours', 'termine', 'annule'])->default('en_attente');
            $table->timestamp('heure_appel')->nullable();
            $table->timestamp('heure_debut')->nullable();
            $table->timestamp('heure_fin')->nullable();
            $table->integer('position')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tickets');
    }
};
