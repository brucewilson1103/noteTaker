// saved notes div reference
var $notesList = $("#notes-list");
// reference to the input from note title
var $noteTitle = $("#note-title");
// reference to the input from the note text
var $noteMessage = $("#note-text");

// this button must be clicked in order to send req.body to database
var $submitBtn = $("#submit-btn");
// $submitBtn.on("click",handleNoteSubmit);

// once it is in the database the user must refresh the page to see that it has been added?

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
      var $noteP = $("<p>").text('"' + note.message + '"');
      var $titleP = $("<p class='float-right'>").text("- " + note.title);
      var $clearFix = $("<div class='clearfix'>");
      var $col1 = $("<div class='col-1'>");
      var $trashIcon = $("<i class='fas fa-trash-alt js-delete-note'>");
      $trashIcon.attr("data-id", note.id)

      $li.append(
        $row.append(
          $col11.append($noteP, $titleP, $clearFix),
          $col1.append($trashIcon)
      ));

      $listItems.push($li);
    }

    $notesList.empty();

    $notesList.append($listItems);
  });
};

$(document).on("click", ".js-delete-note", function(){
  $.ajax({
    url: "/api/notes/" + $(this).attr("data-id"),
    method: "DELETE"
  })
  .then(function(data){
    console.log(data);
    location.reload();
  } )
});

// Submits the note from the form to the db
var handleNoteSubmit = function(event) {
  event.preventDefault();

  var note = {
    title: $noteTitle.val().trim(),
    message: $noteMessage.val().trim()
  };

  if (!note.title || !note.message) {
    alert("Please fill out all the required fields!");
    return;
  }

  $.ajax({
    url: "/api/notes",
    method: "POST",
    data: note
  })
    .then(function() {
      getAndRenderNotes();
      $noteTitle.val("");
      $noteMessage.val("");
    });
};


getAndRenderNotes();

$submitBtn.on("click", handleNoteSubmit);

// // this is what I made without reference to class activity
// var handleNoteSubmit = function(event) {
//   event.preventDefault();

//   var Note = {
//     title: $notetitle.val().trim(),
//     text: $noteMessage.val().trim()
//   };

//   if (!note.title || !note.text) {
//     alert("Please fill out all the required fields!");
//     return;
//   }

//   $.ajax({
//     url: "/api/notes",
//     method: "POST",
//     data: Note
//   })
//     .then(function() {
//       getAndRendernotes();
//       $notetitle.val("");
//       $noteMessage.val("");
//     });
// };