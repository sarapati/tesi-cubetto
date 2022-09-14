<%@ page language="java" import="bean.*, java.text.*, java.util.*"
	contentType="text/html; charset=utf-8"%>

	<%
	ArrayList<WrapperBean> arrayStats = (ArrayList<WrapperBean>) request.getAttribute("arrayPrefs");
	ArrayList<String> arrayNames = (ArrayList<String>) request.getAttribute("arrayNameTasks");
	String chosenTaskId = (String) request.getAttribute("chosenTaskId");
%> 

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="css/room.css">
	<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<title>Search by Task</title>
</head>
<style>
body {
overflow-y:scroll;
}
</style>
<body>
	<div class="centering-text">
		<h1>Statistics</h1>
		<h3>Search by Task</h3>


<div class="grid-title-div"><h3>ADMIN PANEL</h3>
					</div>
				
		<form action="statistics" method="post" >
		 <select name="idTask" class="select-style" id="idTask">
		 <option value="ALL">ALL</option>
   <%for(String n : arrayNames) {
   
   %> <option value="<%=n %>"><%=n %></option>
   <%} %>
  </select>
		<button type="submit"
								class="taskbtn"
								name="statsOperation" value="searchByTask">VAI</button>

</form>	
		<div id="pdfstats">	

<div class="grid-title-test-div">
					<h3>ID TASK: <span id="idTaskCurrent"><%=chosenTaskId %></span></h3>
				</div>
				<div class="grid-parent count-column">

				<div class="grid-preferences-header-div">TASK</div>
				<div class="grid-preferences-header-div">DEVICE</div>
				<div class="grid-preferences-header-div">DESCRIPTION</div>
				<div class="grid-preferences-header-div">MOVE SEQUENCE</div>
				<div class="grid-preferences-header-div">COUNT</div>
				
				
					<%
					String tempTask = "", tempDevice = "", tempDescr = "";
						for(int i=0; i<arrayStats.size();i++){
						
							String task = arrayStats.get(i).getIdTask();
							String device = arrayStats.get(i).getDevice();
							String description = arrayStats.get(i).getDescription();
							String moveSequence = arrayStats.get(i).getMoveSequence();
								int totalCount = arrayStats.get(i).getTotalCount();
								if(task.equals(tempTask)){
									task = "&quot;";
									
								} else {
									tempTask = (String)task;
								}
								if(device.equals(tempDevice)){
									device = "&quot;";
								} else {
									tempDevice = (String)device;

								}
								if(description.equals(tempDescr)){
									description = "&quot;";
								} else {
									tempDescr = (String)description;
								}						
							
				%>
				
			
				<div id="grid-task" class="grid-preferences-div"><%=task %></div>
				<div id="grid-device" class="grid-preferences-div"><%=device %></div>
				<div id="grid-device" class="grid-preferences-div"><%=description %></div>
				<div id="grid-sequence" class="grid-preferences-div"><%= moveSequence%></div>
				<div id="grid-executed" class="grid-preferences-div"><%=totalCount%></div>
		
		
					
				<%			
			
					}
				%>
			
			</div>

		</div>  



		<button onclick="printStats()" class="openbtn" style="position:relative;">Print Statistics PDF</button>
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