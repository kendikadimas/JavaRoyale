@php $isEdit = isset($socialEmbedSetting) && $socialEmbedSetting->exists; @endphp
<div class="max-w-2xl">
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Platform <span class="text-red-500">*</span></label>
            <input type="text" name="platform" value="{{ old('platform', $socialEmbedSetting->platform ?? '') }}"
                list="platform-list"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" required>
            <datalist id="platform-list">
                <option value="instagram"><option value="tiktok"><option value="facebook"><option value="youtube">
            </datalist>
            @error('platform')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
            <input type="url" name="link_url" value="{{ old('link_url', $socialEmbedSetting->link_url ?? '') }}"
                placeholder="https://..."
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
            @error('link_url')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Embed Code</label>
            <textarea name="embed_code" rows="5"
                placeholder="Paste embed code dari platform..."
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-400">{{ old('embed_code', $socialEmbedSetting->embed_code ?? '') }}</textarea>
        </div>
        <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="is_active" value="1" class="w-4 h-4 rounded text-amber-500"
                {{ old('is_active', $socialEmbedSetting->is_active ?? true) ? 'checked' : '' }}>
            <span class="text-sm text-gray-700">Aktif</span>
        </label>
        <div class="flex gap-3 pt-2">
            <button type="submit" class="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-lg text-sm">{{ $isEdit ? 'Simpan' : 'Buat' }}</button>
            <a href="{{ route('admin.social-embed-settings.index') }}" class="text-sm text-gray-400 hover:text-gray-600 py-2">Batal</a>
        </div>
    </div>
</div>
