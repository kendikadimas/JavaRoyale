@extends('admin.layouts.app')
@section('title', 'Edit FAQ')
@section('page-title', 'Edit FAQ')
@section('content')
<form method="POST" action="{{ route('admin.faq-items.update', $faqItem) }}">
    @csrf @method('PUT')
    @include('admin.faq-items._form')
</form>
@endsection
