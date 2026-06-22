<?php

namespace App\Http\Controllers\Admin;

use App\Models\HomepageSetting;
use App\Models\Product;
use Illuminate\Http\Request;

class HomepageSettingController extends Controller
{
    public function edit()
    {
        $setting  = HomepageSetting::current();
        $products = Product::where('is_active', true)->get(['id', 'name']);
        return view('admin.homepage-setting.edit', compact('setting', 'products'));
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'hero_title'              => 'required|string|max:255',
            'hero_subtitle'           => 'nullable|string|max:500',
            'cta_text'                => 'nullable|string|max:100',
            'highlighted_product_ids' => 'nullable|array',
            'highlighted_product_ids.*' => 'nullable|integer|exists:products,id',
        ]);

        $data['highlighted_product_ids'] = array_filter($request->input('highlighted_product_ids', []));

        HomepageSetting::current()->update($data);

        return back()->with('success', 'Homepage setting berhasil diperbarui.');
    }
}
