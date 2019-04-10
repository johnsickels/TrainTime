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

$("#add-train").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = moment($("#first-train-time-input").val().trim(), 'HH:mm').format('X');
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
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;

    var firstTrain = moment(firstTrainTime, "HH:mm");
    console.log("first train: " + firstTrain);
    var timeRemainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
    console.log('time remainder: ' + timeRemainder);
    var minutesAway = frequency - timeRemainder;
    console.log('minutesAway: ' + minutesAway);
    var nextArrival = moment().add(minutesAway, "m").format("HH:mm A");
    console.log('next arrival: ' + nextArrival);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minutesAway)

    );

    $("#train-table > tbody").append(newRow);
});