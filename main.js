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

  // Create notes
  createNote: function (noteId) {
    let newTitle = document.getElementById("newTitle").value;
    let newBody = document.getElementById("newBody").value;
    let newNote = {
      title: newTitle,
      body: newBody
    }

  fetch(this.data.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newNote),
  })
    .then((r) => r.json())
    .then((response) => {
      this.app.main();
    });
    window.location.reload();
},

  displayNewForm: function () {
    let form = document.getElementById("newForm");
    form.classList.remove("hidden");
  },


  // Delete notes
  deleteNote: function (noteId) {
    fetch(this.data.url + noteId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((response) => {
        this.app.main();
      });
      window.location.reload();
  },

  // Confirm Delete pop-up WIP
  confirmDelete: function (noteId) {
    let deleteConfirm = window.confirm("Are you sure?");
    if (deleteConfirm) {
      this.deleteNote(noteId);
    }
  },

  // Edit notes function
  /* editNote: function (noteId) {
    fetch(this.data.url + noteId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((response) => {
        this.generateNotesHTML();
      });
  },
*/

  // Event Listeners
  // Delete Button
  addEventListeners: function () {
    let deleteButtons = document.querySelectorAll(".deleteButton");
    for (let button of deleteButtons) {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Delete Button Clicked");
        //confirm("Are you sure?");
        this.confirmDelete(button.dataset.id);
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
    let saveButton = document.querySelectorAll(".post");
    for (let button of saveButton) {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        this.createNote();
      });
    }
  }, 

  main: function () {
    //add event listeners, if statements for when edit, delete, add note buttons are clicked
    //will need: edit, delete (with confirmation?), add note, save/submit
    this.getNotes();
  //  this.createNote();
  },
};

app.main();