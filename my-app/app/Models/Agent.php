<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Agent extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'nom', 'prenom', 'email', 'password', 'matricule', 'statut', 'guichet_id', 'derniere_activite'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'derniere_activite' => 'datetime',
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    protected $appends = ['nom_complet'];

    public function guichet()
    {
        return $this->belongsTo(Guichet::class);
    }

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function getNomCompletAttribute()
    {
        return $this->prenom . ' ' . $this->nom;
    }

    public function estConnecte()
    {
        return $this->statut === 'connecte' && $this->guichet_id;
    }

    public function connecterGuichet($guichetId)
    {
        $this->update([
            'guichet_id' => $guichetId,
            'statut' => 'connecte',
            'derniere_activite' => now()
        ]);

        Guichet::find($guichetId)?->update(['statut' => 'libre']);
    }

    public function deconnecter()
    {
        $ancienGuichet = $this->guichet_id;

        $this->update([
            'guichet_id' => null,
            'statut' => 'deconnecte',
            'derniere_activite' => now()
        ]);

        if ($ancienGuichet) {
            Guichet::find($ancienGuichet)?->update(['statut' => 'ferme']);
        }
    }
}
