import Note from './models/noteModel'


export default (io) => {

  io.on("connection", (socket) => {

    const emitNotes = async () => {
      const notes = await Note.find({});
      // console.log(notes);
      io.emit("server:loadnotes", notes)
    }

    emitNotes()

    socket.on("client:savenote", async data => {
      const note = new Note(data);
      const savedNote = await note.save();
      // console.log(savedNote);
      let msg = {
        message: "nueva nota agregada",
        notes: savedNote
      }
      io.emit("server:newnote", msg.notes);
      io.emit("server:addnote", msg.message);
    })

    socket.on("client:deletenote", async (id) => {
      try {
        await Note.findByIdAndDelete(id)
        emitNotes()
      } catch (err) {
        console.log(err);
      }
    })

    socket.on("client:getnote", async (id) => {
      try {
        const note = await Note.findById(id);
        console.log(note)
        socket.emit("server:selectednote", note)
      } catch (err) {
        console.log(err)
      }
    })

    socket.on("client:updatenote", async (note) => {
      try {
        const updatedNote = await Note.findByIdAndUpdate({ _id: note.id }, note, { new: true });
        emitNotes()
      } catch (err) {
        console.log(err)
      }
    })

  });

}