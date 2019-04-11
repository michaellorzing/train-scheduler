$(document).ready(function(){
  
  var tFrequency = "";
  var firstTime=""


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
    var firstTrain = moment($("#first-scheduled").val().trim(), "hh:mm").format("X");
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

    var firstTrainFormat = moment.unix(firstTrain).format("hh:mm"); 

    var trainTime = moment().diff(moment(firstTrain, "X"), "minutes");

    var newRow = $("<tr>").append(
      $("<td>").text(trainInput),
      $("<td>").text(destInput),
      $("<td>").text(frequency),
      $("<td>").text(firstTrainFormat),
      // $("<td>").text(empRate),
      // $("<td>").text(empBilled)
    );

    $("tbody").append(newRow);

  })







});