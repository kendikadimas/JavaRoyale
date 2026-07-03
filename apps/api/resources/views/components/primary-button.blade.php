<button {{ $attributes->merge(['type' => 'submit', 'class' => 'inline-flex items-center justify-center w-full px-6 py-3 bg-brand-yellow border border-transparent rounded-xl font-bold text-sm text-brand-black uppercase tracking-widest hover:bg-brand-orange hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 transition-all duration-200']) }}>
    {{ $slot }}
</button>
