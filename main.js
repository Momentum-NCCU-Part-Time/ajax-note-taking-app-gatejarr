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
        <div>
          <h2>${note.title}</h2>
          <div>${note.body}</div>
          <button class="editButton" data-id=${note.id}>EDIT</button>
          <button class="deleteButton" data-id=${note.id}>DELETE</button>
          <div class="edit">
          <form id="editForm" class="hiddenEdit">
          <h2>Edit Note</h2>
          <label for="editTitle" id ="editNote"
            >Title:<input id="editTitle" name="editTitle" type="text" required
            /></label>
          <label for="editBody"
            >Body:<textarea
              id="editBody"
              name="editBody"
              rows="5"
              cols="30"
              required
            ></textarea>
          </label>
          <button class="patch" type="submit">UPDATE</button>
        </form>
        </div>
      </div>
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

  // Edit Form
  displayEditForm: function (noteId) {
    let editForm = document.getElementById("editForm");
    editForm.classList.remove("hiddenEdit");
  },

  // Edit notes function
 editNote: function (noteId) {
    let note = this.data.notes.find(note = note.id == noteId);
    console.log(noteId);
    let editedTitle = document.getElementById("editTitle").value;
    let editedBody = document.getElementById("editBody").value;
    let editedNote = {
      title: editedTitle,
      body: editedBody
    }

    fetch(this.data.url + noteId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedNote),
    })
      .then((r) => r.json())
      .then((response) => {
        this.data.notes = [],
        this.getNotes()
      });
  },


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
        this.displayEditForm(button.dataset.id);
      });
    }

    // Save Button
    let saveButton = document.querySelectorAll(".post");
    for (let button of saveButton) {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        this.createNote();
      });
    }
    // Update Button
    let updateButton = document.querySelectorAll(".patch");
    for (let button of updateButton) {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        this.editNote();
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