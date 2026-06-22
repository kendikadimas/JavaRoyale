@extends('admin.layouts.app')
@section('title', 'Edit Social Embed')
@section('page-title', 'Edit Social Embed')
@section('content')
<form method="POST" action="{{ route('admin.social-embed-settings.update', $socialEmbedSetting) }}">
    @csrf @method('PUT')
    @include('admin.social-embed-settings._form')
</form>
@endsection
