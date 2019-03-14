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
            $table->unsignedInteger('structure_id');
            $table->json('payload');
            $table->timestamps();

            $table->foreign('structure_id')->references('id')->on('structures');
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
