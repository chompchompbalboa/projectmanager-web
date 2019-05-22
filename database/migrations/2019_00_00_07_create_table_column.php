<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('table_columns', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('table_id')->nullable();
            $table->string('name')->nullable();
            $table->string('type');
            $table->unsignedInteger('position');
            $table->float('width');
            $table->timestamps();

            $table->foreign('table_id')->references('id')->on('tables');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('table_columns');
    }
}