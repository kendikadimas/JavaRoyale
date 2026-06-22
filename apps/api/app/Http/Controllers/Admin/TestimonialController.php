<?php

namespace App\Http\Controllers\Admin;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::latest()->get();
        return view('admin.testimonials.index', compact('testimonials'));
    }

    public function create()
    {
        return view('admin.testimonials.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'author_name'  => 'required|string|max:255',
            'company'      => 'nullable|string|max:255',
            'quote'        => 'required|string',
            'rating'       => 'nullable|integer|min:1|max:5',
            'photo'        => 'nullable|image|max:2048',
            'is_published' => 'boolean',
        ]);

        $data['is_published'] = $request->boolean('is_published');

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('testimonials', 'public');
        }

        Testimonial::create($data);
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial berhasil dibuat.');
    }

    public function edit(Testimonial $testimonial)
    {
        return view('admin.testimonials.edit', compact('testimonial'));
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $data = $request->validate([
            'author_name'  => 'required|string|max:255',
            'company'      => 'nullable|string|max:255',
            'quote'        => 'required|string',
            'rating'       => 'nullable|integer|min:1|max:5',
            'photo'        => 'nullable|image|max:2048',
            'is_published' => 'boolean',
        ]);

        $data['is_published'] = $request->boolean('is_published');

        if ($request->hasFile('photo')) {
            if ($testimonial->photo) {
                Storage::disk('public')->delete($testimonial->photo);
            }
            $data['photo'] = $request->file('photo')->store('testimonials', 'public');
        }

        $testimonial->update($data);
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial berhasil diperbarui.');
    }

    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->photo) {
            Storage::disk('public')->delete($testimonial->photo);
        }
        $testimonial->delete();
        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial berhasil dihapus.');
    }
}
