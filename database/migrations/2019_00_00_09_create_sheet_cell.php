<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSheetCell extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sheet_cells', function (Blueprint $table) {
          $table->uuid('id')->primary();
          $table->uuid('sheet_id')->nullable();;
          $table->uuid('sheet_column_id')->nullable();;
          $table->uuid('sheet_row_id')->nullable();;
          $table->string('value')->nullable();
          $table->timestamps();

          $table->foreign('sheet_id')->references('id')->on('sheets');
          $table->foreign('sheet_column_id')->references('id')->on('sheet_columns');
          $table->foreign('sheet_row_id')->references('id')->on('sheet_rows');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sheet_cells');
    }
}
