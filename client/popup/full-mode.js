document.querySelector("button").addEventListener("click",
  function() {
    const note = document.querySelector("textarea").value;

    let existing_notes = window.localStorage.getItem("notes");
    if (existing_notes != null) {
      let parsed_existing_notes = JSON.parse(existing_notes);
      parsed_existing_notes.push(note);
      existing_notes = parsed_existing_notes;
    } else {
      existing_notes = [note];
    }

    window.localStorage.setItem("notes", JSON.stringify(existing_notes));

    const data = {"method": "full-mode"};

    const response = fetch("http://localhost:5000", {
      method: "POST",
      body: JSON.stringify(data)
    });

    console.log(window.localStorage.getItem("notes"));
  }
);
