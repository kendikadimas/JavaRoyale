@php $isEdit = isset($testimonial) && $testimonial->exists; @endphp
<div class="max-w-2xl">
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nama Penulis <span class="text-red-500">*</span></label>
                <input type="text" name="author_name" value="{{ old('author_name', $testimonial->author_name ?? '') }}"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" required>
                @error('author_name')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Perusahaan</label>
                <input type="text" name="company" value="{{ old('company', $testimonial->company ?? '') }}"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
            </div>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kutipan <span class="text-red-500">*</span></label>
            <textarea name="quote" rows="4" required
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">{{ old('quote', $testimonial->quote ?? '') }}</textarea>
            @error('quote')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                <input type="number" name="rating" min="1" max="5"
                    value="{{ old('rating', $testimonial->rating ?? '') }}"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                @error('rating')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
            </div>
            <div class="flex items-end pb-2">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="is_published" value="1" class="w-4 h-4 rounded text-amber-500"
                        {{ old('is_published', $testimonial->is_published ?? false) ? 'checked' : '' }}>
                    <span class="text-sm text-gray-700">Publish</span>
                </label>
            </div>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Foto</label>
            @if($isEdit && $testimonial->photo)
            <img src="{{ Storage::url($testimonial->photo) }}" class="w-16 h-16 object-cover rounded-full mb-2">
            @endif
            <input type="file" name="photo" accept="image/*"
                class="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100">
            @error('photo')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
        </div>
        <div class="flex gap-3 pt-2">
            <button type="submit" class="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-lg text-sm">{{ $isEdit ? 'Simpan' : 'Buat' }}</button>
            <a href="{{ route('admin.testimonials.index') }}" class="text-sm text-gray-400 hover:text-gray-600 py-2">Batal</a>
        </div>
    </div>
</div>
