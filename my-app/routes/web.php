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
})->name('welcome');

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
Route::get('/admin', [App\Http\Controllers\AdminController::class, 'dashboard'])
    ->middleware(['auth', 'verified', 'role:admin'])->name('admin');

// Routes admin spécifiques
Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('/admin/tickets', function () {
        return Inertia::render('Admin/Tickets', ['auth' => ['user' => auth()->user()]]);
    })->name('admin.tickets');

    Route::get('/admin/guichets', function () {
        return Inertia::render('Admin/Guichets', ['auth' => ['user' => auth()->user()]]);
    })->name('admin.guichets');

    Route::get('/admin/services', function () {
        return Inertia::render('Admin/Services', ['auth' => ['user' => auth()->user()]]);
    })->name('admin.services');

    Route::get('/admin/users', function () {
        return Inertia::render('Admin/Users', ['auth' => ['user' => auth()->user()]]);
    })->name('admin.users');

    Route::get('/admin/stats', function () {
        return Inertia::render('Admin/Stats', ['auth' => ['user' => auth()->user()]]);
    })->name('admin.stats');

    Route::get('/admin/settings', function () {
        return Inertia::render('Admin/Settings', ['auth' => ['user' => auth()->user()]]);
    })->name('admin.settings');
});

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

// Routes agent spécifiques
Route::middleware(['auth', 'verified', 'role:agent'])->group(function () {
    Route::get('/guichet/history', function () {
        return Inertia::render('Agent/History', ['auth' => ['user' => auth()->user()]]);
    })->name('guichet.history');

    Route::get('/guichet/settings', function () {
        return Inertia::render('Agent/Settings', ['auth' => ['user' => auth()->user()]]);
    })->name('guichet.settings');
});

// Routes publiques (sans authentification)
Route::get('/mobile', function () {
    return Inertia::render('TicketMobileModerne');
})->name('mobile');

Route::get('/affichage', function () {
    return Inertia::render('AffichagePublicModerne');
})->name('affichage');

// Routes profil utilisateur
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
