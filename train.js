$(document).ready(function(){
  
  // var tFrequency = $("#frequency");
  // var firstTime = $("#first-scheduled")


  var config = {
    apiKey: "AIzaSyDy8McCp_lNm8Jj-cFyfhh03NtGKOag7Uc",
    authDomain: "test-8483a.firebaseapp.com",
    databaseURL: "https://test-8483a.firebaseio.com",
    projectId: "test-8483a",
    storageBucket: "test-8483a.appspot.com",
    messagingSenderId: "851267702457"
  };

  firebase.initializeApp(config);

  var database =  firebase.database();


  $("#add-train-btn").on("click", function(event) {
    event.preventDefault()
    var trainInput = $("#train-name-input").val().trim();
    var destInput = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-scheduled").val().trim(), "hh:mm").format("hh:mm");
    var frequency = $("#frequency").val().trim();

    var newTrain = {
      name: trainInput,
      destination: destInput,
      first: firstTrain,
      frequency: frequency
    };
   
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    alert("Choo Choo! Here comes a new train!");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-scheduled").val("");
    $("#frequency").val("");
  });

  database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    var trainInput = childSnapshot.val().name;
    var destInput = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;

    console.log(trainInput);
    console.log(destInput);
    console.log(firstTrain);
    console.log(frequency);

    var firstTrainFormat = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTrainFormat);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTrainFormat), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

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