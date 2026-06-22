<?php

namespace App\Http\Controllers\Api;

use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class TestimonialController extends Controller
{
    public function index(): JsonResponse
    {
        $testimonials = Testimonial::where('is_published', true)
            ->latest()
            ->get();

        return response()->json($testimonials);
    }
}
