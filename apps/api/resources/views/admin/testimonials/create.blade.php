@extends('admin.layouts.app')
@section('title', 'Tambah Testimonial')
@section('page-title', 'Tambah Testimonial')
@section('content')
<form method="POST" action="{{ route('admin.testimonials.store') }}" enctype="multipart/form-data">
    @csrf
    @include('admin.testimonials._form')
</form>
@endsection
