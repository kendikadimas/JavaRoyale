@extends('admin.layouts.app')
@section('title', 'Buyer Categories')
@section('page-title', 'Buyer Categories')
@section('header-actions')
    <a href="{{ route('admin.buyer-categories.create') }}" class="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 rounded-lg font-medium">+ Tambah Category</a>
@endsection
@section('content')
<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="overflow-x-auto">
    <table class="w-full text-sm min-w-[480px]">
        <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
                <th class="text-left px-6 py-3 font-medium text-gray-500 w-12">Order</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Icon</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Label</th>
                <th class="px-6 py-3"></th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
            @forelse($categories as $cat)
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 text-gray-400 text-center">{{ $cat->order }}</td>
                <td class="px-6 py-4 text-gray-600 font-mono text-xs">{{ $cat->icon }}</td>
                <td class="px-6 py-4 text-gray-800">{{ $cat->label }}</td>
                <td class="px-6 py-4 text-right">
                    <a href="{{ route('admin.buyer-categories.edit', $cat) }}" class="text-blue-600 hover:underline text-xs mr-3">Edit</a>
                    <form method="POST" action="{{ route('admin.buyer-categories.destroy', $cat) }}" class="inline" onsubmit="return confirm('Hapus category ini?')">
                        @csrf @method('DELETE')
                        <button class="text-red-500 hover:underline text-xs">Hapus</button>
                    </form>
                </td>
            </tr>
            @empty
            <tr><td colspan="4" class="px-6 py-8 text-center text-gray-400">Belum ada buyer category.</td></tr>
            @endforelse
        </tbody>
    </table>
    </div>
</div>
@endsection
