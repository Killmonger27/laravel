<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom', 'code', 'description', 'duree_estimee', 'est_actif'
    ];

    public function guichets()
    {
        return $this->hasMany(Guichet::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function ticketsEnAttente()
    {
        return $this->tickets()->where('statut', 'en_attente');
    }
}
