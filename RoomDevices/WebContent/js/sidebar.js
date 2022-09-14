/**
 * 
 */


var questionArrayJson, feedbackArrayJson;
var userJson, idTestJson, n;

$(document).ready(function() {


$("#userid_next").click(function() {
		$.ajax({
			  type: 'POST',
			  url: "/RoomDevices/mapping",
			  data: {
				  "mappingOperation" : "findUserData",
					"idUser" : $('input[name="idUser"]').val()

					 },
			  beforeSend: function(){
				  $('#loadingBox').css("display", "block");
			        $("#loadingBox").animate({'opacity': 1}, 500);
			        $("#loadingBox").css('width', "25px");
			    },
			    complete: function(){
			        $('#loadingBox').css("display", "none");
			        $("#loadingBox").css("opacity", "0");
			        $("#loadingBox").css('width', "0");
			   
			    },
			  success: function(userJsonResponse) {
					userJson = userJsonResponse;
				//  userJsonString = data[0], questionJsonArray = data[1];
				  console.log(userJsonResponse);
					$("#loginBox").hide();
					$("#choiceBox").show();
					  console.log(userJson.name);
					  if(userJson.idUser!="admin"){
					$("#userIdSpan").text(userJson.name+" "+userJson.surname+" ("+userJson.idUser+")");
					 $("#seestats_tests").hide();
					 $("#seeall_tests").show();
	  } else {
							$("#userIdSpan").text(userJson.idUser);
							 $("#seestats_tests").show();
							 $("#seeall_tests").hide();

					  }
					  
						var node = $("#loginBox").find("input[type=text]");
	            	   	node.css("border-color", "dodgerblue");
	            	   	
	                    
			  },
			  error: function(jqXHR,exception) {  
	               if(jqXHR.status&&jqXHR.status==400){
	            	   	console.log("stmp: "+jqXHR.responseText);
	            	   var el = $("input[name="+jqXHR.responseText+"]");
	                    el.css("border-color", "red");
	            	  
	            	   	}else{
		            	   	console.log(jqXHR.responseText[0]);
						    alert("Something went wrong, "+exception);
	  	       
	               }
	          }
			 });
		
	});
	
	
	$("#user_new").click(function() {
		$("#loginBox").hide();
		$("#userBox").show();
	});
	
	$("#userinfo_next").click(function() {
		$.ajax({
			  type: 'POST',
			  url: "/RoomDevices/mapping",
			  data: {
				  "mappingOperation" : "saveUserData",
					"userName" : $('input[name="userName"]').val(),
					"userSurname": $('input[name="userSurname"]').val(),
					"userAge": $('input[name="userAge"]').val(),
					"userJob": $('input[name="userJob"]').val(),
					"userNotes": $('textarea#inputNotes').val()
			  },
			  beforeSend: function(){
			        $('#loadingBox1').show();
			    },
			    complete: function(){
			        $('#loadingBox1').hide();
			    },
			  success: function(userJsonResponse) {
					userJson = userJsonResponse;
				//  userJsonString = data[0], questionJsonArray = data[1];
				  console.log(userJsonResponse);
					$("#userBox").hide();
					$("#startBox").show();
					  console.log(userJson.name);
					  if(userJson.idUser!="admin"){
							$("#userIdSpan").text(userJson.name+" "+userJson.surname+" ("+userJson.idUser+")");
							 $("#seestats_tests").hide();
							 $("#seeall_tests").show();
							  } else {
									$("#userIdSpan").text(userJson.idUser);
									 $("#seestats_tests").show();
									 $("#seeall_tests").hide();


							  }
			  },
			  error: function(jqXHR) {  
	               if(jqXHR.status&&jqXHR.status==400){
	            	   	console.log("stmp: "+jqXHR.responseText);
	            	   	var nodes = document.querySelectorAll("#userBox input[type=text]");
	            	   	for (var i=0; i<nodes.length; i++){
	            	   		nodes[i].style.borderColor = "dodgerblue";
	            	   	}
	                    var el = $("input[name="+jqXHR.responseText+"]");
	                    el.css("border-color", "red");
	            	  
	            	   	}else{
		            	   	console.log(jqXHR.responseText[0]);
						    alert("Something went wrong, "+jqXHR.responseText);
	  	       
	               }
	          }
			 });
		
	});
	
	
	$("#seeall_tests").click(function() {
		
		        $('#loadingBox2').show();
		  
		window.location.href = "/RoomDevices/mapping?mappingOperation=seeTest&idUser="+userJson.idUser;
	});
	
	$("#seestats_tests").click(function() {
        $('#loadingBox2').show();
		window.location.href = "/RoomDevices/statistics?statsOperation=seeGeneralInfo";
	});
	
	$("#startnew_test").click(function() {
		$("#choiceBox").hide();
		$("#startBox").show();
	});
	
	
	$("#test_start").click(function() {
		$.ajax({
			  type: 'POST',
			  url: "/RoomDevices/mapping",
			  data: {
				  "mappingOperation" : "startTest",
			 	 "idUser": userJson.idUser
			  },
			  success: function(data) {
				  idTestJson = data[0];
				  questionArrayJson = data[1];
				  feedbackArrayJson = data[2];
				  console.log(data[0]);
				  console.log(data[1]);
				  console.log(data[2]);
				  $("#startBox").hide();
				 $("#feedbacksBox").show();
				 n = 0;
					console.log(feedbackArrayJson[n].idTask);
					$("#feedbacksBox").find("#idFeedbackSpan").text(feedbackArrayJson[n].idTask);
					$("#feedbacksBox").find("#descriptionFeedbackSpan").text(feedbackArrayJson[n].description);
						$("#feedbacksBox").find("#deviceFeedbackSpan").text(feedbackArrayJson[n].device);
			$("#feedbacksBox").find("#numberQuestionSpanFeedback").text(n+1);
					$('#chosen_fdbk').text("");
			  },
			  
			  error:function(data,status,er) {
			    alert("error: "+data+" status: "+status+" er:"+er);
			   }
			 });
		
	});
	
	$("#feedback_next").click(function() {
		$.ajax({
	  type: 'POST',
	  url: "/RoomDevices/mapping",
	  data: {
		  "mappingOperation" : "savePreference",
	 	 "chosen_cmd": $('#chosen_fdbk').text(),
	 	 "question" : JSON.stringify(feedbackArrayJson[n]),
	 	 "idTest" : idTestJson
	  },
	  beforeSend: function(){
		  n++;
		  if(n==feedbackArrayJson.length) {
			
			  $("#feedbacksBox").hide();
				$("#questionsBox").show();
				 n = 0;
					console.log(questionArrayJson[n].idTask);
					$("#questionsBox").find("#idTaskSpan").text(questionArrayJson[n].idTask);
					$("#questionsBox").find("#descriptionTaskSpan").text(questionArrayJson[n].description);
					if(questionArrayJson[n].idTask=="EA1"){
				$("#questionsBox").find("#deviceTaskSpan").text("ALL");
			} else {
				$("#questionsBox").find("#deviceTaskSpan").text(questionArrayJson[n].device);

			}
			$("#questionsBox").find("#numberQuestionSpanTask").text(n+1);
					$('#chosen_cmd').text("");
		  }
	    },
	  success: function( ) {
		  if(n!=feedbackArrayJson.length){
			
		  $("#feedbacksBox").find("#idFeedbackSpan").text(feedbackArrayJson[n].idTask);
			$("#feedbacksBox").find("#descriptionFeedbackSpan").text(feedbackArrayJson[n].description);
			$("#feedbacksBox").find("#deviceFeedbackSpan").text(feedbackArrayJson[n].device);
			$("#feedbacksBox").find("#numberQuestionSpanFeedback").text(n+1);
			$('#chosen_fdbk').text("");
		  }
	
 },
 complete: function(){
	if(n==0){ updateSmartRoom(questionArrayJson[n]);
				console.log("stampa solo se sto alla prima domanda di tasks");
				}
			  },
	  error:function( ) {
	    alert("error");
	   }
	 });
	});
	
	
	$("#question_next").click(function(){
	$.ajax({
	  type: 'POST',
	  url: "/RoomDevices/mapping",
	  data: {
		  "mappingOperation" : "savePreference",
	 	 "chosen_cmd": $('#chosen_cmd').text(),
	 	 "question" : JSON.stringify(questionArrayJson[n]),
	 	 "idTest" : idTestJson
	  },
	  beforeSend: function(){
		  n++;
		  if(n==questionArrayJson.length) {
			  $("#questionsBox").hide();
				$("#finishBox").show();
				
		  }
	    },
	  success: function( ) {
		  if(n!=questionArrayJson.length){
			
		  $("#questionsBox").find("#idTaskSpan").text(questionArrayJson[n].idTask);
			$("#questionsBox").find("#descriptionTaskSpan").text(questionArrayJson[n].description);
			if(questionArrayJson[n].idTask=="EA1"){
				$("#questionsBox").find("#deviceTaskSpan").text("ALL");
			} else {
				$("#questionsBox").find("#deviceTaskSpan").text(questionArrayJson[n].device);

			}
			$("#questionsBox").find("#numberQuestionSpanTask").text(n+1);
			$('#chosen_cmd').text("");
		  }
	
 },
	  complete: function(){
		  if(n!=questionArrayJson.length) updateSmartRoom(questionArrayJson[n]);
	  },
	  error:function() {
	    alert("error");
	   }
	 });
	});
	
	$("#test_new").click(function() {
		$("#finishBox").hide();
		$("#loginBox").show();
	});
	
	$("#test_data").click(function() {
		window.location.href = "/RoomDevices/mapping?mappingOperation=seeTest&idTest="+idTestJson;
	});
	
	
	$(".inputback_arrow").click(function() {
		if($("#userBox").is(":visible")){
			$("#userBox").hide();
			$("#loginBox").show();
		}
		if($("#choiceBox").is(":visible")){
			$("#choiceBox").hide();
			$("#loginBox").show();
		}

		if($("#startBox").is(":visible")){
			$("#startBox").hide();
			$("#choiceBox").show();
		}
	});	});