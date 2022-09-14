const TESTING_ROOM_TOPIC = "TESTINGROOM/CMD";
const TESTING_ROOM_FEEDBACK_TOPIC = "TESTINGROOM/FEEDBACK";

ID = "ROOM";
ROOM_TOPIC = "ROOM";
ROOM_CMD_TOPIC = "ROOM/CMD";
var mqtt;
// Time after which trying again the connection
var reconnectTimeout = 2000;

	var light_sensor_value = 0;
	var daytime;

//Starting the connection
MQTTRoomConnect();

//Executes the connection of the device to Mosquitto Server
	function MQTTRoomConnect() {
		host = "localhost";
		port = "9001";
		console.log(ID+ " connecting to " + host + " " + port);
		mqtt = new Paho.MQTT.Client(host, Number(port), ID);
		mqtt.onConnectionLost = onConnectionLost;
		mqtt.onMessageArrived = onMessageArrived;
				
		var options = {
			timeout: 3,
			onSuccess: onConnectRoom,
			onFailure: onFailure,
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
	
function sub_testing_room_cmd_topic() {

	// Print output for the user in the messages div
	console.log('Subscribing to: ' + TESTING_ROOM_TOPIC);
	
	// Subscribe to the requested topics
	mqtt.subscribe(TESTING_ROOM_TOPIC);
}

// Once a connection has been made	
function onConnectRoom() {
		// Set connection flag 
		console.log(ID+" Connected ");
		 sub_testing_room_cmd_topic();
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
	
	console.log("Sending message "+msg+" to topic: "+ TESTING_ROOM_FEEDBACK_TOPIC);

	let messageRoom = new Paho.MQTT.Message(JSON.stringify({
			"from": ID,
			"to": "TACTCUBE",
			"timestamp": new Date(),
			"message": msg
		}));
		messageRoom.qos = 2;
		messageRoom.destinationName = TESTING_ROOM_FEEDBACK_TOPIC;
		mqtt.send(messageRoom);
	
}


	

	//Gestione dei messaggi in arrivo
	function onMessageArrived(r_message) {
		const obj = JSON.parse(r_message.payloadString);
	
		var taskToExecute;
		var taskDevice;
		
		if($("#feedbacksBox").is(":visible")) {
			$('#chosen_fdbk').text(obj.message);
			taskToExecute = feedbackArrayJson[n].idTask;
			taskDevice = feedbackArrayJson[n].device;
		
			} else {
				$('#chosen_cmd').text(obj.message);
				taskToExecute = questionArrayJson[n].idTask;
				taskDevice = questionArrayJson[n].device;
		}
		console.log(feedbackArrayJson[n].type);
		console.log(questionArrayJson[n].type);
		
		
		switch(taskToExecute){
			case "EA1": connectingDevices(1);
						break;
			case "DA1": if(taskDevice == "smartbulb") turnOnBulb(obj); 
						else if(taskDevice == "smartcurtain") turnOnCurtain(obj); 
						else if(taskDevice == "smartspeaker") turnOnSpeaker(obj); 
						break;
			case "DA2": if(taskDevice == "smartbulb") turnOffBulb(obj); 
						else if(taskDevice == "smartcurtain") turnOffCurtain(obj); 
						else if(taskDevice == "smartspeaker") turnOffSpeaker(obj); 
						break;
			case "DA3+": if(taskDevice == "smartbulb") playBulb(obj);
						else if(taskDevice == "smartcurtain") playCurtain(obj);
						else if(taskDevice == "smartspeaker") playSpeaker(obj);
						break;
			case "DA3-": if(taskDevice == "smartbulb") stopBulb(obj);
						else if(taskDevice == "smartcurtain") stopCurtain(obj);
						else if(taskDevice == "smartspeaker") stopSpeaker(obj);
						break;
			case "EN1": if(taskDevice == "smartbulb") selectBulb(obj);
						else if(taskDevice == "smartcurtain") selectCurtain(obj);	
						else if(taskDevice == "smartspeaker") selectSpeaker(obj);	
						break;
			case "EN2": if(taskDevice == "smartbulb") deselectBulb(obj);	
						else if(taskDevice == "smartcurtain") deselectCurtain(obj);	
						else if(taskDevice == "smartspeaker") deselectSpeaker(obj);	
						break;
			case "DN1": if(taskDevice == "smartbulb") increaseBulbLightIntensity(obj);
						else if(taskDevice == "smartcurtain") increaseCurtainLightIntensity(obj);
						else if(taskDevice == "smartspeaker") increaseSpeakerVolumeIntensity(obj);
						break;
			case "DN2": if(taskDevice == "smartbulb") decreaseBulbLightIntensity(obj);
						else if(taskDevice == "smartcurtain") decreaseCurtainLightIntensity(obj);
						else if(taskDevice == "smartspeaker") decreaseSpeakerVolumeIntensity(obj);
						break;
			case "DN3+": if(taskDevice == "smartbulb") changeBulbColorAhead(obj);
						else if(taskDevice == "smartcurtain") openCurtain(obj);
						else if(taskDevice == "smartspeaker") changeSpeakerSongAhead(obj); 
						break;
			case "DN3-": if(taskDevice == "smartbulb") changeBulbColorBack(obj);
						else if(taskDevice == "smartcurtain") closeCurtain(obj);
						else if(taskDevice == "smartspeaker") changeSpeakerSongBack(obj); 
						break;
			case "DN4": if(taskDevice == "smartspeaker") changeSpeakerProgram(obj);
						break;
			case "DN5": if(taskDevice == "smartbulb") switchOnTimeBulb(obj);
						else if(taskDevice == "smartcurtain") switchOnTimeCurtain(obj);
						else if(taskDevice == "smartspeaker") switchOnTimeSpeaker(obj);
						break;
			case "DN6": if(taskDevice == "smartbulb") shutDownTimeBulb(obj);
						else if(taskDevice == "smartcurtain") shutDownTimeCurtain(obj);
						else if(taskDevice == "smartspeaker") shutDownTimeSpeaker(obj);
						break;
			
			
			
		} 
	}
	
function updateSmartRoom(currentTask){
	
	connectingDevices(1);
	selectingDevices(1);
	
	var task_var = currentTask.idTask;
	if(task_var == "EA1") { // access environment
		connectingDevices(0);
		selectingDevices(0);
		turnOnDevices(true, false, false);
		whiteLightOn();
		stopDevices(true, true, true);
		}
	
	
	else if(task_var == "DA1") { // turn on
		whiteLightOn();
	
		if(currentTask.device == "smartbulb") {		
			stopDevices(true, true, false);
			if(bulb_var.getBulbStatus()) lightOff();
	
		} else if(currentTask.device  == "smartcurtain") {
			stopDevices(true, true, false);
			if(getCurtainStatus()) spegni();

		}
		else if(currentTask.device  == "smartspeaker") {
			stopDevices(true, true, true);
			if(getSpeakerStatus()) powerOff();

		}	

	} 
		
	
	else if(task_var == "DA2") { // turn off
	
		whiteLightOn();
		
		//verificare che tenda è chiusa
		if(currentTask.device == "smartbulb") {
			turnOnDevices(true, false, false);
			stopDevices(true, true, false);
		}
		
		else if(currentTask.device  == "smartcurtain") {
			turnOnDevices(true, true, false);
			stopDevices(true, false, false);
		}
		else if(currentTask.device  == "smartspeaker") {
				turnOnDevices(true, false, true);
				stopDevices(true, true, false);
		if(!getSpeakerPlaying()) playSong();

		}
		
	} 
	
	
	
	
	else if(task_var == "DA3+") { //play program
		whiteLightOn();

		if(currentTask.device == "smartbulb") {
			turnOnDevices(true, false, false);
			stopDevices(true, true, false);
			switchBulbProgram(2);
			
		}
		else if(currentTask.device  == "smartcurtain") {
			turnOnDevices(true, true, false);
			stopDevices(true, true, false);
			switchCurtainProgram(2);		
}
		else if(currentTask.device  == "smartspeaker") {		
			turnOnDevices(true, false, true);
			stopDevices(true, true, true);
		}
	} 
	
	
	
	else if(task_var == "DA3-") { //stop program
		whiteLightOn();

		
		if(currentTask.device == "smartbulb") {
			stopDevices(true, true, false);
			turnOnDevices(true, false, false);
			switchBulbProgram(2);
			playBulbProgram();
		}
		else if(currentTask.device  == "smartcurtain") {
			stopDevices(true, false, false);
			turnOnDevices(true, true, false);

			switchCurtainProgram(2);
			playCurtainProgram();
		}
		else if(currentTask.device  == "smartspeaker") {
					stopDevices(true, true, false);

				turnOnDevices(true, false, true);
			playSong();

		}
	
	} 
	
	
	
	else if(task_var == "EN1") { //select 
		selectingDevices(0);	
		turnOnDevices(true, false, false);
		whiteLightOn();
		
		if(currentTask.device == "smartbulb") {		
			stopDevices(true, true, false);
			if(bulb_var.getBulbStatus()) lightOff();
	
		} else if(currentTask.device  == "smartcurtain") {
			stopDevices(true, true, false);
			if(getCurtainStatus()) spegni();

		}
		else if(currentTask.device  == "smartspeaker") {
			stopDevices(true, true, true);
			if(getSpeakerStatus()) powerOff();

		}	
	
	} 
	
	
	
	else if(task_var == "EN2") { //deselect
		turnOnDevices(true, false, false);
		stopDevices(true, true, false);
		whiteLightOn();
	} 
	
	
	else if(task_var == "DN1") { // increase
		
		whiteLightOn();

		
		if(currentTask.device == "smartbulb") {
			stopDevices(true, true, false);
			turnOnDevices(true, false, false);
			chiudi_seq();
			cambiaIntens(-1);
			
		}
		else if(currentTask.device  == "smartcurtain") {
			stopDevices(true, true, false);
			turnOnDevices(false, true, false);
			if(bulb_var.getBulbStatus()) lightOff();
 			decrementa();
		}
		else if(currentTask.device  == "smartspeaker") {
					stopDevices(true, true, false);
				turnOnDevices(true, false, true);
				if(!getSpeakerPlaying()) playSong();
				volDown();
		}
		
	} else if(task_var == "DN2") { // decrease
			whiteLightOn();

	if(currentTask.device == "smartbulb") {
			stopDevices(true, true, false);
			turnOnDevices(true, false, false);
			chiudi_seq();
			
		}
		else if(currentTask.device  == "smartcurtain") {
			stopDevices(true, true, false);
			turnOnDevices(false, true, false);
			if(bulb_var.getBulbStatus()) lightOff();
 			incrementa();
		}
		else if(currentTask.device  == "smartspeaker") {
					stopDevices(true, true, false);
				turnOnDevices(true, false, true);
		}
		
	} else if(task_var == "DN3+") { // ahead
	
		whiteLightOn();

		
		if(currentTask.device == "smartbulb") {
			stopDevices(true, true, false);
			turnOnDevices(true, false, false);
		
			
		}
		else if(currentTask.device  == "smartcurtain") {
			stopDevices(true, true, false);
			turnOnDevices(false, true, false);
			if(bulb_var.getBulbStatus()) lightOff();
		}
		else if(currentTask.device  == "smartspeaker") {
				stopDevices(true, true, false);
				turnOnDevices(true, false, true);
				if(!getSpeakerPlaying()) playSong();

		}
		
	} else if(task_var == "DN3-") { // back
		
		whiteLightOn();

		
		if(currentTask.device == "smartbulb") {
			stopDevices(true, true, false);
			turnOnDevices(true, false, false);
		
			
		}
		else if(currentTask.device  == "smartcurtain") {
			stopDevices(true, true, false);
			turnOnDevices(false, true, false);
			if(bulb_var.getBulbStatus()) lightOff();
			apri_seq();
		}
		else if(currentTask.device  == "smartspeaker") {
				stopDevices(true, true, false);
				turnOnDevices(true, false, true);
				if(!getSpeakerPlaying()) playSong();

		}
		
	} else if(task_var == "DN4") { // select behavioural program
	
		whiteLightOn();

		
		if(currentTask.device == "smartbulb") {
			stopDevices(true, true, false);
			turnOnDevices(true, false, false);
			chiudi_seq();
			
		}
		else if(currentTask.device  == "smartcurtain") {
			stopDevices(true, true, false);
			turnOnDevices(false, true, false);
			if(bulb_var.getBulbStatus()) lightOff();
		}
		
		else if(currentTask.device  == "smartspeaker") {
				stopDevices(true, true, false);
				turnOnDevices(true, false, true);

		}
		
	} else if(task_var == "DN5") { // switchon
	
		whiteLightOn();

		
		if(currentTask.device == "smartbulb") {
			if(bulb_var.getBulbStatus()) lightOff();
			stopDevices(true, true, false);
			turnOnDevices(false, false, false);
		
			
		}
		else if(currentTask.device  == "smartcurtain") {
			stopDevices(true, true, false);
			turnOnDevices(true, false, false);
			if(getCurtainStatus()) spegni();
		}
		else if(currentTask.device  == "smartspeaker") {
				stopDevices(true, true, true);
				turnOnDevices(true, false, false);
			if(getSpeakerStatus()) powerOff();

		}
		
	} else if(task_var == "DN6") { // shutdown
		whiteLightOn();

		
		if(currentTask.device == "smartbulb") {
			stopDevices(true, true, false);
			turnOnDevices(true, false, false);
		
			
		}
		else if(currentTask.device  == "smartcurtain") {
			stopDevices(true, true, false);
			turnOnDevices(true, true, false);
		}
		else if(currentTask.device  == "smartspeaker") {
				stopDevices(true, true, false);
				turnOnDevices(true, false, true);

		}
	}
}

//REQUIREMENTS:

//tutti i dispositivi sono connessi o non connessi
function connectingDevices(n){
		if(connected_flag.SMARTBULB!=n && connected_flag.SMARTSPEAKER!=n && connected_flag.SMARTCURTAIN!=n){
		connected_flag.SMARTBULB=n;
			connected_flag.SMARTSPEAKER=n;
			connected_flag.SMARTCURTAIN=n;
			console.log("Connected: " + connected_flag.SMARTCURTAIN + connected_flag.SMARTBULB + connected_flag.SMARTSPEAKER);
	}
}


// lampadina sempre accesa, massimo della luminosità, luce bianca
function whiteLightOn(){
			if(!bulb_var.getBulbStatus()) lightUp();
			indexBulbColor = 0;
			indexBulbLight = 6;
			saturation_subtract = 98;
			generateRGBs();
			generateCSSrules();
			updateBulb(500);
			backgroundIntensitySettings(500);
			backgroundColorSetting(500);

		}

// stoppa i dispositivi dal proprio programma in base a valori booleani
function stopDevices(l, c, s){
		if(l && bulb_var.getBulbPlaying()) stopProgram();
		if(c && getCurtainPlaying()) {
			ferma();
			chiudi_seq();
		}
		if(s && getSpeakerPlaying()) stopSong();

}

// tutti i dispositivi sono selezionati o non selezionati
function selectingDevices(n) {
	if(selected_flag.SMARTBULB!=n && selected_flag.SMARTSPEAKER!=n && selected_flag.SMARTCURTAIN!=n){
	selected_flag.SMARTBULB=n;
	selected_flag.SMARTSPEAKER=n;
	selected_flag.SMARTCURTAIN=n;
	console.log("Selected: " + selected_flag.SMARTCURTAIN + selected_flag.SMARTBULB + selected_flag.SMARTSPEAKER);
	}
}

// accendi i dispositivi in base a valori booleani
function turnOnDevices(l, c, s) {
		if(l && !bulb_var.getBulbStatus()) lightUp();
		if(c && !getCurtainStatus()) accendi();
		if(s && !getSpeakerStatus()) powerOn();

}
