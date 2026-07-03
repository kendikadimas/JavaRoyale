@props(['disabled' => false])

<input @disabled($disabled) {{ $attributes->merge(['class' => 'w-full px-4 py-3 bg-earth-50 border border-earth-200 rounded-xl text-brand-black text-sm placeholder-gray-400 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed']) }}>
