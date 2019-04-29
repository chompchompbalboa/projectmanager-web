<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableBreakdownFormula extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('table_breakdown_formulas', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('table_breakdown_id');
            $table->unsignedInteger('table_column_id');
            $table->string('type');
            $table->string('string')->nullable();
            $table->float('number')->nullable();
            $table->boolean('boolean')->nullable();
            $table->dateTime('datetime')->nullable();
            $table->timestamps();
          
            $table->foreign('table_column_id')->references('id')->on('table_columns');
            $table->foreign('table_breakdown_id')->references('id')->on('table_breakdowns');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('table_breakdown_formulas');
    }
}
