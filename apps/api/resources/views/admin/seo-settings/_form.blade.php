@php $isEdit = isset($seoSetting) && $seoSetting->exists; @endphp
<div class="max-w-2xl">
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Page Key <span class="text-red-500">*</span></label>
            <input type="text" name="page_key" value="{{ old('page_key', $seoSetting->page_key ?? '') }}"
                list="page-keys" placeholder="mis. home, about, products"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-400" required>
            <datalist id="page-keys">
                @foreach(['home','about','products','why-choose-us','market-opportunities','blog','faq','contact'] as $key)
                <option value="{{ $key }}">
                @endforeach
            </datalist>
            @error('page_key')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
            <input type="text" name="seo_title" value="{{ old('seo_title', $seoSetting->seo_title ?? '') }}"
                maxlength="255"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
            @error('seo_title')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
            <textarea name="seo_description" rows="3" maxlength="300"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">{{ old('seo_description', $seoSetting->seo_description ?? '') }}</textarea>
            @error('seo_description')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
        </div>
        <div class="flex gap-3 pt-2">
            <button type="submit" class="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-lg text-sm">{{ $isEdit ? 'Simpan' : 'Buat' }}</button>
            <a href="{{ route('admin.seo-settings.index') }}" class="text-sm text-gray-400 hover:text-gray-600 py-2">Batal</a>
        </div>
    </div>
</div>
