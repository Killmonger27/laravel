<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'numero', 'service_id', 'guichet_id', 'agent_id', 'nom_client',
        'telephone_client', 'statut', 'heure_appel', 'heure_debut', 'heure_fin', 'position'
    ];

    protected $casts = [
        'heure_appel' => 'datetime',
        'heure_debut' => 'datetime',
        'heure_fin' => 'datetime',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function guichet()
    {
        return $this->belongsTo(Guichet::class);
    }

    public function agent()
    {
        return $this->belongsTo(User::class, 'agent_id');
    }

    public static function genererNumero($codeService)
    {
        $date = now()->format('Ymd');
        $dernier = self::whereDate('created_at', today())
            ->where('numero', 'like', $codeService . $date . '%')
            ->orderBy('numero', 'desc')
            ->first();

        $numero = 1;
        if ($dernier) {
            $numero = (int)substr($dernier->numero, -3) + 1;
        }

        return $codeService . $date . str_pad($numero, 3, '0', STR_PAD_LEFT);
    }

    public function commencer()
    {
        $this->update([
            'statut' => 'en_cours',
            'heure_debut' => now()
        ]);
    }

    public function terminer()
    {
        $this->update([
            'statut' => 'termine',
            'heure_fin' => now()
        ]);

        $this->guichet?->update(['statut' => 'libre']);
    }
}
