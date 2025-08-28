<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreprovinsiRequest;
use App\Http\Requests\UpdateprovinsiRequest;
use App\Models\provinsi;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProvinsiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Provinsi/Index', []);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreprovinsiRequest $request)
    {
        //
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateprovinsiRequest $request, provinsi $provinsi)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(provinsi $provinsi)
    {
        //
    }
}
