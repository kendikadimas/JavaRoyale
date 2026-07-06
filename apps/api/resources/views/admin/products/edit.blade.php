@extends('admin.layouts.app')
@section('title', 'Edit Produk')
@section('page-title', 'Edit: ' . $product->name)
@section('content')
<form method="POST" action="{{ route('admin.products.update', $product) }}" enctype="multipart/form-data">
    @csrf @method('PUT')
    @include('admin.products._form')
</form>

@if(isset($product) && $product->exists)
<form id="form-delete-product" method="POST" action="{{ route('admin.products.destroy', $product) }}" class="hidden">
    @csrf @method('DELETE')
</form>
@endif
@endsection
