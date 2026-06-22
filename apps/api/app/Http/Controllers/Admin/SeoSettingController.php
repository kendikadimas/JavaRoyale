<?php

namespace App\Http\Controllers\Admin;

use App\Models\SeoSetting;
use Illuminate\Http\Request;

class SeoSettingController extends Controller
{
    public function index()
    {
        $settings = SeoSetting::orderBy('page_key')->get();
        return view('admin.seo-settings.index', compact('settings'));
    }

    public function create()
    {
        return view('admin.seo-settings.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'page_key'        => 'required|string|max:100|unique:seo_settings,page_key',
            'seo_title'       => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:300',
        ]);
        SeoSetting::create($request->only('page_key', 'seo_title', 'seo_description'));
        return redirect()->route('admin.seo-settings.index')->with('success', 'SEO setting berhasil dibuat.');
    }

    public function edit(SeoSetting $seoSetting)
    {
        return view('admin.seo-settings.edit', compact('seoSetting'));
    }

    public function update(Request $request, SeoSetting $seoSetting)
    {
        $request->validate([
            'page_key'        => 'required|string|max:100|unique:seo_settings,page_key,' . $seoSetting->id,
            'seo_title'       => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:300',
        ]);
        $seoSetting->update($request->only('page_key', 'seo_title', 'seo_description'));
        return redirect()->route('admin.seo-settings.index')->with('success', 'SEO setting berhasil diperbarui.');
    }

    public function destroy(SeoSetting $seoSetting)
    {
        $seoSetting->delete();
        return redirect()->route('admin.seo-settings.index')->with('success', 'SEO setting berhasil dihapus.');
    }
}
