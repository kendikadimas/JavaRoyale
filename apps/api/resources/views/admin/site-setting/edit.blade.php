@extends('admin.layouts.app')
@section('title', 'Site Settings')
@section('page-title', 'Site Settings')
@section('content')
<form method="POST" action="{{ route('admin.site-setting.update') }}">
    @csrf @method('PUT')
    <div class="max-w-2xl">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <textarea name="address" rows="3"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">{{ old('address', $setting->address) }}</textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">WhatsApp Primary</label>
                    <input type="text" name="whatsapp_primary" value="{{ old('whatsapp_primary', $setting->whatsapp_primary) }}"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">WhatsApp Secondary</label>
                    <input type="text" name="whatsapp_secondary" value="{{ old('whatsapp_secondary', $setting->whatsapp_secondary) }}"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" value="{{ old('email', $setting->email) }}"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                    @error('email')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Jam Operasional</label>
                    <input type="text" name="operating_hours" value="{{ old('operating_hours', $setting->operating_hours) }}"
                        placeholder="Senin–Jumat 08.00–17.00 WIB"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Social Links</label>
                @php $socials = $setting->social_links ?? []; $platforms = ['instagram','linkedin','facebook','twitter','youtube','tiktok']; @endphp
                <div class="space-y-2">
                    @foreach($platforms as $platform)
                    <div class="flex items-center gap-2">
                        <span class="text-xs text-gray-500 w-20 capitalize">{{ $platform }}</span>
                        <input type="url" name="social_links[{{ $platform }}]" value="{{ old('social_links.' . $platform, $socials[$platform] ?? '') }}"
                            placeholder="https://..."
                            class="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                    </div>
                    @endforeach
                </div>
            </div>
            <div class="pt-2">
                <button type="submit" class="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-lg text-sm">Simpan</button>
            </div>
        </div>
    </div>
</form>
@endsection
