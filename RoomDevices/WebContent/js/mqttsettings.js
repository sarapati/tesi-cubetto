/** Classe per la connessione MQTT Paho a Mosquitto LATO DEVICES.
Le funzioni comuni a tutti i dispositivi qui presenti sono:
- connessione
- connessione persa
- connessione fallita
- disconnessione
- riconnessione
- pubblicazione feedback/status
- iscrizione topic status/cmd(main) per ottenere msgs 
 */


// Variables for connection, selection and status
	
var status_flag = {
	SMARTBULB : 0,
	SMARTSPEAKER : 0,
	SMARTCURTAIN : 0
};
var selected_flag =  {
	SMARTBULB : 0,
	SMARTSPEAKER : 0,
	SMARTCURTAIN : 0
};
var connected_flag =  {
	SMARTBULB : 0,
	SMARTSPEAKER : 0,
	SMARTCURTAIN : 0
};

var mqtt;
// Time after which trying again the connection
var reconnectTimeout = 2000;
// Variables for feedback
var fb, feedback;


	function generateTopics(device) {
		FEEDBACK_TOPIC = "ROOM/"+device+"/FEEDBACK"; //feedback tattili per il cube
		STATUS_TOPIC = "ROOM/"+device+"/STATUS"; //indica se il disp è disponibile o no
		MAIN_TOPIC = "ROOM/"+device+"/CMD"; //per ricevere i messaggi di cmd
	}

//Executes the connection of the device to Mosquitto Server
	function MQTTconnect() {
		host = "localhost";
		port = "9001";
		console.log(ID+ " connecting to " + host + " " + port);
		mqtt = new Paho.MQTT.Client(host, Number(port), ID);
		mqtt.onConnectionLost = onConnectionLost;
		mqtt.onMessageArrived = onMessageArrived;
		
		generateTopics(ID);
		
		var lastWillMessage = new Paho.MQTT.Message(JSON.stringify({
			"from": ID,
			"to": "TACTCUBE",
			"timestamp": new Date(),
			"message": "UNAVAILABLE"
		}));
		lastWillMessage.destinationName = STATUS_TOPIC;
		lastWillMessage.qos = 2;
		lastWillMessage.retained = true;
		var options = {
			timeout: 3,
			onSuccess: onConnect,
			onFailure: onFailure,
	//		mqttVersion: 3,
			willMessage: lastWillMessage
		};
		mqtt.connect(options);
		return false;
	}
	
	
	// Connection lost
	function onConnectionLost(responseObject) {
		console.log(ID+": Connection Lost");
		 if (responseObject.errorCode !== 0) {
		        console.log(ID+" onConnectionLost: " + responseObject.errorMessage);
		    }
		setConnectedFlag(0);
		//connected_flag = 0;

	}
	
	//onMessageArrived implemented separately for each device
	

// Once a connection has been made	
function onConnect() {
		// Set connection flag 
		setConnectedFlag(1);
		//connected_flag = 1;
		console.log(ID+" Connected: " + connected_flag.SMARTCURTAIN + connected_flag.SMARTBULB + connected_flag.SMARTSPEAKER);
			//Subscribe main topic (cmd) and send the availability message
		sub_main_topic();
	//	sub_sensor_topic();
		//serve solo per il testing coi prototipi nel caso in cui chiuda la pagina del device
		pub_status_topic("DF1");
	}
		
	//Connection failed
	function onFailure() {
		console.log("Connection failed. Trying again...");
		setTimeout(MQTTconnect, reconnectTimeout);
	}
	
	// Executes the device disconnection from Mosquitto
	function onDisconnect() {
		mqtt.disconnect();
		console.log("Disconnected");
	}
	
	// Publishes the device availability feedback
	function tryToPair() {
	//	feedback = "DF1, available"; //"DF1, Device announcement ";
	//	fb = setInterval(pub_feedback_topic, 10000, feedback);
	feedback = "DF1"; 
		pub_status_topic(feedback);
	}
	
		//Avvisa tactcube che il dispositivo non è più disponibile 
	/** Utile quando il dispositivo si disconnette (CREDO per es. per un errore 
			imprevisto, wifi down, rottura dispositivo, batterie scariche, 
			corrente saltata)
	Quando il tactcube va a selezionare il dispositivo (nel caso reale un 
	dispositivo viene selezionato per prossimità grazie alla tecnologia BLE) 
	verrà ricevuto dal cube il feedback "dispositivo non pronto", ossia DF2	
	*/
	function sendUnavailable(){
		feedback = "UNAVAILABLE"; 
		pub_status_topic(feedback);
	
	}
	
	// Publishes feedbacks on the feedback topic so that the cube can read them
	function pub_feedback_topic(feedback) {
			generateTopics(ID);
	
	console.log("FEEDBACK - Publishing to topic: " + FEEDBACK_TOPIC + " message: " + feedback);
		message = new Paho.MQTT.Message(JSON.stringify({
			"from": ID,
			"to": "TACTCUBE",
			"timestamp": new Date(),
			"message": feedback
		}));
		message.destinationName = FEEDBACK_TOPIC;
	//	message.qos = 2;
		mqtt.send(message);
		return false;
	}
	
	function pub_status_topic(status) {
				generateTopics(ID);
console.log("Publishing to topic: " + STATUS_TOPIC + " message: " + status);
		message = new Paho.MQTT.Message(JSON.stringify({
			"from": ID,
			"to": "TACTCUBE",
			"timestamp": new Date(),
			"message": status
		}));
		message.destinationName = STATUS_TOPIC;
		message.qos = 2;
		message.retained = true;
		mqtt.send(message);
		return false;
	}
	
	//Subscribes the main(cmd) topic
	function sub_main_topic() {
			generateTopics(ID);
	if (connected_flag == 0) {
			out_msg = "Not Connected so can't subscribe"
			console.log(out_msg);
		} else {
			console.log("Subscribing to topic = " + MAIN_TOPIC);
			mqtt.subscribe(MAIN_TOPIC);
		}
		return false;
	}
	
	//Sottoscrizione al topic room/.../status per ottenere lo stato del dispositivo
	function sub_status_topic() {
			generateTopics(ID);
	console.log("Subscribing to topic = " + STATUS_TOPIC);
		mqtt.subscribe(STATUS_TOPIC);
		return false;
	}
	
	function unsub_status_topic() {
		mqtt.unsubscribe(STATUS_TOPIC);
	}
	
	
	
	
	
	function sendLightValue(msg){
	
		console.log("Sending message "+msg+" on topic: "+ SENSOR_TOPIC);
		let messageSensor = new Paho.MQTT.Message(JSON.stringify({
			"from": "LIGHTSENSOR",
			"to": "ROOM",
			"timestamp": new Date(),
			"message": msg
		}));
		messageSensor.qos = 2;
		messageSensor.retained = true;
		messageSensor.destinationName = SENSOR_TOPIC;
		mqtt.send(messageSensor);
	
}
	
	
	function setSelectedFlag(number){
				if(ID == "SMARTBULB")
					selected_flag.SMARTBULB=number;
				if(ID == "SMARTSPEAKER")
					selected_flag.SMARTSPEAKER=number;
				if(ID == "SMARTCURTAIN")
					selected_flag.SMARTCURTAIN=number;
	}
	
	function setConnectedFlag(number){
				if(ID == "SMARTBULB")
					connected_flag.SMARTBULB=number;
				if(ID == "SMARTSPEAKER")
					connected_flag.SMARTSPEAKER=number;
				if(ID == "SMARTCURTAIN")
					connected_flag.SMARTCURTAIN=number;
	}
	
	