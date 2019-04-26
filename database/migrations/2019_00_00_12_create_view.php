<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('views', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('container_id')->nullable();
            $table->unsignedInteger('collection_id')->nullable();
            $table->unsignedInteger('table_id')->nullable();
            $table->unsignedInteger('breakdown_id')->nullable();
            $table->float('left_column_width', 2)->nullable();
            $table->timestamps();
          
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('container_id')->references('id')->on('containers');
            $table->foreign('collection_id')->references('id')->on('collections');
            $table->foreign('table_id')->references('id')->on('tables');
            $table->foreign('breakdown_id')->references('id')->on('breakdowns');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('views');
    }
}
