<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guichet extends Model
{
    use HasFactory;

    protected $fillable = [
        'numero', 'nom', 'service_id', 'statut'
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function agent()
    {
        return $this->hasOne(User::class, 'guichet_id')->where('role', 'agent');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    public function ticketEnCours()
    {
        return $this->hasOne(Ticket::class)->where('statut', 'en_cours');
    }

    public function estDisponible()
    {
        return $this->statut === 'libre' && $this->agent()->exists();
    }

    public function appellerProchainTicket()
    {
        $prochainTicket = Ticket::where('service_id', $this->service_id)
            ->where('statut', 'en_attente')
            ->orderBy('created_at')
            ->first();

        if ($prochainTicket) {
            $prochainTicket->update([
                'guichet_id' => $this->id,
                'agent_id' => $this->agent->id,
                'statut' => 'appele',
                'heure_appel' => now()
            ]);

            $this->update(['statut' => 'occupe']);

            return $prochainTicket;
        }

        return null;
    }
}
