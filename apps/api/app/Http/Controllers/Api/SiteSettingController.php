<?php

namespace App\Http\Controllers\Api;

use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class SiteSettingController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json(SiteSetting::current());
    }
}
