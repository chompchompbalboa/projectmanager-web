<?php
//-----------------------------------------------------------------------------
// Use
//-----------------------------------------------------------------------------

use Illuminate\Support\Facades\Auth;

use App\Models\Active;
use App\Models\Collection;
use App\Models\Container;
use App\Models\View;

//-----------------------------------------------------------------------------
// App
//-----------------------------------------------------------------------------
Route::prefix('app')->group(function () {

  Route::get('/', function () {

    $user = Auth::loginUsingId(1, true);
    $organization = $user->organization()->first();
    $active = $user->active()->first();

    $userContainers = $user->containers()->get();
    $organizationContainers = $organization->containers()->get();

    $containers = $userContainers->merge($organizationContainers);
    $activeContainerId = $active->containerId !== null ? $active->containerId : $organizationContainers[0]->id;

    $collections = Container::find($activeContainerId)->collections()->get();
    $activeCollectionId = $active->collectionId !== null ? $active->collectionId : $collections[0]->id;
    
    $views = Collection::find($activeCollectionId)->views()->get();
    $activeViewId = $active->viewId !== null ? $active->viewId : $views[0]->id;
    
    $modules = View::find($activeViewId)->modules()->get();
    
    return view('app')->with([
      'activeCollectionId' => $activeCollectionId,
      'collections' => $collections,
      'activeContainerId' => $activeContainerId,
      'containers' => $containers,
      'modules' => $modules,
      'activeViewId' => $activeViewId,
      'views' => $views,
    ]);
  });

  Route::resources([
    'breakdowns' => 'BreakdownController',
    'cells' => 'CellController',
    'collections' => 'CollectionController',
    'columns' => 'ColumnController',
    'containers' => 'ContainerController',
    'formulas' => 'FormulaController',
    'rows' => 'RowController',
    'tables' => 'TableController',
  ]);
});

//-----------------------------------------------------------------------------
// Site
//-----------------------------------------------------------------------------
Route::get('/', function () {
  return view('site');
});

//-----------------------------------------------------------------------------
// Authentication
//-----------------------------------------------------------------------------
Auth::routes();