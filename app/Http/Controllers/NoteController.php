<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Note;
use App\Models\File;

class NoteController extends Controller
{
    /**
     * Copy the resource
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public static function copy($noteToCopyId, $folderId, $newFileParameters)
    {
      $newFile = File::create($newFileParameters);
      $newFile->folderId = $folderId;
      $newFile->save();

      $noteToCopy = Note::find($noteToCopyId);
      $newNote = $noteToCopy->replicate();
      $newNote->id = $newFile->typeId;
      $newNote->save();
    }
    /**
     * Copy the resource from a request
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function copyFromRequest(Request $request)
    {
      $noteToCopyId = $request->input('fileToCopyId');
      $pasteFolderId = $request->input('pasteFolderId');
      $newFileParameters = $request->input('newFile');
      $this->copy($noteToCopyId, $pasteFolderId, $newFileParameters);
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
     * @param  \App\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function show(Note $note)
    {
      return response()->json($note, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function edit(Note $note)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Note $note)
    {
      $note->update($request->all());
      return response()->json($note, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Note  $note
     * @return \Illuminate\Http\Response
     */
    public function destroy(Note $note)
    {
        //
    }
}
