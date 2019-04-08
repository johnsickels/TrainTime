var config = {
    apiKey: "AIzaSyBxhJiDxRmSQODdMxa_tMMMvBbf_deI4EY",
    authDomain: "traintime-53bc3.firebaseapp.com",
    databaseURL: "https://traintime-53bc3.firebaseio.com",
    projectId: "traintime-53bc3",
    storageBucket: "traintime-53bc3.appspot.com",
    messagingSenderId: "638419772240"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train").on("click", function(event) {
    event.preventDefault();
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = $("#first-train-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    var newTrain = {
        name: trainName,
        destination: destination,
        first: firstTrainTime,
        frequency: frequency,
    };
    database.ref().push(newTrain);
    alert("Train successfully added");
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;

    var nextArrival
    var minutesAway

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTrainTime),
        $("<td>").text(frequency)

    );

    $("#train-table > tbody").append(newRow);
});