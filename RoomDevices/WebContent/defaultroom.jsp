<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Room</title>
<link rel="stylesheet" href="css/room.css">

	<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="//cdn.jsdelivr.net/jquery.color-animation/1/mainfile"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js"
	type="text/javascript"></script>
	
<script>
var ID;
var FEEDBACK_TOPIC; //feedback tattili per il cube
var STATUS_TOPIC; //indica se il disp è disponibile o no
var MAIN_TOPIC;  // comandi per i dispositivi
const SENSOR_TOPIC = "ROOM/LIGHTSENSOR";

</script>

<script src="js/mqttroom.js" type="text/javascript"></script>

<style>
/*green textarea*/
.text-area {
	position: absolute;
	bottom: 0;
	right: 0;
	height: 100px;
	width: 300px;
	background-color: green;
	opacity: 0.7;
	border: none;
	border-radius: 10px;
	margin-bottom: 5px;
	margin-right: 5px;
	padding: 20px;
	z-index: 30;
}

       
</style>
</head>
<body>
    <div id="background"></div>
<div id="message" class="text-area">
		<button onClick="moveSunAhead()">Avanti</button>
		<button onClick="moveSunBack()">Indietro</button>
		<button onClick="moveSun()">Riprendi</button>
		<button onClick="whiteLightOn()">whiteLightOn</button>
	<!-- 	<button onClick="changeSky('afternoon')">Pomeriggio</button>
		<button onClick="changeSky('night')">Notte</button>
		<button onClick="changeSky('morning')">Mattina</button>
		<button onClick="stopfollow()">toggleAnimations</button>-->
</div>	
	
	<div class="wrapper">
		<button class="bc-button" id="bc-button" value="SMARTBULB"></button>
		<div class="bulb-container">
					<div id="loadBulb" class="bc">	
							<%@include file="bulb.html" %>
											
					</div>
					
				</div><div class="chandelier">
			
				
			<div class="chandelier-bulb">
			
				<div class="chandelier-glass"></div>
				
			</div>


		</div>
			
		<div id="floor-container" >
			
			

<div class="sky-wrapper" >
			<div class="sky" id="sky" >
<div id="parentCircle">
  <div class="circle sun"></div>
  <div class="circle moon"></div>
  </div>
	 		
	
			<div class="building1">
			<div class="building-window"></div>
			<div class="building-window"></div>
			<div class="building-window"></div>
			<div class="building-window"></div>
			<div class="building-window"></div>
			<div class="building-window"></div>
			</div>
						<div class="building2">
						<div class="building-window"></div>
			<div class="building-window"></div>
			<div class="building-window"></div>
			<div class="building-window"></div>
			<div class="building-window"></div>
			<div class="building-window"></div>
			<div class="building-window"></div>
			<div class="building-window"></div>
			<div class="building-window"></div>
			<div class="building-window"></div>
						</div>
			
				<div class="window"></div></div>
</div>
		<button class="cc-button" id="cc-button" value="SMARTCURTAIN"></button>
		
			<div class="curtain-container">
						<div id="loadCurtain" class="cc">
		 		   	 <%@include file="curtain.html" %>
						</div>		</div>
		
			
		<div class="floor"></div>	
			
		</div>
		
		
		
		
		<div class="shelf-wrapper">

			<div class="shelf shelfone">
				<div class="plant-pot">
					<div class="plant1"></div>
					<div class="plant2"></div>
					<div class="plant3"></div>
				</div>
			</div>
			<div class="shelf shelftwo"></div>
			<div class="shelf shelfthree">
				<div id="slantbook"></div>
				<div id="flatbook" class="flatbook1"></div>
				<div id="flatbook" class="flatbook2"></div>
				<div id="flatbook" class="flatbook3"></div>
			</div>
			<div class="shelf shelffour">
				<div class="pictures">
					<div class="picture1"></div>
				</div>
				<div class="pictures">
					<div class="picture2"></div>
				</div>
			</div>

		</div>
		
		<div class="painting-wrapper">
		<div class="painting painting1"></div>
		<div class="painting painting2"></div>
		
		</div>
		

	<div class="table-wrapper">
		<div class="table-legs"></div>
		<div class="table">
			<div class="table-border"></div>
			<button class="sc-button" id="sc-button" value="SMARTSPEAKER"></button>

			<div class="speaker-container">
				<div id="loadSpeaker" class="sc">		
									<%@include file="speaker.html" %>
			
				</div>
			</div>

		</div>
		
	</div>

	</div>
	

<script src="js/backgroundjs.js" type="text/javascript"></script>

	<script>
	var d = 0, t = 0, running = false;
	 var sky = document.getElementById("sky"); 
	 var sun = document.getElementById("parentCircle");
	 var sunAnimationDuration = 50;
	// sky.style.animationDuration = sunAnimationDuration+"s";
	// sun.style.animationDuration = sunAnimationDuration+"s";
	var degreeValue=0;	
	 
	 function sendLight(){
		 degreeValue= getCurrentRotation(sun);
		 if(degreeValue >= 215 && degreeValue <=359) {
			 sendLightValue(40);
			 document.getElementById("message").innerHTML = "DAY. Degree Value: "+degreeValue;
		 }
 		else if((degreeValue >= 0 && degreeValue <= 214)){
			 sendLightValue(0);
			 document.getElementById("message").innerHTML = "NIGHT. Degree Value: "+degreeValue;
 		}
	 }
	
	document.onkeydown = function (event) {
	      switch (event.keyCode) {
	
	      case 37:
	        //    console.log("Left key is pressed.");
	           d = d-0.01;
		if(d<=0.0) d= 0.99;
		 break;
	         case 39:
	  	        //    console.log("Right key is pressed.");
	         	 d = d+0.01;
	      		if(d>=1.0) d= 0;
	      		
	            break;
	        
	        
	      }
	      t = d * -1;
			document.documentElement.style.setProperty('--delay', t+'s');
	 	      sendLight();       
	};
	     
		//var ID;
		
	 document.getElementById("bc-button").onclick = function() {
		 ID = "ROOM";
			sendMessageRoom(document.getElementById("bc-button").value);
			 ID = document.getElementById("bc-button").value;
	}
	 document.getElementById("sc-button").onclick = function() {
		 ID = "ROOM";
			sendMessageRoom(document.getElementById("sc-button").value);
			 ID = document.getElementById("sc-button").value;
	}
	 document.getElementById("cc-button").onclick = function() {
		 ID = "ROOM";
		 sendMessageRoom(document.getElementById("cc-button").value);
		 ID = document.getElementById("cc-button").value;
		}
	
 
	 // <20 è nero >20 è luce
	
	 /* con getCurrentRotation ottengo il valore del rotate. Il setInterval mi fa in modo di aggiornare 
	 questo valore con costanza (vedere meglio le tempistiche o eventualmente trovare un'alternativa).
	 Bisogna quindi associare a ciascun range di rotazioni un valore luminoso, che il sensore percepirà
	 e inoltrerà alla room (IN QUESTO CASO HO DECISO DI CONSIDERARE IL SENSORE COME UN DISPOSITIVO A PARTE).
	 Finora ho deciso che il valore va da 0 a n, e, anche considerando lo standard, quando il valore è
	 minore di 20, allora c'è poca luce, se è maggiore di 20 allora c'è luce.
	 Quindi, il valore sarà maggiore di venti quando il sole sta oltre il sorgere, quando sta in cielo e 
	 quando sta quasi per tramontare. Il valore sarà minore di venti quando il sole tramonta, quando è
	 notte e quando sta sorgendo.
	 L'ordine dei colori per il sorgere è: celeste alba, fucsia, oro, bianco.
	 L'ordine dei colori per il tramonto è: fucsia, oro, arancio scuro.
	 Considero "oltre il sorgere" quando si trova su colore oro (fine, quindi 58%).
	 Considero "quasi per tramontare" quando si trova su fucsia (inizio, quindi 89%).
	 
	 Per la rotazione: dividiamo il piano in quattro spicchi, dati ovviamente dai due assi delle ascisse
	 e ordinate. La rotazione è in senso antiorario, quindi da 0 a 90 gradi si andrà nella parte del piano
	 in basso a destra.
	 Gli spicchi sono quindi divisi in questo modo:
				 |
		 180-270 | 270-360
		 --------|--------
		 90-180	 | 0-90
		 		 | 
	 Presupponiamo che da 0 a 180 è notte, da 180 a 360 è giorno. 
	 La funzione che devo creare deve fornire sendLightValue(n) con n>20 quando il valore ottenuto da 
	 getCurrentRotation è compreso fra 210 (valore in cui oro finisce) e 335 (valore in cui fucsia inizia).
	 Automaticamente, sendLightValue manda un valore n<20 quando getCurrentRotation restituisce un valore 
	 compreso fra 336 e 209.
	 
	 */
	
	 
	
	 //QUESTA E' LA FUNZIONE, MA BISOGNA VEDERE MEGLIO STO FATTO DEL TEMPO
	 // IL BLACK FILTER VA MODIFICATO LATO ROOM, NON LATO SENSORE
	 // IL SENSORE RICORDIAMO CHE è UN ALTRO DEVICE
	 // BLACK FILTER PER QUALCHE MOTIVO NON VIENE LETTO DALLA FUNC IN MQTTROOM
	 // AGGIUSTARE QUESTA VISIBILITA CREANDO ANCHE FUNZIONI COME LATO DEVICE
	 // CIOè CERCARE DI ORDINARE IL CODICE, CREANDO FILE PER SENSORE E FILE
	 // PER ROOM
	 //ok sembra che ho risolto ordinando meglio le librerie
//	setTimeout(function(){
		//followTheSun();
	//	setInterval(function() {
	//	 degreeValue= getCurrentRotation(document.getElementById("parent-circle"));
	//	  document.getElementById("message").innerHTML = "Degree Value: "+degreeValue;

	//	 if(degreeValue >= 210 && degreeValue <=335) 
		//	 sendLightValue(40);
		  //else if((degreeValue >= 336 && degreeValue <= 359) || (degreeValue >= 0 && degreeValue <= 209))
	//		 sendLightValue(0);
		// }, 21400)
//	}, 9000);
	  
	 function getCurrentRotation(el){
		  var st = window.getComputedStyle(el, null);
		  var tm = st.getPropertyValue("-webkit-transform") ||
		           st.getPropertyValue("-moz-transform") ||
		           st.getPropertyValue("-ms-transform") ||
		           st.getPropertyValue("-o-transform") ||
		           st.getPropertyValue("transform") ||
		           "none";
		  if (tm != "none") {
		    var values = tm.split('(')[1].split(')')[0].split(',');
		    var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
		    return (angle < 0 ? angle + 360 : angle);; //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
		  }
		  return 0;
		}
			
	 
 

	
	 </script>

</body>
</html>