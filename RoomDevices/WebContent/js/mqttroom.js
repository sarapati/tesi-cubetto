
ID = "ROOM";
ROOM_TOPIC = "ROOM";
ROOM_CMD_TOPIC = "ROOM/CMD";
// Variables for connection, selection and status
var mqtt;
// Time after which trying again the connection
var reconnectTimeout = 2000;

	var light_sensor_value = 0;
	var daytime;

//Starting the connection
MQTTRoomConnect();

// The device send the message "UNAVAILABLE" when the browser page is closed/refreshed
//window.onbeforeunload = sendUnavailable;
// changed with willMessage !!

//Executes the connection of the device to Mosquitto Server
	function MQTTRoomConnect() {
		host = "localhost";
		port = "9001";
		console.log(ID+ " connecting to " + host + " " + port);
		mqtt = new Paho.MQTT.Client(host, Number(port), ID);
		mqtt.onConnectionLost = onConnectionLost;
		mqtt.onMessageArrived = onMessageArrived;
				
		var roomLWM = new Paho.MQTT.Message(JSON.stringify({
			"from": ID,
			"to": "TACTCUBE",
			"timestamp": new Date(),
			"message": "NONE"
		}));
		roomLWM.destinationName = ROOM_TOPIC;	
		roomLWM.qos = 2;
		roomLWM.retained = true;
		var options = {
			timeout: 3,
			onSuccess: onConnectRoom,
			onFailure: onFailure,
	//		mqttVersion: 3,
			willMessage: roomLWM
		};
		mqtt.connect(options);
		return false;
	}
	
		
	// Connection lost
	function onConnectionLost(responseObject) {
		 if (responseObject.errorCode !== 0) {
		        console.log(ID+" onConnectionLost: " + responseObject.errorMessage);
		    }
	}
	


//Sottoscrizione al topic room/sensor per ottenere il valore del sensore
	function sub_sensor_topic() {
	console.log("Subscribing to topic = " + SENSOR_TOPIC);
		mqtt.subscribe(SENSOR_TOPIC);
		return false;
	}
	
	
//Sottoscrizione al topic room/cmd per ottenere i comandi generali mandati da cubo
	function sub_cmd_topic() {
	console.log("Subscribing to topic = " + ROOM_CMD_TOPIC);
	mqtt.subscribe(ROOM_CMD_TOPIC);
		return false;
	}

// Once a connection has been made	
function onConnectRoom() {
		// Set connection flag 
		console.log(ID+" Connected ");
		 sub_sensor_topic();
	sub_cmd_topic();
	}
		
	//Connection failed
	function onFailure() {
		console.log("Connection failed. Trying again...");
		setTimeout(MQTTRoomConnect, reconnectTimeout);
	}
	
	// Executes the device disconnection from Mosquitto
	function onDisconnect() {
		mqtt.disconnect();
		console.log("Disconnected");
	}
	
	
	function sendMessageRoom(msg){
	
		console.log("Sending message "+msg+" to: TACTCUBE on topic: "+ ROOM_TOPIC);
		let messageRoom = new Paho.MQTT.Message(JSON.stringify({
			"from": ID,
			"to": "TACTCUBE",
			"timestamp": new Date(),
			"message": msg
		}));
		messageRoom.qos = 2;
		messageRoom.retained = true;
		messageRoom.destinationName = ROOM_TOPIC;
		mqtt.send(messageRoom);
	
}


	

	//Gestione dei messaggi in arrivo
	function onMessageArrived(r_message) {
		const obj = JSON.parse(r_message.payloadString);
	

		if(obj.from=="LIGHTSENSOR"){
			
			daytime = obj.timestamp;
			// il valore serve per capire quanta luce c'è, utile in generale
			// può capitare che sia giorno e ci sia il sole ma non ci sia luce
			// perchè le nuvole si sono messe davanti
			// daytime serve per simulare il follow the sun
			// il sole si sposta fisso da est a ovest anche se coperto da nuvole
			// possiamo tracciare questi spostamenti (simulando) con l'orario
			// es. a un certo range di orario, il sole si trova più a destra
			// ad un altro range, più a sinistra
			// si inviano questi valori via mqtt e la tenda li riceve
			// aggiorna man mano l'apertura delle pale, le cui intensità fisse 
			// sono corrispondenti a determinati range orari
			// quando il programma viene arrestato o azzerato, bisogna comunque
			// tenere aggiornato questo sistema in qualche modo
			// cosi che ad un orario diverso se l'utente vuole di nuovo avviare
			// il task, essa non riparte dall'inizio ma da dove il sole si trova
			if(obj.message != light_sensor_value) {
				light_sensor_value = obj.message;
			}
		}
		
	/*	if(obj.from=="TACTCUBE"){
		
			switch (obj.message) {
	
	
			case "sinistra-tap":  
				
				break;
	
			
			case "destra-tap": 
				
				break;
	
		
			case "avanti-tap": 
				if(light_sensor_value> 20){
					device = "SMARTCURTAIN";
					selectCurtain(obj);
					openCurtain(obj);
					
				} else {
					selectBulb(obj);
					turnOnBulb(obj); 
				}
				break;
			
					
			case "indietro-tap":
				
				break;
	
	
			case "tap":
				
				if(light_sensor_value> 20){
					selectCurtain(obj);
					openCurtain(obj);
					
				} else {
					selectBulb(obj);
					turnOnBulb(obj); 
				}
				
				break;
	
		
			case "tap-tap":
				
				break;
			
			
			case "avanti":
				
				break;
	
			
			case "indietro":
				
				break;
				
			
			case "destra-tap-tap":
				
				break;
	
			
			case "sinistra-tap-tap":
				
				break;
	
	
			case "avanti-tap-tap":
				
				break;
	
		
			case "indietro-tap-tap":
				
				break;
			
			}	
		}*/
				 
	}
	
	