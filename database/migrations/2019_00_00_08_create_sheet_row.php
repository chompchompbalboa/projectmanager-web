<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSheetRow extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sheet_rows', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('sheet_id')->nullable();
            $table->timestamps();

            $table->foreign('sheet_id')->references('id')->on('sheets');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sheet_rows');
    }
}
