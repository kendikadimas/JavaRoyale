@extends('admin.layouts.app')
@section('title', 'Tambah Social Embed')
@section('page-title', 'Tambah Social Embed')
@section('content')
<form method="POST" action="{{ route('admin.social-embed-settings.store') }}">
    @csrf
    @include('admin.social-embed-settings._form')
</form>
@endsection
