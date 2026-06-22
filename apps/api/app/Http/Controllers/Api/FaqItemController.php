<?php

namespace App\Http\Controllers\Api;

use App\Models\FaqItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class FaqItemController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(FaqItem::orderBy('order')->get());
    }
}
