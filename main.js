const app = {
  data: {
    url: "http://localhost:3000/notes",
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
    const navContainer = document.getElementById("pages");
    for (let note of this.data.notes) {
      pages.innerHTML += `
      <h2>${note.title}</h2>
      <div>${note.body}</div>
      <button>EDIT</button>
      <button>DELETE</button>
      `;
    }
  },
};

app.getNotes();
