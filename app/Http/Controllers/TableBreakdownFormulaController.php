<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\TableBreakdownFormula;

class TableBreakdownFormulaController extends Controller
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
      $newFormulaInput = $request->input('newFormula');
      $newFormula = new TableBreakdownFormula;
      $newFormula->type = $newFormulaInput['type'];
      $newFormula->table_breakdown_id = $request->input('breakdownId');
      $newFormula->table_column_id = $newFormulaInput['columnId'];
      $newFormula->boolean = $newFormulaInput['boolean'];
      $newFormula->datetime = $newFormulaInput['datetime'];
      $newFormula->number = $newFormulaInput['number'];
      $newFormula->string = $newFormulaInput['string'];
      if($newFormula->save()) {
        return [
          'formulaId' => $newFormulaInput['id'],
          'nextFormulaId' => $newFormula->id
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
    public function update(Request $request, TableBreakdownFormula $formula)
    {
      $nextFormula = $request->input('formula');
      $formula->table_column_id = $nextFormula['columnId'];
      $formula->type = $nextFormula['type'];
      $formula->boolean = $nextFormula['boolean'];
      $formula->datetime = $nextFormula['datetime'];
      $formula->number = $nextFormula['number'];
      $formula->string = $nextFormula['string'];
      $formula->save();
      return $formula;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(TableBreakdownFormula $formula)
    {
      return TableBreakdownFormula::destroy($formula->id);
    }
}
