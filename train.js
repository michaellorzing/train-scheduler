$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyDy8McCp_lNm8Jj-cFyfhh03NtGKOag7Uc",
    authDomain: "test-8483a.firebaseapp.com",
    databaseURL: "https://test-8483a.firebaseio.com",
    projectId: "test-8483a",
    storageBucket: "test-8483a.appspot.com",
    messagingSenderId: "851267702457"
  };

  firebase.initializeApp(config);

  var database = firebase.database();


  //wrote a couple functions for a real time clock
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    $("#time").html(h + ":" + m + ":" + s)
    t = setTimeout(function () {
      startTime()
    }, 500);
  }

  startTime();

  //add on click event to prevent page refresh and used jQuery to get the values from the input fields and store them in variables
  $("#add-train-btn").on("click", function (event) {
    event.preventDefault()
    var trainInput = $("#train-name-input").val().trim();
    var destInput = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-scheduled").val().trim(), "hh:mm").format("hh:mm");
    var frequency = $("#frequency").val().trim();

    //told firebase what the object should look like

    var newTrain = {
      name: trainInput,
      destination: destInput,
      first: firstTrain,
      frequency: frequency
    };

    //pushed the info to firebase

    database.ref().push(newTrain);

    alert("Choo Choo! Here comes a new train!");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-scheduled").val("");
    $("#frequency").val("");
  });

  //reference the dattabase for the snapshot of the object to later append it to the html. 

  database.ref().on("child_added", function (childSnapshot) {

    var trainInput = childSnapshot.val().name;
    var destInput = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;


    var firstTrainFormat = moment(firstTrain, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTrainFormat), "minutes"); 
    var tRemainder = diffTime % frequency;
    var tMinutesTillTrain = frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var newRow = $("<tr>").append(
      $("<td>").text(trainInput),
      $("<td>").text(destInput),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain)
    );

    $("tbody").append(newRow);

  })


});