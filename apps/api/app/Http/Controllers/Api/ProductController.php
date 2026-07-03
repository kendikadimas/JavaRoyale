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
        $query = Product::with(['images', 'variants.images'])
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('created_at');

        return response()->json($query->paginate(12));
    }

    public function show(string $slug): JsonResponse
    {
        $product = Product::with(['images', 'nutritionFact', 'variants.images'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return response()->json($product);
    }
}
