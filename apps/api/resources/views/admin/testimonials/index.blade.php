@extends('admin.layouts.app')
@section('title', 'Testimonial')
@section('page-title', 'Testimonial')
@section('header-actions')
    <a href="{{ route('admin.testimonials.create') }}" class="bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 rounded-lg font-medium">+ Tambah Testimonial</a>
@endsection
@section('content')
<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Penulis</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Kutipan</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Rating</th>
                <th class="text-left px-6 py-3 font-medium text-gray-500">Status</th>
                <th class="px-6 py-3"></th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
            @forelse($testimonials as $t)
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                    <p class="font-medium text-gray-800">{{ $t->author_name }}</p>
                    @if($t->company)<p class="text-xs text-gray-400">{{ $t->company }}</p>@endif
                </td>
                <td class="px-6 py-4 text-gray-600 max-w-xs truncate">{{ Str::limit($t->quote, 80) }}</td>
                <td class="px-6 py-4 text-gray-600">{{ $t->rating ? $t->rating . '/5' : '-' }}</td>
                <td class="px-6 py-4">
                    <span class="inline-flex px-2 py-0.5 rounded-full text-xs font-medium {{ $t->is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500' }}">
                        {{ $t->is_published ? 'Published' : 'Draft' }}
                    </span>
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="{{ route('admin.testimonials.edit', $t) }}" class="text-blue-600 hover:underline text-xs mr-3">Edit</a>
                    <form method="POST" action="{{ route('admin.testimonials.destroy', $t) }}" class="inline" onsubmit="return confirm('Hapus testimonial ini?')">
                        @csrf @method('DELETE')
                        <button class="text-red-500 hover:underline text-xs">Hapus</button>
                    </form>
                </td>
            </tr>
            @empty
            <tr><td colspan="5" class="px-6 py-8 text-center text-gray-400">Belum ada testimonial.</td></tr>
            @endforelse
        </tbody>
    </table>
</div>
@endsection
