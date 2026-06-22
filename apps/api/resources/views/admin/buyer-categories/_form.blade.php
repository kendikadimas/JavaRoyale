@php $isEdit = isset($buyerCategory) && $buyerCategory->exists; @endphp
<div class="max-w-md">
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Icon <span class="text-red-500">*</span></label>
            <input type="text" name="icon" value="{{ old('icon', $buyerCategory->icon ?? '') }}"
                placeholder="mis. building-storefront"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" required>
            <p class="text-xs text-gray-400 mt-1">Nama icon Heroicons (digunakan oleh frontend).</p>
            @error('icon')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Label <span class="text-red-500">*</span></label>
            <input type="text" name="label" value="{{ old('label', $buyerCategory->label ?? '') }}"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" required>
            @error('label')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
        </div>
        <div class="w-24">
            <label class="block text-sm font-medium text-gray-700 mb-1">Order</label>
            <input type="number" name="order" value="{{ old('order', $buyerCategory->order ?? $nextOrder ?? 0) }}" min="0"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
        </div>
        <div class="flex gap-3 pt-2">
            <button type="submit" class="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-lg text-sm">{{ $isEdit ? 'Simpan' : 'Buat' }}</button>
            <a href="{{ route('admin.buyer-categories.index') }}" class="text-sm text-gray-400 hover:text-gray-600 py-2">Batal</a>
        </div>
    </div>
</div>
