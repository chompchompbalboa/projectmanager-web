<?php

use Illuminate\Database\Seeder;

class RowTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      factory(App\Models\Row::class, 30)->create();
    }
}
