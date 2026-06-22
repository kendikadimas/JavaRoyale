@extends('admin.layouts.app')

@section('title', 'Dashboard')
@section('page-title', 'Dashboard')

@section('content')
<div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <p class="text-sm text-gray-500">Total Produk</p>
        <p class="text-3xl font-bold text-gray-800 mt-1">{{ $stats['products'] }}</p>
        <a href="{{ route('admin.products.index') }}" class="text-xs text-amber-600 hover:underline mt-2 inline-block">Lihat produk &rarr;</a>
    </div>
    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <p class="text-sm text-gray-500">Total Artikel</p>
        <p class="text-3xl font-bold text-gray-800 mt-1">{{ $stats['articles'] }}</p>
        <a href="{{ route('admin.articles.index') }}" class="text-xs text-amber-600 hover:underline mt-2 inline-block">Lihat artikel &rarr;</a>
    </div>
    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <p class="text-sm text-gray-500">Inquiry Baru</p>
        <p class="text-3xl font-bold text-red-600 mt-1">{{ $stats['inquiries'] }}</p>
        <a href="{{ route('admin.inquiries.index') }}" class="text-xs text-amber-600 hover:underline mt-2 inline-block">Lihat inquiry &rarr;</a>
    </div>
</div>
<div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <p class="text-sm text-gray-500">Selamat datang di admin panel <strong>Java Royale Nusantara</strong>. Gunakan sidebar untuk mengelola konten website.</p>
</div>
@endsection
