<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Calendar;
use App\Models\File;
use App\Models\Note;
use App\Models\Table;

class FileController extends Controller
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
     * Copy an existing file
     *
     * @return \Illuminate\Http\Response
     */
    public function copyFile(Request $request)
    {
      $typeFileToCopy = $request->input('typeFileToCopyId');
      $pasteIntoFolderId = $request->input('pasteIntoFolderId');

      $newFile = File::create($request->input('newFile'));
      $newFile->folderId = $pasteIntoFolderId;
      $newFile->save();

      $modelName = 'App\Models\\'.ucfirst(strtolower($newFile->type));
      $typeFileToCopy = $modelName::find($typeFileToCopy);
      $newTypeFile = $typeFileToCopy->replicate();
      $newTypeFile->id = $newFile->typeId;
      $newTypeFile->save();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $file = File::create($request->all());
      switch($file->type) {
        case 'CALENDAR': 
          Calendar::create(['id' => $file->typeId]);
        case 'NOTE': 
          Note::create(['id' => $file->typeId]);
        case 'TABLE': 
          Table::create(['id' => $file->typeId]);
        break;
      }
      return response()->json($file, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\File  $file
     * @return \Illuminate\Http\Response
     */
    public function show(File $file)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\File  $file
     * @return \Illuminate\Http\Response
     */
    public function edit(File $file)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\File  $file
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, File $file)
    {
      $file->update($request->all());
      return response()->json($file, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\File  $file
     * @return \Illuminate\Http\Response
     */
    public function destroy(File $file)
    {
      $file->delete();
      return response()->json(null, 204);
    }
}
