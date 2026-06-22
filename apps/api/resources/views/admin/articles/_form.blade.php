@php $isEdit = isset($article) && $article->exists; @endphp

<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-700 mb-4">Konten Artikel</h3>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Judul <span class="text-red-500">*</span></label>
                <input type="text" name="title" id="article-title" value="{{ old('title', $article->title ?? '') }}"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" required>
                @error('title')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input type="text" name="slug" id="article-slug" value="{{ old('slug', $article->slug ?? '') }}"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                <p class="text-xs text-gray-400 mt-1">Dikosongkan = auto-generate dari judul.</p>
                @error('slug')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Kategori <span class="text-red-500">*</span></label>
                <input type="text" name="category" value="{{ old('category', $article->category ?? '') }}"
                    list="article-categories"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" required>
                <datalist id="article-categories">
                    <option value="health-tips">
                    <option value="export-insights">
                    <option value="recipes">
                    <option value="news">
                </datalist>
                @error('category')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">Konten <span class="text-red-500">*</span></label>
                <div id="editor" class="border border-gray-300 rounded-lg min-h-64 bg-white"></div>
                <textarea name="body" id="body-input" class="hidden">{{ old('body', $article->body ?? '') }}</textarea>
                @error('body')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-700 mb-4">SEO</h3>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                <input type="text" name="seo_title" value="{{ old('seo_title', $article->seo_title ?? '') }}"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" maxlength="255">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
                <textarea name="seo_description" rows="2" maxlength="300"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">{{ old('seo_description', $article->seo_description ?? '') }}</textarea>
            </div>
        </div>
    </div>

    <div class="space-y-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-700 mb-4">Publikasi</h3>
            <label class="flex items-center gap-2 cursor-pointer mb-4">
                <input type="checkbox" name="is_published" value="1" class="w-4 h-4 rounded text-amber-500"
                    {{ old('is_published', $article->is_published ?? false) ? 'checked' : '' }}>
                <span class="text-sm text-gray-700">Publish artikel</span>
            </label>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Publish</label>
                <input type="datetime-local" name="published_at"
                    value="{{ old('published_at', isset($article->published_at) ? $article->published_at?->format('Y-m-d\TH:i') : '') }}"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
            </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="font-semibold text-gray-700 mb-4">Featured Image</h3>
            @if($isEdit && $article->featured_image)
            <img src="{{ Storage::url($article->featured_image) }}" class="w-full h-32 object-cover rounded-lg mb-3">
            @endif
            <input type="file" name="featured_image" accept="image/*"
                class="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100">
            @error('featured_image')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 rounded-lg text-sm transition">
                {{ $isEdit ? 'Simpan Perubahan' : 'Buat Artikel' }}
            </button>
            <a href="{{ route('admin.articles.index') }}" class="block text-center text-sm text-gray-400 hover:text-gray-600 mt-2">Batal</a>
        </div>
    </div>
</div>

@push('head')
<link href="https://cdn.quilljs.com/1.3.7/quill.snow.css" rel="stylesheet">
@endpush

@push('scripts')
<script src="https://cdn.quilljs.com/1.3.7/quill.min.js"></script>
<script>
// Auto-slug
document.getElementById('article-title')?.addEventListener('input', function() {
    const slugField = document.getElementById('article-slug');
    if (!slugField.dataset.manual) {
        slugField.value = this.value.toLowerCase().replace(/[^a-z0-9\u00C0-\u024F]+/g, '-').replace(/^-|-$/g, '');
    }
});
document.getElementById('article-slug')?.addEventListener('input', function() {
    this.dataset.manual = this.value ? '1' : '';
});

const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean']
        ]
    }
});

// Init with existing content
const existingContent = document.getElementById('body-input').value;
if (existingContent) quill.root.innerHTML = existingContent;

// Sync to textarea on form submit
document.querySelector('form').addEventListener('submit', function() {
    document.getElementById('body-input').value = quill.root.innerHTML;
});
</script>
@endpush
