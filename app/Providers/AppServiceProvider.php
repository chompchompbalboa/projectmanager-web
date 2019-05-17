<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use App\Models\Collection;
use App\Observers\CollectionObserver;
use App\Models\Container;
use App\Observers\ContainerObserver;
use App\Models\Module;
use App\Observers\ModuleObserver;
use App\Models\View;
use App\Observers\ViewObserver;

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
      
      Collection::observe(CollectionObserver::class);
      Container::observe(ContainerObserver::class);
      View::observe(ViewObserver::class);
      Module::observe(ModuleObserver::class);

      TableColumn::observe(TableColumnObserver::class);
      TableRow::observe(TableRowObserver::class);
    }
}
