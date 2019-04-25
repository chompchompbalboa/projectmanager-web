<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDropdown extends Migration
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
            $table->unsignedInteger('organization_id');
            $table->unsignedInteger('project_id')->nullable();
            $table->string('name')->nullable();
            $table->unsignedInteger('column_id');
            $table->timestamps();
          
            $table->foreign('organization_id')->references('id')->on('organizations');
            $table->foreign('project_id')->references('id')->on('projects');
            $table->foreign('column_id')->references('id')->on('columns');
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
