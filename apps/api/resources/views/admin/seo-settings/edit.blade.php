@extends('admin.layouts.app')
@section('title', 'Edit SEO Setting')
@section('page-title', 'Edit SEO Setting')
@section('content')
<form method="POST" action="{{ route('admin.seo-settings.update', $seoSetting) }}">
    @csrf @method('PUT')
    @include('admin.seo-settings._form')
</form>
@endsection
