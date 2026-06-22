<?php

namespace App\Http\Controllers\Admin;

use App\Models\FaqItem;
use Illuminate\Http\Request;

class FaqItemController extends Controller
{
    public function index()
    {
        $items = FaqItem::orderBy('order')->get();
        return view('admin.faq-items.index', compact('items'));
    }

    public function create()
    {
        $nextOrder = FaqItem::max('order') + 1;
        return view('admin.faq-items.create', compact('nextOrder'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'question' => 'required|string|max:500',
            'answer'   => 'required|string',
            'order'    => 'required|integer|min:0',
        ]);
        FaqItem::create($request->only('question', 'answer', 'order'));
        return redirect()->route('admin.faq-items.index')->with('success', 'FAQ berhasil dibuat.');
    }

    public function edit(FaqItem $faqItem)
    {
        return view('admin.faq-items.edit', compact('faqItem'));
    }

    public function update(Request $request, FaqItem $faqItem)
    {
        $request->validate([
            'question' => 'required|string|max:500',
            'answer'   => 'required|string',
            'order'    => 'required|integer|min:0',
        ]);
        $faqItem->update($request->only('question', 'answer', 'order'));
        return redirect()->route('admin.faq-items.index')->with('success', 'FAQ berhasil diperbarui.');
    }

    public function destroy(FaqItem $faqItem)
    {
        $faqItem->delete();
        return redirect()->route('admin.faq-items.index')->with('success', 'FAQ berhasil dihapus.');
    }
}
