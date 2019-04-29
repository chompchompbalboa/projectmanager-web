<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableDropdown extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dropdowns', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('organization_id')->nullable();
            $table->unsignedInteger('collection_id')->nullable();
            $table->string('name')->nullable();
            $table->unsignedInteger('table_column_id');
            $table->timestamps();
          
            $table->foreign('organization_id')->references('id')->on('organizations');
            $table->foreign('collection_id')->references('id')->on('collections');
            $table->foreign('table_column_id')->references('id')->on('table_columns');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dropdowns');
    }
}
