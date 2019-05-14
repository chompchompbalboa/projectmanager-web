<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateActive extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('actives', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('container_id')->nullable();
            $table->unsignedInteger('collection_id')->nullable();
            $table->unsignedInteger('view_id')->nullable();
            $table->timestamps();
          
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('container_id')->references('id')->on('containers');
            $table->foreign('collection_id')->references('id')->on('collections');
            $table->foreign('view_id')->references('id')->on('views');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('actives');
    }
}
