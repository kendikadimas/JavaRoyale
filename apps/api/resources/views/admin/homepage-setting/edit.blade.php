@extends('admin.layouts.app')
@section('title', 'Homepage Setting')
@section('page-title', 'Homepage Setting')
@section('content')
<form method="POST" action="{{ route('admin.homepage-setting.update') }}">
    @csrf @method('PUT')
    <div class="max-w-2xl">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Hero Title <span class="text-red-500">*</span></label>
                <input type="text" name="hero_title" value="{{ old('hero_title', $setting->hero_title) }}"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" required>
                @error('hero_title')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
                <textarea name="hero_subtitle" rows="3"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">{{ old('hero_subtitle', $setting->hero_subtitle) }}</textarea>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
                <input type="text" name="cta_text" value="{{ old('cta_text', $setting->cta_text) }}"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Highlighted Products</label>
                <div class="space-y-1.5 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                    @foreach($products as $p)
                    <label class="flex items-center gap-2 cursor-pointer text-sm">
                        <input type="checkbox" name="highlighted_product_ids[]" value="{{ $p->id }}" class="w-4 h-4 rounded text-amber-500"
                            {{ in_array($p->id, $setting->highlighted_product_ids ?? []) ? 'checked' : '' }}>
                        {{ $p->name }}
                    </label>
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
