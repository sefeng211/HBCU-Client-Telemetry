const quick_save_button = document.getElementById("quick-mode-button");

const data = [];

window.addEventListener("blur", function() {
  console.log("blur");
  navigator.sendBeacon("http://localhost:5000", JSON.stringify(data));
});

window.addEventListener("unload", function() {
  console.log("unload");
});
window.addEventListener("pagehide", function() {
  console.log("pagehide");
});


quick_save_button.addEventListener("click", function() {
  console.log("quick_save_button");
  const note = document.getElementById("quick-mode-text").value;

  const start = performance.now();

  let existing_notes = window.localStorage.getItem("notes");
  if (existing_notes != null) {
    let parsed_existing_notes = JSON.parse(existing_notes);
    parsed_existing_notes.push(note);
    existing_notes = parsed_existing_notes;
  } else {
    existing_notes = [note];
  }

  window.localStorage.setItem("notes", JSON.stringify(existing_notes));

  // const data = {"method": "quick-mode"};

  data.push({"method": "quick-mode"});

  // const response = fetch("http://localhost:5000", {
  //   method: "POST",
  //   body: JSON.stringify(data)
  // });

  const end = performance.now();
  data.push({"save-time": end - start});
  console.log(window.localStorage.getItem("notes"));
});

const observer = new PerformanceObserver((list) => {
  data.push({"first-contentful-paint": list.getEntries()[0].startTime});
  //console.log(JSON.stringify(list.getEntries()[0]));
});

observer.observe({type: "paint"});

// Full Mode
const fullModePanel = {
  allowScriptsToClose: true,
  type: "panel",
  url: browser.runtime.getURL("popup/full-mode.html"),
  width: 400,
  height: 400
};
document.getElementById("full-mode-button").addEventListener("click",
  function() {
    browser.windows.create(fullModePanel);
  }
);

// Feedback
const surveyPanel = {
  allowScriptsToClose: true,
  type: "panel",
  url: browser.runtime.getURL("popup/survey.html"),
  width: 400,
  height: 600
};

document.getElementById("survey-button").addEventListener("click",
  function() {
    browser.windows.create(surveyPanel);
  }
);

// List all notes
const allNotesPanel = {
  allowScriptsToClose: true,
  type: "panel",
  url: browser.runtime.getURL("popup/all-notes.html"),
  width: 400,
  height: 300
};

document.getElementById("list-all-notes").addEventListener("click",
  function() {
    browser.windows.create(allNotesPanel);
  }
);

// Remove all notes
document.getElementById("remove-all-notes").addEventListener("click",
  function() {
    window.localStorage.clear();
  }
);
