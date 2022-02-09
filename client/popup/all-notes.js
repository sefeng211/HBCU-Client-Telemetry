const p = document.querySelector("p");
const allNotes = window.localStorage.getItem("notes");

if (allNotes != null) {
  const parsedAllNotes = JSON.parse(allNotes);
  for (const note of parsedAllNotes) {
    p.textContent += note;
    p.textContent += "\n";
  }
}
