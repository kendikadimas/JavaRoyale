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

        {{-- Ingredients --}}
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-700 mb-3">Ingredients</h3>
            <p class="text-xs text-gray-400 mb-3">Satu bahan per baris. Akan ditampilkan sebagai checklist di frontend.</p>
            @php $existingIngredients = old('_ingredients_raw', implode("\n", $product->ingredients ?? [])); @endphp
            <textarea id="ingredients-raw" name="_ingredients_raw" rows="6"
                onchange="syncProductIngredients(this)" oninput="syncProductIngredients(this)"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono"
                placeholder="Kunyit&#10;Asam Jawa&#10;Gula Aren&#10;Jahe">{{ $existingIngredients }}</textarea>
            <div id="ingredients-hidden">
                @foreach(($product->ingredients ?? []) as $ing)
                <input type="hidden" name="ingredients[]" value="{{ $ing }}" class="ing-product-input">
                @endforeach
            </div>
        </div>

        {{-- Nutrition Facts --}}
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-700 mb-3">Nutrition Facts <span class="text-xs font-normal text-gray-400">(per sajian)</span></h3>
            @php
                $nutrition = old('nutrition', $isEdit && $product->nutritionFact ? [
                    'energy_kcal' => $product->nutritionFact->energy_kcal,
                    'protein_g'   => $product->nutritionFact->protein_g,
                    'fat_g'       => $product->nutritionFact->fat_g,
                    'carbs_g'     => $product->nutritionFact->carbs_g,
                    'sugar_g'     => $product->nutritionFact->sugar_g,
                    'sodium_mg'   => $product->nutritionFact->sodium_mg,
                ] : []);
            @endphp
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                @foreach(['energy_kcal'=>'Energi (kcal)','protein_g'=>'Protein (g)','fat_g'=>'Lemak (g)','carbs_g'=>'Karbohidrat (g)','sugar_g'=>'Gula (g)','sodium_mg'=>'Natrium (mg)'] as $field => $label)
                <div>
                    <label class="block text-xs text-gray-500 mb-1">{{ $label }}</label>
                    <input type="number" step="0.01" min="0" name="nutrition[{{ $field }}]"
                        value="{{ $nutrition[$field] ?? '' }}"
                        class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                </div>
                @endforeach
            </div>
        </div>

        {{-- Variants (opsional) --}}
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-gray-700">Varian <span class="text-xs font-normal text-gray-400">(opsional)</span></h3>
                <button type="button" onclick="addVariant()" class="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100">+ Tambah Varian</button>
            </div>
            <p class="text-xs text-gray-400 mb-4">Isi jika produk punya beberapa varian ukuran/rasa. Kosongkan jika tidak ada.</p>

            <div id="variants-container" class="space-y-4">
                @php
                    $variantObjects = $isEdit ? $product->variants->keyBy('id') : collect();
                    $variants = old('variants', $isEdit
                        ? $product->variants->map(fn($v) => [
                            'id'               => $v->id,
                            'variant_name'     => $v->variant_name,
                            'net_weight'       => $v->net_weight,
                            'compliance_notes' => $v->compliance_notes,
                        ])->toArray()
                        : []
                    );
                @endphp

                @foreach($variants as $vi => $variant)
                @php $variantObj = !empty($variant['id']) ? $variantObjects->get($variant['id']) : null; @endphp
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
                                placeholder="mis. 100g, 200g, Original, Pedas"
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
                        <label class="text-xs text-gray-500">Catatan Compliance</label>
                        <textarea name="variants[{{ $vi }}][compliance_notes]" rows="2"
                            placeholder="mis. Halal MUI, BPOM RI..."
                            class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400">{{ $variant['compliance_notes'] ?? '' }}</textarea>
                    </div>

                    {{-- Variant Images (opsional) --}}
                    <div class="border-t border-gray-100 pt-3">
                        <p class="text-xs font-medium text-gray-500 mb-2">Gambar Varian <span class="font-normal text-gray-400">(opsional)</span></p>
                        @if($isEdit && $variantObj && $variantObj->images->count())
                        <div class="grid grid-cols-3 gap-2 mb-2">
                            @foreach($variantObj->images as $img)
                            <div class="relative group image-block">
                                <img src="{{ Storage::url($img->image_path) }}" alt="{{ $img->alt_text }}" class="w-full h-20 object-cover rounded-lg group-hover:opacity-80 transition">
                                <button type="button" onclick="removeImage(this, {{ $img->id }}, 'variants[{{ $vi }}][delete_images][]')" class="absolute top-1 right-1 bg-white/90 hover:bg-red-500 hover:text-white text-gray-700 font-medium text-xs px-2 py-1 rounded shadow-sm border border-gray-200 transition-colors">
                                    Hapus
                                </button>
                            </div>
                            @endforeach
                        </div>
                        @endif
                        <label class="block">
                            <span class="text-xs text-gray-400 block mb-1">Upload gambar varian baru</span>
                            <input type="file" name="variants[{{ $vi }}][images][]" multiple accept="image/*"
                                class="w-full text-sm text-gray-500 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                        </label>
                    </div>
                </div>
                @endforeach

                @if(count($variants) === 0)
                <p class="text-xs text-gray-400 text-center py-4 border border-dashed border-gray-200 rounded-lg">Belum ada varian. Klik "+ Tambah Varian" jika dibutuhkan.</p>
                @endif
            </div>
        </div>
    </div>

    {{-- Right: Images + Status + Submit --}}
    <div class="space-y-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-700 mb-4">Status & Urutan</h3>
            <label class="flex items-center gap-2 cursor-pointer mb-4">
                <input type="checkbox" name="is_active" value="1" class="w-4 h-4 rounded text-amber-500"
                    {{ old('is_active', $product->is_active ?? true) ? 'checked' : '' }}>
                <span class="text-sm text-gray-700">Produk aktif</span>
            </label>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Urutan tampil <span class="text-gray-400 font-normal">(angka kecil = tampil duluan)</span></label>
                <input type="number" name="sort_order" min="0" value="{{ old('sort_order', $product->sort_order ?? 0) }}"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-700 mb-4">Gambar Produk</h3>

            @if($isEdit && $product->images->count())
            <div class="grid grid-cols-2 gap-2 mb-4">
                @foreach($product->images as $img)
                <div class="relative group image-block">
                    <img src="{{ Storage::url($img->image_path) }}" alt="{{ $img->alt_text }}" class="w-full h-24 object-cover rounded-lg group-hover:opacity-80 transition">
                    <button type="button" onclick="removeImage(this, {{ $img->id }}, 'delete_images[]')" class="absolute top-1 right-1 bg-white/90 hover:bg-red-500 hover:text-white text-gray-700 font-medium text-xs px-2 py-1 rounded shadow-sm border border-gray-200 transition-colors">
                        Hapus
                    </button>
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
            <a href="{{ route('admin.products.index') }}" class="block text-center text-sm text-gray-400 hover:text-gray-600 mt-3">Batal</a>
            
            @if($isEdit)
            <div class="mt-5 pt-4 border-t border-gray-100">
                <button type="button" onclick="if(confirm('Apakah Anda yakin ingin menghapus produk ini secara permanen?')) document.getElementById('form-delete-product').submit();" class="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2.5 rounded-lg text-sm transition">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    Hapus Produk Ini
                </button>
            </div>
            @endif
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

// Sync product-level ingredients
function syncProductIngredients(textarea) {
    document.querySelectorAll('.ing-product-input').forEach(el => el.remove());
    const container = document.getElementById('ingredients-hidden');
    const lines = textarea.value.split('\n').filter(l => l.trim());
    lines.forEach(line => {
        const inp = document.createElement('input');
        inp.type = 'hidden';
        inp.name = 'ingredients[]';
        inp.value = line.trim();
        inp.className = 'ing-product-input';
        container.appendChild(inp);
    });
}

// Init sync on page load
const ingRaw = document.getElementById('ingredients-raw');
if (ingRaw && ingRaw.value) syncProductIngredients(ingRaw);

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
    // Hapus placeholder "belum ada varian" jika ada
    const placeholder = document.querySelector('#variants-container .border-dashed');
    if (placeholder) placeholder.remove();

    const html = `
    <div class="variant-block border border-gray-200 rounded-lg p-4" data-index="${idx}">
        <div class="flex items-center justify-between mb-3">
            <p class="text-sm font-medium text-gray-600">Varian #${idx + 1}</p>
            <button type="button" onclick="removeVariant(this)" class="text-xs text-red-400 hover:text-red-600">Hapus</button>
        </div>
        <input type="hidden" name="variants[${idx}][id]" value="">
        <div class="grid grid-cols-2 gap-3 mb-3">
            <div><label class="text-xs text-gray-500">Nama Varian *</label>
            <input type="text" name="variants[${idx}][variant_name]" placeholder="mis. 100g, Original"
                class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400" required></div>
            <div><label class="text-xs text-gray-500">Berat Bersih</label>
            <input type="text" name="variants[${idx}][net_weight]" placeholder="mis. 100 g"
                class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400"></div>
        </div>
        <div class="mb-3"><label class="text-xs text-gray-500">Catatan Compliance</label>
        <textarea name="variants[${idx}][compliance_notes]" rows="2" placeholder="mis. Halal MUI, BPOM RI..."
            class="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-amber-400"></textarea></div>
        <div class="border-t border-gray-100 pt-3">
            <p class="text-xs font-medium text-gray-500 mb-2">Gambar Varian <span class="font-normal text-gray-400">(opsional)</span></p>
            <label class="block">
                <span class="text-xs text-gray-400 block mb-1">Upload gambar varian</span>
                <input type="file" name="variants[${idx}][images][]" multiple accept="image/*"
                    class="w-full text-sm text-gray-500 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
            </label>
        </div>
    </div>`;
    document.getElementById('variants-container').insertAdjacentHTML('beforeend', html);
}

    function removeVariant(btn) {
        if (!confirm('Hapus varian ini?')) return;
        btn.closest('.variant-block').remove();
        
        // Tampilkan placeholder jika kosong
        const container = document.getElementById('variants-container');
        if (container.querySelectorAll('.variant-block').length === 0) {
            container.innerHTML = '<p class="text-xs text-gray-400 text-center py-4 border border-dashed border-gray-200 rounded-lg">Belum ada varian. Klik "+ Tambah Varian" jika dibutuhkan.</p>';
        }
    }

    function removeImage(btn, imgId, inputName) {
        if (!confirm('Hapus gambar ini?')) return;
        
        // Buat input tersembunyi agar ID gambar dikirim ke server untuk dihapus
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = inputName;
        hiddenInput.value = imgId;
        
        // Tambahkan ke form utama
        btn.closest('form').appendChild(hiddenInput);
        
        // Hapus blok gambar dari tampilan
        btn.closest('.image-block').remove();
    }
</script>
@endpush
