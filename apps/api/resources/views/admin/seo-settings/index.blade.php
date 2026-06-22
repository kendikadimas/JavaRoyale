@extends('admin.layouts.app')
@section('title', 'SEO Settings')
@section('page-title', 'SEO Settings')
@section('header-actions')
    <a href="{{ route('admin.seo-settings.create') }}" class="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 rounded-lg font-medium">+ Tambah</a>
@endsection
@section('content')
<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Page Key</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">SEO Title</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">SEO Description</th>
                <th class="px-6 py-3"></th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
            @forelse($settings as $s)
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 font-mono text-xs text-amber-700 bg-amber-50/50">{{ $s->page_key }}</td>
                <td class="px-6 py-4 text-gray-800">{{ Str::limit($s->seo_title, 60) }}</td>
                <td class="px-6 py-4 text-gray-500 text-xs">{{ Str::limit($s->seo_description, 80) }}</td>
                <td class="px-6 py-4 text-right">
                    <a href="{{ route('admin.seo-settings.edit', $s) }}" class="text-blue-600 hover:underline text-xs mr-3">Edit</a>
                    <form method="POST" action="{{ route('admin.seo-settings.destroy', $s) }}" class="inline" onsubmit="return confirm('Hapus SEO setting ini?')">
                        @csrf @method('DELETE')
                        <button class="text-red-500 hover:underline text-xs">Hapus</button>
                    </form>
                </td>
            </tr>
            @empty
            <tr><td colspan="4" class="px-6 py-8 text-center text-gray-400">Belum ada SEO setting.</td></tr>
            @endforelse
        </tbody>
    </table>
</div>
@endsection
