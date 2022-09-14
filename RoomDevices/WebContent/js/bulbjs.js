// ver. 1.0
/**
 * JS file per le operazioni di accensione/spegnimento, avvio/cambio programma, 
	cambio colore/intensità del bulbo.
	
	Viene definita la classe Bulb. Crea, definisce e mostra	il div relativo
	al bulbo (alone incluso) quando bisogna accenderlo, spegnerlo o	
	cambiargli colore. 
	
	Nota: l'oggetto di tipo Bulb viene continuamente sostituito
	al cambio di colore o all'accensione/spegnimento perché il suo colore è 
	un gradiente. I grandienti in js non sono modificabili con transition.
	Per questo ho simulato la transizione con le funzioni jQuery fadeIn e 
	fadeOut, cancellando di volta in volta gli elementi coperti.	
	
 */

// Creates a new bulb based on @param color (gradient) and shows it gradually
class Bulb {
	constructor(bulb_color, shadow_color) {
		this.background = bulb_color;
		this.position = "absolute";
		this.clipPath = "circle(54% at 50% 78%)";
		this.display = "none";
		this.filter = shadow_color;
	
		this.generateBulb();
	}

	generateBulb() {
		// Create div element
		this.divElement = document.createElement("div");
		this.divElement.id = "changable_bulb";
		this.divElement.classList.add('bulbo');

		// Styling it with new features
		this.divElement.style.position = this.position;
		this.divElement.style.clipPath = this.clipPath;
		
		// Get shadow element
		this.shadowElement = document.getElementById("bul-container");

		// Set background and shadow color
		this.setBackgroundColor(this.background);

		// Display setting (shadow is already visible)
		this.divElement.style.display = this.display;

		// Adding it to parent
		document.getElementById("bulbo").appendChild(this.divElement);
		
	}
	
	setBulbStatus(bool){
		this.status = bool;
	}
	
	getBulbStatus(){
		return this.status;
	}

	setBulbPlaying(bool) {
		this.isplay = bool;
	}
	
	getBulbPlaying() {
		return this.isplay;
	}

	showBulb(time) {
		this.divElement.classList.add('acceso');
		var showElement = this.getBulb();
		$(showElement).fadeIn(time);
		this.setShadow(time);
	}

	stopAnimation() {
		$(this.getBulb()).stop();
		clearTimeout(this.replaceTimeout);
	}
	// Returns shadow element
	getShadow() {
		return this.shadowElement;
	}

	// Styling shadow element with new features
	setShadow(time) {
		this.shadowElement.style.filter = this.filter;
		this.shadowElement.style.transition = time + "ms";
	}

	setComputedTransition() {
		this.shadowElement.classList.add('notransition');
		this.divElement.classList.add('notransition');
		
		this.stopAnimation();
		this.showBulb(1);
		this.replace(1);
		
		this.shadowElement.offsetHeight; // Trigger a reflow, flushing the CSS changes
		this.shadowElement.classList.remove('notransition');
		this.divElement.offsetHeight; // Trigger a reflow, flushing the CSS changes
		this.divElement.classList.remove('notransition');
	}

	// Set background color and shadow color
	setBackgroundColor(background_data) {
		this.divElement.style.background = background_data;
	}

	// Set display feature to the bulb element 
	// and the filter visibility of the shadow element
	setVisibility(data) {
		this.divElement.style.display = data;
		this.setShadow(1);
	}

	hideBulb(time) {
		var hideElement = this.getBulb();
		$(hideElement).fadeOut(time);
		this.filter = "none";
		this.setShadow(time);
		setTimeout(function() {
			$(hideElement).remove()
		}, time);
	}

	getBulb() {
		return this.divElement;
	}

	// Method used when changing color
	replace(time) { // time is usually 500
		// Simply replace the old element with a new one having another color
		this.replaceTimeout = setTimeout(function() {
			// Replace by class name
			var elements = document.getElementsByClassName('acceso bulbo');
			var requiredElement = elements[0];
			$(requiredElement).replaceWith(this);
		}, time);
	}

}

//index E indexCV POSSONO ANDARE IN CONFLITTO CON QUELLI DEGLI ALRTRI DISPOSITIVI

// indice per intensità e per colore
var indexBulbLight = 0; // ex indexI
var indexBulbColor = 0; // ex indexC
// indice generale
var index = indexBulbColor;
// array con intensità 
var array_intensities = [0, 10, 15, 20, 35, 40, 45];
// array con tonalità (hue) per gli 8 colori: 
// bianco, rosso, arancione, giallo, verde, ciano, blu, viola, fucsia
var array_hues = [0, 1, 30, 45, 90, 170, 220, 270, 330];
// valori intensità, colore e saturazione correnti
var intensity_value = array_intensities[6];
var hue_value = array_hues[0];
var saturation_subtract = 98;
// variabili per bulbo: centro, estremi
// variabile per sfumatura bordo: centro
var centro, estremi;
// variabili per impostare le css rules
var bulbo_css, shadow_css;
// variabili globali per gli oggetti di tipo Bulb
var bulb_var;
// durata alba/tramonto
var sun_time = (1 * 60) * 1000; // sostituire 1*60 con 10*60
// variabili per i loop
var playInterval, playTimeout, discoTimeout;

	var turningOnBulbTimeout = null;
	var turningOffBulbTimeout = null;
	
	var MILLISEC_HOUR = 3600000;
	
function ffinit(){
		bulb_var = new Bulb("radial-gradient(circle, rgba(165, 165, 165, 1) 45%, rgba(140, 140, 140, 1) 100%)", "none");
		bulb_var.setVisibility("inline");
		bulb_var.setBulbStatus(false);
		bulb_var.setBulbPlaying(false);
		
}

// Turns on the bulb
function lightUp() {
	//index = 0;
	// pone a 0 l'indice per colore così da ricominciare da rosso
	//indexC = -1;
	// pone a 1 l'indice per intensita così da ricominciare da max luminosità
	//indexI = 1;
	// aggiungo classe acceso alle componenti fisse della lampadina
	if (!$(".supporto").hasClass('acceso')) {
		$(".bulbo-bordo").addClass('acceso');
		$(".supporto").addClass('acceso');
		$(".supporto-bordo").addClass('acceso');
		$(".supporto-bordo-finale").addClass('acceso');
		$(".base-a-vite").addClass('acceso');
		$(".scanalatura").addClass('acceso');

		if(centro == null && estremi == null) {
			indexBulbLight = 6;
		}

		generateRGBs();
		generateCSSrules();
		
		bulb_var = new Bulb(bulbo_css, shadow_css);
		bulb_var.showBulb(500);

		
		bulb_var.setBulbStatus(true);
		bulb_var.setBulbPlaying(false);
		backgroundIntensitySettings(500);

}

}

function lightOff() {
	// se un loop è in corso
	//	stopProgram();
	

	// rimuovo classe acceso alle componenti fisse della lampadina
	$(".bulbo-bordo").removeClass('acceso');
	$(".supporto").removeClass('acceso');
	$(".supporto-bordo").removeClass('acceso');
	$(".supporto-bordo-finale").removeClass('acceso');
	$(".base-a-vite").removeClass('acceso');
	$(".scanalatura").removeClass('acceso');

	bulb_var.hideBulb(500);
	bulb_var.setBulbStatus(false);
		bulb_var.setBulbPlaying(false);
		
	backgroundIntensitySettings(500);
	
	}

function cambiaIntens(direction) {
// update intensity index of light
	if (direction == 1) { // if user wants to increase intensity
		// checking intensity index stays 6 if user gives direction 1 again
	//	if (indexI == 1) lightUp(); 
		if (indexBulbLight == 6) return;
		else { // else if indexI is < 6
			indexBulbLight++;	
		}
	
	} else if (direction == -1) { // if user wants to decrease intensity
		// checking intensity index stays 0 if user gives direction -1 again
		if (indexBulbLight == 0) return; 
		else { // else if indexI is > 0
			indexBulbLight--;
		}
	}
	setIntens();
	
}

function setIntens(){
	// set black background filter opacity
	//black_opacity = array_black_intensities[indexBulbLight];
	//black_filter.setOpacity(black_opacity);
			
	// white checking
//	if (index != 0)	{	
		// set color background filter opacity
	//	color_opacity = array_color_intensities[indexBulbLight];
	//	color_filter.setOpacity(color_opacity);
	//}
	
	// set bulb intensity_value to next value (indexI) in the array
	intensity_value = array_intensities[indexBulbLight];
	//if (indexBulbLight == 0)	{	
		//lightOff();
//	}
	
	// calcola da hsl a rgb
	generateRGBs();
	generateCSSrules();

	updateBulb(500);
	backgroundIntensitySettings(500);
		backgroundColorSetting(500);

}

//serve a mqttsettings
function getIntens() {
	return intensity_value;
}

function cambiaCol(direction) {
	genColor(direction);
	// modifica il css delle componenti dinamiche della lampadina	
	updateBulb(500);
	backgroundColorSetting(500);

}

// create new bulb element with new settings, show it and replace previous one
function updateBulb(time) {
	//	$(".bul-container").css(shadow_css);
	bulb_var = new Bulb(bulbo_css, shadow_css);
	bulb_var.showBulb(time);
	bulb_var.setBulbStatus(true);
	bulb_var.replace(time);
	
}

function genColor(direction) {
	// aggiorna l'index colore
	if (direction == 1)
		indexBulbColor = (indexBulbColor + 1) % 9;
	else if (direction == -1) {
		indexBulbColor = (indexBulbColor - 1) % 9;
		// controllo indice circolare all'indietro'
		if (indexBulbColor == -1) indexBulbColor = 8;
	}
	
	index = indexBulbColor;

	// imposta value al prossimo valore di colore nell'array
	hue_value = array_hues[indexBulbColor];
//	color_value = array_colors[indexBulbColor];

	// calcola da hsl a rgb per cambiare i colori
	if (indexBulbColor != 0) {
		saturation_subtract = 0;
	//	color_opacity = array_color_intensities[indexBulbLight];
		} else { // controllo per integrare il colore bianco (indexC=0)
		saturation_subtract = 98;
	//		color_opacity = 0;
	}
	
	generateRGBs();
	generateCSSrules();
}


function switchBulbProgram(p) {
	now_playing = p;
console.log("status: "+	bulb_var.getBulbStatus());
	console.log("playing: "+bulb_var.getBulbPlaying());

}

function playBulbProgram() {
//	now_playing = programma;
//	console.log(programma);
bulb_var.setBulbPlaying(true);
console.log("status: "+	bulb_var.getBulbStatus());
	console.log("pplaying: "+bulb_var.getBulbPlaying());
	//programma 1: sunrise
	if (now_playing == 0) {
		//supponiamo che l'alba richieda 1 ora, cioè 60 minuti
		// per ottenere il numero di secondi: min x 60
		// per ottenere il numero di millisecondi: min x 60000 oppure sec x 1000
		// i colori sono 6, quindi i 60 min devono essere divisi in parti eque per essi
		// 10 minuti ciascuno (10*60*1000)

		playTimeout = setTimeout(function() {
			saturation_subtract = 30;
			console.log("status: "+	bulb_var.getBulbStatus());

			hue_value = array_hues[5];
			intensity_value = array_intensities[1];
			
			generateRGBs();
			sunrise();
			
			color_value = array_colors[5];			
			color_opacity = array_color_intensities[1];
			
			color_filter.setOpacity(color_opacity, sun_time);
			color_filter.setBackgroundColor(color_value, sun_time);		
			
			indexBulbLight=0;
						black_opacity = array_black_intensities[indexBulbLight+1];
						black_filter.setOpacity(black_opacity, sun_time);
						indexBulbLight++;
			
			playTimeout = setTimeout(function() {
				hue_value = array_hues[7];
				
				generateRGBs();
				sunrise();
				
				color_value = array_colors[7];			
				
				color_filter.setOpacity(color_opacity, sun_time);
				color_filter.setBackgroundColor(color_value, sun_time);		

				black_opacity = array_black_intensities[indexBulbLight];
						black_filter.setOpacity(black_opacity, sun_time);
						indexBulbLight++;
				
				playTimeout = setTimeout(function() {
					hue_value = array_hues[1];
					intensity_value = array_intensities[0];
					
					generateRGBs();
					sunrise();
					
					color_value = array_colors[1];			
 
					color_filter.setOpacity(color_opacity, sun_time);
					color_filter.setBackgroundColor(color_value, sun_time);		
						
						black_opacity = array_black_intensities[indexBulbLight];
						black_filter.setOpacity(black_opacity, sun_time);
						indexBulbLight++;	
					playTimeout = setTimeout(function() {
						hue_value = array_hues[2];
						intensity_value = array_intensities[1];
						
						generateRGBs();
						sunrise();
						
						color_value = array_colors[2];			

						color_filter.setOpacity(color_opacity, sun_time);
						color_filter.setBackgroundColor(color_value, sun_time);		
			
							black_opacity = array_black_intensities[indexBulbLight];
						black_filter.setOpacity(black_opacity, sun_time);
						indexBulbLight++;
								
						playTimeout = setTimeout(function() {
							intensity_value = array_intensities[3];
							
							generateRGBs();
							sunrise();
							
							color_opacity = array_color_intensities[3];
						
							color_filter.setOpacity(color_opacity, sun_time);
							color_filter.setBackgroundColor(color_value, sun_time);		

							black_opacity = array_black_intensities[indexBulbLight];
						black_filter.setOpacity(black_opacity, sun_time);
						indexBulbLight++;
							
							playTimeout = setTimeout(function() {
								saturation_subtract = 10;
								
								intensity_value = array_intensities[5];
								
								generateRGBs();
								sunrise();
								
								color_opacity = array_color_intensities[5];
								
								color_filter.setOpacity(color_opacity, sun_time);
								color_filter.setBackgroundColor(color_value, sun_time);		
					
								black_opacity = array_black_intensities[indexBulbLight];
						black_filter.setOpacity(black_opacity, sun_time);
						indexBulbLight++;
						
								playTimeout = setTimeout(function() {
									saturation_subtract = 98;
								
									intensity_value = array_intensities[6];
									hue_value = array_hues[0];
									
									
									generateRGBs();
									sunrise();
									
									color_opacity = array_color_intensities[0];
			
									color_filter.setOpacity(color_opacity, sun_time);
									color_filter.setBackgroundColor(color_value, sun_time);		
								//	color_value = array_colors[0];			


										black_opacity = array_black_intensities[indexBulbLight];
						black_filter.setOpacity(black_opacity, sun_time);
						
									playTimeout = setTimeout(function() {
													bulb_var.isPlaying(false);
										}, sun_time);
								}, sun_time);
							}, sun_time);
						}, sun_time);
					}, sun_time);
				}, sun_time);
			}, sun_time);
		}, 1);

	}
	//programma 2: sunset
	if (now_playing == 1) {
		//da aggiustare i colori
		playTimeout = setTimeout(function() {
	//var array_colors = ["black", "red", "orange", "yellow", "green", "cyan", "blue", "purple", "magenta"];
	//var array_black_intensities = [0.9, 0.75, 0.6, 0.45, 0.3, 0.15, 0];
	
			// arancione chiaro forte
						saturation_subtract = 30;
			
						hue_value = array_hues[2];
						intensity_value = array_intensities[3];
						
						generateRGBs();
						sunrise();
						
						color_value = array_colors[2];			
						color_opacity = array_color_intensities[4];

						color_filter.setOpacity(color_opacity, sun_time);
						color_filter.setBackgroundColor(color_value, sun_time);		
			
						indexBulbLight=6;
						black_opacity = array_black_intensities[indexBulbLight];
						black_filter.setOpacity(black_opacity, sun_time);
						indexBulbLight--;

			playTimeout = setTimeout(function() {

				//arancione 
								saturation_subtract = 10;


				intensity_value = array_intensities[2];
							
							generateRGBs();
							sunrise();
							
							color_opacity = array_color_intensities[5];
						
							color_filter.setOpacity(color_opacity, sun_time);
							color_filter.setBackgroundColor(color_value, sun_time);		

							black_opacity = array_black_intensities[indexBulbLight];
						black_filter.setOpacity(black_opacity, sun_time);
						indexBulbLight--;
						
				playTimeout = setTimeout(function() {
					
					//arancione scuro forte
										saturation_subtract = 0;

								intensity_value = array_intensities[1];
								
								generateRGBs();
								sunrise();
								
								color_opacity = array_color_intensities[6];
								
								color_filter.setOpacity(color_opacity, sun_time);
								color_filter.setBackgroundColor(color_value, sun_time);		
				
				
					black_opacity = array_black_intensities[indexBulbLight];
						black_filter.setOpacity(black_opacity, sun_time);
						indexBulbLight--;
				
					playTimeout = setTimeout(function() {
						
					// rosso
					
					hue_value = array_hues[1];
					intensity_value = array_intensities[2];
					
					generateRGBs();
					sunrise();
					
					color_value = array_colors[1];			
 								color_opacity = array_color_intensities[4];

					color_filter.setOpacity(color_opacity, sun_time);
					color_filter.setBackgroundColor(color_value, sun_time);		
					
					black_opacity = array_black_intensities[indexBulbLight];
						black_filter.setOpacity(black_opacity, sun_time);
						indexBulbLight--;
						
						playTimeout = setTimeout(function() {
							
							//viola
							hue_value = array_hues[7];
				
				generateRGBs();
				sunrise();
				
				color_value = array_colors[7];			
				
				color_filter.setOpacity(color_opacity, sun_time);
				color_filter.setBackgroundColor(color_value, sun_time);		

black_opacity = array_black_intensities[indexBulbLight];
						black_filter.setOpacity(black_opacity, sun_time);
						indexBulbLight--;
				
							playTimeout = setTimeout(function() {
								
								// blu
			
			hue_value = array_hues[6];
			intensity_value = array_intensities[1];
			
			generateRGBs();
			sunrise();
			
			color_value = array_colors[6];			
			color_opacity = array_color_intensities[1];
			
			color_filter.setOpacity(color_opacity, sun_time);
			color_filter.setBackgroundColor(color_value, sun_time);		
					black_opacity = array_black_intensities[indexBulbLight+1];
						black_filter.setOpacity(black_opacity, sun_time);
						indexBulbLight--;
								playTimeout = setTimeout(function() {
								
									//spegni
									
									lightOff();
														
									playTimeout = setTimeout(function() {loop=false;}, sun_time);

								}, sun_time);
							}, sun_time);
						}, sun_time);
					}, sun_time);
				}, sun_time);
			}, sun_time);
		}, 1);
	}
	// programma 3: disco
	if (now_playing == 2) {
			console.log("appena lanciato: "+bulb_var.getBulbPlaying());
			playInterval = setInterval(function() {
			
			turnToBlack();
			discoTimeout = setTimeout(function(){
					setColor();
					bulb_var = new Bulb(bulbo_css, shadow_css);
				bulb_var.showBulb(1);
		bulb_var.setBulbPlaying(true);
	bulb_var.setBulbStatus(true);	
				black_filter.setOpacity(array_black_intensities[6], 1);
				
				}, 500);

		
					
				
				

		}, 1000);

	}

}

function sunrise() {
	if (status_flag.SMARTBULB == 0) { //sto controllo non dovrebbe sta qua
		lightUp();
	}
	generateCSSrules();
	updateBulb(sun_time);
	bulb_var.setBulbPlaying(true);

}

function setColor() {
	genColor(1);
	updateBulb(1);
	
backgroundColorSetting(1);

}


function stopProgram() {
	clearInterval(playInterval);
//	for (var i = 0; i < playTimeout.length; i++)
		clearTimeout(playTimeout);
//	clearTimeout(discoTimeout); //commentato se stop su nero va avanti il colore

	bulb_var.setBulbPlaying(false);
						
	console.log("stopProgram: "+bulb_var.getBulbPlaying());
	/*color_filter.setComputedTransition();		
	black_filter.setComputedTransition();
	bulb_var.setComputedTransition();*/
	

}

function turnToWhite() {
	bulb_var.replace(3000);
	intensity_value = array_intensities[6];
	hue_value = 0;
	saturation_subtract = 98;
	generateRGBs();
	generateCSSrules();
	updateBulb(3000);
	indexBulbLight = 5;
	indexBulbColor = -1;
}


function turnToBlack() {
		
	bulb_var.hideBulb(1);
	bulb_var.setBulbPlaying(true);
	bulb_var.setBulbStatus(true);	
	black_filter.setOpacity(array_black_intensities[0], 1);
	color_filter.setOpacity(array_color_intensities[0], 1);
		

}


function generateCSSrules() {
	bulbo_css = "radial-gradient(circle, " + centro + " 10%, " + estremi + " 100%)";
	shadow_css = "drop-shadow(0 -10px 25px " + centro + ")";
}

// Set values for bulb gradient
// color is white if hue_value == 0 AND saturation_subtract == 98 
function generateRGBs() {
	centro = hslToRgb(hue_value, 98 - saturation_subtract, intensity_value + 58);
	estremi = hslToRgb(hue_value, 98 - saturation_subtract, intensity_value + 48);
}



	function switchOnBulb(){
			var millis, notComputed; // tempo da aggiungere
					
			if(turningOnBulbTimeout!=null) {
				turningOnBulbTimeout.pause();
				notComputed = turningOnBulbTimeout.getTimeLeft();
			} else {
				notComputed = 0;
				millis = 0;
			}
			millis = notComputed + MILLISEC_HOUR;
			console.log("millis: "+millis+"/// notComputed: "+notComputed);
			
			turningOnBulbTimeout = new timer(function() {
    			lightUp(); 
				turningOnBulbTimeout=null;
			}, millis);	
	}
	
	function shutDownBulb(){
		var millis, notComputed; // tempo da aggiungere

					if(turningOffBulbTimeout!=null) {
						turningOffBulbTimeout.pause();
						notComputed = turningOffBulbTimeout.getTimeLeft();
					} else {
						notComputed = 0;
						millis = 0;
					}
					millis = notComputed + MILLISEC_HOUR;
					console.log("millis: "+millis+"/// notComputed: "+notComputed);
					
					turningOffBulbTimeout = new timer(function() {
    					lightOff();  
						turningOffBulbTimeout=null;
					}, millis);
					
	
	}
	
	



//https://css-tricks.com/converting-color-spaces-in-javascript/
function hslToRgb(h, s, l) {
	// Must be fractions of 1
	s /= 100;
	l /= 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
		x = c *
		(1 - Math.abs((h / 60) % 2 - 1)),
		m = l - c / 2,
		r = 0,
		g = 0,
		b = 0;
	if (0 <= h && h < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (60 <= h && h < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (120 <= h && h < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (180 <= h && h < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (240 <= h && h < 300) {
		r = x;
		g = 0;
		b = c;
	} else if (300 <= h && h < 360) {
		r = c;
		g = 0;
		b = x;
	}
	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);

	return "rgb(" + r + "," + g + "," + b + ")";
}