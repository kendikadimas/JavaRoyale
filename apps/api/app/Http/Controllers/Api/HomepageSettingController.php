<?php

namespace App\Http\Controllers\Api;

use App\Models\HomepageSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class HomepageSettingController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json(HomepageSetting::current());
    }
}
