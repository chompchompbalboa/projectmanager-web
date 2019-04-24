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
            $table->string('active_content')->nullable();
            $table->unsignedInteger('active_project_id')->nullable();
            $table->unsignedInteger('active_table_id')->nullable();
            $table->unsignedInteger('active_breakdown_id')->nullable();
            $table->float('active_left_column_width', 2)->nullable();
            $table->timestamps();
          
            $table->foreign('user_id')->references('id')->on('users');
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
