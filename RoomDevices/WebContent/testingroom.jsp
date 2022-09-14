<%@ page language="java" import="bean.*, java.text.*, java.util.*"
	contentType="text/html; charset=utf-8"%>
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
<script src="js/cmdreceiver.js" type="text/javascript"></script>	
<script src="js/sidebar.js" type="text/javascript"></script>	
<script>
var ID;
var FEEDBACK_TOPIC; //feedback tattili per il cube
var STATUS_TOPIC; //indica se il disp è disponibile o no
var MAIN_TOPIC;  // comandi per i dispositivi
const SENSOR_TOPIC = "ROOM/LIGHTSENSOR";
</script>

<script src="js/testing-mqttroom.js" type="text/javascript"></script>

</head>
<body>
  <div id="background"></div>

 <div id="mySidebar" class="sidebar">
 
  <div class="formBox">
 
  <form action="mapping" method="post">
   <div id="loginBox">
  <h1>User ID:</h1>
  <div class="grid-container">
  <div class="grid-item"><input type="text" id="idUser" name="idUser"/></div>
  <div class="grid-item">
    <img id="loadingBox" src="img/loadinggif.gif">
  <input type="button"  id="userid_next" value="NEXT"/>
  </div>
</div>

 <br> <br><h1>OR create new User:</h1>
<input type="button" id="user_new" value="CREATE NEW"/> </div>
 
 
 <div id="userBox">
  <h1>User data:</h1>
  <div class="grid-container">
  <div class="grid-item"><span>Name:</span></div>
  <div class="grid-item"><input type="text" name="userName" id="userName"/></div>
   <div class="grid-item"><span>Surname:</span></div>
  <div class="grid-item"><input type="text" name="userSurname" id="userSurname"/></div>
   <div class="grid-item"><span>Age:</span></div>
  <div class="grid-item"><input type="text" name="userAge" id="userAge"/></div>
  <div class="grid-item"><span>Job:</span></div>
  <div class="grid-item"><input type="text" name="userJob" id="userJob"/></div>
  <div class="grid-item"><span>Notes:</span></div>
  <div class="grid-item"><textarea id="inputNotes" name="userNotes" rows="2"></textarea> </div>
  </div>
<input type="button" id="userinfo_next" value="NEXT"/>   
<img id="loadingBox1" src="img/loadinggif.gif">
<input type="button" class="inputback_arrow" value="&#11176;"/> </div>
 

 <div id="choiceBox">
  <h1>Panel:</h1>
<input type="button" id="seeall_tests" value="SEE YOUR TESTS"/>  
<input type="button" id="seestats_tests" value="SEE STATS"/> 
<img id="loadingBox2" src="img/loadinggif.gif"> 
 <br><br><br>
 <h1>Start a new test:</h1>
<input type="button" id="startnew_test" value="START THE TEST"/> <br><br>
<input type="button" class="inputback_arrow" value="&#11176;"/> </div>
 
   
  <div id="startBox">
  <h1>Test is set to start:</h1>
  <p> Ti sarà chiesto di simulare la tua personale sequenza 
  di movimenti sul cubo per ciascun task eseguibile sui dispositivi
  presenti in questa stanza virtuale. I task saranno in ordine casuale.<br>
  Clicca START per avviare il test.</p><br>
   <input type="button" id="test_start" value="START"/> 
   <input type="button" class="inputback_arrow" value="&#11176;"/> 
   </div>
  
 <div id="feedbacksBox"> 
 <h1>FEEDBACKS<br>Question n. <span id="numberQuestionSpanFeedback">0</span>:</h1>
  <div class="questionBox"> 
   <label>Decidi il seguente feedback:</label>
   <h2><span id="idFeedbackSpan">XXX</span>: <span id="descriptionFeedbackSpan">Descrizione task cioè il suo significato</span></h2>
   <label>Device: <span id="deviceFeedbackSpan" style="text-transform: uppercase;">SMARTDISP</span></label>
   
   <p>Your choice: <span id="chosen_fdbk">vibrazione</span></p>
   </div>
 <input type="button" id="feedback_next" value="NEXT"/>
 
  </div>
  
  <div id="questionsBox">  
 <h1>TASKS<br>Question n. <span id="numberQuestionSpanTask">0</span>:</h1>
  <div class="questionBox"> 
   <label>Esegui il seguente task</label>
   <h2><span id="idTaskSpan">XXX</span>: <span id="descriptionTaskSpan">Descrizione task cioè il suo significato</span></h2>
   <label>Device: <span id="deviceTaskSpan" style="text-transform: uppercase;">SMARTDISP</span></label>
   
   <p>Your choice: <span id="chosen_cmd">destra-tap</span></p>
   </div>
 <input type="button" id="question_next" value="NEXT"/>
 
  </div>
  
  <div id="finishBox">
  <h1>Test successfully finished</h1>
  <p> Le preferenze dell'utente <span id="userIdSpan">XXXXXXX</span> sono state memorizzate correttamente.</p>
  <input type="button" id="test_new" value="NEW TEST"/> 
  <a id="test_data">
  <input type="button" value="SEE RESULTS"/> </a>
  </div>
  </form>

 </div>
 
 
  <div class="taskBox">
    <div class="taskBoxText">
  <h1>Available tasks:</h1>
  <h2>SMARTBULB</h2>

			<p>Seleziona la luce;</p>
			<p>Deseleziona la luce;</p>
			<p>Accendere la luce;</p>
			<p>Spegnere la luce;</p>
			<p>Avvia programma;</p>
			<p>Ferma programma;</p>
			<p>Cambia programma;</p>
			<p>Incrementa luminosità;</p>
			<p>Decrementa luminosità;</p>
			<p>Cambia colore luce avanti;</p>
			<p>Cambia colore luce indietro;</p>
			<p>Seleziona il tempo di accensione;</p>
			<p>Seleziona il tempo di spegnimento;</p>


		<h2>SMARTSPAEKER</h2>
		<p>Seleziona lo speaker;</p>
			<p>Deseleziona lo speaker;</p>
			<p>Accendere lo speaker;</p>
			<p>Spegnere lo speaker;</p>
			<p>Avvia programma;</p>
			<p>Ferma programma;</p>
			<p>Cambia programma;</p>
			<p>Incrementa volume;</p>
			<p>Decrementa volume;</p>
			<p>Cambia canzone avanti;</p>
			<p>Cambia canzone indietro;</p>
			<p>Seleziona il tempo di accensione;</p>
			<p>Seleziona il tempo di spegnimento;</p>

		
  <h2>SMARTCURTAIN</h2>
  <p>Seleziona la tenda;</p>
			<p>Deseleziona la tenda;</p>
			<p>Accendere la tenda;</p>
			<p>Spegnere la tenda;</p>
			<p>Avvia programma;</p>
			<p>Ferma programma;</p>
			<p>Cambia programma;</p>
			<p>Incrementa luminosità;</p>
			<p>Decrementa luminosità;</p>
			<p>Apri totalmente la tenda;</p>
			<p>Chiudi totalmente la tenda;</p>
			<p>Seleziona il tempo di accensione;</p>
			<p>Seleziona il tempo di spegnimento;</p>
	</div>
  </div>
</div>

	<div id="main" class="wrapper">
	<button class="openbtn" onclick="openNav()">Start Simulation</button>  
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
			
	 
	var d = 0, t = 0, running = false;

	function openNav() {
		   document.getElementById("mySidebar").style.width = "350px";
		   document.getElementsByClassName("formBox")[0].style.width = "320px";
		   document.getElementsByClassName("taskBox")[0].style.width = "320px";
		   document.getElementsByClassName("taskBoxText")[0].style.display = "block";
		   document.getElementsByClassName("openbtn")[0].style.display = "none";
		   document.getElementById("loginBox").style.display = "block";
		document.getElementsByClassName("table-wrapper")[0].style.marginLeft = "350px";
	   document.getElementsByClassName("chandelier")[0].style.marginLeft = "50px";
	   document.getElementsByClassName("bulb-container")[0].style.marginLeft = "50px";
	 }

	 //set light in room
	lightUp();
	 document.documentElement.style.setProperty('--delay', '-0.39s');

	 </script>

</body>
</html>