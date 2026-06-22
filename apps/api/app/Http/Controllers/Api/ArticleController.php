<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class ArticleController extends Controller
{
    public function index(): JsonResponse
    {
        $articles = Article::where('is_published', true)
            ->latest('published_at')
            ->paginate(9);

        return response()->json($articles);
    }

    public function show(string $slug): JsonResponse
    {
        $article = Article::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return response()->json($article);
    }
}
