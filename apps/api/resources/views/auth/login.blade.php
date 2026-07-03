<x-guest-layout>
    <!-- Session Status -->
    <x-auth-session-status class="mb-5" :status="session('status')" />

    <form method="POST" action="{{ route('login') }}" class="space-y-5">
        @csrf

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Email')" class="text-gray-300" />
            <x-text-input id="email" class="block mt-1 w-full bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-brand-yellow focus:ring-brand-yellow/20" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" placeholder="admin@javaorigins.co.nz" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div>
            <x-input-label for="password" :value="__('Password')" class="text-gray-300" />
            <x-text-input id="password" class="block mt-1 w-full bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-brand-yellow focus:ring-brand-yellow/20"
                            type="password"
                            name="password"
                            required autocomplete="current-password"
                            placeholder="••••••••" />
            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Remember Me + Forgot Password -->
        <div class="flex items-center justify-between">
            <label for="remember_me" class="inline-flex items-center gap-2 cursor-pointer">
                <input id="remember_me" type="checkbox"
                    class="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-brand-yellow focus:ring-brand-yellow/30 focus:ring-offset-0"
                    name="remember">
                <span class="text-xs text-gray-400">{{ __('Ingat saya') }}</span>
            </label>

            @if (Route::has('password.request'))
                <a class="text-xs text-gray-500 hover:text-brand-yellow transition-colors" href="{{ route('password.request') }}">
                    {{ __('Lupa password?') }}
                </a>
            @endif
        </div>

        <x-primary-button class="mt-2">
            {{ __('Masuk') }}
        </x-primary-button>
    </form>
</x-guest-layout>
