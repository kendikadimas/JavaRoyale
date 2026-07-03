@extends('admin.layouts.app')

@section('title', 'Profil Saya')
@section('page-title', 'Profil Saya')

@section('content')
<div class="max-w-2xl space-y-5">

    {{-- Update Info --}}
    <div class="bg-white rounded-2xl border border-earth-200 shadow-sm overflow-hidden">
        <div class="bg-earth-900 px-6 py-4">
            <p class="font-bold text-white text-sm uppercase tracking-wider">Informasi Akun</p>
        </div>
        <div class="p-6">
            @if(session('status') === 'profile-updated')
            <div class="mb-4 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-center gap-2">
                <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                Profil berhasil diperbarui.
            </div>
            @endif

            <form method="POST" action="{{ route('admin.profile.update') }}">
                @csrf
                @method('PATCH')

                <div class="mb-4">
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nama</label>
                    <input type="text" name="name" value="{{ old('name', $user->name) }}"
                        class="w-full border border-earth-200 rounded-xl px-4 py-2.5 text-sm bg-earth-50 text-earth-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium" required>
                    @error('name')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
                </div>

                <div class="mb-6">
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                    <input type="email" name="email" value="{{ old('email', $user->email) }}"
                        class="w-full border border-earth-200 rounded-xl px-4 py-2.5 text-sm bg-earth-50 text-earth-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono" required>
                    @error('email')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
                </div>

                <button type="submit"
                    class="px-5 py-2.5 bg-brand-yellow hover:bg-amber-400 text-brand-black text-sm font-bold rounded-xl transition-all duration-200">
                    Simpan Perubahan
                </button>
            </form>
        </div>
    </div>

    {{-- Ganti Password --}}
    <div class="bg-white rounded-2xl border border-earth-200 shadow-sm overflow-hidden">
        <div class="bg-earth-900 px-6 py-4">
            <p class="font-bold text-white text-sm uppercase tracking-wider">Ganti Password</p>
        </div>
        <div class="p-6">
            @if(session('status') === 'password-updated')
            <div class="mb-4 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-center gap-2">
                <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                Password berhasil diperbarui.
            </div>
            @endif

            <form method="POST" action="{{ route('password.update') }}">
                @csrf
                @method('PUT')

                <div class="mb-4">
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Password Saat Ini</label>
                    <input type="password" name="current_password"
                        class="w-full border border-earth-200 rounded-xl px-4 py-2.5 text-sm bg-earth-50 text-earth-900 focus:outline-none focus:ring-2 focus:ring-amber-400">
                    @error('current_password', 'updatePassword')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
                </div>

                <div class="mb-4">
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Password Baru</label>
                    <input type="password" name="password"
                        class="w-full border border-earth-200 rounded-xl px-4 py-2.5 text-sm bg-earth-50 text-earth-900 focus:outline-none focus:ring-2 focus:ring-amber-400">
                    @error('password', 'updatePassword')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
                </div>

                <div class="mb-6">
                    <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Konfirmasi Password Baru</label>
                    <input type="password" name="password_confirmation"
                        class="w-full border border-earth-200 rounded-xl px-4 py-2.5 text-sm bg-earth-50 text-earth-900 focus:outline-none focus:ring-2 focus:ring-amber-400">
                </div>

                <button type="submit"
                    class="px-5 py-2.5 bg-brand-yellow hover:bg-amber-400 text-brand-black text-sm font-bold rounded-xl transition-all duration-200">
                    Perbarui Password
                </button>
            </form>
        </div>
    </div>

</div>
@endsection
