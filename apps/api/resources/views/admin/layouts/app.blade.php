<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin') &mdash; Java Royale Admin</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            yellow: '#F6D400',
                            orange: '#F39C12',
                            red: '#D62828',
                            green: '#4CAF50',
                            black: '#222222',
                            white: '#FFFFFF',
                        },
                        earth: {
                            50: '#FDFAF2',
                            100: '#F9F3E0',
                            200: '#EDE0C4',
                            800: '#3D2C1A',
                            900: '#1E1608',
                        }
                    }
                }
            }
        }
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        /* Base styles */
        body { 
            font-family: 'Inter', sans-serif; 
            background-color: #FDFAF2 !important;
        }
        h1, h2, h3, h4, h5, h6, .font-display { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            font-weight: 800;
        }

        /* Color Class Overrides to map standard styles to brand style */
        .text-amber-600 { color: #f97316 !important; }
        .text-amber-800 { color: #3D2C1A !important; }
        .hover\:text-amber-900:hover, .hover\:text-amber-700:hover { color: #ea580c !important; }
        
        .bg-amber-500 { background-color: #F6D400 !important; color: #222222 !important; font-weight: bold; }
        .bg-amber-50 { background-color: #FDFAF2 !important; }
        .hover\:bg-amber-600:hover { background-color: #f97316 !important; color: #ffffff !important; }
        .border-amber-500 { border-color: #F6D400 !important; }
        .focus\:ring-amber-500:focus { --tw-ring-color: #f97316 !important; }
        
        /* Layout overrides */
        .bg-gray-100 { background-color: #FDFAF2 !important; }
        .border-gray-100 { border-color: #F9F3E0 !important; }
        .border-gray-200 { border-color: #EDE0C4 !important; }
        .text-gray-800 { color: #222222 !important; }
        
        /* Modern Cards and Panels */
        .bg-white { 
            background-color: #ffffff !important; 
            border-color: #F9F3E0 !important;
        }
        .shadow-sm {
            box-shadow: 0 4px 20px rgba(61, 44, 26, 0.02) !important;
        }
        
        /* Action buttons styling */
        a[href*="create"], button[type="submit"], .bg-blue-600, .bg-indigo-600, .bg-amber-500 {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-radius: 0.75rem !important;
            transition: all 0.2s ease-in-out !important;
        }

        /* Style cancel/batal buttons to look like clean outline/flat buttons */
        a[href*="index"].text-gray-400, a[href*="products"].text-gray-400, a[href*="articles"].text-gray-400, a[href*="faq-items"].text-gray-400, a[href*="testimonials"].text-gray-400, a[href*="buyer-categories"].text-gray-400, a[href*="social-embed-settings"].text-gray-400, a[href*="seo-settings"].text-gray-400 {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            background-color: transparent !important;
            color: #888888 !important;
            border: 1px solid #EDE0C4 !important;
            padding: 0.5rem 1.5rem !important;
            font-size: 0.875rem !important;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            font-weight: 700 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.05em !important;
            border-radius: 0.75rem !important;
            transition: all 0.2s ease-in-out !important;
            text-decoration: none !important;
        }
        a[href*="index"].text-gray-400:hover, a[href*="products"].text-gray-400:hover, a[href*="articles"].text-gray-400:hover, a[href*="faq-items"].text-gray-400:hover, a[href*="testimonials"].text-gray-400:hover, a[href*="buyer-categories"].text-gray-400:hover, a[href*="social-embed-settings"].text-gray-400:hover, a[href*="seo-settings"].text-gray-400:hover {
            background-color: #EDE0C4 !important;
            color: #3D2C1A !important;
            border-color: #EDE0C4 !important;
        }
        
        /* Form inputs styling */
        input[type="text"], input[type="email"], input[type="password"], input[type="number"], input[type="url"], textarea, select {
            border-radius: 0.75rem !important;
            border-color: #EDE0C4 !important;
            background-color: #ffffff !important;
            transition: all 0.2s ease-in-out !important;
            font-size: 0.875rem !important;
            color: #222222 !important;
        }
        input:focus, textarea:focus, select:focus {
            border-color: #f97316 !important;
            outline: none !important;
            box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.15) !important;
        }
        
        /* Table Styling matching premium B2B style */
        table {
            border-collapse: separate !important;
            border-spacing: 0 !important;
            width: 100% !important;
            border-radius: 1rem !important;
            overflow: hidden !important;
            border: 1px solid #EDE0C4 !important;
        }
        thead th {
            background-color: #1E1608 !important;
            color: #F6D400 !important;
            text-transform: uppercase !important;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 0.75rem !important;
            font-weight: 800 !important;
            letter-spacing: 0.1em !important;
            padding: 1rem 1.25rem !important;
            border-bottom: none !important;
        }
        tbody td {
            background-color: #ffffff !important;
            color: #3D2C1A !important;
            padding: 1rem 1.25rem !important;
            border-bottom: 1px solid #F9F3E0 !important;
            font-size: 0.875rem !important;
        }
        tbody tr:last-child td {
            border-bottom: none !important;
        }
        tbody tr:hover td {
            background-color: #FDFAF2 !important;
        }
    </style>
    @stack('head')
</head>
<body class="bg-earth-50 text-brand-black antialiased">

<div class="flex h-screen overflow-hidden">
    {{-- Sidebar --}}
    <aside class="w-64 bg-earth-900 border-r border-white/5 text-white flex flex-col flex-shrink-0">
        <div class="px-6 py-5 border-b border-white/5">
            <p class="text-xs font-black uppercase tracking-[0.25em] text-brand-yellow">Java Royale</p>
            <p class="text-[9px] font-black uppercase tracking-widest text-gray-400 mt-0.5">Admin Panel</p>
        </div>

        <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1 text-sm">

            {{-- Dashboard --}}
            <a href="{{ route('admin.dashboard') }}"
               class="flex items-center gap-3 px-3 py-2 rounded-xl {{ request()->routeIs('admin.dashboard') ? 'bg-brand-yellow/10 text-brand-yellow font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white' }}">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                Dashboard
            </a>

            {{-- Produk --}}
            <div class="pt-3">
                <p class="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Produk</p>
                <a href="{{ route('admin.products.index') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-xl {{ request()->routeIs('admin.products.*') ? 'bg-brand-yellow/10 text-brand-yellow font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                    Produk
                </a>
            </div>

            {{-- Konten --}}
            <div class="pt-3">
                <p class="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Konten</p>
                <a href="{{ route('admin.articles.index') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-xl {{ request()->routeIs('admin.articles.*') ? 'bg-brand-yellow/10 text-brand-yellow font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    Artikel
                </a>
                <a href="{{ route('admin.faq-items.index') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-xl {{ request()->routeIs('admin.faq-items.*') ? 'bg-brand-yellow/10 text-brand-yellow font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    FAQ
                </a>
                <a href="{{ route('admin.testimonials.index') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-xl {{ request()->routeIs('admin.testimonials.*') ? 'bg-brand-yellow/10 text-brand-yellow font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                    Testimonial
                </a>
                <a href="{{ route('admin.buyer-categories.index') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-xl {{ request()->routeIs('admin.buyer-categories.*') ? 'bg-brand-yellow/10 text-brand-yellow font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    Buyer Categories
                </a>
            </div>

            {{-- Lead --}}
            <div class="pt-3">
                <p class="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Lead</p>
                <a href="{{ route('admin.inquiries.index') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-xl {{ request()->routeIs('admin.inquiries.*') ? 'bg-brand-yellow/10 text-brand-yellow font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    Inquiry
                </a>
            </div>

            {{-- Pengaturan Situs --}}
            <div class="pt-3">
                <p class="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Pengaturan Situs</p>
                <a href="{{ route('admin.homepage-setting.edit') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-xl {{ request()->routeIs('admin.homepage-setting.*') ? 'bg-brand-yellow/10 text-brand-yellow font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                    Homepage
                </a>
                <a href="{{ route('admin.site-setting.edit') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-xl {{ request()->routeIs('admin.site-setting.*') ? 'bg-brand-yellow/10 text-brand-yellow font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    Site Settings
                </a>
                <a href="{{ route('admin.social-embed-settings.index') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-xl {{ request()->routeIs('admin.social-embed-settings.*') ? 'bg-brand-yellow/10 text-brand-yellow font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                    Social Embed
                </a>
                <a href="{{ route('admin.seo-settings.index') }}"
                   class="flex items-center gap-3 px-3 py-2 rounded-xl {{ request()->routeIs('admin.seo-settings.*') ? 'bg-brand-yellow/10 text-brand-yellow font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white' }}">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    SEO Settings
                </a>
            </div>
        </nav>

        <div class="px-4 py-4 border-t border-white/5">
            <p class="text-xs text-gray-400 mb-2 font-semibold">{{ Auth::user()->name }}</p>
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" class="text-xs text-gray-400 hover:text-white transition">Logout &rarr;</button>
            </form>
        </div>
    </aside>

    {{-- Main content --}}
    <div class="flex-1 overflow-y-auto">
        {{-- Top bar --}}
        <header class="bg-white border-b border-earth-100 px-8 py-4 flex items-center justify-between">
            <h1 class="text-lg font-black text-brand-black tracking-tight uppercase">@yield('page-title', 'Dashboard')</h1>
            <div class="flex items-center gap-4">
                @yield('header-actions')
            </div>
        </header>

        {{-- Flash messages --}}
        @if(session('success'))
        <div class="mx-8 mt-4 px-4 py-3 bg-brand-green/10 border border-brand-green/20 text-brand-green rounded-xl text-sm flex items-center gap-2">
            <svg class="w-4 h-4 text-brand-green" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
            {{ session('success') }}
        </div>
        @endif
        @if(session('error'))
        <div class="mx-8 mt-4 px-4 py-3 bg-brand-red/10 border border-brand-red/20 text-brand-red rounded-xl text-sm flex items-center gap-2">
            <svg class="w-4 h-4 text-brand-red" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
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
