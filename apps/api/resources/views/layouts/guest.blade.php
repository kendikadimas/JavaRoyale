<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Admin Login &mdash; Java Origins</title>

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
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Inter', sans-serif; }
            .font-display, h1, h2, h3 { font-family: 'Plus Jakarta Sans', sans-serif; }
        </style>
    </head>
    <body class="antialiased min-h-screen bg-earth-900 relative overflow-hidden">

        {{-- Background pattern --}}
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute -top-60 -left-60 w-[500px] h-[500px] rounded-full bg-brand-yellow/5 blur-[100px]"></div>
            <div class="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-orange/5 blur-[120px]"></div>
            {{-- Grid pattern --}}
            <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(#F6D400 1px, transparent 1px), linear-gradient(to right, #F6D400 1px, transparent 1px); background-size: 40px 40px;"></div>
        </div>

        <div class="relative z-10 min-h-screen flex">
            {{-- Left panel — branding (hidden on mobile) --}}
            <div class="hidden lg:flex lg:w-1/2 xl:w-2/5 flex-col justify-between p-12 border-r border-white/5">
                <div>
                    <div class="inline-flex items-center gap-2 mb-2">
                        <div class="w-2 h-2 rounded-full bg-brand-yellow"></div>
                        <span class="text-[10px] font-black uppercase tracking-[0.3em] text-brand-yellow">Pure Zealand</span>
                    </div>
                    <h1 class="font-display font-black text-3xl text-white uppercase tracking-tight leading-tight mt-6">
                        Java Origins<br/>
                        <span class="text-brand-yellow">Admin Panel</span>
                    </h1>
                    <p class="text-gray-400 text-sm mt-4 leading-relaxed max-w-xs">
                        Kelola produk, artikel, dan inquiry dari satu tempat.
                    </p>
                </div>

                <div class="space-y-4">
                    <div class="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div class="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center flex-shrink-0">
                            <svg class="w-4 h-4 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                        </div>
                        <div>
                            <p class="text-xs font-bold text-white">Produk</p>
                            <p class="text-[10px] text-gray-500">Kelola katalog produk</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div class="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center flex-shrink-0">
                            <svg class="w-4 h-4 text-brand-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        </div>
                        <div>
                            <p class="text-xs font-bold text-white">Inquiry</p>
                            <p class="text-[10px] text-gray-500">Pantau pesan masuk</p>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Right panel — form --}}
            <div class="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
                {{-- Mobile brand --}}
                <div class="lg:hidden text-center mb-10">
                    <div class="inline-flex items-center gap-2 mb-3">
                        <div class="w-1.5 h-1.5 rounded-full bg-brand-yellow"></div>
                        <span class="text-[10px] font-black uppercase tracking-[0.3em] text-brand-yellow">Pure Zealand</span>
                    </div>
                    <h1 class="font-display font-black text-2xl text-white uppercase tracking-tight">
                        Java Origins <span class="text-brand-yellow">Admin</span>
                    </h1>
                </div>

                <div class="w-full max-w-sm">
                    <div class="mb-8 hidden lg:block">
                        <h2 class="font-display font-black text-xl text-white uppercase tracking-tight">Selamat datang</h2>
                        <p class="text-gray-400 text-xs mt-1">Masuk ke panel admin</p>
                    </div>

                    <div class="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                        {{ $slot }}
                    </div>

                    <p class="text-center text-[10px] text-gray-600 mt-6 uppercase tracking-widest">
                        Java Origins &copy; {{ date('Y') }}
                    </p>
                </div>
            </div>
        </div>
    </body>
</html>
