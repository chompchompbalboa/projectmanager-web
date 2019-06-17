<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSheetColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sheet_columns', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('sheet_id')->nullable();
            $table->string('name')->nullable();
            $table->string('type');
            $table->unsignedInteger('position');
            $table->float('width');
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
        Schema::dropIfExists('sheet_columns');
    }
}
