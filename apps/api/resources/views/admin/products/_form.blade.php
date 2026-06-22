@php $isEdit = isset($product) && $product->exists; @endphp

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {{-- Left: Main info --}}
    <div class="lg:col-span-2 space-y-6">
        {{-- Basic info --}}
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-700 mb-4">Informasi Produk</h3>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Nama Produk <span class="text-red-500">*</span></label>
                <input type="text" name="name" id="product-name" value="{{ old('name', $product->name ?? '') }}"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required>
                @error('name')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input type="text" name="slug" id="product-slug" value="{{ old('slug', $product->slug ?? '') }}"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                <p class="text-xs text-gray-400 mt-1">Dikosongkan = auto-generate dari nama.</p>
                @error('slug')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Kategori <span class="text-red-500">*</span></label>
                <input type="text" name="category" value="{{ old('category', $product->category ?? '') }}"
                    list="category-suggestions"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    required>
                <datalist id="category-suggestions">
                    <option value="jamu">
                    <option value="vacuum-fried-snack">
                </datalist>
                @error('category')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea name="description" rows="4"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">{{ old('description', $product->description ?? '') }}</textarea>
            </div>

            {{-- Advantages --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Keunggulan (advantages)</label>
                <div id="advantages-list" class="space-y-2">
                    @php $advantages = old('advantages', $product->advantages ?? ['', '', '']); @endphp
                    @foreach($advantages as $i => $adv)
                    <input type="text" name="advantages[]" value="{{ $adv }}"
                        placeholder="Keunggulan #{{ $i + 1 }}"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                    @endforeach
                </div>
                <button type="button" onclick="addAdvantage()" class="mt-2 text-xs text-amber-600 hover:underline">+ Tambah keunggulan</button>
            </div>
        </div>

        {{-- Variants --}}
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-gray-700">Varian & Nutrition Facts</h3>
                <button type="button" onclick="addVariant()" class="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100">+ Tambah Varian</button>
            </div>

            <div id="variants-container" class="space-y-4">
                @php
                    $variants = old('variants', $isEdit
                        ? $product->variants->map(fn($v) => [
                            'id' => $v->id,
                            'variant_name' => $v->variant_name,
                            'ingredients' => $v->ingredients ?? [],
                            'net_weight' => $v->net_weight,
                            'compliance_notes' => $v->compliance_notes,
                            'nutrition' => $v->nutritionFact ? [
                                'energy_kcal' => $v->nutritionFact->energy_kcal,
                                'protein_g' => $v->nutritionFact->protein_g,
                                'fat_g' => $v->nutritionFact->fat_g,
                                'carbs_g' => $v->nutritionFact->carbs_g,
                                'sugar_g' => $v->nutritionFact->sugar_g,
                                'sodium_mg' => $v->nutritionFact->sodium_mg,
                            ] : [],
                        ])->toArray()
                        : [['id'=>'','variant_name'=>'','ingredients'=>[],'net_weight'=>'','compliance_notes'=>'','nutrition'=>[]]]
                    );
                @endphp

                @foreach($variants as $vi => $variant)
                <div class="variant-block border border-gray-200 rounded-lg p-4" data-index="{{ $vi }}">
                    <div class="flex items-center justify-between mb-3">
                        <p class="text-sm font-medium text-gray-600">Varian #<span class="variant-num">{{ $vi + 1 }}</span></p>
                        <button type="button" onclick="removeVariant(this)" class="text-xs text-red-400 hover:text-red-600">Hapus</button>
                    </div>
                    <input type="hidden" name="variants[{{ $vi }}][id]" value="{{ $variant['id'] ?? '' }}">
                    <div class="grid grid-cols-2 gap-3 mb-3">
                        <div>
                            <label class="text-xs text-gray-500">Nama Varian *</label>
                            <input type="text" name="variants[{{ $vi }}][variant_name]" value="{{ $variant['variant_name'] ?? '' }}"
                                class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400" required>
                        </div>
                        <div>
                            <label class="text-xs text-gray-500">Berat Bersih</label>
                            <input type="text" name="variants[{{ $vi }}][net_weight]" value="{{ $variant['net_weight'] ?? '' }}"
                                placeholder="mis. 100 g"
                                class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="text-xs text-gray-500">Ingredients (satu per baris)</label>
                        <textarea name="_ingredients_raw_{{ $vi }}" rows="2" onchange="syncIngredients(this, {{ $vi }})"
                            class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            placeholder="Kunyit&#10;Asam Jawa&#10;Gula Aren">{{ implode("\n", $variant['ingredients'] ?? []) }}</textarea>
                        @foreach(($variant['ingredients'] ?? []) as $ii => $ing)
                        <input type="hidden" name="variants[{{ $vi }}][ingredients][]" value="{{ $ing }}" class="ing-input-{{ $vi }}">
                        @endforeach
                    </div>
                    <div class="mb-3">
                        <label class="text-xs text-gray-500">Catatan Compliance</label>
                        <textarea name="variants[{{ $vi }}][compliance_notes]" rows="2"
                            class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400">{{ $variant['compliance_notes'] ?? '' }}</textarea>
                    </div>
                    {{-- Nutrition --}}
                    <div class="border-t border-gray-100 pt-3">
                        <p class="text-xs font-medium text-gray-500 mb-2">Nutrition Facts (per sajian)</p>
                        <div class="grid grid-cols-3 gap-2">
                            @foreach(['energy_kcal'=>'Energi (kcal)','protein_g'=>'Protein (g)','fat_g'=>'Lemak (g)','carbs_g'=>'Karbohidrat (g)','sugar_g'=>'Gula (g)','sodium_mg'=>'Natrium (mg)'] as $field => $label)
                            <div>
                                <label class="text-xs text-gray-400">{{ $label }}</label>
                                <input type="number" step="0.01" name="variants[{{ $vi }}][nutrition][{{ $field }}]" value="{{ $variant['nutrition'][$field] ?? '' }}"
                                    class="w-full border border-gray-200 rounded px-2 py-1 text-sm mt-0.5 focus:outline-none focus:ring-1 focus:ring-amber-400">
                            </div>
                            @endforeach
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>

    {{-- Right: Images + Status --}}
    <div class="space-y-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-700 mb-4">Status</h3>
            <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="is_active" value="1" class="w-4 h-4 rounded text-amber-500"
                    {{ old('is_active', $product->is_active ?? true) ? 'checked' : '' }}>
                <span class="text-sm text-gray-700">Produk aktif</span>
            </label>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-700 mb-4">Gambar Produk</h3>

            @if($isEdit && $product->images->count())
            <div class="grid grid-cols-2 gap-2 mb-4">
                @foreach($product->images as $img)
                <div class="relative group">
                    <img src="{{ Storage::url($img->image_path) }}" alt="{{ $img->alt_text }}" class="w-full h-24 object-cover rounded-lg">
                    <label class="absolute top-1 right-1 cursor-pointer">
                        <input type="checkbox" name="delete_images[]" value="{{ $img->id }}" class="sr-only peer">
                        <span class="bg-white/80 peer-checked:bg-red-500 peer-checked:text-white text-gray-600 text-xs px-1.5 py-0.5 rounded shadow">Hapus</span>
                    </label>
                </div>
                @endforeach
            </div>
            @endif

            <label class="block">
                <span class="text-xs text-gray-500 block mb-1">Upload gambar baru</span>
                <input type="file" name="images[]" multiple accept="image/*"
                    class="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100">
            </label>
            @error('images.*')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 rounded-lg text-sm transition">
                {{ $isEdit ? 'Simpan Perubahan' : 'Buat Produk' }}
            </button>
            <a href="{{ route('admin.products.index') }}" class="block text-center text-sm text-gray-400 hover:text-gray-600 mt-2">Batal</a>
        </div>
    </div>
</div>

@push('scripts')
<script>
// Auto-slug from name
document.getElementById('product-name')?.addEventListener('input', function() {
    const slugField = document.getElementById('product-slug');
    if (!slugField.dataset.manual) {
        slugField.value = this.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
});
document.getElementById('product-slug')?.addEventListener('input', function() {
    this.dataset.manual = this.value ? '1' : '';
});

let variantCount = {{ count($variants ?? []) }};

function addAdvantage() {
    const list = document.getElementById('advantages-list');
    const idx = list.children.length;
    const input = document.createElement('input');
    input.type = 'text'; input.name = 'advantages[]';
    input.placeholder = 'Keunggulan #' + (idx + 1);
    input.className = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400';
    list.appendChild(input);
}

function addVariant() {
    const idx = variantCount++;
    const fields = ['energy_kcal','protein_g','fat_g','carbs_g','sugar_g','sodium_mg'];
    const labels = {'energy_kcal':'Energi (kcal)','protein_g':'Protein (g)','fat_g':'Lemak (g)','carbs_g':'Karbohidrat (g)','sugar_g':'Gula (g)','sodium_mg':'Natrium (mg)'};
    const nutHtml = fields.map(f => `<div><label class="text-xs text-gray-400">${labels[f]}</label><input type="number" step="0.01" name="variants[${idx}][nutrition][${f}]" class="w-full border border-gray-200 rounded px-2 py-1 text-sm mt-0.5 focus:outline-none focus:ring-1 focus:ring-amber-400"></div>`).join('');
    const html = `
    <div class="variant-block border border-gray-200 rounded-lg p-4" data-index="${idx}">
        <div class="flex items-center justify-between mb-3">
            <p class="text-sm font-medium text-gray-600">Varian #${idx + 1}</p>
            <button type="button" onclick="removeVariant(this)" class="text-xs text-red-400 hover:text-red-600">Hapus</button>
        </div>
        <input type="hidden" name="variants[${idx}][id]" value="">
        <div class="grid grid-cols-2 gap-3 mb-3">
            <div><label class="text-xs text-gray-500">Nama Varian *</label>
            <input type="text" name="variants[${idx}][variant_name]" class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400" required></div>
            <div><label class="text-xs text-gray-500">Berat Bersih</label>
            <input type="text" name="variants[${idx}][net_weight]" placeholder="mis. 100 g" class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400"></div>
        </div>
        <div class="mb-3"><label class="text-xs text-gray-500">Ingredients</label>
        <textarea name="_ingredients_raw_${idx}" rows="2" onchange="syncIngredients(this, ${idx})" class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Kunyit&#10;Asam Jawa"></textarea></div>
        <div class="mb-3"><label class="text-xs text-gray-500">Catatan Compliance</label>
        <textarea name="variants[${idx}][compliance_notes]" rows="2" class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400"></textarea></div>
        <div class="border-t border-gray-100 pt-3"><p class="text-xs font-medium text-gray-500 mb-2">Nutrition Facts</p>
        <div class="grid grid-cols-3 gap-2">${nutHtml}</div></div>
    </div>`;
    document.getElementById('variants-container').insertAdjacentHTML('beforeend', html);
}

function removeVariant(btn) {
    btn.closest('.variant-block').remove();
}

function syncIngredients(textarea, idx) {
    // Remove old hidden inputs
    document.querySelectorAll(`.ing-input-${idx}`).forEach(el => el.remove());
    const lines = textarea.value.split('\n').filter(l => l.trim());
    const container = textarea.closest('.variant-block');
    lines.forEach(line => {
        const inp = document.createElement('input');
        inp.type = 'hidden';
        inp.name = `variants[${idx}][ingredients][]`;
        inp.value = line.trim();
        inp.className = `ing-input-${idx}`;
        container.appendChild(inp);
    });
}

// Init sync for existing variants on page load
document.querySelectorAll('[name^="_ingredients_raw_"]').forEach(ta => {
    const idx = ta.name.replace('_ingredients_raw_', '');
    syncIngredients(ta, idx);
});
</script>
@endpush
