<?php

namespace App\Http\Controllers\Admin;

use App\Models\Inquiry;
use Illuminate\Http\Request;

class InquiryController extends Controller
{
    public function index(Request $request)
    {
        $query = Inquiry::latest();
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        $inquiries = $query->paginate(20);
        return view('admin.inquiries.index', compact('inquiries'));
    }

    public function show(Inquiry $inquiry)
    {
        return view('admin.inquiries.show', compact('inquiry'));
    }

    public function update(Request $request, Inquiry $inquiry)
    {
        $request->validate([
            'status' => 'required|in:new,in_progress,closed',
        ]);
        $inquiry->update(['status' => $request->status]);
        return back()->with('success', 'Status inquiry diperbarui.');
    }
}
