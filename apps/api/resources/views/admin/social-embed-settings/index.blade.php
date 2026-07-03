@extends('admin.layouts.app')
@section('title', 'Social Embed Settings')
@section('page-title', 'Social Embed Settings')
@section('header-actions')
    <a href="{{ route('admin.social-embed-settings.create') }}" class="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 rounded-lg font-medium">+ Tambah</a>
@endsection
@section('content')
<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="overflow-x-auto">
    <table class="w-full text-sm min-w-[480px]">
        <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Platform</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Link URL</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Status</th>
                <th class="px-6 py-3"></th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
            @forelse($settings as $s)
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 font-medium text-gray-800 capitalize">{{ $s->platform }}</td>
                <td class="px-6 py-4 text-gray-500 text-xs">{{ $s->link_url ?? '-' }}</td>
                <td class="px-6 py-4">
                    <span class="inline-flex px-2 py-0.5 rounded-full text-xs font-medium {{ $s->is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500' }}">
                        {{ $s->is_active ? 'Aktif' : 'Nonaktif' }}
                    </span>
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="{{ route('admin.social-embed-settings.edit', $s) }}" class="text-blue-600 hover:underline text-xs mr-3">Edit</a>
                    <form method="POST" action="{{ route('admin.social-embed-settings.destroy', $s) }}" class="inline" onsubmit="return confirm('Hapus?')">
                        @csrf @method('DELETE')
                        <button class="text-red-500 hover:underline text-xs">Hapus</button>
                    </form>
                </td>
            </tr>
            @empty
            <tr><td colspan="4" class="px-6 py-8 text-center text-gray-400">Belum ada social embed.</td></tr>
            @endforelse
        </tbody>
    </table>
    </div>
</div>
@endsection
