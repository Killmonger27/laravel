<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'matricule',
        'statut',
        'guichet_id',
        'derniere_activite',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'derniere_activite' => 'datetime',
        ];
    }

    /**
     * Relations
     */
    public function guichet()
    {
        return $this->belongsTo(Guichet::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'agent_id');
    }

    /**
     * Méthodes de rôle
     */
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isAgent()
    {
        return $this->role === 'agent';
    }

    /**
     * Méthodes agent
     */
    public function connecter($guichet_id = null)
    {
        if ($this->isAgent()) {
            $this->update([
                'statut' => 'connecte',
                'guichet_id' => $guichet_id ?: $this->guichet_id,
                'derniere_activite' => now(),
            ]);
        }
    }

    public function deconnecter()
    {
        if ($this->isAgent()) {
            $this->update([
                'statut' => 'deconnecte',
                'derniere_activite' => now(),
            ]);
        }
    }

    public function mettrEnPause()
    {
        if ($this->isAgent()) {
            $this->update([
                'statut' => 'en_pause',
                'derniere_activite' => now(),
            ]);
        }
    }

    /**
     * Vérifier qu'un agent a un guichet assigné
     */
    public function aGuichetAssigne()
    {
        return $this->isAgent() ? !is_null($this->guichet_id) : true;
    }

    /**
     * Obtenir le guichet de l'agent avec vérification
     */
    public function getGuichetAgent()
    {
        if (!$this->isAgent()) {
            throw new \Exception('Cette méthode est réservée aux agents.');
        }

        if (!$this->guichet_id) {
            throw new \Exception('Cet agent n\'a pas de guichet assigné.');
        }

        return $this->guichet;
    }

    /**
     * Boot method pour ajouter des validations
     */
    protected static function boot()
    {
        parent::boot();

        // Validation avant sauvegarde
        static::saving(function ($user) {
            // Si c'est un agent, il doit avoir un guichet assigné (sauf à la création)
            if ($user->role === 'agent' && $user->exists && !$user->guichet_id) {
                throw new \Exception('Un agent doit toujours avoir un guichet assigné.');
            }
        });
    }
}
