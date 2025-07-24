<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Guichet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GuichetController extends Controller
{
    public function index(): JsonResponse
    {
        $guichets = Guichet::with(['service', 'agent'])
            ->get();

        return response()->json($guichets);
    }

    public function appellerProchain(Guichet $guichet): JsonResponse
    {
        $ticket = $guichet->appellerProchainTicket();

        if ($ticket) {
            return response()->json([
                'success' => true,
                'ticket' => $ticket->load(['service', 'guichet', 'agent']),
                'message' => 'Ticket appelé avec succès'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Aucun ticket en attente'
        ], 404);
    }

    public function updateStatut(Request $request, Guichet $guichet): JsonResponse
    {
        $request->validate([
            'statut' => 'required|in:libre,occupe,ferme'
        ]);

        $guichet->update(['statut' => $request->statut]);

        return response()->json([
            'success' => true,
            'guichet' => $guichet->load(['service', 'agent']),
            'message' => 'Statut du guichet mis à jour'
        ]);
    }
}
