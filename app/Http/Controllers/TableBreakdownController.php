<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\TableBreakdown;
use App\Models\TableBreakdownFormula;

class TableBreakdownController extends Controller
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
      $newBreakdownInput = $request->input('newBreakdown');
      $newBreakdown = new TableBreakdown;
      $newBreakdown->name = $newBreakdownInput['name'];
      $newBreakdown->table_id =$request->input('tableId');
      if($newBreakdown->save()) {
        return [
          'breakdownId' => $newBreakdownInput['id'],
          'nextBreakdownId' => $newBreakdown->id
        ];
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function update(Request $request, TableBreakdown $breakdown)
    {
      $nextBreakdown = $request->input('breakdown');
      $breakdown->name = $nextBreakdown['name'];
      $breakdown->save();
      return $breakdown;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(TableBreakdown $breakdown)
    {
      $deletedFormulas = TableBreakdownFormula::where('table_breakdown_id', $breakdown->id)->delete();
      return TableBreakdown::destroy($breakdown->id);
    }
}
