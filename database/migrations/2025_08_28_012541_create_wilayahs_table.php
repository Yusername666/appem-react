<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Provinsi
        Schema::create('tb_provinsi', function (Blueprint $table) {
            $table->id();
            $table->char('kode_provinsi', 2);
            $table->string('nama_provinsi');
            $table->timestamps();
        });

        // Kab/Kota
        Schema::create('tb_kabkot', function (Blueprint $table) {
            $table->id();
            $table->char('kode_kabkot', 4);
            $table->char('kode_provinsi', 2);
            $table->string('nama_kabkot');
            $table->timestamps();

            $table->foreign('kode_provinsi')
                  ->references('kode_provinsi')
                  ->on('tb_provinsi')
                  ->onDelete('cascade');
        });

        // Kecamatan
        Schema::create('tb_kecamatan', function (Blueprint $table) {
            $table->id();
            $table->char('kode_kecamatan', 6);
            $table->char('kode_kabkot', 4);
            $table->string('nama_kecamatan');
            $table->timestamps();

            $table->foreign('kode_kabkot')
                  ->references('kode_kabkot')
                  ->on('tb_kabkot')
                  ->onDelete('cascade');
        });

        // Kelurahan
        Schema::create('tb_kelurahan', function (Blueprint $table) {
            $table->id();
            $table->char('kode_kelurahan', 10);
            $table->char('kode_kecamatan', 6);
            $table->string('nama_kelurahan');
            $table->timestamps();

            $table->foreign('kode_kecamatan')
                  ->references('kode_kecamatan')
                  ->on('tb_kecamatan')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wilayahs');
    }
};
