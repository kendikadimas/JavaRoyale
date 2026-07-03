<?php

namespace App\Http\Controllers\Admin;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::latest()->paginate(15);
        return view('admin.articles.index', compact('articles'));
    }

    public function create()
    {
        return view('admin.articles.create');
    }

    public function store(Request $request)
    {
        // Debug: log semua info request
        \Log::info('Article store - request data', [
            'has_file' => $request->hasFile('featured_image'),
            'all_files' => array_keys($request->allFiles()),
            'content_type' => $request->header('Content-Type'),
            'post_max_size' => ini_get('post_max_size'),
            'upload_max_filesize' => ini_get('upload_max_filesize'),
            'body_length' => strlen($request->input('body', '')),
        ]);

        if ($request->hasFile('featured_image')) {
            $file = $request->file('featured_image');
            \Log::info('Article store - file info', [
                'original_name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'mime' => $file->getMimeType(),
                'error' => $file->getError(),
                'error_message' => $file->getErrorMessage(),
                'is_valid' => $file->isValid(),
            ]);
        } else {
            \Log::warning('Article store - no file uploaded', [
                'php_files' => $_FILES,
            ]);
        }

        $data = $request->validate([
            'title'           => 'required|string|max:255',
            'slug'            => 'nullable|string|max:255|unique:articles,slug',
            'category'        => 'required|string|max:100',
            'body'            => 'required|string',
            'featured_image'  => 'nullable|image|max:5120',
            'is_published'    => 'boolean',
            'published_at'    => 'nullable|date',
        ]);

        $data['slug']         = $data['slug'] ?: Str::slug($data['title']);
        $data['is_published'] = $request->boolean('is_published');

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('articles', 'public');
        }

        if ($data['is_published'] && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        Article::create($data);

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil dibuat.');
    }

    public function edit(Article $article)
    {
        return view('admin.articles.edit', compact('article'));
    }

    public function update(Request $request, Article $article)
    {
        $data = $request->validate([
            'title'           => 'required|string|max:255',
            'slug'            => 'nullable|string|max:255|unique:articles,slug,' . $article->id,
            'category'        => 'required|string|max:100',
            'body'            => 'required|string',
            'featured_image'  => 'nullable|image|max:5120',
            'is_published'    => 'boolean',
            'published_at'    => 'nullable|date',
        ]);

        $data['slug']         = $data['slug'] ?: Str::slug($data['title']);
        $data['is_published'] = $request->boolean('is_published');

        if ($request->hasFile('featured_image')) {
            if ($article->featured_image) {
                Storage::disk('public')->delete($article->featured_image);
            }
            $data['featured_image'] = $request->file('featured_image')->store('articles', 'public');
        }

        if ($data['is_published'] && empty($data['published_at']) && !$article->published_at) {
            $data['published_at'] = now();
        }

        $article->update($data);

        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil diperbarui.');
    }

    public function destroy(Article $article)
    {
        if ($article->featured_image) {
            Storage::disk('public')->delete($article->featured_image);
        }
        $article->delete();
        return redirect()->route('admin.articles.index')->with('success', 'Artikel berhasil dihapus.');
    }
}
