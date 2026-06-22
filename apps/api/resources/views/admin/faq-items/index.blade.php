@extends('admin.layouts.app')
@section('title', 'FAQ Items')
@section('page-title', 'FAQ Items')
@section('header-actions')
    <a href="{{ route('admin.faq-items.create') }}" class="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 rounded-lg font-medium">+ Tambah FAQ</a>
@endsection
@section('content')
<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
                <th class="text-left px-6 py-3 font-medium text-gray-500 w-12">Order</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Pertanyaan</th>
                <th class="px-6 py-3"></th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
            @forelse($items as $item)
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 text-gray-400 text-center">{{ $item->order }}</td>
                <td class="px-6 py-4 text-gray-800">{{ $item->question }}</td>
                <td class="px-6 py-4 text-right">
                    <a href="{{ route('admin.faq-items.edit', $item) }}" class="text-blue-600 hover:underline text-xs mr-3">Edit</a>
                    <form method="POST" action="{{ route('admin.faq-items.destroy', $item) }}" class="inline" onsubmit="return confirm('Hapus FAQ ini?')">
                        @csrf @method('DELETE')
                        <button class="text-red-500 hover:underline text-xs">Hapus</button>
                    </form>
                </td>
            </tr>
            @empty
            <tr><td colspan="3" class="px-6 py-8 text-center text-gray-400">Belum ada FAQ.</td></tr>
            @endforelse
        </tbody>
    </table>
</div>
@endsection
