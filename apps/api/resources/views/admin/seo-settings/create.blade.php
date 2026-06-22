@extends('admin.layouts.app')
@section('title', 'Tambah SEO Setting')
@section('page-title', 'Tambah SEO Setting')
@section('content')
<form method="POST" action="{{ route('admin.seo-settings.store') }}">
    @csrf
    @include('admin.seo-settings._form')
</form>
@endsection
