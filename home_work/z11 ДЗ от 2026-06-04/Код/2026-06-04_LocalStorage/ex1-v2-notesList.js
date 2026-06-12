"use strict";


document.addEventListener("DOMContentLoaded", () => {
    const output = document.querySelector("#output");
    const inputNoteMessage = document.querySelector("#input-note-message");
    const inputNotePriority = document.querySelector("#input-note-priority");
    const buttonAddNote = document.querySelector("#button-add-note");
    const buttonSaveNotes = document.querySelector("#button-save-notes");
    const buttonLoadNotes = document.querySelector("#button-load-notes");

    class Note
    {
        constructor(message, priority)
        {
            this.message = new String(message);  // или можно this.message = `${message}`;
            this.priority = parseInt(priority) || 0;
        }

        static createFromDictionary(dict)
        {
            let note = null;

            if (typeof dict.message === "string" && typeof dict.priority === "number")
            {
                note = new Note(dict.message, dict.priority);
            }

            return note;
        }
    }

    class NotesHandler
    {
        constructor(id)
        {
            this.__id = new String(id);
            this.__notes = [];
        }

        addNote(note)
        {
            this.__notes.push(note);
        }

        getNotes()
        {
            return new Array(...this.__notes);
        }

        save()
        {
            localStorage.setItem(
                `${this.constructor.name} ${this.__id}`,
                JSON.stringify(this.__notes)
            );
        }

        load()
        {
            let json = localStorage.getItem(
                `${this.constructor.name} ${this.__id}`
            );
            let data = [];

            try
            {
                data = JSON.parse(json);
            }
            catch (SyntaxError)
            { }

            if (data)
            {
                this.__notes.length = 0;

                for (let noteData of data)
                {
                    let note = Note.createFromDictionary(noteData);

                    if (note)
                    {
                        this.__notes.push(note);
                    }
                }
            }
        }
    }

    let notesHandler = new NotesHandler("some unique characters");

    function processUIUpdateOutput()
    {
        let notesDescription = "";

        for (let note of notesHandler.getNotes())
        {
            notesDescription += `${note.message} (приоритет ${note.priority})\n`;
        }

        output.innerText = notesDescription;
    }

    function processUIAddNote()
    {
        notesHandler.addNote(
            new Note(
                inputNoteMessage.value,
                inputNotePriority.value
            )
        );

        processUIUpdateOutput();
    }

    function processUISaveNotes()
    {
        notesHandler.save();
    }

    function processUILoadNotes()
    {
        notesHandler.load();
        processUIUpdateOutput();
    }

    buttonAddNote.addEventListener("click", processUIAddNote);
    buttonSaveNotes.addEventListener("click", processUISaveNotes);
    buttonLoadNotes.addEventListener("click", processUILoadNotes);
});