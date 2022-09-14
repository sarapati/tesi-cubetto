var reconnectTimeout = 2000;
var connected_flag = 0;
const STATUS_TOPICS = "ROOM/+/STATUS";
const FEEDBACK_TOPICS = "ROOM/+/FEEDBACK";
const clientID = "TACTCUBE";

const ROOM_TOPIC = "ROOM";

let status = {
	SMARTBULB : 0,
	SMARTSPEAKER : 0,
	SMARTCURTAIN : 0
}; //smartbulb, smartspeaker, smartcurtain
	
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
    client.onMessageArrived = onMessageArrived;

    // Connect the client, if successful, call onConnect function
    client.connect({ 
        onSuccess: onConnect,
		onFailure: onFailure,
    });
}

// Called when the client connects
function onConnect() {
    console.log("connected");
	
	// flag to check connection
	connected_flag = 1;

	sub_feedback_topics();
	sub_status_topics();
	sub_room_topic();
}


// Subcribing topic to get selected device (SOLO PER PROVARE)
function sub_room_topic() {
	// Checking if the TactCube is connected to the Environment
	if (connected_flag == 0) {
		console.log("Not Connected so can't subscribe");
	}
	
	// Print output for the user in the messages div
	console.log('Subscribing to: ' + ROOM_TOPIC);
	
	// Subscribe to the requested topics
	client.subscribe(ROOM_TOPIC);
}

// Subcribing topics reporting the status of each smart device
function sub_status_topics() {
	// Checking if the TactCube is connected to the Environment
	if (connected_flag == 0) {
		console.log("Not Connected so can't subscribe");
	}
	
	// Print output for the user in the messages div
	console.log('Subscribing to: ' + STATUS_TOPICS);
	
	// Subscribe to the requested topics
	client.subscribe(STATUS_TOPICS);
}

function sub_feedback_topics() {
	// Checking if the TactCube is connected to the Environment
	if (connected_flag == 0) {
		console.log("Not Connected so can't subscribe");
	}
	
	// Print output for the user in the messages div
	console.log('Subscribing to: ' + FEEDBACK_TOPICS);
	
	// Subscribe to the requested topics
	client.subscribe(FEEDBACK_TOPICS);
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

	if(connected_flag==0){
		if(msg=='tap-tap') startConnect();
	}
	else {
		//device = "SMARTBULB";
		console.log("Sending message "+msg+" to: "+device+" on topic: ROOM/"+device+"/CMD");
						message = new Paho.MQTT.Message(JSON.stringify({
			"from": clientID,
			"to": device,
			"timestamp": new Date(),
			"message": msg,
		}));
		message.destinationName = "ROOM/"+device+"/CMD";
		client.send(message);
		message.destinationName = "ROOM/CMD";
		client.send(message);
	}

	msg = $('#message').empty();
}

// Called when a message arrives
function onMessageArrived(arrived_message) {
	
	// Receiving status messages from devices
	obj = JSON.parse(arrived_message.payloadString);
	message_field = obj.message;
	//SOLO PER PROVA
	if(message_field == "SMARTBULB" || message_field == "SMARTSPEAKER" || message_field == "SMARTCURTAIN")
		device = message_field;
	
	// Setting devices availabilities
	// && feedbacks behavior
	switch(message_field){
		case "DF1": 
				startVibration("short");
				
				if(obj.from == "SMARTBULB")
					status.SMARTBULB=1;
				if(obj.from == "SMARTSPEAKER")
					status.SMARTSPEAKER=1;
				if(obj.from == "SMARTCURTAIN")
					status.SMARTCURTAIN=1;
				
				console.log('status_var updated: '+ status.SMARTBULB + status.SMARTCURTAIN + status.SMARTSPEAKER);

				break;
		case "UNAVAILABLE": // DF2???
				if(obj.from == "SMARTBULB"){
					status.SMARTBULB=0;
					temperatureCube("cooldown");
				}
				if(obj.from == "SMARTSPEAKER") {
					status.SMARTSPEAKER=0;
					mixedVibrations();
				}
				if(obj.from == "SMARTCURTAIN") {
						status.SMARTCURTAIN=0;
					temperatureCube("cooldown");
				}
				
				console.log('status_var updated: '+ status.SMARTBULB + status.SMARTCURTAIN + status.SMARTSPEAKER);
				
				break;
		case "DF3": temperatureCube("warmup");
					break;
		case "DF4": temperatureCube("cooldown");
					break;
		case "DF5": temperatureCube("warmup");
					break;
		case "DF6": 
				startVibration("long");				
				break;
		case "DF7": mixedVibrations();
					break;
	}	


	console.log('Message arrived from: '+ obj.from + ' content: ' + message_field);
//    updateScroll(); // Scroll to bottom of window
	$('#feedbacks').append("<span style='color:green'>FEEDBACK from "+obj.from+": </span>"+message_field+", "+msg_info[message_field]+"<br>");
	
	updateScroll("feedbacks");


	
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
    updateScroll(); // Scroll to bottom of window
}

// Updates #messages div to auto-scroll
function updateScroll(id) {
    var element = document.getElementById(id);
    element.scrollTop = element.scrollHeight;
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

