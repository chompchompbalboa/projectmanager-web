<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableCell extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('table_cells', function (Blueprint $table) {
          $table->uuid('id')->primary();
          $table->uuid('table_id')->nullable();;
          $table->uuid('table_column_id')->nullable();;
          $table->uuid('table_row_id')->nullable();;
          $table->string('value')->nullable();
          $table->timestamps();

          $table->foreign('table_id')->references('id')->on('tables');
          $table->foreign('table_column_id')->references('id')->on('table_columns');
          $table->foreign('table_row_id')->references('id')->on('table_rows');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('table_cells');
    }
}
