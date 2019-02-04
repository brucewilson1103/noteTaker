var $notesList = $("#notes-list");
var $noteTitle = $("#note-title");
var $noteText = $("#note-text");

var $submitBtn = $("#submit-btn");
$submitBtn.on("click",handleNoteSubmit);

// Gets all notes from the database, renders the notes list
var getAndRenderNotes = function() {
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function(data) {
    var $listItems = [];

    // Loop through and build a list item for each note returned from the db
    for (var i = 0; i < data.length; i++) {
      var note = data[i];

      // Using the jQuery `data` method, we can attach data to an element for later use
      var $li = $("<li class='list-group-item'>").data(note);
      var $row = $("<div class='row'>");
      var $col11 = $("<div class='col-11'>");
      var $noteP = $("<p>").text('"' + note.text + '"');
      var $authorP = $("<p class='float-right'>").text("- " + note.author);
      var $clearFix = $("<div class='clearfix'>");
      var $ratingP = $("<p class='float-right'>").text(note.rating);
      var $col1 = $("<div class='col-1'>");
      var $upIcon = $("<i class='fas fa-angle-up'>");
      var $downIcon = $("<i class='fas fa-angle-down'>");

      $li.append(
        $row.append(
          $col11.append($noteP, $authorP, $clearFix, $ratingP),
          $col1.append($upIcon, $downIcon)
        )
      );

      $listItems.push($li);
    }

    $notesList.empty();

    $notesList.append($listItems);
  });
};

// Increments or decrements the rating and updates the note in the db
var handleRatingChange = function() {
  // Getting a reference to the note data stored on the list item earlier
  var note = $(this).parents(".list-group-item").data();
  var shouldIncrement = $(this).hasClass("fa-angle-up");

  // If the up arrow was clicked, increment the rating, else decrement it
  if (shouldIncrement) {
    note.rating++;
  } else {
    note.rating--;
  }

  // Submit a PUT request to update the note's rating
  $.ajax({
    url: "/api/notes/" + note.id,
    method: "PUT",
    data: note
  })
    .then(function() {
      getAndRendernotes();
    });
};

// Submits the note from the form to the db
var handlenoteSubmit = function(event) {
  event.preventDefault();

  var note = {
    author: $noteAuthor.val().trim(),
    text: $noteText.val().trim()
  };

  if (!note.author || !note.text) {
    alert("Please fill out all the required fields!");
    return;
  }

  $.ajax({
    url: "/api/notes",
    method: "POST",
    data: note
  })
    .then(function() {
      getAndRendernotes();
      $noteAuthor.val("");
      $noteText.val("");
    });
};


getAndRendernotes();

$submitBtn.on("click", handlenoteSubmit);









// this is what I made without reference to class activity
var handleNoteSubmit = function(event) {
  event.preventDefault();

  var Note = {
    author: $noteAuthor.val().trim(),
    text: $noteText.val().trim()
  };

  if (!note.author || !note.text) {
    alert("Please fill out all the required fields!");
    return;
  }

  $.ajax({
    url: "/api/notes",
    method: "POST",
    data: Note
  })
    .then(function() {
      getAndRendernotes();
      $noteAuthor.val("");
      $noteText.val("");
    });
};