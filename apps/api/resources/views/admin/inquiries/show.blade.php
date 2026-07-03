@extends('admin.layouts.app')
@section('title', 'Detail Inquiry')
@section('page-title', 'Detail Inquiry')
@section('content')
@php
    $statusMap = [
        'new'         => ['bg-red-100 text-red-700', 'bg-red-500'],
        'in_progress' => ['bg-amber-100 text-amber-700', 'bg-amber-400'],
        'closed'      => ['bg-gray-100 text-gray-500', 'bg-gray-400'],
    ];
    [$cls, $dot] = $statusMap[$inquiry->status] ?? ['bg-gray-100 text-gray-500', 'bg-gray-400'];
@endphp
<div class="max-w-2xl space-y-5">

    {{-- Header card --}}
    <div class="bg-white rounded-2xl border border-earth-200 shadow-sm overflow-hidden">
        <div class="bg-earth-900 px-6 py-4 flex items-center justify-between">
            <div>
                <p class="font-bold text-white text-base">{{ $inquiry->name }}</p>
                @if($inquiry->company)
                <p class="text-xs text-gray-400 mt-0.5">{{ $inquiry->company }}</p>
                @endif
            </div>
            <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold {{ $cls }}">
                <span class="w-1.5 h-1.5 rounded-full {{ $dot }}"></span>
                {{ ucfirst(str_replace('_', ' ', $inquiry->status)) }}
            </span>
        </div>
        <div class="p-6 space-y-4">
            <div class="grid grid-cols-3 gap-2 text-sm">
                <div class="col-span-1 text-gray-400 font-medium">Email</div>
                <div class="col-span-2 text-earth-900 font-mono text-xs">{{ $inquiry->email }}</div>
            </div>
            <div class="grid grid-cols-3 gap-2 text-sm">
                <div class="col-span-1 text-gray-400 font-medium">Tipe</div>
                <div class="col-span-2">
                    <span class="inline-flex px-2.5 py-1 rounded-lg bg-earth-100 text-earth-700 text-xs font-medium capitalize">
                        {{ str_replace('_', ' ', $inquiry->type) }}
                    </span>
                </div>
            </div>
            <div class="grid grid-cols-3 gap-2 text-sm">
                <div class="col-span-1 text-gray-400 font-medium">Tanggal</div>
                <div class="col-span-2 text-gray-500 font-mono text-xs">{{ $inquiry->created_at->format('d M Y, H:i') }}</div>
            </div>
            <div class="pt-2 border-t border-earth-100">
                <p class="text-gray-400 font-medium text-sm mb-2">Pesan</p>
                <div class="bg-earth-50 rounded-xl p-4 text-sm text-earth-900 whitespace-pre-wrap leading-relaxed">{{ $inquiry->message }}</div>
            </div>
        </div>
    </div>

    {{-- Update Status --}}
    <div class="bg-white rounded-2xl border border-earth-200 shadow-sm p-6">
        <h3 class="font-bold text-earth-900 mb-4">Update Status</h3>
        <form method="POST" action="{{ route('admin.inquiries.update', $inquiry) }}" class="flex items-center gap-3 flex-wrap">
            @csrf @method('PATCH')
            <select name="status"
                class="border border-earth-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-earth-50 text-earth-900 font-medium">
                @foreach(['new'=>'New','in_progress'=>'In Progress','closed'=>'Closed'] as $val => $label)
                <option value="{{ $val }}" {{ $inquiry->status === $val ? 'selected' : '' }}>{{ $label }}</option>
                @endforeach
            </select>
            <button type="submit"
                class="px-4 py-2 bg-brand-yellow hover:bg-amber-400 text-brand-black text-sm font-bold rounded-xl transition-all duration-200">
                Simpan
            </button>
            <a href="{{ route('admin.inquiries.index') }}"
               class="text-sm text-gray-400 hover:text-earth-700 transition-colors">&larr; Kembali</a>
        </form>
    </div>

</div>
@endsection
