<%@ page language="java" import="bean.*, java.text.*, java.util.*"
	contentType="text/html; charset=utf-8"%>
<%
UserBean userInSession = (UserBean) session.getAttribute("userInSession");

	Integer testsQty = (Integer) request.getAttribute("testsQty");
Integer usersQty = (Integer) request.getAttribute("usersQty");
Float testsPerUserAvg = (Float) request.getAttribute("testsPerUserAvg");
Integer mappingsQty = (Integer) request.getAttribute("mappingsQty");

DecimalFormat df = new DecimalFormat();
df.setMaximumFractionDigits(2);
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="css/room.css">
<title>Statistics</title>
</head>

<body>
	<div class="centering-text">
		<h1>Statistics</h1>


		<div class="grid-title-div">
			<h3>ADMIN PANEL</h3>
		</div>


		<div class="grid-stats-container">
			<div class="stats-container">
				<div class="generics">
					<div class="generics-text">
						<p>
							Num. utenti:
							<%=usersQty%></p>
						<p>
							Num. test eseguiti:
							<%=testsQty%></p>
						<p>
							Med. test per utente: ≈
							<%=df.format(testsPerUserAvg)%>
						</p>
						<p>
							Num. mapping registrati:
							<%=mappingsQty%></p>
					</div>
				</div>
				<div class="funcs">
					<a href="/RoomDevices/mapping?mappingOperation=goToCreateMapping"
						id="goToCreateMapping" class="setMapping gridbtn">Create final
						Mapping</a> <a
						href="/RoomDevices/statistics?statsOperation=searchByUser&idUser=ALL"
						id="searchByUser" class="searchForUser gridbtn">Search By User</a>
					<a
						href="/RoomDevices/statistics?statsOperation=searchByTask&idTask=ALL"
						id="searchByTask" class="searchForTask gridbtn">Search By Task</a>
				</div>
				<div class="showingAll">
					<a href="/RoomDevices/mapping?mappingOperation=seeTest&idUser=<%=userInSession.getIdUser() %>"
						id="seeAllTests" class="seeAllTests gridbtn">See All Tests</a> 
					<a
						href="/RoomDevices/mapping?mappingOperation=seeMapping&idUser=<%=userInSession.getIdUser() %>"
						id="seeAllMappings" class="seeAllMappings gridbtn">See All
						Mappings</a>
				</div>
			</div>
		</div>
	</div>
</body>
</html>