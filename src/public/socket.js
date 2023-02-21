const socket = io();


export const loadNotes = (callback) => {
  socket.on("server:loadnotes", callback)
}

export const saveNote = (newnote) => {
  socket.emit("client:savenote", newnote)
}

export const onNewNote = (callback) => {
  socket.on("server:newnote", callback)
}

export const addNotification = (callback) => {
  socket.on("server:addnote", callback)
}

export const deleteNote = id => {
  socket.emit("client:deletenote", id)
}


export const getNote = (id) => {
  socket.emit("client:getnote", id)
}

export const loadNote = (callback) => {
  socket.on("server:selectednote", callback)
}


export const updateNote = note => {
  socket.emit("client:updatenote", note)
}