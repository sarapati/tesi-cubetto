<%@ page language="java" import="bean.*, java.text.*, java.util.*"
	contentType="text/html; charset=utf-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="css/room.css">
	<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<title>Create Mapping</title>

<%

	ArrayList<UserBean> arrayUsers = (ArrayList<UserBean>) request.getAttribute("arrayUsers");
	ArrayList<WrapperBean> arrayWrappers = (ArrayList<WrapperBean>) request.getAttribute("arrayWraps");
	ArrayList<TaskBean> arrayTasks = (ArrayList<TaskBean>) request.getAttribute("arrayTasks");
	ArrayList<PreferencesBean> arrayPrefs = (ArrayList<PreferencesBean>) request.getAttribute("arrayPrefs");
	String idUserMapping = (String) request.getAttribute("idUserMapping");
	String mappingResult = (String) request.getAttribute("mappingResult");
%>
</head>
<style>
body {
	overflow-y: scroll;
}
</style>

<body>
	<div class="centering-text">
		<h1>Create Mapping</h1>

		
					<form action="mapping" method="post" >
			
				<label>Choose the user: </label><select name="idUser" class="select-style" id="idUser">
					<%
					for (UserBean u : arrayUsers) {
				%>
					<option value="<%=u.getIdUser()%>"><%=u.getIdUser()%></option>
					<%
					}
				%>
				</select> <button type="submit"	class="taskbtn"	name="mappingOperation" 
				value="seePreferencesMapping">NEXT</button>
				
			</form>
			
			
			
			<%
			int i;
			String[] devices = {"smartbulb", "smartcurtain", "smartspeaker"};
			String tempTask = "", tempDevice = "", tempDescr = "";

			%>
								
			
			<%
			if(arrayWrappers!=null){

				if(arrayWrappers.size()>0){
					
				
					
				for(i=0; i<3; i++){

	%>

				<div class="grid-title-device-div centering-text">
					<h4>
						DEVICE:
						<%=devices[i] %></h4>
				</div>

					<%
					
					for(WrapperBean w : arrayWrappers){
						for(PreferencesBean p : arrayPrefs){
								if(w.getIdPreference()==p.getIdPreference()){
									
							if(p.getDevice().equals(devices[i])){
							
						
								String task = w.getIdTask();
								String description = w.getDescription();
								String moveSequence = w.getMoveSequence();
								int totalCount = w.getTotalCount();
									if(task.equals(tempTask)){
										task = "&quot;";
										
									} else {
										tempTask = (String)task;
										%>
								</div> <!-- questo qui non va prooooprio bene -->
								<div class="grid-parent count-column " style="margin-left: auto; margin-right: auto; width:70%">

<div class="grid-preferences-header-div">TASK</div>
<div class="grid-preferences-header-div">DESCRIPTION</div>
<div class="grid-preferences-header-div">MOVE SEQUENCE</div>
<div class="grid-preferences-header-div">COUNT</div>
<div class="grid-preferences-header-div">SELECT</div>
			
			<%
										
										
									}
									
									if(description.equals(tempDescr)){
										description = "&quot;";
									} else {
										tempDescr = (String)description;
									}						
								
						
									%>

					<div id="grid-task" class="grid-preferences-div"><%=task %></div>
					<div id="grid-device" class="grid-preferences-div"><%=description %></div>
					<div id="grid-sequence" class="grid-preferences-div"><%= moveSequence%></div>
					<div id="grid-executed" class="grid-preferences-div"><%=totalCount %></div>
					<div id="grid-selected" class="grid-preferences-div">  
					<input type="radio" form="mappingForm" id="<%=w.getIdPreference() %>" name="sel-<%=devices[i]%>-<%=w.getIdTask()%>"><%=w.getIdPreference() %> </div>


					<%			
				
									
									}	
								}
							}							
									}
	%>

				</div>
				<%} %>
			
			
			</div>
			<form id="mappingForm" action="mapping" method="post">
			<div class="centering-text">	
			<input type="hidden" id="arrM" name="listIds">
			<input type="hidden" id="idUserM" name="idUserMapping" value=<%=idUserMapping %>>
							
			<button type="submit" onclick="createMapping()" id="mapping-btn" class="openbtn" style="position:relative;" name="mappingOperation"
				value="createMapping">Create Mapping</button>
			
			</div>
			</form>
			
		<%
			} else if(arrayWrappers.size()<1){ %>
		<div class=" grid-title-user-div" style = "margin-top: 20px">
		
		<b>NO TESTS FOUND</b></div>					

	
	<%} 
	
	} else { %>
		<div class=" grid-title-user-div" style = "margin-top: 20px">
		
		<b>SELECT AN USER AND THEN SET THE PREFERENCES</b>					

	
	<% if(mappingResult!=null){%>
	<br><br><br>
				<b style="color:red">MAPPING SUCCESSFULLY REGISTERED</b>					
		
	
	<%	}%>
	
	</div>
	<%} %>
			

		<!--- 	<button  class="taskbtn" >AVANTI</button>
			--->






	<script>
	var arr = [];
	
		function createMapping() {
			
			var radios = $("input[type='radio']:checked").each(function() {
				arr.push($(this).attr('id'));

			});		
			
			$("#arrM").val(arr);
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