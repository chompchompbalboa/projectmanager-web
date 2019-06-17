<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use App\Models\Folder;
use App\Observers\FolderObserver;

use App\Models\Sheet;
use App\Observers\SheetObserver;
use App\Models\SheetColumn;
use App\Observers\SheetColumnObserver;
use App\Models\SheetRow;
use App\Observers\SheetRowObserver;

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

      Sheet::observe(SheetObserver::class);
      SheetColumn::observe(SheetColumnObserver::class);
      SheetRow::observe(SheetRowObserver::class);
    }
}
