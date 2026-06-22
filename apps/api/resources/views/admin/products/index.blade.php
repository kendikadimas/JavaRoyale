@extends('admin.layouts.app')
@section('title', 'Produk')
@section('page-title', 'Produk')
@section('header-actions')
    <a href="{{ route('admin.products.create') }}" class="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 rounded-lg font-medium">+ Tambah Produk</a>
@endsection
@section('content')
<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Nama</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Kategori</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Varian</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Status</th>
                <th class="px-6 py-3"></th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
            @forelse($products as $product)
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                    <p class="font-medium text-gray-800">{{ $product->name }}</p>
                    <p class="text-xs text-gray-400">{{ $product->slug }}</p>
                </td>
                <td class="px-6 py-4 text-gray-600">{{ $product->category }}</td>
                <td class="px-6 py-4 text-gray-600">{{ $product->variants_count }}</td>
                <td class="px-6 py-4">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium {{ $product->is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500' }}">
                        {{ $product->is_active ? 'Aktif' : 'Nonaktif' }}
                    </span>
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="{{ route('admin.products.edit', $product) }}" class="text-blue-600 hover:underline text-xs mr-3">Edit</a>
                    <form method="POST" action="{{ route('admin.products.destroy', $product) }}" class="inline" onsubmit="return confirm('Hapus produk ini?')">
                        @csrf @method('DELETE')
                        <button type="submit" class="text-red-500 hover:underline text-xs">Hapus</button>
                    </form>
                </td>
            </tr>
            @empty
            <tr><td colspan="5" class="px-6 py-8 text-center text-gray-400">Belum ada produk.</td></tr>
            @endforelse
        </tbody>
    </table>
    @if($products->hasPages())
    <div class="px-6 py-4 border-t border-gray-100">{{ $products->links() }}</div>
    @endif
</div>
@endsection
