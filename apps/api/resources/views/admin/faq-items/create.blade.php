@extends('admin.layouts.app')
@section('title', 'Tambah FAQ')
@section('page-title', 'Tambah FAQ')
@section('content')
<form method="POST" action="{{ route('admin.faq-items.store') }}">
    @csrf
    @include('admin.faq-items._form')
</form>
@endsection
