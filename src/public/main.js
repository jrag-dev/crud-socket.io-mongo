import { addNotification, loadNote, loadNotes, onNewNote } from './socket.js'
import { appendNote, fillForm, onhandleSubmit, renderNotes, renderNotification } from './ui.js'

const noteForm = document.querySelector("#noteForm");


loadNote(fillForm)
onNewNote(appendNote)
loadNotes(renderNotes)
addNotification(renderNotification)

noteForm.addEventListener("submit", onhandleSubmit)