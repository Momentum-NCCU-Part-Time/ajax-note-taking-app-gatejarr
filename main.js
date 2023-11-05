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
        this.deleteNote(button.dataset.id);
        console.log(deleteButtons);
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
  },

  main: function () {
    //add event listeners, if statements for when edit, delete, add note buttons are clicked
    //will need: edit, delete (with confirmation?), add note, save/submit

    this.getNotes();
  },
};

app.main();
