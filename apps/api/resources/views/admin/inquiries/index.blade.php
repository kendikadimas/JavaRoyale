@extends('admin.layouts.app')
@section('title', 'Inquiry')
@section('page-title', 'Inquiry')
@section('content')
<div class="mb-4 flex gap-2">
    @foreach([''=>'Semua','new'=>'Baru','in_progress'=>'In Progress','closed'=>'Closed'] as $val => $label)
    <a href="{{ route('admin.inquiries.index', $val ? ['status'=>$val] : []) }}"
       class="text-xs px-3 py-1.5 rounded-full border {{ request('status') === $val ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50' }}">
       {{ $label }}
    </a>
    @endforeach
</div>
<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Nama</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Email</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Tipe</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Status</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Tanggal</th>
                <th class="px-6 py-3"></th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
            @forelse($inquiries as $inquiry)
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 font-medium text-gray-800">{{ $inquiry->name }}
                    @if($inquiry->company)<br><span class="text-xs text-gray-400">{{ $inquiry->company }}</span>@endif
                </td>
                <td class="px-6 py-4 text-gray-600">{{ $inquiry->email }}</td>
                <td class="px-6 py-4 text-gray-600">{{ str_replace('_',' ', $inquiry->type) }}</td>
                <td class="px-6 py-4">
                    <span class="inline-flex px-2 py-0.5 rounded-full text-xs font-medium
                        {{ $inquiry->status === 'new' ? 'bg-red-100 text-red-700' : ($inquiry->status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500') }}">
                        {{ $inquiry->status }}
                    </span>
                </td>
                <td class="px-6 py-4 text-gray-400 text-xs">{{ $inquiry->created_at->format('d M Y') }}</td>
                <td class="px-6 py-4 text-right">
                    <a href="{{ route('admin.inquiries.show', $inquiry) }}" class="text-blue-600 hover:underline text-xs">Detail</a>
                </td>
            </tr>
            @empty
            <tr><td colspan="6" class="px-6 py-8 text-center text-gray-400">Belum ada inquiry.</td></tr>
            @endforelse
        </tbody>
    </table>
    @if($inquiries->hasPages())
    <div class="px-6 py-4 border-t border-gray-100">{{ $inquiries->links() }}</div>
    @endif
</div>
@endsection
