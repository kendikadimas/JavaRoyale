@extends('admin.layouts.app')
@section('title', 'Edit Produk')
@section('page-title', 'Edit: ' . $product->name)
@section('content')
<form method="POST" action="{{ route('admin.products.update', $product) }}" enctype="multipart/form-data">
    @csrf @method('PUT')
    @include('admin.products._form')
</form>
@endsection
