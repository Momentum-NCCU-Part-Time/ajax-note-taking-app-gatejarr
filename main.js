const app = {
  data: {
    url: "http://localhost:3000/notes/",
    notes: [],
  },

  /* methods */
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
  addEventListeners: function () {
    let deleteButtons = document.querySelectorAll(".deleteButton");
    console.log(deleteButtons);
    for (let button of deleteButtons) {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        this.deleteNote(button.dataset.id);
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
