<?php

namespace App\Http\Controllers\Api;

use App\Models\SocialEmbedSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class SocialEmbedSettingController extends Controller
{
    public function index(): JsonResponse
    {
        $settings = SocialEmbedSetting::where('is_active', true)
            ->orderBy('platform')
            ->get();

        return response()->json($settings);
    }
}
