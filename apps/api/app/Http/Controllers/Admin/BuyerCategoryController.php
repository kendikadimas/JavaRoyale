<?php

namespace App\Http\Controllers\Admin;

use App\Models\BuyerCategory;
use Illuminate\Http\Request;

class BuyerCategoryController extends Controller
{
    public function index()
    {
        $categories = BuyerCategory::orderBy('order')->get();
        return view('admin.buyer-categories.index', compact('categories'));
    }

    public function create()
    {
        $nextOrder = BuyerCategory::max('order') + 1;
        return view('admin.buyer-categories.create', compact('nextOrder'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'icon'  => 'required|string|max:100',
            'label' => 'required|string|max:255',
            'order' => 'required|integer|min:0',
        ]);
        BuyerCategory::create($request->only('icon', 'label', 'order'));
        return redirect()->route('admin.buyer-categories.index')->with('success', 'Buyer category berhasil dibuat.');
    }

    public function edit(BuyerCategory $buyerCategory)
    {
        return view('admin.buyer-categories.edit', compact('buyerCategory'));
    }

    public function update(Request $request, BuyerCategory $buyerCategory)
    {
        $request->validate([
            'icon'  => 'required|string|max:100',
            'label' => 'required|string|max:255',
            'order' => 'required|integer|min:0',
        ]);
        $buyerCategory->update($request->only('icon', 'label', 'order'));
        return redirect()->route('admin.buyer-categories.index')->with('success', 'Buyer category berhasil diperbarui.');
    }

    public function destroy(BuyerCategory $buyerCategory)
    {
        $buyerCategory->delete();
        return redirect()->route('admin.buyer-categories.index')->with('success', 'Buyer category berhasil dihapus.');
    }
}
