<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCell extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cells', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('table_id');
            $table->unsignedInteger('column_id');
            $table->unsignedInteger('row_id');
            $table->string('string');
            $table->float('number');
            $table->boolean('boolean');
            $table->dateTime('datetime');
            $table->timestamps();

            $table->foreign('column_id')->references('id')->on('columns');
            $table->foreign('row_id')->references('id')->on('rows');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cells');
    }
}
