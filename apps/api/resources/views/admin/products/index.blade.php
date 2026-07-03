@extends('admin.layouts.app')
@section('title', 'Produk')
@section('page-title', 'Produk')
@section('header-actions')
    <a href="{{ route('admin.products.create') }}"
       class="inline-flex items-center gap-2 bg-brand-yellow hover:bg-amber-400 text-brand-black text-sm px-4 py-2 rounded-xl font-bold transition-all duration-200 shadow-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
        Tambah Produk
    </a>
@endsection
@section('content')
<div class="bg-white rounded-2xl shadow-sm border border-earth-200 overflow-hidden">
    <table class="w-full text-sm">
        <thead>
            <tr>
                <th class="text-left px-6 py-4 font-bold text-brand-yellow uppercase tracking-wider text-xs bg-earth-900">Nama</th>
                <th class="text-left px-6 py-4 font-bold text-brand-yellow uppercase tracking-wider text-xs bg-earth-900">Urutan</th>
                <th class="text-left px-6 py-4 font-bold text-brand-yellow uppercase tracking-wider text-xs bg-earth-900">Varian</th>
                <th class="text-left px-6 py-4 font-bold text-brand-yellow uppercase tracking-wider text-xs bg-earth-900">Status</th>
                <th class="px-6 py-4 bg-earth-900"></th>
            </tr>
        </thead>
        <tbody>
            @forelse($products as $product)
            <tr class="border-t border-earth-100 hover:bg-earth-50/50 transition-colors duration-150">
                <td class="px-6 py-4">
                    <p class="font-semibold text-earth-900">{{ $product->name }}</p>
                    <p class="text-xs text-gray-400 mt-0.5 font-mono">{{ $product->slug }}</p>
                </td>
                <td class="px-6 py-4 text-earth-800 font-mono text-xs">{{ $product->sort_order }}</td>
                <td class="px-6 py-4">
                    <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-earth-100 text-earth-800 text-xs font-bold">
                        {{ $product->variants_count }}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                        {{ $product->is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500' }}">
                        <span class="w-1.5 h-1.5 rounded-full {{ $product->is_active ? 'bg-green-500' : 'bg-gray-400' }}"></span>
                        {{ $product->is_active ? 'Aktif' : 'Nonaktif' }}
                    </span>
                </td>
                <td class="px-6 py-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                        <a href="{{ route('admin.products.edit', $product) }}"
                           class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-earth-100 hover:bg-earth-200 text-earth-800 text-xs font-semibold transition-colors">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                            Edit
                        </a>
                        <form method="POST" action="{{ route('admin.products.destroy', $product) }}" class="inline" onsubmit="return confirm('Hapus produk ini?')">
                            @csrf @method('DELETE')
                            <button type="submit"
                                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                Hapus
                            </button>
                        </form>
                    </div>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="5" class="px-6 py-16 text-center">
                    <div class="flex flex-col items-center gap-3 text-gray-400">
                        <svg class="w-10 h-10 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                        <p class="text-sm">Belum ada produk. <a href="{{ route('admin.products.create') }}" class="text-amber-600 hover:underline">Tambah sekarang</a>.</p>
                    </div>
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>
    @if($products->hasPages())
    <div class="px-6 py-4 border-t border-earth-100 bg-earth-50/30">{{ $products->links() }}</div>
    @endif
</div>
@endsection

