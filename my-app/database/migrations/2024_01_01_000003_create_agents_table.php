<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('agents', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('email')->unique();
            $table->string('matricule')->unique();
            $table->enum('statut', ['connecte', 'deconnecte', 'en_pause'])->default('deconnecte');
            $table->foreignId('guichet_id')->nullable()->constrained('guichets');
            $table->timestamp('derniere_activite')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('agents');
    }
};
