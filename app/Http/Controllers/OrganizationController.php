<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\Organization;
use App\Models\Container;
use App\Models\Table;
use App\Models\View;

class OrganizationController extends Controller
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
     * @param  \App\Organization  $organization
     * @return \Illuminate\Http\Response
     */
    public function show(Organization $organization)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Organization  $organization
     * @return \Illuminate\Http\Response
     */
    public function edit(Organization $organization)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Organization  $organization
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Organization $organization)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Organization  $organization
     * @return \Illuminate\Http\Response
     */
    public function destroy(Organization $organization)
    {
        //
    }

    /**
     * Retrieve the list of containers that belong to the organization
     *
     * @param  \App\Organization  $organization
     * @return \Illuminate\Http\Response
     */
    public function containers(Organization $organization)
    {
      $user = Auth::user();
      $view = View::find($user->view()->first()->id);
      $containers = Container::where('organization_id', $organization->id)->get();
      $activeContainerId = $view->container_id !== null ? $view->container_id : $containers[0]->id ;
      $activeContainer = $containers->firstWhere('id', $activeContainerId);
      $activeTableId = 
        $view->table_id !== null && $activeContainer->tables()->get()->contains('id', $view->table_id) 
        ? $view->table_id
        : $activeContainer->tables()->first()->id;
      $view->container_id = 'PROJECTS';
      $view->save();
      return [
        'activeLeftColumnWidth' => $view->leftColumnWidth,
        'activeContainer' => $activeContainerId,
        'activeTableId' => $activeTableId,
        'containers' => $containers
      ];
    }

    /**
     * Retrieve the list of tables that belong to the organization
     *
     * @param  \App\Organization  $organization
     * @return \Illuminate\Http\Response
     */
    public function tables(Organization $organization)
    {
      $user = Auth::user();
      $view = View::find($user->view()->first()->id);
      $view->container_id = 'ORGANIZATION';
      $view->save();
      $tables = Table::where('organization_id', $organization->id)->where('container_id', null)->get();
      $activeTableId = 
        $view->table_id !== null && $tables->contains('id', $view->table_id) 
        ? $view->table_id
        : $tables->first()->id;
      return [
        'name' => $organization->name,
        'activeLeftColumnWidth' => $view->activeLeftColumnWidth,
        'activeTableId' => $activeTableId,
        'tables' => $tables
      ];
    }
}
