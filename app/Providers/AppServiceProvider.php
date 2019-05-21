<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use App\Models\Folder;
use App\Observers\FolderObserver;

use App\Models\TableColumn;
use App\Observers\TableColumnObserver;
use App\Models\TableRow;
use App\Observers\TableRowObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
      DB::listen(function($query) {
          Log::info(
              $query->sql,
              $query->bindings,
              $query->time
          );
      });
      
      Folder::observe(FolderObserver::class);

      TableColumn::observe(TableColumnObserver::class);
      TableRow::observe(TableRowObserver::class);
    }
}
