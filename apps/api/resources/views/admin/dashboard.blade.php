@extends('admin.layouts.app')

@section('title', 'Dashboard')
@section('page-title', 'Dashboard')

@section('header-actions')
<a href="{{ config('app.url') }}" target="_blank"
   class="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition">
    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
    Lihat Website
</a>
@endsection

@section('content')

{{-- Greeting --}}
<div class="mb-6">
    <h2 class="text-xl font-black text-gray-800 tracking-tight">
        Selamat datang, {{ Auth::user()->name }} 👋
    </h2>
    <p class="text-sm text-gray-400 mt-0.5">{{ now()->translatedFormat('l, d F Y') }}</p>
</div>

{{-- Stat Cards --}}
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

    <a href="{{ route('admin.products.index') }}"
       class="group bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-amber-200 transition-all duration-150">
        <div class="flex items-center justify-between mb-3">
            <div class="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V7"/></svg>
            </div>
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-600">
                {{ $stats['products_active'] }} aktif
            </span>
        </div>
        <p class="text-2xl font-black text-gray-800">{{ $stats['products'] }}</p>
        <p class="text-xs text-gray-400 mt-0.5">Total Produk</p>
        <p class="text-xs text-amber-500 mt-2 group-hover:underline">Kelola produk &rarr;</p>
    </a>

    <a href="{{ route('admin.articles.index') }}"
       class="group bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-blue-200 transition-all duration-150">
        <div class="flex items-center justify-between mb-3">
            <div class="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6"/></svg>
            </div>
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                {{ $stats['articles_published'] }} tayang
            </span>
        </div>
        <p class="text-2xl font-black text-gray-800">{{ $stats['articles'] }}</p>
        <p class="text-xs text-gray-400 mt-0.5">Total Artikel</p>
        <p class="text-xs text-blue-500 mt-2 group-hover:underline">Kelola artikel &rarr;</p>
    </a>

    <a href="{{ route('admin.inquiries.index') }}"
       class="group bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-purple-200 transition-all duration-150">
        <div class="flex items-center justify-between mb-3">
            <div class="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            @if($stats['inquiries_new'] > 0)
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-500 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block"></span>
                {{ $stats['inquiries_new'] }} baru
            </span>
            @else
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-50 text-gray-400">
                semua dibaca
            </span>
            @endif
        </div>
        <p class="text-2xl font-black text-gray-800">{{ $stats['inquiries_total'] }}</p>
        <p class="text-xs text-gray-400 mt-0.5">Total Inquiry</p>
        <p class="text-xs text-purple-500 mt-2 group-hover:underline">Lihat inquiry &rarr;</p>
    </a>

    <div class="bg-earth-900 rounded-xl border border-white/5 shadow-sm p-5 flex flex-col justify-between">
        <div>
            <p class="text-xs font-semibold text-brand-yellow mb-1">Aksi Cepat</p>
            <p class="text-[11px] text-gray-400">Tambah konten baru sekarang</p>
        </div>
        <div class="flex flex-col gap-2 mt-4">
            <a href="{{ route('admin.products.create') }}"
               class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-yellow text-earth-900 text-xs font-bold hover:bg-yellow-300 transition">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                Produk Baru
            </a>
            <a href="{{ route('admin.articles.create') }}"
               class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/15 transition">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
                Artikel Baru
            </a>
        </div>
    </div>

</div>

{{-- Recent Data --}}
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

    {{-- Produk Terbaru --}}
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <p class="text-sm font-bold text-gray-700">Produk</p>
            <a href="{{ route('admin.products.index') }}" class="text-xs text-amber-500 hover:underline">Lihat semua</a>
        </div>
        <ul class="divide-y divide-gray-50">
            @if($recent_products->isEmpty())
            <li class="px-5 py-4 text-xs text-gray-400">Belum ada produk.</li>
            @else
            @foreach($recent_products as $product)
            <li class="flex items-center justify-between px-5 py-3 hover:bg-gray-50/60 transition">
                <div class="flex items-center gap-2 min-w-0">
                    <span class="w-1.5 h-1.5 rounded-full flex-shrink-0 {{ $product->is_active ? 'bg-green-400' : 'bg-gray-300' }}"></span>
                    <span class="text-xs text-gray-700 font-medium truncate">{{ $product->name }}</span>
                </div>
                <a href="{{ route('admin.products.edit', $product) }}"
                   class="text-[10px] text-gray-400 hover:text-amber-500 flex-shrink-0 ml-2 transition">Edit</a>
            </li>
            @endforeach
            @endif
        </ul>
    </div>

    {{-- Artikel Terbaru --}}
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <p class="text-sm font-bold text-gray-700">Artikel Terbaru</p>
            <a href="{{ route('admin.articles.index') }}" class="text-xs text-blue-500 hover:underline">Lihat semua</a>
        </div>
        <ul class="divide-y divide-gray-50">
            @if($recent_articles->isEmpty())
            <li class="px-5 py-4 text-xs text-gray-400">Belum ada artikel.</li>
            @else
            @foreach($recent_articles as $article)
            <li class="flex items-center justify-between px-5 py-3 hover:bg-gray-50/60 transition">
                <div class="flex items-center gap-2 min-w-0">
                    <span class="w-1.5 h-1.5 rounded-full flex-shrink-0 {{ $article->is_published ? 'bg-blue-400' : 'bg-gray-300' }}"></span>
                    <span class="text-xs text-gray-700 font-medium truncate">{{ $article->title }}</span>
                </div>
                <a href="{{ route('admin.articles.edit', $article) }}"
                   class="text-[10px] text-gray-400 hover:text-blue-500 flex-shrink-0 ml-2 transition">Edit</a>
            </li>
            @endforeach
            @endif
        </ul>
    </div>

    {{-- Inquiry Terbaru --}}
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <p class="text-sm font-bold text-gray-700">Inquiry Terbaru</p>
            <a href="{{ route('admin.inquiries.index') }}" class="text-xs text-purple-500 hover:underline">Lihat semua</a>
        </div>
        <ul class="divide-y divide-gray-50">
            @if($recent_inquiries->isEmpty())
            <li class="px-5 py-4 text-xs text-gray-400">Belum ada inquiry.</li>
            @else
            @foreach($recent_inquiries as $inquiry)
            <li class="flex items-center justify-between px-5 py-3 hover:bg-gray-50/60 transition">
                <div class="min-w-0">
                    <p class="text-xs text-gray-700 font-medium truncate">{{ $inquiry->name }}</p>
                    <p class="text-[10px] text-gray-400 truncate">{{ $inquiry->company ?: $inquiry->type }}</p>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0 ml-2">
                    @if($inquiry->status === 'new')
                    <span class="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block"></span>
                    @endif
                    <a href="{{ route('admin.inquiries.show', $inquiry) }}"
                       class="text-[10px] text-gray-400 hover:text-purple-500 transition">Lihat</a>
                </div>
            </li>
            @endforeach
            @endif
        </ul>
    </div>

</div>

@endsection
