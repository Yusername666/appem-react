<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Provinsi extends Model
{
    /** @use HasFactory<\Database\Factories\ProvinsiFactory> */
    use HasFactory;
    protected $table = 'tb_provinsi';
    protected $fillable = ['kode_provinsi', 'nama_provinsi'];
}
