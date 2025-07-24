<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    public function index(): JsonResponse
    {
        $services = Service::where('est_actif', true)
            ->withCount(['ticketsEnAttente'])
            ->get();

        return response()->json($services);
    }

    public function show(Service $service): JsonResponse
    {
        $service->load(['ticketsEnAttente' => function($query) {
            $query->orderBy('created_at');
        }]);

        return response()->json($service);
    }
}
