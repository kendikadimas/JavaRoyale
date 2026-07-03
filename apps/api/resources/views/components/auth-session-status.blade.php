@props(['status'])

@if ($status)
    <div {{ $attributes->merge(['class' => 'px-4 py-3 bg-brand-green/10 border border-brand-green/20 text-brand-green rounded-xl text-sm font-medium']) }}>
        {{ $status }}
    </div>
@endif
