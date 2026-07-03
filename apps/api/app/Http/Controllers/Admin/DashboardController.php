<?php

namespace App\Http\Controllers\Admin;

use App\Models\Article;
use App\Models\Inquiry;
use App\Models\Product;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'products'          => Product::count(),
            'products_active'   => Product::where('is_active', true)->count(),
            'articles'          => Article::count(),
            'articles_published'=> Article::where('is_published', true)->count(),
            'inquiries_new'     => Inquiry::where('status', 'new')->count(),
            'inquiries_total'   => Inquiry::count(),
        ];

        $recent_articles = Article::latest()->limit(5)->get(['id', 'title', 'is_published', 'created_at']);
        $recent_inquiries = Inquiry::latest()->limit(5)->get(['id', 'name', 'company', 'type', 'status', 'created_at']);
        $recent_products  = Product::orderBy('sort_order')->orderByDesc('created_at')->limit(5)->get(['id', 'name', 'is_active', 'sort_order', 'created_at']);

        return view('admin.dashboard', compact('stats', 'recent_articles', 'recent_inquiries', 'recent_products'));
    }
}
