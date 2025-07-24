<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard principal avec redirection automatique selon rôle
Route::get('/dashboard', function () {
    $user = auth()->user();
    
    if ($user && $user->role === 'admin') {
        return redirect('/admin');
    } elseif ($user && $user->role === 'agent') {
        return redirect('/guichet');
    }
    
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Interface administrateur
Route::get('/admin', function () {
    return Inertia::render('AdminDashboard');
})->middleware(['auth', 'verified', 'role:admin'])->name('admin');

// Interface agent/guichet
Route::get('/guichet', [App\Http\Controllers\GuichetController::class, 'dashboard'])
    ->middleware(['auth', 'verified', 'role:agent'])->name('guichet');

Route::get('/guichet/interface', [App\Http\Controllers\GuichetController::class, 'index'])
    ->middleware(['auth', 'verified', 'role:agent'])->name('guichet.index');

Route::post('/guichet/appeler', [App\Http\Controllers\GuichetController::class, 'appellerProchain'])
    ->middleware(['auth', 'verified', 'role:agent'])->name('guichet.appeler');

Route::post('/guichet/commencer/{ticket}', [App\Http\Controllers\GuichetController::class, 'commencerTicket'])
    ->middleware(['auth', 'verified', 'role:agent'])->name('guichet.commencer');

Route::post('/guichet/terminer/{ticket}', [App\Http\Controllers\GuichetController::class, 'terminerTicket'])
    ->middleware(['auth', 'verified', 'role:agent'])->name('guichet.terminer');

// Routes publiques (sans authentification)
Route::get('/mobile', function () {
    return Inertia::render('TicketMobile');
})->name('mobile');

Route::get('/affichage', function () {
    return Inertia::render('AffichagePublic');
})->name('affichage');

// Routes profil utilisateur
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
