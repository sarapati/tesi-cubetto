/**
 * 
 */
	// variabile per modificare grandezza gancio della pala
	var hookWidth = 8;
	
	// array per rotazione pale
	// fa una rotazione di 180 gradi solo per la funzione follow the sun
	// per le operazioni di incrementa e decrementa ruota di soli 90 gradi
	var rotation_array = [ 0, -35, -55, -75, -85, -95, -105, -125, -135, -180 ];
	// indice rotazione per l'array rotation_array
	// per incrementa() va da 0 a 4, per decrementa() da 4 a 0
	// per followTheSun() va da 0 a 9
	var indexRotation = 0;
	// valore corrente dato da rotation_array[indexRotation]
	var rotation_value;

	// indice generale luce prodotta da tenda
	var indexCurtainLight = 0; //ex indexP = 0
	// indice luce prodotta da rotazione delle pale
	var indexFiltering = 0; //ex indexS
	// indice luce prodotta da spostamento delle pale
	var indexShifting = 0; // ex indexV = 0
	
	// variabile per contare le pale
	var bladeCounter=0; // ex palaCounter

	var idInterval, idTimeout;
//	var indexProva = -1;
	var blackInterval, followInterval;
	var scanal_css, playingFlag;
	var program_index;
	
	var li_list = document.getElementsByClassName("pala");

	// true: acceso, false: spento
	var curtainStatus = false;
	// true: in movimento, false: fermo
	var curtainPlaying = false;
	// true: apertura, false: chiusura
	var curtainDirection = false;
	
	
	var turningOnCurtainTimeout = null;
	var turningOffCurtainTimeout = null;
	
	var MILLISEC_HOUR = 5000;

	
	// inizia a segnare come active la prima pala a sinistra (e poi a seguire)
	initScan($("ul li:last-child"));
	
	
	
	function setCurtainStatus(bool){
		curtainStatus = bool;
	}
	
	function getCurtainStatus(){
		return curtainStatus;
	}

	function setCurtainPlaying(bool) {
		curtainPlaying = bool;
	}
	
	function getCurtainPlaying() {
		return curtainPlaying;
	}

	function setCurtainDirection(bool){
		curtainDirection = bool;
	}
	
	function getCurtainDirection(){
		return curtainDirection;
	}

	function accendi() {
		//if (!$(".tenda").hasClass('acceso')) {
			var audio = new Audio('audio/curtain_sound.mp3');
			audio.play();
			$(".tenda").addClass('acceso');
			program_index = 2;
			setCurtainStatus(true);
			setCurtainPlaying(false);
	}
		
	function spegni(){
		if(getCurtainPlaying()) ferma();
		
		chiudi_seq();
		
		var audio = new Audio('audio/curtain_sound.mp3');
		audio.play();
			
			$(".tenda").removeClass('acceso');

		
			setCurtainStatus(false);
			setCurtainPlaying(false);
		}


	function initScan(element){
		$('ul li').removeClass('active');
	    element.addClass('active');
		
	}
	

	//apre tutto verso destra
	function apri() {
		ferma();
		setCurtainPlaying(true);
		setCurtainDirection(true);
		apri_seq();
		

	}
	
	function apri_seq() {
		idInterval = setInterval(function(){
			
			ruota("apri");	
			setTimeout(scorri, 1000, "apri");
			$("ul.tenda > li.active").addClass("chiuso");
			setTimeout(setPala, 1000, "apri");
		}, 2000);
		$( ".tenda" ).css('padding-right', '0px');
		

	}
	
	function chiudi() {
		// bisogna considerare il caso in cui le pale sono incrementate e poi si chiudono quelle totalmente aperte
		// si devono chiudere tutte oppure si devono chiudere con lo stesso livello di incremento delle altre?
		ferma();
		setCurtainPlaying(true);
		setCurtainDirection(false);
		chiudi_seq();
		
	}
	
	function chiudi_seq(){
		idInterval = setInterval(function(){		
	
			setTimeout(scorri, 850, "chiudi");
			setTimeout(ruota, 1850, "chiudi");
			setTimeout(setPala, 1850, "chiudi");
			

		}, 2000);
		$( ".tenda" ).css('padding-right', '125px');
		
		//return true;
	}
	
	//ruota le pale su se stesse di 90 gradi
	function ruota(mode) {

		var newWidth;
		if(mode==="apri") {
			bladeCounter =(bladeCounter +1) % 12;
			newWidth=4;
		//	indexLight= 4;
			rotation_value = rotation_array[4];
			scanal_css = generateRotationCSS();
			
			if(bladeCounter % 2 == 0) {
			//	indexV++;
			
				indexShifting++;
				
				if (indexShifting > indexCurtainLight){
					indexFiltering = indexShifting;
					indexCurtainLight = indexShifting;					
				}
			
			}

			
		} 

		
		if(mode=="chiudi"){ 
	
			hookWidth=8;
			newWidth=8;
			indexRotation= 0; 

			rotation_value = rotation_array[indexRotation]; 
		
			scanal_css = generateRotationCSS();
			
			bladeCounter =(bladeCounter +1) % 12;

			
			if($( "ul li" ).hasClass("rotated")) {
			$( "ul li" ).not(".chiuso").find(".pala").css(scanal_css);
			$( "ul li" ).not(".chiuso").find(".aggancio").find(".gancio").css('width', newWidth+'px');
			$( "ul li" ).removeClass(".rotated");
			}
			
			if(bladeCounter % 2 == 0) {
	
				indexShifting--;
				if (indexShifting == 0) indexShifting = 0;
				if (indexShifting < indexCurtainLight)
					indexCurtainLight = indexShifting;

			}
			
		}
		backgroundIntensitySettings(4000);

		$( "ul li.active" ).find(".pala").css(scanal_css);
		$( "ul li.active" ).find(".aggancio").find(".gancio").css('width', newWidth+'px');
	
		}
		
	//fa scorrere le pale verso una direzione
	// se mode=apri va verso destra, altrimenti verso sinistra
	function scorri(mode){
		var top, widthP, widthA;
		if(mode==="apri") {
			top=4;
			widthP=8;
			widthA=12;
		} else if (mode=="chiudi") { 
			top=0;
			widthP=widthA=70;
				

		}
		$( "ul li.active" ).find(".pala").css('width', widthP+'px');
		$( "ul li.active" ).find(".pala").find(".scanal").css('top', top+'px');
		$( "ul li.active" ).find(".aggancio").css('width', widthA+'px');
		
		
		
	}
	
		var next;
	// passa alla prossima pala per ambo le direzioni
	function setPala(mode) {
		if(mode==="apri") {
			next = $('ul li.active').prev();

			
			if (next.length == 0) {
		       ferma();
				switchCurtainProgram(1);
		       next = $('ul li:first-child');
				bladeCounter=0;

		    }	
			
		} else {	
	//SE CHIUDO LA TENDA E POI BLOCCO E POI AUMENTO INTENS E POI VOGLIO CHIUDERE
	// LA CHIUSURA DEVE ESSERE ALL'INTENS AUMENTATA OPPURE TOTALMENTE CHIUSO??
	// PER ORA LASCIO CHE CHIUDO TUTTO
			next = $('ul li.active').next();
		
			if (next.length == 0) {
			     ferma();
				switchCurtainProgram(0);
			       next = $('ul li:last-child');
						bladeCounter=0;
	    }
			$("ul.tenda > li.active").removeClass("chiuso");	
		}
		initScan(next);
	}
	
	
	
	
	function generateRotationCSS() {
		var css_rule = {
					'-webkit-transform' : 'perspective(3000px) rotateY('
						+ rotation_value + 'deg)',
				'-moz-transform' : 'perspective(3000px) rotateY('
						+ rotation_value + 'deg)',
				'-ms-transform' : 'perspective(3000px) rotateY('
						+ rotation_value + 'deg)',
				'-o-transform' : 'perspective(3000px) rotateY(' + rotation_value
						+ 'deg)',
				'transform' : 'perspective(3000px)  rotateY(' + rotation_value
						+ 'deg) '
			};
		return css_rule;
	}


//increase light
	function incrementa() {
		// width: 8 index: -1
		if ($(".tenda").hasClass('acceso')) {

			if(indexRotation>=5) {
				indexRotation--;
				rotation_value = rotation_array[indexRotation];
				if(indexRotation % 2 !=0 && indexRotation <=8){
				hookWidth=hookWidth-2;
				}
			
			if (indexRotation <5) {
				indexRotation = 5;
				
			}
			
		/*	if(indexP==0) {
				indexP=0; 
			}else {
				indexP--;
				if(indexP==2 || indexP==4) indexP--;
			}
			*/
			
			
			} else {
			
			
				indexRotation++;
			if(indexRotation % 2 !=0 && indexRotation <=4){
				hookWidth=hookWidth-2;
				}
			
			if (indexRotation > 4) {
				indexRotation = 4;
			}
			rotation_value = rotation_array[indexRotation];
			
			/*if(indexP==6) {
				indexP=6; 
			}else {
				indexP++;
				if(indexP==2 || indexP==4) indexP++;
			}*/
		
			//UPDATING INDEXFILTERING
			
			if(indexFiltering == 6)	indexFiltering = 1;
			else {
				indexFiltering++;
				if (indexFiltering == 2 || indexFiltering == 4)	indexFiltering++;

			}
			if (indexFiltering > indexCurtainLight)
				indexCurtainLight = indexFiltering;
			
			
			
			}
			backgroundIntensitySettings(4000);
		
			scanal_css = generateRotationCSS();
			$('ul li').not(".chiuso").find("li.pala").css(scanal_css);
									
			$('ul li').not(".chiuso").find('li.aggancio').find(".gancio").css('width', ''+hookWidth+'px');
			$('ul li').not(".chiuso").addClass("rotated");
		}

		return indexRotation;

	}

	
	
	//decrease light
	function decrementa() {
		if ($(".tenda").hasClass('acceso')) {
		//	setCurtainDirection(false);
			if(indexRotation> 4) {
				indexRotation++;
				rotation_value = rotation_array[indexRotation];
				if(indexRotation % 2 !=0 && indexRotation <=8){
				hookWidth=hookWidth+2;
				}
			
			if (indexRotation >9) {
				indexRotation = 9;
				rotation_value = rotation_array[indexRotation];
				hookWidth = 8;
				resetPala();
			}
			
		/*	if(indexP==6) {
				indexP=6; 
			}else {
				indexP++;
				if(indexP==2 || indexP==4) indexP++;
			}
			*/
			
			
			} else {
				indexRotation--;
	
				rotation_value = rotation_array[indexRotation];
			if(indexRotation % 2 !=0 && indexRotation > 0){
				hookWidth=hookWidth+2;
				}
			
			if (indexRotation < 1) {
				indexRotation = 0;
				rotation_value = rotation_array[indexRotation];
				hookWidth = 8;
			}
			
		/*	if(indexP==0) {
				indexP=0; 
			}else {
				indexP--;
				if(indexP==2 || indexP==4) indexP--;
			}
			*/
			
			//UPDATING INDEXFILTERING
			
			if(indexFiltering == 0)	indexFiltering = 0;
			else {
				indexFiltering--;
				if (indexFiltering == 2 || indexFiltering == 4)	indexFiltering--;
			}
			if (indexFiltering < indexCurtainLight)
				indexCurtainLight = indexFiltering;
			
			
			}
			scanal_css = generateRotationCSS();
			backgroundIntensitySettings(4000);

			$('ul li').not(".chiuso").find("li.pala").css(scanal_css);
			$('ul li').not(".chiuso").find('li.aggancio').find('.gancio').css('width', ''+hookWidth+'px');


		}
		return indexRotation;
	}
	
	function switchCurtainProgram(p) {
	program_index = p;
}

	function playCurtainProgram() {
	console.log("program_index: "+ program_index);
		
		//programma 1: apri
		if (program_index == 0) {
			apri();
		}
		//programma 2: chiudi
		if (program_index == 1) {
			chiudi();	
		}
		//programma 3: segui il sole
		if (program_index == 2) {
			if (!$(".tenda").hasClass('acceso')) accendi(); //forse meglio metterlo nel codice mqttsettings
		 //se poi uno vuole spegnerla allora a quel punto si chiude e finisce
			followInterval = setInterval(followTheSun, 1000);
		}

		}
	

	
	//devo ricordarmi di associare a ciascuna rotazione della pala il 
	//valore del black filter
	var currentDegs=0;
	var degs_range = {
		
        increment: {
            from: 225,
            to: 265
        },
		stationary: {
			from: 266,
			to: 299
		},
		decrement: {
            from: 300,
            to: 335
        }
    };

//DA PROBLEMI CON LA LUCE
// praticamente l'incremento e il decremento vengono eseguiti in base
// alla luce esterna. e siccome loro vedono sempre il cielo illuminato
// quando si va a decrementare, per lui c'è sempre luce'
	function followTheSun() {
		
			setCurtainPlaying(true);
			var degrees = getCurrentRotation(document.getElementById("parentCircle"));
			
			//check if current value is different from the received one
			if(degrees!=currentDegs){
				//so the update starts
			
	 //225 TO 265 STORTO ALB, 266 TO 279 DRITTO, 280 TO 335 STORTO TRAM

	 if(degrees >= degs_range.increment.from && degrees <=degs_range.decrement.to) { //sun is up
			
			if(degrees >= degs_range.increment.from && degrees <=degs_range.increment.to) { //morning
		//	for(var i = 0; i<=5; i++){
					incrementa();
			//	}
			}
			if(degrees >=degs_range.stationary.from && degrees <= degs_range.stationary.to) {
					indexRotation = 5;
			}
			if(degrees >= degs_range.decrement.from && degrees <=degs_range.decrement.to) { //afternoon
		//	for(var i = 0; i<arrayRot.length; i++){
						decrementa();	
			//	}
				}

		} else if((degrees >= 336 && degrees <= 359) || (degrees >= 0 && degrees <= 224)) {				
					// resetPala() toglie transizione alla fine di decrementa()
					// qui viene reimpostata
					var transitionVar = "2s";
					$('ul li').not(".chiuso").find("li.pala").css("transition", transitionVar);
				 
		}
		currentDegs=degrees;
		} 	

	}
	
	function resetPala(){
		$('ul li').not(".chiuso").find("li.pala").css({'transform':' perspective(3000px) rotateY(0deg)',
															'transition': 'none'});
		indexRotation = 0;
		rotation_value = rotation_array[indexRotation];		
	}
	
	
	//ferma l'apertura 
	function ferma() {
		  clearInterval(idInterval);
		  clearTimeout(idTimeout);
		  clearInterval(blackInterval);
		 clearInterval(followInterval);
		setCurtainPlaying(false);
		//return false;
	}


	function switchOnCurtain(){
			var millis, notComputed; // tempo da aggiungere
					
			if(turningOnCurtainTimeout!=null) {
				turningOnCurtainTimeout.pause();
				notComputed = turningOnCurtainTimeout.getTimeLeft();
			} else {
				notComputed = 0;
				millis = 0;
			}
			millis = notComputed + MILLISEC_HOUR;
			console.log("millis: "+millis+"/// notComputed: "+notComputed);
			
			turningOnCurtainTimeout = new timer(function() {
    			accendi(); 
				setTimeout(apri, 1000); 
				turningOnCurtainTimeout=null;
			}, millis);	
	}
	
	function shutDownCurtain(){
		var millis, notComputed; // tempo da aggiungere

					if(turningOffCurtainTimeout!=null) {
						turningOffCurtainTimeout.pause();
						notComputed = turningOffCurtainTimeout.getTimeLeft();
					} else {
						notComputed = 0;
						millis = 0;
					}
					millis = notComputed + MILLISEC_HOUR;
					console.log("millis: "+millis+"/// notComputed: "+notComputed);
					
					turningOffCurtainTimeout = new timer(function() {
    					spegni();  
						setTimeout(chiudi, 1000); 
						turningOffCurtainTimeout=null;
					}, millis);
					
	
	}
	
	