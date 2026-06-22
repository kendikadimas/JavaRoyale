@extends('admin.layouts.app')
@section('title', 'Artikel')
@section('page-title', 'Artikel')
@section('header-actions')
    <a href="{{ route('admin.articles.create') }}" class="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 rounded-lg font-medium">+ Tambah Artikel</a>
@endsection
@section('content')
<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Judul</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Kategori</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Status</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Tanggal</th>
                <th class="px-6 py-3"></th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
            @forelse($articles as $article)
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                    <p class="font-medium text-gray-800">{{ $article->title }}</p>
                    <p class="text-xs text-gray-400">{{ $article->slug }}</p>
                </td>
                <td class="px-6 py-4 text-gray-600">{{ $article->category }}</td>
                <td class="px-6 py-4">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium {{ $article->is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700' }}">
                        {{ $article->is_published ? 'Published' : 'Draft' }}
                    </span>
                </td>
                <td class="px-6 py-4 text-gray-500 text-xs">{{ $article->published_at?->format('d M Y') ?? '-' }}</td>
                <td class="px-6 py-4 text-right">
                    <a href="{{ route('admin.articles.edit', $article) }}" class="text-blue-600 hover:underline text-xs mr-3">Edit</a>
                    <form method="POST" action="{{ route('admin.articles.destroy', $article) }}" class="inline" onsubmit="return confirm('Hapus artikel ini?')">
                        @csrf @method('DELETE')
                        <button type="submit" class="text-red-500 hover:underline text-xs">Hapus</button>
                    </form>
                </td>
            </tr>
            @empty
            <tr><td colspan="5" class="px-6 py-8 text-center text-gray-400">Belum ada artikel.</td></tr>
            @endforelse
        </tbody>
    </table>
    @if($articles->hasPages())
    <div class="px-6 py-4 border-t border-gray-100">{{ $articles->links() }}</div>
    @endif
</div>
@endsection
