<%@ page language="java" import="bean.*, java.text.*, java.util.*"
	contentType="text/html; charset=utf-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="css/room.css">
<title>Test results</title>

	<%
	UserBean userInSession = (UserBean) session.getAttribute("userInSession");
	ArrayList<PreferencesBean> arrayPreferences = (ArrayList<PreferencesBean>) request.getAttribute("arrayPreferences");
	ArrayList<TaskBean> arrayTasks = (ArrayList<TaskBean>) request.getAttribute("arrayTasks");
	ArrayList<TestBean> arrayTests = (ArrayList<TestBean>) request.getAttribute("arrayTests");
	ArrayList<UserBean> arrayUsers = (ArrayList<UserBean>) request.getAttribute("arrayUsers");

%> 
</head>
<style>
body {
overflow-y:scroll;
}
</style>
<body>
	<div class="centering-text">
		<h1>Test Results</h1>

		<div id="pdfmapping">	
		<%
		int j=0, i;
		boolean fill = false;
		String[] devices = {"smartbulb", "smartcurtain", "smartspeaker"};
				
		if(userInSession.getIdUser().equals("admin")){

%>
	<script>
	// create a new div element
	  var newDiv = document.createElement("div");
	  var newH3 = document.createElement("h3");

	  // and give it some content
	  var newContent = document.createTextNode("ADMIN PANEL");

	  newDiv.classList.add("grid-title-div");
	  // add the text node to the newly created div
	  newH3.appendChild(newContent);
	  newDiv.appendChild(newH3);

	  // add the newly created element and its content into the DOM
	  var target = document.querySelector('#pdfmapping');
	
	// insert the element before target element
	target.parentNode.insertBefore(newDiv, target);
	</script>
	<%}	
			for(UserBean userTest : arrayUsers){
				System.out.println("userTest:"+userTest.getIdUser());
				for(TestBean currentTest : arrayTests){
					if(currentTest.getIdUser().equals(userTest.getIdUser())){
						fill = true;
						break;
					} else fill = false;
				} if(fill){
				%>
				
				
				<div class="grid-title-user-div">
					<h3>ID USER: <span id="userIdCurrent"><%=userTest.getIdUser()%></span></h3>
							
					
					<b>NAME AND SURNAME</b>: <%= userTest.getName()+" "+userTest.getSurname() %><br> 
					<b>AGE</b>: <%= userTest.getAge() %><br>
					<b>JOB</b>: <%= userTest.getJob() %> <br> 
					<b>OTHER</b>: <%= userTest.getNotes() %>
				
				</div>
			
			
			
		
			<%
			for(TestBean currentTest : arrayTests){
				if(currentTest.getIdUser().equals(userTest.getIdUser())){
					%>
				 
				 			
			<div id="singletestmapping">	
				
								<div class="grid-title-test-div">
					<h3>ID TEST: <span id="idTestCurrent"><%=currentTest.getIdTest()%></span></h3>
				</div>
					<hr>
<%
				
				for(i=0; i<3; i++){

	%>
	
				<div class="grid-title-device-div">
					<h4>DEVICE: <%=devices[i] %></h4>
				</div>
			
				<div class="grid-parent">

				<div class="grid-preferences-header-div">TASK</div>
				<div class="grid-preferences-header-div">DESCRIPTION</div>
				<div class="grid-preferences-header-div">TYPE</div>
				<div class="grid-preferences-header-div">MOVE SEQUENCE</div>
			<%
				for(PreferencesBean p : arrayPreferences){
					if(p.getDevice().equals(devices[i]) && p.getIdTest() == currentTest.getIdTest()){
						for(TaskBean t : arrayTasks){
							if(p.getIdTask().equals(t.getIdTask()) && t.getDevice().equals(devices[i])){
								
					
	%>
			
				<div class="grid-preferences-div"><%=p.getIdTask() %></div>
				<div class="grid-preferences-div"><%= t.getDescription() %></div>
				<div class="grid-preferences-div"><%= t.getType() %></div>
				<div class="grid-preferences-div"><%=p.getMoveSequence() %></div>
		
		
			<%				}
						}
					}
				}
	%>
			
			</div>
<%
		 }
			
%>
		</div>  
 <%   
				

				} 
			
			} 
		} else {%>
		
		<div class=" grid-title-user-div">
			<h3>ID USER: <%=userTest.getIdUser()%></h3><br>
			<b>NO TESTS FOUND</b></div>					

		<%}	
			}	
	%>

		</div>

<% if(arrayTests.size()==1){ %>
		<button onclick="setAsDefaultMapping()" id="mapping-btn" class="openbtn" style="position:relative;">Set as Default Mapping</button>
	<%} %>	
		
		<button onclick="printTest()" class="openbtn" style="position:relative;">Print Test PDF</button>
		
	</div>

	<script>
	function setAsDefaultMapping(){
		$.ajax({
			  type: 'POST',
			  url: "/RoomDevices/mapping",
			  data: {
				  "mappingOperation" : "setAsDefaultMapping",
			 	 "idTest" : $("#idTestCurrent").text()
			  },
			  success: function( data ) {
				  alert("done");
				  document.getElementById("mapping-btn").disabled = true;

		 },
			  error:function(data,status,er) {
			    alert("error");
			   }
			 });
	}
		
	function printTest() {
			var content = document.getElementById("pdfmapping").innerHTML;
			var originalData = document.body.innerHTML;
			document
					.write('<!DOCTYPE html><html><head><title>Mapping results</title><meta charset="utf-8">');
			document.write("<link rel='stylesheet' href='css/room.css'>");
			document.write('</head><body>');
			document.write(content);
			document.write('</body></html>');
			window.print();
			document.close();
			document.body.innerHTML = originalData;
		}
	</script>
</body>
</html>