<%@ page language="java" import="bean.*, java.text.*, java.util.*"
	contentType="text/html; charset=utf-8"%>

<%
	ArrayList<PreferencesBean> arrayPrefs = (ArrayList<PreferencesBean>) request.getAttribute("arrayPrefs");
	ArrayList<WrapperBean> arrayWraps = (ArrayList<WrapperBean>) request.getAttribute("arrayWraps");
	ArrayList<UserBean> arrayUsers = (ArrayList<UserBean>) request.getAttribute("arrayUsers");
	String chosenUserId = (String) request.getAttribute("chosenUserId");
	ArrayList<TaskBean> arrayTasks = (ArrayList<TaskBean>) request.getAttribute("arrayTasks");
	
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="css/room.css">
<title>Search by User</title>
</head>
<style>
body {
	overflow-y: scroll;
}
</style>
<body>
	<div class="centering-text">
		<h1>Statistics</h1>
		<h3>Search by User</h3>


		<div class="grid-title-div">
			<h3>ADMIN PANEL</h3>
		</div>

		<form action="statistics" method="post">
			<select name="idUser" class="select-style" id="idUser">
				<option value="ALL">ALL</option>

				<%for(UserBean u : arrayUsers) {
   
   %>
				<option value="<%=u.getIdUser() %>"><%=u.getIdUser() %></option>
				<%} %>
			</select>
			<button type="submit" class="taskbtn" name="statsOperation"
				value="searchByUser">VAI</button>

		</form>
		<div id="pdfstats">
			<%
		int i;
		String[] devices = {"smartbulb", "smartcurtain", "smartspeaker"};
		String tempTask = "", tempDevice = "", tempDescr = "";

			if(!chosenUserId.equals("ALL")){
				for(UserBean u : arrayUsers) {	
					if(chosenUserId.equals(u.getIdUser())){
			%>
			<div class="grid-title-test-div">
				<h3>
					ID USER: <span id="idUserCurrent"><%=u.getIdUser() %></span>
				</h3>

			</div>

			<% if(!u.getIdUser().equals("admin")) { %>
			<b>NAME AND SURNAME</b>:
			<%= u.getName()+" "+u.getSurname() %><br> <b>AGE</b>:
			<%= u.getAge() %><br> <b>JOB</b>:
			<%= u.getJob() %>
			<br> <b>OTHER</b>:
			<%= u.getNotes() %>
			<%} %>

			<br>
			<br>
			<hr>
			<%}} }
			
			if(arrayWraps.size()>0){%>

			<div id="singletestmapping">


				<%
				
				for(i=0; i<3; i++){

	%>

				<div class="grid-title-device-div">
					<h4>
						DEVICE:
						<%=devices[i] %></h4>
				</div>


				<div class="grid-parent ">

					<div class="grid-preferences-header-div">TASK</div>
					<div class="grid-preferences-header-div">DESCRIPTION</div>
					<div class="grid-preferences-header-div">MOVE SEQUENCE</div>
					<div class="grid-preferences-header-div">COUNT</div>


					<%
					
						for(WrapperBean w : arrayWraps){
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


					<%			
				
									
									}	
								}
							}							
									}
	%>

				</div>
				<%} %>
			</div>
		<%} else { %>
		<div class=" grid-title-user-div">
			
			<b>NO TESTS FOUND</b></div>					

		
		<%} %>
		</div>



		<button onclick="printStats()" class="openbtn"
			style="position: relative;">Print Statistics PDF</button>
	</div>

	<script>
		function printStats() {
			var content = document.getElementById("pdfstats").innerHTML;
			var originalData = document.body.innerHTML;
			document
					.write('<!DOCTYPE html><html><head><title>Search by Task</title><meta charset="utf-8">');
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