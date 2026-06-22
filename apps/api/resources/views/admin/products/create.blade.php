@extends('admin.layouts.app')
@section('title', 'Tambah Produk')
@section('page-title', 'Tambah Produk')
@section('content')
<form method="POST" action="{{ route('admin.products.store') }}" enctype="multipart/form-data">
    @csrf
    @include('admin.products._form')
</form>
@endsection
