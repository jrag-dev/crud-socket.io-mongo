import { saveNote, deleteNote, getNote, updateNote, addNotification } from './socket.js'

const notesList = document.querySelector("#notes");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const notification = document.querySelector("#notification");
let savedId= "";


export const noteUI = note => {

  const div = document.createElement("div")
  div.innerHTML = `
    <div class="card card-body mb-2 animate__animated animate__fadeInUp">
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="h4">${note.title}</h3>
        <div>
          <button class="delete btn btn-danger" data-id="${note._id}">Delete</button>
          <button class="update btn btn-primary" data-id="${note._id}">Update</button>
        </div>
      </div>
      <p>${note.description}</p>
    </div>
  `;

  const btnDelete = div.querySelector(".delete");
  const btnUpdate = div.querySelector(".update");

  btnDelete.addEventListener("click", (e) => deleteNote(btnDelete.dataset.id))

  btnUpdate.addEventListener("click", (e) => getNote(btnUpdate.dataset.id))

  return div
}


export const renderNotes = (notes) => {

  notesList.innerHTML = "";
  notes.forEach((note) => notesList.append(noteUI(note)));

}


export const appendNote = (note) => {
  notesList.append(noteUI(note));
}


export const onhandleSubmit = (e) => {
  e.preventDefault();
  
  if (title.value === "" || description.value === "" ) return;

  const newNote = {
    title: title.value,
    description: description.value
  }

  if (savedId) {
    updateNote({ ...newNote, id:savedId })
  } else {
    saveNote(newNote)
  }


  title.value = "";
  description.value = "";
}

export const fillForm = (note) => {
  savedId = note._id
  title.value = note.title;
  description.value = note.description;
}

export const notificationUI = (message) => {
  const p = document.createElement("p");

  p.innerHTML = `
    <span class="notificacion-span">
      ${message}
    </span>
  `;

  return p;
}

export const renderNotification = (message) => {

  notification.append(notificationUI(message))
  setTimeout(() => {
    notification.innerHTML = "";
  }, 5000)
}