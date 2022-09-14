
<!DOCTYPE html>
<html>
<head>
<title>Smart Bulb</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
.background {
	height: 100%;
	margin: 0;
	width:100%;
	position: absolute;
	background-repeat: no-repeat;
	background-attachment: fixed;
	z-index: 0;
}
</style>
</head>

<body>

<div id="background"></div>

<div class="container" >
	<%@include file="bulb.html" %>
	</div>


<script src="js/backgroundjs.js" type="text/javascript"></script>

</body>
</html>
