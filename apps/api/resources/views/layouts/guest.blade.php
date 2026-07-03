<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

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
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Inter', sans-serif; }
            h1, h2, h3, h4, h5, h6 { font-family: 'Plus Jakarta Sans', sans-serif; }
        </style>
    </head>
    <body class="font-sans text-brand-black antialiased bg-earth-50 relative overflow-hidden">
        {{-- Decorative backdrop blurs --}}
        <div class="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand-yellow/10 blur-[120px]"></div>
        <div class="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-yellow/5 blur-[150px] pointer-events-none"></div>

        <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 relative z-10 px-4">
            <div class="mb-8 text-center">
                <span class="text-xs font-bold tracking-[0.3em] text-brand-orange uppercase block mb-1">
                    Java Royale Nusantara
                </span>
                <h1 class="font-display font-black text-2xl text-brand-black uppercase tracking-wider">
                    ADMIN LOGIN
                </h1>
            </div>

            <div class="w-full sm:max-w-md bg-white border border-earth-100 p-8 shadow-[0_20px_50px_rgba(61,44,26,0.05)] overflow-hidden rounded-[2rem]">
                {{ $slot }}
            </div>
        </div>
    </body>
</html>
