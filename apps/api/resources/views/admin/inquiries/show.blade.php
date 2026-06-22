@extends('admin.layouts.app')
@section('title', 'Detail Inquiry')
@section('page-title', 'Detail Inquiry')
@section('content')
<div class="max-w-2xl space-y-6">
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <dl class="space-y-3 text-sm">
            <div class="grid grid-cols-3">
                <dt class="text-gray-500 font-medium">Nama</dt>
                <dd class="col-span-2 text-gray-800">{{ $inquiry->name }}</dd>
            </div>
            <div class="grid grid-cols-3">
                <dt class="text-gray-500 font-medium">Email</dt>
                <dd class="col-span-2 text-gray-800">{{ $inquiry->email }}</dd>
            </div>
            @if($inquiry->company)
            <div class="grid grid-cols-3">
                <dt class="text-gray-500 font-medium">Perusahaan</dt>
                <dd class="col-span-2 text-gray-800">{{ $inquiry->company }}</dd>
            </div>
            @endif
            <div class="grid grid-cols-3">
                <dt class="text-gray-500 font-medium">Tipe</dt>
                <dd class="col-span-2 text-gray-800">{{ str_replace('_', ' ', $inquiry->type) }}</dd>
            </div>
            <div class="grid grid-cols-3">
                <dt class="text-gray-500 font-medium">Tanggal</dt>
                <dd class="col-span-2 text-gray-500">{{ $inquiry->created_at->format('d M Y H:i') }}</dd>
            </div>
            <div class="grid grid-cols-3">
                <dt class="text-gray-500 font-medium">Pesan</dt>
                <dd class="col-span-2 text-gray-800 whitespace-pre-wrap">{{ $inquiry->message }}</dd>
            </div>
        </dl>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-semibold text-gray-700 mb-4">Update Status</h3>
        <form method="POST" action="{{ route('admin.inquiries.update', $inquiry) }}" class="flex items-center gap-3">
            @csrf @method('PATCH')
            <select name="status" class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400">
                @foreach(['new'=>'New','in_progress'=>'In Progress','closed'=>'Closed'] as $val => $label)
                <option value="{{ $val }}" {{ $inquiry->status === $val ? 'selected' : '' }}>{{ $label }}</option>
                @endforeach
            </select>
            <button type="submit" class="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 rounded-lg">Simpan</button>
            <a href="{{ route('admin.inquiries.index') }}" class="text-sm text-gray-400 hover:text-gray-600">&larr; Kembali</a>
        </form>
    </div>
</div>
@endsection
