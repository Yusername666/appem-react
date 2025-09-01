<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreprovinsiRequest;
use App\Http\Requests\UpdateprovinsiRequest;
use App\Models\Provinsi;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProvinsiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Provinsi::query();

        if ($request->filled('search')) {
            $query->where('nama_provinsi', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('sort') && $request->filled('direction')) {
            $query->orderBy($request->sort, $request->direction);
        }

        $provinsi = $query->paginate(10)->withQueryString();

        return Inertia::render('Provinsi/index', [
            'provinsi' => $provinsi,
            'filter' => $request->only(['search', 'sort', 'direction']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Provinsi/create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_provinsi' => 'required|string|max:4|unique:tb_provinsi,kode_provinsi',
            'nama_provinsi' => 'required|string|max:255',
        ]);

        Provinsi::create($validated);

        Cache::forget('provinsi_all');

        return redirect()->route('provinsi.index')->with('success', 'Provinsi created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(provinsi $provinsi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(provinsi $provinsi)
    {
        return Inertia::render('Provinsi/Edit', [
            'provinsi' => $provinsi,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateprovinsiRequest $request, provinsi $provinsi)
    {
        $validated = $request->validate([
            'kode_provinsi' => 'required|string|max:4|unique:tb_provinsi,kode_provinsi,'.$provinsi->id,
            'nama_provinsi' => 'required|string|max:255',
        ]);

        $provinsi->update($validated);

        Cache::forget('provinsi_all');

        return redirect()->route('provinsi.index')->with('success', 'Provinsi updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(provinsi $provinsi)
    {
        $provinsi->delete();

        Cache::forget('provinsi_all');

        return redirect()->route('provinsi.index')->with('success', 'Provinsi deleted successfully.');
    }
}
