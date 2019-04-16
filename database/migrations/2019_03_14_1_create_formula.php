<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFormula extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('formulas', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('breakdown_id');
            $table->unsignedInteger('column_id');
            $table->string('type');
            $table->string('string')->nullable();
            $table->float('number')->nullable();
            $table->boolean('boolean')->nullable();
            $table->dateTime('datetime')->nullable();
            $table->timestamps();
          
            $table->foreign('column_id')->references('id')->on('columns');
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
        Schema::dropIfExists('formulas');
    }
}
