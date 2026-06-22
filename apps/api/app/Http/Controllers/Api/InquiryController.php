<?php

namespace App\Http\Controllers\Api;

use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class InquiryController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'company' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
            'type'    => 'required|in:bulk_order,distributor,partnership,general',
        ]);

        $inquiry = Inquiry::create($data);

        return response()->json(['message' => 'Inquiry submitted successfully.', 'id' => $inquiry->id], 201);
    }
}
