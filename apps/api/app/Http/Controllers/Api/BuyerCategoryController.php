<?php

namespace App\Http\Controllers\Api;

use App\Models\BuyerCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class BuyerCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(BuyerCategory::orderBy('order')->get());
    }
}
