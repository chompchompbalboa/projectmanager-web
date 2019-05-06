<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Collection;
use App\Models\Container;
use App\Models\View;

class ContainerController extends Controller
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
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      return Container::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Container  $container
     * @return \Illuminate\Http\Response
     */
    public function show(Container $container)
    {
      $nextCollections = $container->collections()->get();
      $nextActiveCollectionId = $nextCollections[0]->id;
    
      $nextViews = Collection::find($nextActiveCollectionId)->views()->get();
      $nextActiveViewId = $nextViews[0]->id;
    
      $nextModules = View::find($nextActiveViewId)->modules()->get();

      return [
        'nextActiveCollectionId' => $nextActiveCollectionId,
        'nextCollections' => $nextCollections,
        'nextModules' => $nextModules,
        'nextActiveViewId' => $nextActiveViewId,
        'nextViews' => $nextViews,
      ];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Container  $container
     * @return \Illuminate\Http\Response
     */
    public function edit(Container $container)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Container  $container
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Container $container)
    {
      $container->update($request->all());
      return response()->json($container, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Container  $container
     * @return \Illuminate\Http\Response
     */
    public function destroy(Container $container)
    {
      $container->delete();
      return response()->json(null, 204);
    }
}
