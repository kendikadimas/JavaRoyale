@extends('admin.layouts.app')
@section('title', 'Edit Buyer Category')
@section('page-title', 'Edit Buyer Category')
@section('content')
<form method="POST" action="{{ route('admin.buyer-categories.update', $buyerCategory) }}">
    @csrf @method('PUT')
    @include('admin.buyer-categories._form')
</form>
@endsection
