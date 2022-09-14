
//Validazione Account

function validate(){
	
	//Variabili che contengono gli input del form
	var nam = document.getElementById("userName").value;
	var sur = document.getElementById("userSurname").value;
	var age = document.getElementById("userAge").value;
	var job = document.getElementById("userJob").value;
	var nts = document.getElementById("inputNotes").value;
	
	
	//Espressioni Regolari
	
	function regularString(campo){
		var string_reg_exp = /^[A-Za-z]+$/;
		return string_reg_exp.test(campo);
	}
	
	function regularNumber(campo){
		var number_reg_exp = /^[0-9]{10}$/i;
		return number_reg_exp.test(campo);
	}
	

	//controllo campi
	
	var validate = true;
	
	 if ((nam == "") || (nam == "undefined") || (!regularString(nam))) {//controllo name
			
		nam.style.borderColor = "red";
		
		validate = false;
		
	} else if ((sur == "") || (sur == "undefined") || (!regularString(sur))) {//controllo surname
			
		sur.style.borderColor = "red";
		
		validate = false;
		
	} else if ((age == "") || (age == "undefined") || (!regularNumber(age))) {//controllo age
			
		age.style.borderColor = "red";
		
		validate = false;
		
	} else if ((job == "") || (job == "undefined") || (!regularString(job))) {//controllo job
			
		job.style.borderColor = "red";
		
		validate = false;
		
	} else if ((nts == "") || (nts == "undefined") || (!regularString(nts))) {//controllo name
			
		nts.style.borderColor = "red";
		
		validate = false;
		
	}
	
	
	
	return validate;
		
}


