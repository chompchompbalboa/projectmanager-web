<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateModuleView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('module_view', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('view_id')->nullable();
            $table->unsignedInteger('module_id')->nullable();

            $table->foreign('view_id')->references('id')->on('views');
            $table->foreign('module_id')->references('id')->on('modules');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('module_view');
    }
}
