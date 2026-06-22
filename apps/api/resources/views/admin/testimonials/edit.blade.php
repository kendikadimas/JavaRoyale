@extends('admin.layouts.app')
@section('title', 'Edit Testimonial')
@section('page-title', 'Edit Testimonial')
@section('content')
<form method="POST" action="{{ route('admin.testimonials.update', $testimonial) }}" enctype="multipart/form-data">
    @csrf @method('PUT')
    @include('admin.testimonials._form')
</form>
@endsection
