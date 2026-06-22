@extends('admin.layouts.app')
@section('title', 'Edit Artikel')
@section('page-title', 'Edit: ' . $article->title)
@section('content')
<form method="POST" action="{{ route('admin.articles.update', $article) }}" enctype="multipart/form-data">
    @csrf @method('PUT')
    @include('admin.articles._form')
</form>
@endsection
