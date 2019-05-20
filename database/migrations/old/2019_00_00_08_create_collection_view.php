<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCollectionView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('collection_view', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('collection_id')->nullable();
            $table->unsignedInteger('view_id')->nullable();

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
        Schema::dropIfExists('collection_view');
    }
}
