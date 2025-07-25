<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TicketController extends Controller
{
    public function index(): JsonResponse
    {
        $tickets = Ticket::with(['service', 'guichet', 'agent'])
            ->whereIn('statut', ['en_attente', 'appele', 'en_cours'])
            ->orderBy('created_at')
            ->get();

        return response()->json($tickets);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'nom_client' => 'required|string|max:255',
            'telephone_client' => 'nullable|string|max:20',
        ]);

        $service = Service::findOrFail($request->service_id);

        $position = Ticket::where('service_id', $request->service_id)
            ->whereIn('statut', ['en_attente', 'appele'])
            ->count() + 1;

        $ticket = Ticket::create([
            'numero' => Ticket::genererNumero($service->code),
            'service_id' => $request->service_id,
            'nom_client' => $request->nom_client,
            'telephone_client' => $request->telephone_client,
            'position' => $position,
        ]);

        return response()->json($ticket->load('service'), 201);
    }

    public function updateStatut(Request $request, Ticket $ticket): JsonResponse
    {
        $request->validate([
            'statut' => 'required|in:en_attente,appele,en_cours,termine,annule'
        ]);

        switch ($request->statut) {
            case 'en_cours':
                $ticket->commencer();
                break;
            case 'termine':
                $ticket->terminer();
                break;
            default:
                $ticket->update(['statut' => $request->statut]);
        }

        return response()->json($ticket->load(['service', 'guichet', 'agent']));
    }

    public function getByNumero(string $numero): JsonResponse
    {
        $ticket = Ticket::where('numero', $numero)
            ->with(['service', 'guichet', 'agent'])
            ->firstOrFail();

        return response()->json($ticket);
    }

    public function show(Ticket $ticket): JsonResponse
    {
        return response()->json($ticket->load(['service', 'guichet', 'agent']));
    }
}
