<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin') &mdash; Java Royale Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>body { font-family: 'Inter', sans-serif; }</style>
    @stack('head')
</head>
<body class="bg-gray-100 text-gray-800">

<div class="flex h-screen overflow-hidden">
    {{-- Sidebar --}}
    <aside class="w-64 bg-[#1a2332] text-white flex flex-col flex-shrink-0">
        <div class="px-6 py-5 border-b border-white/10">
            <p class="text-xs font-semibold uppercase tracking-widest text-amber-400">Java Royale</p>
            <p class="text-sm text-gray-300 mt-0.5">Admin Panel</p>
        </div>

        <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1 text-sm">

            {{-- Dashboard --}}
            <a href="{{ route('admin.dashboard') }}"
               class="flex items-center gap-3 px-3 py-2 rounded-lg {{ request()->routeIs('admin.dashboard') ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-gray-300 hover:bg-white/10' }}">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                Dashboard
            </a>

            {{-- Produk --}}
            <div class="pt-3">
                <p class="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Produk</p>
                <a href="{{ route('admin.products.index') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-lg {{ request()->routeIs('admin.products.*') ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-gray-300 hover:bg-white/10' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                    Produk
                </a>
            </div>

            {{-- Konten --}}
            <div class="pt-3">
                <p class="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Konten</p>
                <a href="{{ route('admin.articles.index') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-lg {{ request()->routeIs('admin.articles.*') ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-gray-300 hover:bg-white/10' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    Artikel
                </a>
                <a href="{{ route('admin.faq-items.index') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-lg {{ request()->routeIs('admin.faq-items.*') ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-gray-300 hover:bg-white/10' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    FAQ
                </a>
                <a href="{{ route('admin.testimonials.index') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-lg {{ request()->routeIs('admin.testimonials.*') ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-gray-300 hover:bg-white/10' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                    Testimonial
                </a>
                <a href="{{ route('admin.buyer-categories.index') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-lg {{ request()->routeIs('admin.buyer-categories.*') ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-gray-300 hover:bg-white/10' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    Buyer Categories
                </a>
            </div>

            {{-- Lead --}}
            <div class="pt-3">
                <p class="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Lead</p>
                <a href="{{ route('admin.inquiries.index') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-lg {{ request()->routeIs('admin.inquiries.*') ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-gray-300 hover:bg-white/10' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    Inquiry
                </a>
            </div>

            {{-- Pengaturan Situs --}}
            <div class="pt-3">
                <p class="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Pengaturan Situs</p>
                <a href="{{ route('admin.homepage-setting.edit') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-lg {{ request()->routeIs('admin.homepage-setting.*') ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-gray-300 hover:bg-white/10' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                    Homepage
                </a>
                <a href="{{ route('admin.site-setting.edit') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-lg {{ request()->routeIs('admin.site-setting.*') ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-gray-300 hover:bg-white/10' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    Site Settings
                </a>
                <a href="{{ route('admin.social-embed-settings.index') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-lg {{ request()->routeIs('admin.social-embed-settings.*') ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-gray-300 hover:bg-white/10' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                    Social Embed
                </a>
                <a href="{{ route('admin.seo-settings.index') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-lg {{ request()->routeIs('admin.seo-settings.*') ? 'bg-amber-500/20 text-amber-300 font-medium' : 'text-gray-300 hover:bg-white/10' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    SEO Settings
                </a>
            </div>
        </nav>

        <div class="px-4 py-4 border-t border-white/10">
            <p class="text-xs text-gray-400 mb-2">{{ Auth::user()->name }}</p>
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" class="text-xs text-gray-400 hover:text-white transition">Logout &rarr;</button>
            </form>
        </div>
    </aside>

    {{-- Main content --}}
    <div class="flex-1 overflow-y-auto">
        {{-- Top bar --}}
        <header class="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
            <h1 class="text-lg font-semibold text-gray-800">@yield('page-title', 'Dashboard')</h1>
            <div class="flex items-center gap-4">
                @yield('header-actions')
            </div>
        </header>

        {{-- Flash messages --}}
        @if(session('success'))
        <div class="mx-8 mt-4 px-4 py-3 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm flex items-center gap-2">
            <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
            {{ session('success') }}
        </div>
        @endif
        @if(session('error'))
        <div class="mx-8 mt-4 px-4 py-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm flex items-center gap-2">
            <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
            {{ session('error') }}
        </div>
        @endif

        {{-- Page content --}}
        <main class="px-8 py-6">
            @yield('content')
        </main>
    </div>
</div>

@stack('scripts')
</body>
</html>
