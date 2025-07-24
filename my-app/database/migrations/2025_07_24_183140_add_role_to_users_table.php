<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'agent'])->default('agent')->after('email');
            $table->string('matricule')->nullable()->after('role');
            $table->foreignId('agent_id')->nullable()->constrained('agents')->after('matricule');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['agent_id']);
            $table->dropColumn(['role', 'matricule', 'agent_id']);
        });
    }
};
