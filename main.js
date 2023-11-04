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

  generateNotesHTML: function () {
    const navContainer = document.getElementById("sideBar");
    for (let note of this.data.notes) {
      sideBar.innerHTML += `
      <h2>${note.title}</h2>
      <p>${note.body}</p>
      <button>EDIT</button>
      <button>DELETE</button>
      `;
    }
  },
};

//controls: function() {
//add event listeners, if statements for when edit, delete, add note buttons are clicked
//will need: edit, delete (with confirmation?), add note, save/submit
//}

app.getNotes();
