<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::with(['images', 'variants'])
            ->where('is_active', true)
            ->latest();

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        return response()->json($query->paginate(12));
    }

    public function show(string $slug): JsonResponse
    {
        $product = Product::with(['images', 'variants.nutritionFact'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return response()->json($product);
    }
}
