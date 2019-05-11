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
    public function show(Request $request, Container $container)
    {
      $nextCollections = $container->collections()->get();
      $nextActiveCollectionId = $request->input('collectionId') ? intval($request->input('collectionId')) : (isset($nextCollections[0]) ? $nextCollections[0]->id : null);
    
      $nextViews = $nextActiveCollectionId ? Collection::find($nextActiveCollectionId)->views()->get() : [];
      $nextActiveViewId = $request->input('viewId') ? intval($request->input('viewId')) : (isset($nextViews[0]) ? $nextViews[0]->id : null);
    
      $nextModules = $nextActiveViewId ? View::find($nextActiveViewId)->modules()->get() : [];

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
