const app = {
  data: {
    url: "http://localhost:3000/notes/",
    notes: [],
  },

  // methods
  getNotes: function () {
    fetch(this.data.url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((response) => {
        for (let note of response) {
          this.data.notes.push(note);
        }
        this.generateNotesHTML();
      });
  },

  // Create notes function-------------------------------------------------------------------------
  createNote: function (noteId) {
    let newTitle = document.getElementById("newTitle").value;
    let newBody = document.getElementById("newBody").value;
    let newNote = {
      title: newTitle,
      body: newBody,
    };
    const jsonData = JSON.stringify(newData);
    const apiUrl = "http://localhost:3000/notes/";

    fetch(this.data.url + noteId, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((response) => {
        this.generateNotesHTML();
      });
  },

  displayNewForm: function () {
    let form = document.getElementById("newForm");
    form.classList.remove("hidden");
  },

  // Create notes function end---------------------------------------------------------------------
  // Delete notes function
  deleteNote: function (noteId) {
    fetch(this.data.url + noteId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((response) => {
        this.generateNotesHTML();
      });
  },

  // Confirm Delete pop-up WIP
  confirmDelete: function () {},
  // Delete notes function end---------------------------------------------------------------------

  // Edit notes function
  editNote: function (noteId) {
    fetch(this.data.url + noteId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((response) => {
        this.generateNotesHTML();
      });
  },
  // Edit notes function end---------------------------------------------------------------------

  generateNotesHTML: function () {
    const sideBar = document.getElementById("sideBar");
    for (let note of this.data.notes) {
      sideBar.innerHTML += `
      <div class="noteCard">
        <h2>${note.title}</h2>
        <div>${note.body}</div>
        <button class="editButton" data-id=${note.id}>EDIT</button>
        <button class="deleteButton" data-id=${note.id}>DELETE</button>
      </div>
      `;
    }
    this.addEventListeners();
  },

  // Event Listeners
  // Delete Button
  addEventListeners: function () {
    let deleteButtons = document.querySelectorAll(".deleteButton");
    for (let button of deleteButtons) {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Delete Button Clicked");
        this.deleteNote(button.dataset.id);
      });
    }

    // Create Button
    let createButton = document.querySelectorAll(".createNote");
    for (let button of createButton) {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("New Note Button clicked");
        this.displayNewForm();
      });
    }

    // Edit Button
    let editButtons = document.querySelectorAll(".editButton");
    for (let button of editButtons) {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Edit Button Clicked");
        this.editNote(button.dataset.id);
      });
    }

    //Save Button
    let saveButtons = document.querySelectorAll("post");
    for (let button of saveButtons) {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Save Button Clicked");
        this.createNote(button.dataset.id);
      });
    }
  },

  main: function () {
    //add event listeners, if statements for when edit, delete, add note buttons are clicked
    //will need: edit, delete (with confirmation?), add note, save/submit

    this.getNotes();
  },
};

app.main();
