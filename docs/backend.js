var client
var mqtt
export function initialConnect(){
	 mqtt = require('mqtt')
	 client  = mqtt.connect('mqtt://broker.mqtt-dashboard.com')
}

// TIMEOUT ERROR IS HERE -- on client.publish(...) "cannot read "Cannot read property 'publish' of undefined""
export function send(msgToSend) {
    
	var options={retain:true}; //this retains each message on the MQTT broker, so that when an ornament is plugged in, it will immediately see the last message and sync up with the other ornaments without having to wait for a new message
	if(client){
		console.log("client exists")
	}else{
		console.log("client doesn't exist, recreating")
		mqtt = require('mqtt')
	 	client  = mqtt.connect('mqtt://broker.mqtt-dashboard.com')
	}
	client.publish('GUHemmTree', msgToSend, options)
}


export function sendFormatter(input,theuserID){
	var mqttMsgToSend;

	if(!input.startsWith("customColor") && !input.startsWith("customPattern")){ //don't convert customColor/Pattern messages to lower case cause it messes them up
		input = input.toLowerCase()
	}

	/*SOLID COLORS*/
	
	if(input=="red"){
		mqttMsgToSend='COLOR255000000';
	}
	
	else if(input=='green'){
		mqttMsgToSend='COLOR000255000'
	}
	else if(input == 'lime'){
		mqttMsgToSend = 'COLOR078187023'
	}
	else if(input=='blue'){
		mqttMsgToSend='COLOR000000255'
	}
	else if(input == 'cyan'){
		mqttMsgToSend = 'COLOR000255255'
	}
	else if(input =='coralblue'){
		mqttMsgToSend = 'COLOR071069122'
	}
	else if(input == 'fuschia'){
		mqttMsgToSend = 'COLOR255087051'
	}
	else if(input=='purple'){
		mqttMsgToSend='COLOR128021232'
	}
	else if(input=='gold'){
		mqttMsgToSend='COLOR227165010'
	}
	else if(input=='salmon'){
		mqttMsgToSend='COLOR255000110'
	}
	else if(input=='yellow'){
		mqttMsgToSend='COLOR241245000'
	}
	else if(input=='darkred'){
		mqttMsgToSend='COLOR139000000'
	}
	else if(input=='turquoise'){
		mqttMsgToSend='COLOR080186111'
	}
	else if(input=='orange'){
		mqttMsgToSend='COLOR255040000'
	}
	else if(input=='white'){
		mqttMsgToSend='COLOR255255255'
	}
	else if(input=='sky'){
		mqttMsgToSend='COLOR061155233'
	}
	else if(input=='darkgreen'){
		mqttMsgToSend='COLOR043083054'
	}
	else if(input=='black'){
		mqttMsgToSend='COLOR000000000'
	}
	else if(input=='pinkish'){
		//mqttMsgToSend='COLOR201051254'
		mqttMsgToSend='COLOR141076200'
	}
	else if(input.startsWith("customColor")){
		mqttMsgToSend=input.substring(11)
	}

/*PATTERNS*/

	else if(input=='fasu'){
		mqttMsgToSend='COLOR255000000255000000000000255000000255255255000255255000'
	}
	else if(input=='pcld'){
		mqttMsgToSend='FRACS255070000255000000255190000'
	}
	else if(input=='christmas'){
		mqttMsgToSend='COLOR255000000255000000000255000000255000'
	}
	else if(input=='hanukkah'){
		mqttMsgToSend='COLOR255255255255255255000000255000000255'
	}
	else if(input=='gozags'){
		mqttMsgToSend='COLOR255000000255000000000000255000000255'
	}
	else if(input=='candycane'){
		mqttMsgToSend='COLOR255255255255255255255255255255000000255000000255000000'
	}
	else if(input=='individual'){
		mqttMsgToSend='OTHERdifferentcolors'
	}
	else if(input=='random'){
		mqttMsgToSend='OTHERrandom'
	}
	else if(input=='kwanzaa'){
		mqttMsgToSend='COLOR255000000255000000000000000000000000000255000000255000000000000000000000'
	}
	else if(input=='rainbowpat'){
		mqttMsgToSend='OTHERrainbow'
	}
	else if(input=='halloween'){
		mqttMsgToSend='COLOR16000013016000013016000013025504000025504000025504000'
	}
	else if(input=='usa'){
		mqttMsgToSend='COLOR255255255255255255255000000255000000000000255000000255'
	}
	else if(input=='joker'){
		mqttMsgToSend='COLOR128000128128000128000255000000255000'
	}
	else if(input=='grinch'){
		mqttMsgToSend='OTHERgrinch'
	}
	else if(input=='camouflague'){
		mqttMsgToSend='COLOR255125030'	
	}
	else if(input=='randompattern'){
		var textToSend="FRACS"
		var numLoops = Math.floor(Math.random() * (5 - 2) + 2);
		for (let i = 0; i<numLoops; i++) { //number of colors
			for(let j=0;j<3;j++){ //do RGB for each
				//complicated rand formula to ensure distinct colors (not just pastel)
				var randVal;
				if(Math.random()>0.75){ //25% of the time, be in this range
					randVal=Math.floor(Math.random() * (220 - 30) + 30);
				}else{ //75% of the time choose a more defined color component
					if(Math.random()>0.5){
						randVal=Math.floor(Math.random() * (30 - 0) + 0);
					}else{
						randVal=Math.floor(Math.random() * (255 - 220) + 220);
					}
				}
				
				var textRandVal;
				//left padding with 0s
				if(randVal<10){
					textRandVal="00"+randVal;
				}else if(randVal<100){
					textRandVal="0"+randVal;
				}else{
					textRandVal=randVal;
				}
				textToSend+=textRandVal;
			}
		}
		mqttMsgToSend=textToSend;
	}
	else if(input.startsWith("customPattern")){
		mqttMsgToSend=input.substring(13)
	}


	/*ANIMATIONS*/
	else if(input=='rainbow'|| input=='pride'){
		mqttMsgToSend='DYNAMrainbow'
	}
	else if(input=='colorchase'){
		mqttMsgToSend='DYNAMchase'
	}
	else if(input=='ambient'){
		mqttMsgToSend='DYNAMfade'
	}
	else if(input=='colorwipe'){
		mqttMsgToSend='DYNAMcolorwipe'
	}
	else if(input=='multicolorwipe'){
		mqttMsgToSend='DYNAMmulticolorwipe'
	}
	else if(input=='twinkle'){
		mqttMsgToSend='DYNAMtwinkle'
	}
	else if(input=='pulses'){
		mqttMsgToSend='DYNAMpulses'
	}


	/*SECRETS*/
	else if(input=='thayne'){
		mqttMsgToSend='SHORTthayne'
	}
	else if(input=='emma'){
		mqttMsgToSend='SHORTemma'
	}
	else if(input=='emmag'){
		mqttMsgToSend='OTHERemmag'
	}
	else if(input=='jordan'){
		mqttMsgToSend='SHORTjordan'
	}
	else if(input=='bea'){
		mqttMsgToSend='COLOR255000000000000255255255000'
	}
	else if(input=='kaitlyn'){
		mqttMsgToSend='OTHERkaitlyn'
	}
	else if(input=='fred'){
		mqttMsgToSend='OTHERfred'
	}
	else if(input=='abbyr'){
		mqttMsgToSend='FRACS128000128000255000'
	}
	else if(input=='eva'){ //"jail"
		mqttMsgToSend='COLOR000000000000000000000000000000000000000000000255255255255255255255255255255255255255255255'
	}

	/*Pride Mode Secrets*/
	else if(input=='trans' || input=='transgender'){
		mqttMsgToSend='FRACS001159205200130145255255255200130145001159205001159205200130145255255255200130145001159205001159205200130145255255255200130145001159205'
	}
	else if(input=='pan' || input=='pansexual'){
		mqttMsgToSend='FRACS255033140255216000033177255255033140255216000033177255255033140255216000033177255'
	}
	else if(input=='bi' || input=='bisexual'){
		mqttMsgToSend='FRACS080000082080000082036010071000000100000000100080000082080000082036010071000000100000000100080000082080000082036010071000000100000000100'
	}
	else if(input=='gay'){
		mqttMsgToSend='FRACS007142112038206170152232193255255255123173226060073203041026125007142112038206170152232193255255255123173226060073203041026125'
	}
	else if(input=='les' || input=='lesbian'){
		mqttMsgToSend='FRACS213045000235124066255255255180078144143002078213045000235124066255255255180078144143002078213045000235124066255255255180078144143002078'
	}
	else if(input=='ace' || input=='asexual'){
		mqttMsgToSend='FRACS001001001100100100255255255104006080001001001100100100255255255104006080001001001100100100255255255104006080'
	}
	else if(input=='enby' || input=='non-binary' || input=='non binary'){
		mqttMsgToSend='FRACS255216000255255255140089180001001001255216000255255255140089180001001001255216000255255255140089180001001001'
	}
	else if(input=='aro' || input=='aromantic'){
		mqttMsgToSend='FRACS058166064168212122255255255130130130001001001058166064168212122255255255130130130001001001058166064168212122255255255130130130001001001'
	}
	else if(input=='queer' || input=='genderqueer'){
		mqttMsgToSend='FRACS141076200255255255034109025141076200255255255034109025141076200255255255034109025'
	}

	else if(input=='disable'){
		mqttMsgToSend='SLEEP'
	}
	else if(input=='enable'){
		mqttMsgToSend='AWAKE'
	}else{
		input='INVALID'
		mqttMsgToSend='SHORTinvalid'
	}

	
	

	send(mqttMsgToSend)
	var mqtt = require('mqtt')
	var client  = mqtt.connect('mqtt://broker.mqtt-dashboard.com')
	client.publish('GUHemmTreeStats', input+","+theuserID)
}