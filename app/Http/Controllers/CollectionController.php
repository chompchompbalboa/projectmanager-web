<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Collection;
use App\Models\Container;
use App\Models\View;

class CollectionController extends Controller
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
      $collection = Collection::create($request->input('collection'));
      $container = Container::find($request->input('containerId'));
      $container->collections()->attach($collection->id);
      return response()->json($collection, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Collection  $collection
     * @return \Illuminate\Http\Response
     */
    public function show(Collection $collection)
    {
      $nextViews = $collection->views()->get();
      $nextActiveViewId = $nextViews[0]->id;
    
      $nextModules = View::find($nextActiveViewId)->modules()->get();

      return [
        'nextActiveViewId' => $nextActiveViewId,
        'nextModules' => $nextModules,
        'nextViews' => $nextViews,
      ];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Collection  $collection
     * @return \Illuminate\Http\Response
     */
    public function edit(Collection $collection)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Collection  $collection
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Collection $collection)
    {
      $collection->update($request->all());
      return response()->json($collection, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Collection  $collection
     * @return \Illuminate\Http\Response
     */
    public function destroy(Collection $collection)
    {
      $collection->delete();
      return response()->json(null, 204);
    }
}
