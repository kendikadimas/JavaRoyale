<?php

namespace App\Http\Controllers\Admin;

use App\Models\SiteSetting;
use Illuminate\Http\Request;

class SiteSettingController extends Controller
{
    public function edit()
    {
        $setting = SiteSetting::current();
        return view('admin.site-setting.edit', compact('setting'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'address'             => 'nullable|string|max:500',
            'whatsapp_primary'    => 'nullable|string|max:30',
            'whatsapp_secondary'  => 'nullable|string|max:30',
            'email'               => 'nullable|email|max:255',
            'operating_hours'     => 'nullable|string|max:255',
            'social_links'        => 'nullable|array',
            'social_links.*'      => 'nullable|url|max:255',
        ]);

        SiteSetting::current()->update([
            'address'            => $request->address,
            'whatsapp_primary'   => $request->whatsapp_primary,
            'whatsapp_secondary' => $request->whatsapp_secondary,
            'email'              => $request->email,
            'operating_hours'    => $request->operating_hours,
            'social_links'       => array_filter($request->input('social_links', [])),
        ]);

        return back()->with('success', 'Site setting berhasil diperbarui.');
    }
}
