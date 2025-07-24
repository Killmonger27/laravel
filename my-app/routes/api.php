<?php

use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\GuichetController;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\Api\AgentController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Services
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{service}', [ServiceController::class, 'show']);

    // Guichets
    Route::get('/guichets', [GuichetController::class, 'index']);
    Route::post('/guichets/{guichet}/appeler-prochain', [GuichetController::class, 'appellerProchain']);
    Route::patch('/guichets/{guichet}/statut', [GuichetController::class, 'updateStatut']);

    // Agents
    Route::get('/agents', [AgentController::class, 'index']);
    Route::post('/agents/{agent}/connecter', [AgentController::class, 'connecter']);
    Route::post('/agents/{agent}/deconnecter', [AgentController::class, 'deconnecter']);

    // Tickets
    Route::get('/tickets', [TicketController::class, 'index']);
    Route::post('/tickets', [TicketController::class, 'store']);
    Route::patch('/tickets/{ticket}/statut', [TicketController::class, 'updateStatut']);
    Route::get('/tickets/numero/{numero}', [TicketController::class, 'getByNumero']);
});
