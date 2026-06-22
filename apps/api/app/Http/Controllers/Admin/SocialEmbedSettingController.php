<?php

namespace App\Http\Controllers\Admin;

use App\Models\SocialEmbedSetting;
use Illuminate\Http\Request;

class SocialEmbedSettingController extends Controller
{
    public function index()
    {
        $settings = SocialEmbedSetting::orderBy('platform')->get();
        return view('admin.social-embed-settings.index', compact('settings'));
    }

    public function create()
    {
        return view('admin.social-embed-settings.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'platform'   => 'required|string|max:50',
            'embed_code' => 'nullable|string',
            'link_url'   => 'nullable|url|max:255',
            'is_active'  => 'boolean',
        ]);
        SocialEmbedSetting::create([
            'platform'   => $request->platform,
            'embed_code' => $request->embed_code,
            'link_url'   => $request->link_url,
            'is_active'  => $request->boolean('is_active', true),
        ]);
        return redirect()->route('admin.social-embed-settings.index')->with('success', 'Social embed berhasil dibuat.');
    }

    public function edit(SocialEmbedSetting $socialEmbedSetting)
    {
        return view('admin.social-embed-settings.edit', compact('socialEmbedSetting'));
    }

    public function update(Request $request, SocialEmbedSetting $socialEmbedSetting)
    {
        $request->validate([
            'platform'   => 'required|string|max:50',
            'embed_code' => 'nullable|string',
            'link_url'   => 'nullable|url|max:255',
            'is_active'  => 'boolean',
        ]);
        $socialEmbedSetting->update([
            'platform'   => $request->platform,
            'embed_code' => $request->embed_code,
            'link_url'   => $request->link_url,
            'is_active'  => $request->boolean('is_active', true),
        ]);
        return redirect()->route('admin.social-embed-settings.index')->with('success', 'Social embed berhasil diperbarui.');
    }

    public function destroy(SocialEmbedSetting $socialEmbedSetting)
    {
        $socialEmbedSetting->delete();
        return redirect()->route('admin.social-embed-settings.index')->with('success', 'Social embed berhasil dihapus.');
    }
}
