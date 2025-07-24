<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AgentController extends Controller
{
    public function index(): JsonResponse
    {
        $agents = User::where('role', 'agent')->with('guichet.service')->get();
        return response()->json($agents);
    }

    public function connecter(Request $request, User $agent): JsonResponse
    {
        $request->validate([
            'guichet_id' => 'required|exists:guichets,id'
        ]);

        $agent->update([
            'guichet_id' => $request->guichet_id,
            'statut' => 'connecte',
            'derniere_activite' => now()
        ]);

        return response()->json([
            'success' => true,
            'agent' => $agent->load('guichet.service'),
            'message' => 'Agent connecté avec succès'
        ]);
    }

    public function deconnecter(User $agent): JsonResponse
    {
        $agent->update([
            'statut' => 'deconnecte',
            'guichet_id' => null,
            'derniere_activite' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Agent déconnecté avec succès'
        ]);
    }
}
