@props(['value'])

<label {{ $attributes->merge(['class' => 'block text-xs font-bold text-earth-800 uppercase tracking-widest mb-1.5']) }}>
    {{ $value ?? $slot }}
</label>
