<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCollectionContainer extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('collection_container', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('collection_id')->nullable();
            $table->unsignedInteger('container_id')->nullable();

            $table->foreign('collection_id')->references('id')->on('collections');
            $table->foreign('container_id')->references('id')->on('containers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('collection_container');
    }
}
