//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import { mutation } from 'api'
import { timing } from '../../config'

//-----------------------------------------------------------------------------
// Set Note
//-----------------------------------------------------------------------------
export const setNote = note => ({
  type: 'SET_NOTE',
  note: note
})

//-----------------------------------------------------------------------------
// Update Note
//-----------------------------------------------------------------------------
let updateNoteTimeout = null
export const updateNote = updates => {
  return (dispatch, getState) => {
    window.clearTimeout(updateNoteTimeout)
    const noteId = getState().note.id
    dispatch(updateNoteReducer(updates))
    updateNoteTimeout = window.setTimeout(() => mutation.updateNote(noteId, updates), timing.SAVE_INTERVAL)
  }
}

const updateNoteReducer = updates => ({
  type: 'UPDATE_NOTE',
  updates: updates
})