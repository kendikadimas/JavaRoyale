<?php

namespace App\Http\Controllers\Api;

use App\Models\SeoSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class SeoSettingController extends Controller
{
    public function show(string $pageKey): JsonResponse
    {
        $seo = SeoSetting::where('page_key', $pageKey)->first();

        if (!$seo) {
            return response()->json(null, 404);
        }

        return response()->json($seo);
    }
}
