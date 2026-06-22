@extends('admin.layouts.app')
@section('title', 'Tambah Artikel')
@section('page-title', 'Tambah Artikel')
@section('content')
<form method="POST" action="{{ route('admin.articles.store') }}" enctype="multipart/form-data">
    @csrf
    @include('admin.articles._form')
</form>
@endsection
