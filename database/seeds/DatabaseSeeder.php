<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //$this->call(OrganizationTableSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(ProjectTableSeeder::class);
        //$this->call(UpdateTableSeeder::class);
        $this->call(DepartmentTableSeeder::class);
        //$this->call(MilestoneTableSeeder::class);
        //$this->call(DateTableSeeder::class);
        //$this->call(QuestionTableSeeder::class);
    }
}
