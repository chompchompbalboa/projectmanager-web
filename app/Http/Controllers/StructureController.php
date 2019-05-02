<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Active;
use App\Models\Collection;
use App\Models\Container;
use App\Models\View;

class StructureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $user = Auth::user();
      $organization = $user->organization()->first();
      $active = $user->active()->first();
  
      $userContainers = $user->containers()->get();
      $organizationContainers = $organization->containers()->get();
  
      $containers = $userContainers->merge($organizationContainers);

      return $containers->map(function($container) {
        return [
          'id' => $container->id,
          'name' => $container->name,
          'collections' => $container->collections()->get()->map(function($collection) {
            return [
              'id' => $collection->id,
              'name' => $collection->name,
              'views' => $collection->views()->get()->map(function($view) {
                return [
                  'id' => $view->id,
                  'name' => $view->name,
                  'modules' =>  $view->modules()->get()
                ];
              })
            ];
          })
        ];
      });
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
