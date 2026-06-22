<?php

namespace App\Http\Controllers\Admin;

use App\Models\Article;
use App\Models\Inquiry;
use App\Models\Product;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'products'  => Product::count(),
            'articles'  => Article::count(),
            'inquiries' => Inquiry::where('status', 'new')->count(),
        ];

        return view('admin.dashboard', compact('stats'));
    }
}
