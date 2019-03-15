<?php

use Illuminate\Database\Seeder;

class ColumnTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      factory(App\Models\Column::class, 30)->create();
    }
}
