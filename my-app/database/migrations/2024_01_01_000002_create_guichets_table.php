<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('guichets', function (Blueprint $table) {
            $table->id();
            $table->string('numero', 10)->unique();
            $table->string('nom');
            $table->foreignId('service_id')->constrained('services');
            $table->enum('statut', ['libre', 'occupe', 'ferme'])->default('ferme');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('guichets');
    }
};
