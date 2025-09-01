<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWilayahRequest;
use App\Http\Requests\UpdateWilayahRequest;
use App\Models\Wilayah;
use Inertia\Inertia;
use Illuminate\Http\Request;

class WilayahController extends Controller
{
    /**
     * Display a listing of the wilayah resource.
     */
    public function index(Request $request)
    {
        //
        return Inertia::render('Wilayah/Index', [
            
        ]);
    }
}
