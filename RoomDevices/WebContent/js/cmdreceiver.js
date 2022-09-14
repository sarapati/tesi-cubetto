	
	//Gestione dei messaggi in arrivo
	function onMessageArrived(r_message) {
		const obj = JSON.parse(r_message.payloadString);
		
		switch (obj.message) {
	
	
			case "sinistra-tap":  
				if(obj.to=="SMARTBULB"){
					// theres no task executable with this cmd
				} else if(obj.to=="SMARTSPEAKER"){
					 changeSpeakerSongBack(obj);
				} else if(obj.to=="SMARTCURTAIN"){
					turnOffCurtain(obj);
				}
				break;
	
			
			case "destra-tap": 
				if(obj.to=="SMARTBULB"){ //select bulb
					selectBulb(obj);		
				} else if(obj.to=="SMARTSPEAKER"){
					changeSpeakerSongAhead(obj);
					selectSpeaker(obj);
				} else if(obj.to=="SMARTCURTAIN"){
					selectCurtain(obj);
					turnOnCurtain(obj); //status check
				}
				break;
	
		
			case "avanti-tap": 
				if(obj.to=="SMARTBULB"){
					
				changeBulbProgram(obj);
					
					
				} else if(obj.to=="SMARTSPEAKER"){
					if(!getSpeakerPlaying()) playSpeaker(obj);
					else changeSpeakerProgram(obj);	
				} else if(obj.to=="SMARTCURTAIN"){
					if(getCurtainDirection()) closeCurtain(obj);
					else openCurtain(obj);
				}
				break;
			
					
			case "indietro-tap":
				if(obj.to=="SMARTBULB"){ //deselect bulb
					deselectBulb(obj);
				} else if(obj.to=="SMARTSPEAKER"){
					deselectSpeaker(obj);					
				} else if(obj.to=="SMARTCURTAIN"){
					deselectCurtain(obj);
				}
				break;
	
	
			case "tap":
				if(obj.to=="SMARTBULB"){ // turn on the bulb or play/stop program
					if(!bulb_var.getBulbStatus()){
						turnOnBulb(obj); 
					} else {
					if(!bulb_var.getBulbPlaying()) {
						playBulb(obj);
					} else {
						stopBulb(obj);
						}
					}
				} else if(obj.to=="SMARTSPEAKER"){
					if(getSpeakerPlaying() && !paused) pauseSpeaker(obj);
					else if(!getSpeakerPlaying() && paused) stopSpeaker(obj);
				} else if(obj.to=="SMARTCURTAIN"){
					if(!getCurtainPlaying()) playCurtain(obj);
					else stopCurtain(obj);
				}
				break;
	
		
			case "tap-tap":
				if(obj.to=="SMARTBULB"){
					turnOffBulb(obj);
				} else if(obj.to=="SMARTSPEAKER"){
				if (!getSpeakerStatus()) turnOnSpeaker(obj);
				else turnOffSpeaker(obj)
				} else if(obj.to=="SMARTCURTAIN"){
					changeCurtainProgram(obj);
				}
				break;
			
			
			case "avanti":
				if(obj.to=="SMARTBULB"){
					increaseBulbLightIntensity(obj);
				} else if(obj.to=="SMARTSPEAKER"){
					increaseSpeakerVolumeIntensity(obj);
				} else if(obj.to=="SMARTCURTAIN"){
					increaseCurtainLightIntensity(obj);
				}
				break;
	
			
			case "indietro":
				if(obj.to=="SMARTBULB"){
					decreaseBulbLightIntensity(obj);
				} else if(obj.to=="SMARTSPEAKER"){
					decreaseSpeakerVolumeIntensity(obj);
				} else if(obj.to=="SMARTCURTAIN"){
					decreaseCurtainLightIntensity(obj);
				}
				break;
				
			
			case "destra-tap-tap":
				if(obj.to=="SMARTBULB"){
					changeBulbColorAhead(obj);
				} else if(obj.to=="SMARTSPEAKER"){
					// theres no task executable with this cmd
				} else if(obj.to=="SMARTCURTAIN"){
					// theres no task executable with this cmd	
				}
				break;
	
			
			case "sinistra-tap-tap":
				if(obj.to=="SMARTBULB"){
					changeBulbColorBack(obj);
				} else if(obj.to=="SMARTSPEAKER"){
					// theres no task executable with this cmd
				} else if(obj.to=="SMARTCURTAIN"){
					// theres no task executable with this cmd
				}
				break;
	
	
			case "avanti-tap-tap":
				
				if(obj.to=="SMARTBULB"){
					switchOnTimeBulb(obj);
				} else if(obj.to=="SMARTSPEAKER"){
					switchOnTimeSpeaker(obj);
				} else if(obj.to=="SMARTCURTAIN"){
					switchOnTimeCurtain(obj);
				}
				break;
	
		
			case "indietro-tap-tap":
				if(obj.to=="SMARTBULB"){
					shutDownTimeBulb(obj);
				} else if(obj.to=="SMARTSPEAKER"){
					shutDownTimeSpeaker(obj);
				} else if(obj.to=="SMARTCURTAIN"){
					shutDownTimeCurtain(obj);
				}
				break;
			
	}
}




/************ BULB FUNCTIONS ***************/
// controllare meglio il cambio programma e testare gli altri due programmi

function selectBulb(obj){
	if(selected_flag.SMARTBULB==0){
				setSelectedFlag(1);
				clearInterval(fb);
				console.log("Message " + obj.message + " received by " + obj.from);
				feedback = "DF6"; //"DF6, action successfully accomplished (bulb selected)";
				pub_feedback_topic(feedback);
				do{
					lightUp();
					feedback = "DF3"; //"DF3, Device is on";
					pub_feedback_topic(feedback);
				}while(!bulb_var.getBulbStatus())
					
				}
}

function deselectBulb(obj) {
	if (selected_flag.SMARTBULB == 1) {
					setSelectedFlag(0);
					console.log("Message " + obj.message + " received by " + obj.from);
					feedback = "DF6"; //"DF6, action successfully accomplished (bulb deselected)";
					pub_feedback_topic(feedback);
				}
}


function turnOnBulb(obj){
	if (selected_flag.SMARTBULB == 1 ) {
						console.log("Message " + obj.message + " received by " + obj.from);
						lightUp();
						feedback = "DF3"; //"DF3, Device is on ";
						pub_feedback_topic(feedback);
					
					
				}
}

function turnOffBulb(obj){
	if (selected_flag.SMARTBULB == 1) {
			if(bulb_var.getBulbStatus()){
					if(bulb_var.getBulbPlaying()) {
		   				stopProgram();
		   			} 
					lightOff();
					ind=0;
				//	setStatusFlag(0);
					console.log("Message " + obj.message + " received by " + obj.from);
					feedback = "DF4"; //"DF4, Device is off ";
					pub_feedback_topic(feedback);
				}
			}
}

function playBulb(obj) {
	if (selected_flag.SMARTBULB == 1) {
				console.log("Message " + obj.message + " received by " + obj.from);
							
							//qui devo creare la simulazione del caricamento
							// per mettere il feedback loading
							// lo farò con un semplice timeout
							//setTimeout(function(){
							//	feedback = "DF5, caricamento device"; // " DF5, Device is loading "
							//	pub_feedback_topic(feedback);
							//}, 4000);
							feedback = "DF6"; //"DF6, action successfully accomplished "
							pub_feedback_topic(feedback);
							playBulbProgram(); 
	
				
						}
				
}

function stopBulb(obj) {
	if (selected_flag.SMARTBULB == 1 ) {
					console.log("Message " + obj.message + " received by " + obj.from);
				feedback = "DF6"; //"DF6, action successfully accomplished "
								pub_feedback_topic(feedback);
								stopProgram(); 
								//turnToWhite(); 

	}
}


function changeBulbProgram(obj) {
	if (selected_flag.SMARTBULB == 1) {
		if(bulb_var.getBulbStatus()){
					console.log("Message " + obj.message + " received by " + obj.from);
		   			if(bulb_var.getBulbPlaying()) {
		   				stopProgram();
		   			} 
		   			ind=(ind + 1) % 3;
		   			switchBulbProgram(ind);					
					console.log("ind program " + ind);
					feedback = "DF6"; //"DF6, action successfully accomplished "
					pub_feedback_topic(feedback);
				
				}
		}
}

function increaseBulbLightIntensity(obj) {
			if (selected_flag.SMARTBULB == 1)  {
				console.log("Message " + obj.message + " received by " + obj.from);
				
					
				if(!bulb_var.getBulbStatus()){
					lightUp();	
					feedback = "DF3"; //"DF3, Device is on ";
					pub_feedback_topic(feedback);
				}
				
				cambiaIntens(1);			
				feedback = "DF6"; //"DF6, action successfully accomplished "
				pub_feedback_topic(feedback);
			}
}

function decreaseBulbLightIntensity(obj) {
			if (selected_flag.SMARTBULB == 1) {
				if(bulb_var.getBulbStatus()){
					console.log("Message " + obj.message + " received by " + obj.from);
						
					
						cambiaIntens(-1);
						feedback = "DF6"; //"DF6, action successfully accomplished "
						pub_feedback_topic(feedback);
						
						
						if(getIntens()==0){
						lightOff();
						feedback = "DF4"; //"DF4, Device is off ";
						pub_feedback_topic(feedback);
					} 
						
				}
			} 
}

function changeBulbColorAhead(obj){
	if (selected_flag.SMARTBULB == 1) {
		if(bulb_var.getBulbStatus()){
					cambiaCol(1);
					console.log("Message " + obj.message + " received by " + obj.from);
					feedback = "DF6, colore avanti"; //"DF6, action successfully accomplished "
					pub_feedback_topic(feedback);
				}
		}
}


function changeBulbColorBack(obj) {
	if (selected_flag.SMARTBULB == 1) {
		if(bulb_var.getBulbStatus()){
					cambiaCol(-1);
					console.log("Message " + obj.message + " received by " + obj.from);
					feedback = "DF6, colore indietro"; //"DF6, action successfully accomplished "
					pub_feedback_topic(feedback);
					}			
				}
}


function switchOnTimeBulb(obj) {
	if (selected_flag.SMARTBULB == 1) {
					console.log("Message " + obj.message + " received by " + obj.from);
				switchOnBulb();
				}
}

function shutDownTimeBulb(obj) {
	if (selected_flag.SMARTBULB == 1) {
					console.log("Message " + obj.message + " received by " + obj.from);
					shutDownBulb();
				}
}




/************ CURTAIN FUNCTIONS ***************/

function selectCurtain(obj) {
	if(selected_flag.SMARTCURTAIN==0){
								setSelectedFlag(1);
								clearInterval(fb);
								console.log("Message " + obj.message + " received by " + obj.from);
								feedback = "DF6"; //"DF6, action successfully accomplished (selected)";
								pub_feedback_topic(feedback);
								if(!getCurtainStatus()){
									accendi();
								feedback = "DF3"; 
								pub_feedback_topic(feedback);
								
								}
		}
}


function deselectCurtain(obj){
	if(selected_flag.SMARTCURTAIN==1){
							setSelectedFlag(0);
							console.log("Message " + obj.message + " received by " + obj.from);
							feedback = "DF6"; //"DF6, action successfully accomplished (deselected)";
							pub_feedback_topic(feedback);
		}
}


function turnOnCurtain(obj) {
	 if (selected_flag.SMARTCURTAIN==1){
		if(!getCurtainStatus()){
					accendi();
					//	setStatusFlag(1);
					//playingCurtain = false;
					//status_flag=1;
					console.log("Message " + obj.message + " received by " + obj.from);
					feedback = "DF3"; //"DF3, turned on";
					pub_feedback_topic(feedback);
		}
	}
}


function turnOffCurtain(obj) {
	if(selected_flag.SMARTCURTAIN==1){
			if(getCurtainStatus()){
					spegni();
				//setStatusFlag(0);
				console.log("Message " + obj.message + " received by " + obj.from);
				feedback = "DF4"; //"DF4, Device is off";
				pub_feedback_topic(feedback);
				}
			}
}


function stopCurtain(obj) {
	if(selected_flag.SMARTCURTAIN==1){
			if(getCurtainStatus()){
								console.log("Message " + obj.message + " received by " + obj.from);
									feedback = "DF6"; //"DF3, Device is stopped";
									pub_feedback_topic(feedback);
								 ferma();
							
			}
}
}

function playCurtain(obj) {
	if(selected_flag.SMARTCURTAIN==1) {
		if(getCurtainStatus()){
								playCurtainProgram();
								console.log("Message " + obj.message + " received by " + obj.from);
								feedback = "DF6"; 
								pub_feedback_topic(feedback);							
					
			}
	}

}

function changeCurtainProgram(obj) {
	if(selected_flag.SMARTCURTAIN==1){
				if(getCurtainStatus()){
								play_ind = (play_ind + 1) % 3;
								switchCurtainProgram(play_ind);
								console.log("Message " + obj.message + " received by " + obj.from);
								feedback = "DF6"; //"DF6, action successfully accomplished (deselected)";
								pub_feedback_topic(feedback);
								console.log ("play_ind: "+play_ind);
					}
		}
}


function openCurtain(obj) {
	if(selected_flag.SMARTCURTAIN==1 && getCurtainStatus()){
			
					apri();
					play_ind = 0;
					switchCurtainProgram(play_ind);
					console.log("Message " + obj.message + " received by " + obj.from);
					feedback = "DF6"; //"DF6, action successfully accomplished (deselected)";
					pub_feedback_topic(feedback);
					opening = true;

				  
		}
}


function closeCurtain(obj) {
	if(selected_flag.SMARTCURTAIN==1 && getCurtainStatus()){
			
					chiudi();
					play_ind = 1;
					switchCurtainProgram(play_ind);
					console.log("Message " + obj.message + " received by " + obj.from);
					feedback = "DF6"; //"DF6, action successfully accomplished (deselected)";
					pub_feedback_topic(feedback);
					opening = false;
				
		}	
}

function increaseCurtainLightIntensity(obj) {
	if(selected_flag.SMARTCURTAIN==1 && getCurtainStatus()){
				playIndexCurtain = incrementa();	
				console.log("playIndex: "+playIndexCurtain);
				if(playIndexCurtain == 4) {
					apri();
					opening = true;
					play_ind = 0;
					switchCurtainProgram(play_ind);
					console.log("playingCurtain is "+playingCurtain);
				}
				console.log("Message " + obj.message + " received by " + obj.from);
				feedback = "DF6"; //"DF6, action successfully accomplished (deselected)";
				pub_feedback_topic(feedback);
				}
}


function decreaseCurtainLightIntensity(obj) {
	 if(selected_flag.SMARTCURTAIN==1 && getCurtainStatus()){
				playIndexCurtain = decrementa();	
				if(playIndexCurtain == 0) {
					chiudi();
					opening = false;
					play_ind = 1;
					switchCurtainProgram(play_ind);
					console.log("playingCurtain is "+playingCurtain);
				}
				console.log("Message " + obj.message + " received by " + obj.from);
				feedback = "DF6"; //"DF6, action successfully accomplished (deselected)";
				pub_feedback_topic(feedback);
				}
}


function switchOnTimeCurtain(obj) {
		console.log("Message " + obj.message + " received by " + obj.from);
					switchOnCurtain();
					
}

function shutDownTimeCurtain(obj) {
		console.log("Message " + obj.message + " received by " + obj.from);
					shutDownCurtain();
					
}




/************ SPEAKER FUNCTIONS ***************/

function selectSpeaker(obj) {
		if(selected_flag.SMARTSPEAKER==0){
				setSelectedFlag(1);
				clearInterval(fb);
				console.log("Message " + obj.message + " received by " + obj.from);
				feedback = "DF6"; //"DF6, action successfully accomplished (selected)";
				pub_feedback_topic(feedback);
				if (!getSpeakerStatus()) {
					powerOn();
						feedback = "DF3"; //"DF3, Device is on";
						pub_feedback_topic(feedback);
						}
			} 
			

}

function deselectSpeaker(obj) {
	if (selected_flag.SMARTSPEAKER == 1) {
					setSelectedFlag(0);
					console.log("Message " + obj.message + " received by " + obj.from);
					feedback = "DF6"; //"DF6, action successfully accomplished (deselected)";
					pub_feedback_topic(feedback);
				}
}


function turnOnSpeaker(obj) {
	if (selected_flag.SMARTSPEAKER == 1) {
					 //se è spento accendi
						console.log("Message " + obj.message + " received by " + obj.from);
						powerOn();
						feedback = "DF3"; //"DF3, Device is on";
						pub_feedback_topic(feedback);
					
	}				
}


function turnOffSpeaker(obj) {
	if (selected_flag.SMARTSPEAKER == 1) {
					 //se è acceso spegni
						powerOff();
						console.log("Message " + obj.message + " received by " + obj.from);
						feedback = "DF4"; //"DF4, Device is off";
						pub_feedback_topic(feedback);
					
				}
}

function changeSpeakerSongAhead(obj){
	
	if (selected_flag.SMARTSPEAKER == 1 && getSpeakerStatus()) {
				nextSong();	
				feedback = "DF6"; //"DF6, action successfully accomplished "				
				pub_feedback_topic(feedback);
			}
}


function changeSpeakerSongBack(obj) {
//controllare il volume su sequenza avanti-tap/indietro-tap | tap | tap | tap
			if(selected_flag.SMARTSPEAKER==1 && getSpeakerStatus()){
				prevSong();
				feedback = "DF6"; //"DF6, action successfully accomplished "				
				pub_feedback_topic(feedback);
			}
			
}

function increaseSpeakerVolumeIntensity(obj) {
	if (selected_flag.SMARTSPEAKER == 1 ) {
			if(getSpeakerStatus()){
					var v = volUp();
					if (v != 0) {
						unmuteSpeaker();
					}
					console.log("Message " + obj.message + " received by " + obj.from);
					feedback = "DF6"; //"DF6, action successfully accomplished (deselected)";
					pub_feedback_topic(feedback);
					
				}
		}
}

function decreaseSpeakerVolumeIntensity(obj) {
	if (selected_flag.SMARTSPEAKER == 1 ) {
			if(getSpeakerStatus()){	
				var v = volDown();
					if (v == 0) {
						muteSpeaker();
					}
					console.log("Message " + obj.message + " received by " + obj.from);
					feedback = "DF6"; //"DF6, action successfully accomplished (deselected)";
					pub_feedback_topic(feedback);
					
			}
	}
}



function changeSpeakerProgram(obj) {
	if (selected_flag.SMARTSPEAKER == 1) {
		if(getSpeakerStatus()){						
			selectPlaylist();
			console.log("Message " + obj.message + " received by " + obj.from);
			feedback = "DF6"; //"DF6, action successfully accomplished (deselected)";
			pub_feedback_topic(feedback);
		}
	}
}


function playSpeaker(obj){
	
	if (selected_flag.SMARTSPEAKER == 1) {
		if(getSpeakerStatus()){						
				playSong();
				paused = false;
				console.log("Message " + obj.message + " received by " + obj.from);
				feedback = "DF6"; //"DF6, action successfully accomplished (deselected)";
				pub_feedback_topic(feedback);
				
		}
	}
}


function pauseSpeaker(obj) {
	if (selected_flag.SMARTSPEAKER == 1 ) {
		if(getSpeakerStatus()){						
					if(getSpeakerPlaying() && !paused) { // pause
						pauseSong();
						paused = true;
						feedback = "DF6"; //"DF6, action successfully accomplished (deselected)";
						pub_feedback_topic(feedback);
						console.log("Message " + obj.message + " received by " + obj.from);
	
					}
					
		}
	}
}


function stopSpeaker(obj) {
		if (selected_flag.SMARTSPEAKER == 1 ) {
			if(getSpeakerStatus()){						
				// stop
						stopSong();
						paused = false;
						feedback = "DF6"; //"DF6, action successfully accomplished (deselected)";
						pub_feedback_topic(feedback);
						console.log("Message " + obj.message + " received by " + obj.from);
				
			}
		}
}



function switchOnTimeSpeaker(obj) {
	if (selected_flag.SMARTSPEAKER == 1) {
		
					console.log("Message " + obj.message + " received by " + obj.from);
					switchOnSpeaker();
					
				}
}

function shutDownTimeSpeaker(obj) {
	if (selected_flag.SMARTSPEAKER == 1) {
					console.log("Message " + obj.message + " received by " + obj.from);
					shutDownSpeaker();
				}
}

