<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\Organization;
use App\Models\Project;
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
     * Retrieve the list of projects that belong to the organization
     *
     * @param  \App\Organization  $organization
     * @return \Illuminate\Http\Response
     */
    public function projects(Organization $organization)
    {
      $user = Auth::user();
      $view = View::find($user->view()->first()->id);
      $projects = Project::where('organization_id', $organization->id)->get();
      $activeProjectId = $view->active_project_id !== null ? $view->active_project_id : $projects[0]->id ;
      $activeProject = $projects->firstWhere('id', $activeProjectId);
      $activeTableId = 
        $view->active_table_id !== null && $activeProject->tables()->get()->contains('id', $view->active_table_id) 
        ? $view->active_table_id
        : $activeProject->tables()->first()->id;
      $view->active_content = 'PROJECTS';
      $view->save();
      return [
        'activeLeftColumnWidth' => $view->activeLeftColumnWidth,
        'activeProject' => $activeProject,
        'activeTableId' => $activeTableId,
        'projects' => Project::where('organization_id', $organization->id)->get()
      ];
    }

    /**
     * Retrieve the list of projects that belong to the organization
     *
     * @param  \App\Organization  $organization
     * @return \Illuminate\Http\Response
     */
    public function tables(Organization $organization)
    {
      $user = Auth::user();
      $view = View::find($user->view()->first()->id);
      $view->active_content = 'ORGANIZATION';
      $view->save();
      $tables = Table::where('organization_id', $organization->id)->where('project_id', null)->get();
      $activeTableId = 
        $view->active_table_id !== null && $tables->contains('id', $view->active_table_id) 
        ? $view->active_table_id
        : $tables->first()->id;
      return [
        'name' => $organization->name,
        'activeLeftColumnWidth' => $view->activeLeftColumnWidth,
        'activeTableId' => $activeTableId,
        'tables' => $tables
      ];
    }
}
