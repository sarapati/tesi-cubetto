var reconnectTimeout = 2000;

const clientID = "TACTCUBE";

const TESTING_ROOM_TOPIC = "TESTINGROOM/CMD";
const TESTING_ROOM_FEEDBACK_TOPIC = "TESTINGROOM/FEEDBACK";

var select = status;	
var device = "";
var audio = new Audio();
var msg_info = {
	DF1 : "device announcement",
	DF2 : "device is not ready",
	DF3 : "device is on",
	DF4 : "device is off",
	DF5 : "device is loading",
	DF6 : "action successfully accomplished",
	DF7 : "device generated an error",
	ROOM : "device is ready",
	NONE : "no devices"
};
var message_field;

startConnect();

function onFailure() {
		console.log("Failed");
		setTimeout(startConnect, reconnectTimeout);
	}

function startConnect() {
    // hostname/IP address and port number 
    host = "localhost";
	port = "9001";

    // Print output for the user on console
   	console.log(clientID + ' connecting to: ' + host + ' on port: ' + port);

    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // Set callback handlers
    client.onConnectionLost = onConnectionLost;

    // Connect the client, if successful, call onConnect function
    client.connect({ 
        onSuccess: onConnect,
		onFailure: onFailure,
    });
}

// Called when the client connects
function onConnect() {
    console.log("connected");

	sub_testing_room_feedback_topic();
}


// Subcribing topic to get selected device (SOLO PER PROVARE)
function sub_testing_room_feedback_topic() {

	// Print output for the user in the messages div
	console.log('Subscribing to: ' + TESTING_ROOM_FEEDBACK_TOPIC);
	
	// Subscribe to the requested topics
	client.subscribe(TESTING_ROOM_FEEDBACK_TOPIC);
}


// Called when the client loses its connection
function onConnectionLost(responseObject) {
    console.log("connection lost");
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
    }
}

function sendMessage(){
		msg = $('#message').text();

		console.log("Sending message "+msg+" to topic: "+ TESTING_ROOM_TOPIC);
		message = new Paho.MQTT.Message(JSON.stringify({
			"from": clientID,
			"to": "ROOM",
			"timestamp": new Date(),
			"message": msg
		}));
		message.destinationName = TESTING_ROOM_TOPIC;
		client.send(message);

		msg = $('#message').empty();
}



// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
    updateScroll(); // Scroll to bottom of window
}


function startVibration(vibration_type){
	var className = "cube_shake_"+vibration_type;
	$(".cube").addClass(className);
	 audio.src = 'audio/cell-phone-vibrate-' + vibration_type + '.mp3';
	audio.play();
	audio.onended = function() {
  			 
	$(".cube").removeClass(className);
	}
}


function mixedVibrations(){
	startVibration("short");
	setTimeout(startVibration, 1500, "long");
	setTimeout(startVibration, 3600, "short");				
}


function temperatureCube(temperature_type) {
	var elems = document.getElementsByClassName("cube__face");
	
	for(var t = 0; t<elems.length; t++){
		elems[t].classList.add(temperature_type);
	elems[t].addEventListener("animationend", function() {
				this.classList.remove(temperature_type);	
		});
	}	
}

