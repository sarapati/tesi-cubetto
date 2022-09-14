// ver. 1.0
/**
 * Classe JS che genera un background modificabile (via lampadina e tenda).
 * Si creano due filtri:
	- filtro black per l'accensione, l'intensità e lo spegnimento
	- filtro colore per il cambio di tonalità
 * I valori dei due filtri sono inversamente proprzionali. 
 * Valori di partenza: 
	- filtro black: 0.9 (opacità alta per mostrare la stanza al buio)
	- filtro colore: 0 (opacità bassa per mostrare la stanza al buio)
 * Valori quando la stanza è illuminata:
	- filtro black/white: 0 (non c'è nero visibile nel filtro)
	- filtro colore: 0.3 (opacità massima disposta per mostrare il colore)
 * La classe prevede:
	- un costruttore con parametri 	id (per div element),
									color valore per background, 
									opacity valore di opacità,
	- un metodo createFilter per creare e mostrare il div element,
	- metodi getter e setter per valore bakcgroundColor e opacity.
 *
 * Sono inizializzate anche variabili utilizzabili dai devices. 
*/

// variables for BackgroundFilter black and color elements
let black_filter, color_filter;
// array string for colors
// _, rosso, arancione, giallo, verde, ciano, blu, viola, fucsia
var array_colors = ["black", "red", "orange", "yellow", "green", "cyan", "blue", "purple", "magenta"];
// array for black filter intensity
var array_black_intensities = [0.9, 0.75, 0.6, 0.45, 0.3, 0.15, 0];
// array for color filter intensity
var array_color_intensities = [0, 0.15, 0.18, 0.21, 0.24, 0.27, 0.3];

// current color element
var color_value = array_colors[1];
// index generale per il colore corrente
var indexColor = 0;
// valore intensità per opacità background
var opacity_value;
// index generale per l'opacità corrente
var indexOpacity = 0;
// variables for opacities
// acceso: 0, spento: 0.9 
var black_opacity = array_black_intensities[indexOpacity];
// acceso: 0.3, spento: 0
var color_opacity = array_color_intensities[indexOpacity];





// JS class generating tag divs with changable opacity and color background
class BackgroundFilter {
	// constructor
	// @params 	id for tag div, color for backgroundColor of the filter, 
	// 			opacityValue for opacity of the filter
	constructor(id, color, opacityValue) {
		this.background = color;
		this.opacity = opacityValue;
		this.id = id;
		this.status = "editable";
		this.createFilter();
	}

	// create div for changing background
	createFilter() {
		// create div for the filter with id
		this.divElem = document.createElement("div");
		this.divElem.id = this.id;
		// adding background basic characteristics
		this.divElem.classList.add('background');

		// setting starting background and opacity
		this.divElem.style.backgroundColor = this.background;
		this.divElem.style.opacity = this.opacity;

		// adding it to common parent
		document.getElementById("background").appendChild(this.divElem);
	}

	setComputedTransition() {
		this.divElem.classList.add('notransition');
	this.divElem.offsetHeight; // Trigger a reflow, flushing the CSS changes
		this.divElem.classList.remove('notransition');
	
	}
	
	// setting new opacity for the filter
	setOpacity(newOpacity, time) { //500 standard
		if(this.status=="editable"){
			this.divElem.style.opacity = newOpacity;
			this.divElem.style.transition = "all "+time+"ms";
		}
	}
	
	// get the current opacity
	getOpacity() {
		return this.divElem.style.opacity;
	}
	
	// setting new color for the filter
	setBackgroundColor(newColor, time) {
		if(this.status=="editable"){
			this.divElem.style.backgroundColor = newColor;
			this.divElem.style.transition = "all "+time+"ms";
		}
	}

	// get the current background color
	getBackgroundColor() {
		return this.divElem.style.backgroundColor;
	}
	
	setStatus(newStatus) {
		this.status = newStatus;
	}
	
	// get the current status
	getStatus() {
		return this.status;
	}
}


// set initial black filter
function createBlackBackground() {
	black_filter = new BackgroundFilter("bw_filter", array_colors[0], black_opacity);

}
// set initial color filter
function createColorBackground() {
	color_filter = new BackgroundFilter("color_filter", color_value, color_opacity);

}
// calling the init functions
createBlackBackground();
createColorBackground();

	// PROBLEMI SE DURANTE IL PLAYING DI UNO SI VA CON IL PLAYING DELL'ALTRO
	// POI SE NON C'è LUCE HA EFFETTIVAMENTE SENSO APRIRE LA TENDA?
	// SI SE SI VUOLE ARIA, NO SE SI VUOLE LUCE, IN TAL CASO SI ACCENDE ANCHE 
	// LA LUCE DELLA LAMPADINA
	//OPPURE SI ACCENDE PRIMA LA LUCE E POI SE SI RIPREME SULL'APERTURA ALLORA
	// SI APRE LA TENDA

	//questo stesso discorso va applicato anche per l'intensità di luce
	//cioè se voglio un po di luce, posso ottenerlo o dalla lamp o dalla tenda	
	
function backgroundIntensitySettings(time){
	if(light_sensor_value > 20){ // cielo illuminato
		if(!bulb_var.getBulbStatus()) { // lampadina spenta
			
		//	if tenda opening/closing/aperta 
				indexOpacity = indexCurtainLight;
		} else { // lampadina accesa
			//qualsiasi movimento faccia la tenda
		//	if(tenda chiusa/aperta/opening/closing) {
				// se lampadina fa più luce
				if(indexBulbLight > indexCurtainLight)
					indexOpacity = indexBulbLight;
				// se tenda fa più luce	
				else indexOpacity = indexCurtainLight;
		//	}
		}
	} else { // cielo non illuminato	
		if(!bulb_var.getBulbStatus()) { // lampadina spenta
				//qualsiasi movimento faccia la tenda
				//if tenda chiusa/aperta/opening/closing 
					indexOpacity = 0;
		} else { // lampadina accesa
					//qualsiasi movimento faccia la tenda
					//if tenda chiusa/aperta/opening/closing 
					indexOpacity = indexBulbLight;
		}
	}
	
	black_opacity = array_black_intensities[indexOpacity];
	black_filter.setOpacity(black_opacity, time);
	
}


function backgroundColorSetting(time){
	if (indexBulbColor != 0) {
		color_opacity = array_color_intensities[indexBulbLight];
		color_value = array_colors[indexBulbColor];
	} else { // controllo per integrare il colore bianco
		color_opacity = array_color_intensities[0];
		color_value = array_colors[0];

	}
		color_filter.setBackgroundColor(color_value, time);	
		color_filter.setOpacity(color_opacity, time);
	
}