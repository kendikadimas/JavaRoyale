@extends('admin.layouts.app')
@section('title', 'Inquiry')
@section('page-title', 'Inquiry')
@section('content')
<div class="mb-5 flex flex-wrap gap-2">
    @foreach([''=>'Semua','new'=>'Baru','in_progress'=>'In Progress','closed'=>'Closed'] as $val => $label)
    <a href="{{ route('admin.inquiries.index', $val ? ['status'=>$val] : []) }}"
       class="text-xs px-4 py-1.5 rounded-full border font-semibold transition-all duration-150 {{ request('status') === $val ? 'bg-earth-900 text-brand-yellow border-earth-900' : 'bg-white text-earth-700 border-earth-200 hover:border-earth-400' }}">
       {{ $label }}
    </a>
    @endforeach
</div>
<div class="bg-white rounded-2xl shadow-sm border border-earth-200 overflow-hidden">
    <table class="w-full text-sm">
        <thead>
            <tr>
                <th class="text-left px-6 py-4 font-bold text-brand-yellow uppercase tracking-wider text-xs bg-earth-900">Nama</th>
                <th class="text-left px-6 py-4 font-bold text-brand-yellow uppercase tracking-wider text-xs bg-earth-900">Email</th>
                <th class="text-left px-6 py-4 font-bold text-brand-yellow uppercase tracking-wider text-xs bg-earth-900">Tipe</th>
                <th class="text-left px-6 py-4 font-bold text-brand-yellow uppercase tracking-wider text-xs bg-earth-900">Status</th>
                <th class="text-left px-6 py-4 font-bold text-brand-yellow uppercase tracking-wider text-xs bg-earth-900">Tanggal</th>
                <th class="px-6 py-4 bg-earth-900"></th>
            </tr>
        </thead>
        <tbody>
            @forelse($inquiries as $inquiry)
            @php
                $statusMap = [
                    'new'         => ['bg-red-100 text-red-700', 'bg-red-500'],
                    'in_progress' => ['bg-amber-100 text-amber-700', 'bg-amber-400'],
                    'closed'      => ['bg-gray-100 text-gray-500', 'bg-gray-400'],
                ];
                [$cls, $dot] = $statusMap[$inquiry->status] ?? ['bg-gray-100 text-gray-500', 'bg-gray-400'];
            @endphp
            <tr class="border-t border-earth-100 hover:bg-earth-50/50 transition-colors duration-150 {{ $inquiry->status === 'new' ? 'bg-amber-50/20' : '' }}">
                <td class="px-6 py-4">
                    <p class="font-semibold text-earth-900">{{ $inquiry->name }}</p>
                    @if($inquiry->company)
                    <p class="text-xs text-gray-400 mt-0.5">{{ $inquiry->company }}</p>
                    @endif
                </td>
                <td class="px-6 py-4 text-gray-600 text-xs font-mono">{{ $inquiry->email }}</td>
                <td class="px-6 py-4">
                    <span class="inline-flex px-2.5 py-1 rounded-lg bg-earth-100 text-earth-700 text-xs font-medium capitalize">
                        {{ str_replace('_', ' ', $inquiry->type) }}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold {{ $cls }}">
                        <span class="w-1.5 h-1.5 rounded-full {{ $dot }}"></span>
                        {{ ucfirst(str_replace('_', ' ', $inquiry->status)) }}
                    </span>
                </td>
                <td class="px-6 py-4 text-gray-400 text-xs font-mono">{{ $inquiry->created_at->format('d M Y') }}</td>
                <td class="px-6 py-4 text-right">
                    <a href="{{ route('admin.inquiries.show', $inquiry) }}"
                       class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-earth-100 hover:bg-earth-200 text-earth-800 text-xs font-semibold transition-colors">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                        Detail
                    </a>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="6" class="px-6 py-16 text-center">
                    <div class="flex flex-col items-center gap-3 text-gray-400">
                        <svg class="w-10 h-10 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        <p class="text-sm">Belum ada inquiry.</p>
                    </div>
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>
    @if($inquiries->hasPages())
    <div class="px-6 py-4 border-t border-earth-100 bg-earth-50/30">{{ $inquiries->links() }}</div>
    @endif
</div>
@endsection
