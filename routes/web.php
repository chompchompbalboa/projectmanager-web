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
    $activeContainerId = $active->containerId !== null ? $active->containerId : (isset($containers[0]) ? $containers[0]->id : null);

    $collections = isset($activeContainerId) ? Container::find($activeContainerId)->collections()->get() : [];
    $activeCollectionId = $active->collectionId !== null ? $active->collectionId : (isset($collections[0]) ? $collections[0]->id : null);
    
    $views = isset($activeCollectionId) ? Collection::find($activeCollectionId)->views()->get() : [];
    $activeViewId = $active->viewId !== null ? $active->viewId : (isset($views[0]) ? $views[0]->id : null);
    
    $modules = isset($activeViewId) ? View::find($activeViewId)->modules()->get() : [];
    
    return view('app')->with([
      'user' => $user,
      'organization' => $organization,
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
    // Structure
    'collections' => 'CollectionController',
    'containers' => 'ContainerController',
    'modules' => 'ModuleController',
    'structure' => 'StructureController',
    'tables' => 'TableController',
    'views' => 'ViewController',
    // Table
    'tables/breakdowns' => 'TableBreakdownController',
    'tables/cells' => 'TableCellController',
    'tables/columns' => 'TableColumnController',
    'tables/breakdowns/formulas' => 'TableBreakdownFormulaController',
    'tables/rows' => 'TableRowController'
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