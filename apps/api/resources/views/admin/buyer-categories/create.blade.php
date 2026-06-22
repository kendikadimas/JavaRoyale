@extends('admin.layouts.app')
@section('title', 'Tambah Buyer Category')
@section('page-title', 'Tambah Buyer Category')
@section('content')
<form method="POST" action="{{ route('admin.buyer-categories.store') }}">
    @csrf
    @include('admin.buyer-categories._form')
</form>
@endsection
