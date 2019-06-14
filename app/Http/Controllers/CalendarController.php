<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Calendar;
use App\Models\File;

class CalendarController extends Controller
{
    /**
     * Copy the resource
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public static function copy($calendarToCopyId, $folderId, $newFileParameters)
    {
      $newFile = File::create($newFileParameters);
      $newFile->folderId = $folderId;
      $newFile->save();

      $calendarToCopy = Calendar::find($calendarToCopyId);
      $newCalendar = $calendarToCopy->replicate();
      $newCalendar->id = $newFile->typeId;
      $newCalendar->save();
    }
    /**
     * Copy the resource from a request
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function copyFromRequest(Request $request)
    {
      $calendarToCopyId = $request->input('fileToCopyId');
      $pasteFolderId = $request->input('pasteFolderId');
      $newFileParameters = $request->input('newFile');
      $this->copy($calendarToCopyId, $pasteFolderId, $newFileParameters);
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
     * @param  \App\Calendar  $calendar
     * @return \Illuminate\Http\Response
     */
    public function show(Calendar $calendar)
    {
      return response()->json($calendar, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Calendar  $calendar
     * @return \Illuminate\Http\Response
     */
    public function edit(Calendar $calendar)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Calendar  $calendar
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Calendar $calendar)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Calendar  $calendar
     * @return \Illuminate\Http\Response
     */
    public function destroy(Calendar $calendar)
    {
        //
    }
}
