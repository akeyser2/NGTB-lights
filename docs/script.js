import {sendFormatter} from './backend.js';
import {initialConnect} from './backend.js';
// import {local as storage} from 'wix-storage';

var lastCustomColorChangeTime = Date.now(); //keeps track of the timestamp of the last custom color change. This can be used to filter out the rapid calles to onChange on that element in Safari


// Velo API Reference: https://www.wix.com/velo/reference/api-overview/introduction
const previewArray = [$w('#box1'), $w('#box2'), $w('#box3'),
    $w('#box4'), $w('#box5'), $w('#box6'),
    $w('#box7'), $w('#box8'), $w('#box9'),
    $w('#box10'), $w('#box11'), $w('#box12')
];

const colorArray = ['rgb(255,0,0)', 'rgb(255,127,0)', 'rgb(255,255,0)',
    'rgb(127,255,0)', 'rgb(0,255,0)', 'rgb(0,255,127)',
    'rgb(0,255,255)', 'rgb(0,127,255)', 'rgb(0,0,255)',
    'rgb(127,0,255)', 'rgb(255,0,255)', 'rgb(255,0,127)'
]
const gradient = [
    "#ff0000", // Red
    "#ff3300",
    "#ff6600",
    "#ff9900",
    "#ffcc00",
    "#ffff00", // Yellow
    "#ccff00",
    "#99ff00",
    "#66ff00",
    "#33ff00",
    "#00ff00", // Green
    "#00ff33",
    "#00ff66",
    "#00ff99",
    "#00ffcc",
    "#00ffff", // Cyan
    "#00ccff",
    "#0099ff",
    "#0066ff",
    "#0033ff",
    "#0000ff" // Blue
];
var lastCustomColorChangeTime = Date.now()
var numOfColors = 1
var colorsSelected = 0
var animationInterval
var currentMode = ''
var userID;

//used for the ambient function
let gradient_forward = 0
let gradient_backward = 19
let reverse_gradient = false
// used for the color chase funtion
let start_pos = 0

$w.onReady(function () {

    initialConnect()
    
    // let hexColor = "#ffff33"; // Replace with your hex color code
    // let rgbString = hexToRgbString(hexColor);
    // console.log(rgbString); // Outputs: "COLOR255087051"
	
	//Keep userID saved in cookies so we can send it along with each command and keep track of stats for tree users
	const returningVisitor = storage.getItem('NGTBRGBreturningVisitor');
    if(returningVisitor !== 'yes') {
		userID = Math.floor(Math.random() * (997199254740991 - 0) + 0).toString();
		console.log("New visitor, setting userID to: ");
		console.log(userID)
        storage.setItem('NGTBRGBuserID', userID)     
        storage.setItem('NGTBRGBreturningVisitor', 'yes'); 
    }else{
		userID = storage.getItem('NGTBRGBuserID');
		console.log("Returning visitor, userID is: ");
		console.log(userID + " is not nan");
	}


    $w('#redbutton').style.backgroundColor = 'rgb(252, 16, 18)'
    $w('#orangebutton').style.backgroundColor = 'rgb(252, 134, 18)'
    $w('#yellowbutton').style.backgroundColor = 'rgb(252, 253, 18)'
    $w('#limebutton').style.backgroundColor = 'rgb(133, 253, 18)'
    $w('#greenbutton').style.backgroundColor = 'rgb(15, 253, 18)'
    $w('#mintbutton').style.backgroundColor = 'rgb(15, 253, 136)'
    $w('#cyanbutton').style.backgroundColor = 'rgb(15, 253, 255)'
    $w('#coralblue5button').style.backgroundColor = 'rgb(15, 134, 255)'
    $w('#bluebutton').style.backgroundColor = 'rgb(15, 16, 255)'
    $w('#purplebutton').style.backgroundColor = 'rgb(133, 16, 255)'
    $w('#pinkbutton').style.backgroundColor = 'rgb(252, 16, 255)'
    $w('#fuchsiabutton').style.backgroundColor = 'rgb(252, 16, 136)'


});

// **********
// All the color buttons
// **********

export function redbutton_click(event) {
    stopAnimation()
    if (numOfColors == colorsSelected) {
        console.log("pass")
    } else if (numOfColors > 1 && colorsSelected < numOfColors) {
        $w('#redbutton').disable()
        colorsSelected++
        $w('#rednumtext').text = colorsSelected.toString()
        $w('#rednumtext').show()
        let offset = ((previewArray.length / numOfColors) * (colorsSelected - 1))
        for (let i = 0; i < (previewArray.length / numOfColors); i++) {
            // //            console.log($w("#group1").children[i].id);            previewArray[i + offset].style.backgroundColor = $w('#redbutton').style.backgroundColor
        }
    } else {
        currentMode = 'red'
        for (let i in previewArray) {
            previewArray[i].style.backgroundColor = $w('#redbutton').style.backgroundColor
        }
    }
}

export function orangebutton_click(event) {
    stopAnimation()
    if (numOfColors == colorsSelected) {
        console.log("pass")
    } else if (numOfColors > 1 && colorsSelected < numOfColors) {
        $w('#orangebutton').disable()
        colorsSelected++
        $w('#orangenumtext').text = colorsSelected.toString()
        $w('#orangenumtext').show()
        let offset = ((previewArray.length / numOfColors) * (colorsSelected - 1))
        for (let i = 0; i < (previewArray.length / numOfColors); i++) {
            previewArray[i + offset].style.backgroundColor = $w('#orangebutton').style.backgroundColor
        }
    } else {
        currentMode = 'orange'
        for (let i in previewArray) {
            previewArray[i].style.backgroundColor = $w('#orangebutton').style.backgroundColor
        }
    }
}

export function yellowbutton_click(event) {
    stopAnimation()
    if (numOfColors == colorsSelected) {
        console.log("pass")
    } else if (numOfColors > 1 && colorsSelected < numOfColors) {
        $w('#yellowbutton').disable()
        colorsSelected++
        $w('#yellownumtext').text = colorsSelected.toString()
        $w('#yellownumtext').show()
        let offset = ((previewArray.length / numOfColors) * (colorsSelected - 1))
        for (let i = 0; i < (previewArray.length / numOfColors); i++) {
            previewArray[i + offset].style.backgroundColor = $w('#yellowbutton').style.backgroundColor
        }
    } else {
        currentMode = 'yellow'
        for (let i in previewArray) {
            previewArray[i].style.backgroundColor = $w('#yellowbutton').style.backgroundColor
        }
    }
}

export function limebutton_click(event) {
    stopAnimation()
    if (numOfColors == colorsSelected) {
        console.log("pass")
    } else if (numOfColors > 1 && colorsSelected < numOfColors) {
        $w('#limebutton').disable()
        colorsSelected++
        $w('#limenumtext').text = colorsSelected.toString()
        $w('#limenumtext').show()
        let offset = ((previewArray.length / numOfColors) * (colorsSelected - 1))
        for (let i = 0; i < (previewArray.length / numOfColors); i++) {
            previewArray[i + offset].style.backgroundColor = $w('#limebutton').style.backgroundColor
        }
    } else {
        currentMode = 'lime'
        for (let i in previewArray) {
            previewArray[i].style.backgroundColor = $w('#limebutton').style.backgroundColor
        }
    }
}

export function greenbutton_click(event) {
    stopAnimation()
    if (numOfColors == colorsSelected) {
        console.log("pass")
    } else if (numOfColors > 1 && colorsSelected < numOfColors) {
        $w('#greenbutton').disable()
        colorsSelected++
        $w('#greennumtext').text = colorsSelected.toString()
        $w('#greennumtext').show()
        let offset = ((previewArray.length / numOfColors) * (colorsSelected - 1))
        for (let i = 0; i < (previewArray.length / numOfColors); i++) {
            previewArray[i + offset].style.backgroundColor = $w('#greenbutton').style.backgroundColor
        }
    } else {
        currentMode = 'green'
        for (let i in previewArray) {
            previewArray[i].style.backgroundColor = $w('#greenbutton').style.backgroundColor
        }
    }
}

export function mintbutton_click(event) {
    stopAnimation()
    if (numOfColors == colorsSelected) {
        console.log("pass")
    } else if (numOfColors > 1 && colorsSelected < numOfColors) {
        $w('#mintbutton').disable()
        colorsSelected++
        $w('#mintnumtext').text = colorsSelected.toString()
        $w('#mintnumtext').show()
        let offset = ((previewArray.length / numOfColors) * (colorsSelected - 1))
        for (let i = 0; i < (previewArray.length / numOfColors); i++) {
            previewArray[i + offset].style.backgroundColor = $w('#mintbutton').style.backgroundColor
        }
    } else {
        currentMode = 'turquoise'
        for (let i in previewArray) {
            previewArray[i].style.backgroundColor = $w('#mintbutton').style.backgroundColor
        }
    }
}

export function cyanbutton_click(event) {
    stopAnimation()
    if (numOfColors == colorsSelected) {
        console.log("pass")
    } else if (numOfColors > 1 && colorsSelected < numOfColors) {
        $w('#cyanbutton').disable()
        colorsSelected++
        $w('#cyannumtext').text = colorsSelected.toString()
        $w('#cyannumtext').show()
        let offset = ((previewArray.length / numOfColors) * (colorsSelected - 1))
        for (let i = 0; i < (previewArray.length / numOfColors); i++) {
            previewArray[i + offset].style.backgroundColor = $w('#cyanbutton').style.backgroundColor
        }
    } else {
        currentMode = 'cyan'
        for (let i in previewArray) {
            previewArray[i].style.backgroundColor = $w('#cyanbutton').style.backgroundColor
        }
    }
}

export function coralblue5button_click(event) {
    stopAnimation()
    if (numOfColors == colorsSelected) {
        console.log("pass")
    } else if (numOfColors > 1 && colorsSelected < numOfColors) {
        $w('#coralblue5button').disable()
        colorsSelected++
        $w('#coralblue5numtext').text = colorsSelected.toString()
        $w('#coralblue5numtext').show()
        let offset = ((previewArray.length / numOfColors) * (colorsSelected - 1))
        for (let i = 0; i < (previewArray.length / numOfColors); i++) {
            previewArray[i + offset].style.backgroundColor = $w('#coralblue5button').style.backgroundColor
        }
    } else {
        currentMode = 'coralblue'
        for (let i in previewArray) {
            previewArray[i].style.backgroundColor = $w('#coralblue5button').style.backgroundColor
        }
    }
}

export function bluebutton_click(event) {
    stopAnimation()
    if (numOfColors == colorsSelected) {
        console.log("pass")
    } else if (numOfColors > 1 && colorsSelected < numOfColors) {
        $w('#bluebutton').disable()
        colorsSelected++
        $w('#bluenumtext').text = colorsSelected.toString()
        $w('#bluenumtext').show()
        let offset = ((previewArray.length / numOfColors) * (colorsSelected - 1))
        for (let i = 0; i < (previewArray.length / numOfColors); i++) {
            previewArray[i + offset].style.backgroundColor = $w('#bluebutton').style.backgroundColor
        }
    } else {
        currentMode = 'blue'
        for (let i in previewArray) {
            previewArray[i].style.backgroundColor = $w('#bluebutton').style.backgroundColor
        }
    }
}

export function purplebutton_click(event) {
    stopAnimation()
    if (numOfColors == colorsSelected) {
        console.log("pass")
    } else if (numOfColors > 1 && colorsSelected < numOfColors) {
        $w('#purplebutton').disable()
        colorsSelected++
        $w('#purplenumtext').text = colorsSelected.toString()
        $w('#purplenumtext').show()
        let offset = ((previewArray.length / numOfColors) * (colorsSelected - 1))
        for (let i = 0; i < (previewArray.length / numOfColors); i++) {
            previewArray[i + offset].style.backgroundColor = $w('#purplebutton').style.backgroundColor
        }
    } else {
        currentMode = 'purple'
        for (let i in previewArray) {
            previewArray[i].style.backgroundColor = $w('#purplebutton').style.backgroundColor
        }
    }
}

export function pinkbutton_click(event) {
    stopAnimation()
    if (numOfColors == colorsSelected) {
        console.log("pass")
    } else if (numOfColors > 1 && colorsSelected < numOfColors) {
        $w('#pinkbutton').disable()
        colorsSelected++
        $w('#pinknumtext').text = colorsSelected.toString()
        $w('#pinknumtext').show()
        let offset = ((previewArray.length / numOfColors) * (colorsSelected - 1))
        for (let i = 0; i < (previewArray.length / numOfColors); i++) {
            previewArray[i + offset].style.backgroundColor = $w('#pinkbutton').style.backgroundColor
        }
    } else {
        currentMode = 'pinkish'
        for (let i in previewArray) {
            previewArray[i].style.backgroundColor = $w('#pinkbutton').style.backgroundColor
        }
    }
}

export function fuchsiabutton_click(event) {
    stopAnimation()
    if (numOfColors == colorsSelected) {
        console.log("pass")
    } else if (numOfColors > 1 && colorsSelected < numOfColors) {
        $w('#fuchsiabutton').disable()
        colorsSelected++
        $w('#fuchsianumtext').text = colorsSelected.toString()
        $w('#fuchsianumtext').show()
        let offset = ((previewArray.length / numOfColors) * (colorsSelected - 1))
        for (let i = 0; i < (previewArray.length / numOfColors); i++) {
            previewArray[i + offset].style.backgroundColor = $w('#fuchsiabutton').style.backgroundColor
        }
    } else {
        currentMode = 'fuschia'
        for (let i in previewArray) {
            previewArray[i].style.backgroundColor = $w('#fuchsiabutton').style.backgroundColor
        }
    }
}

// stuff for the custom color
export function customcolorbutton_click(event) {
    stopAnimation()
    if (numOfColors == colorsSelected) {
        console.log("pass")
    } else if (numOfColors > 1 && colorsSelected < numOfColors) {
        $w('#customcolorbutton').disable()
        colorsSelected++
        $w('#customcolortext').text = colorsSelected.toString()
        $w('#customcolortext').show()
        let offset = ((previewArray.length / numOfColors) * (colorsSelected - 1))
        for (let i = 0; i < (previewArray.length / numOfColors); i++) {
            previewArray[i + offset].style.backgroundColor = $w('#customcolorbutton').style.backgroundColor
        }
    } else {
        console.log(colorsSelected)
        for (let i in previewArray) {
            previewArray[i].style.backgroundColor = $w('#customcolorbutton').style.backgroundColor
        }
    }
}
$w("#html1").onMessage((event) => {
    //NOTE: maybe try to change this to "only send if new event doesn't occor within 0.2 seconds" so it uses last color instead of first. However, this will add latency
    if (lastCustomColorChangeTime + 500 < Date.now()) { //if it's been at least 0.5 seconds since this event was fired (Safari fires a rapid string of events as user drags color pointer)
        let receivedMessage = event.data;
        console.log(receivedMessage)
        $w('#customcolorbutton').style.backgroundColor = receivedMessage
        console.log($w('#customcolorbutton').style.backgroundColor)
    }
    lastCustomColorChangeTime = Date.now();
});
// customcolor2
export function customcolorbutton2_click(event) {
    stopAnimation()
    if (numOfColors == colorsSelected) {
        console.log("pass")
    } else if (numOfColors > 1 && colorsSelected < numOfColors) {
        $w('#customcolorbutton2').disable()
        colorsSelected++
        $w('#customcolortext2').text = colorsSelected.toString()
        $w('#customcolortext2').show()
        let offset = ((previewArray.length / numOfColors) * (colorsSelected - 1))
        for (let i = 0; i < (previewArray.length / numOfColors); i++) {
//            console.log($w("#group1").children[i].id);            previewArray[i + offset].style.backgroundColor = $w('#customcolorbutton2').style.backgroundColor
        }
    } else {
        for (let i in previewArray) {
//            console.log($w("#group1").children[i].id);            previewArray[i].style.backgroundColor = $w('#customcolorbutton2').style.backgroundColor
        }
    }
}
$w("#html2").onMessage((event) => {
    //NOTE: maybe try to change this to "only send if new event doesn't occor within 0.2 seconds" so it uses last color instead of first. However, this will add latency
    if (lastCustomColorChangeTime + 500 < Date.now()) { //if it's been at least 0.5 seconds since this event was fired (Safari fires a rapid string of events as user drags color pointer)
        let receivedMessage = event.data;
        console.log(receivedMessage)
        $w('#customcolorbutton2').style.backgroundColor = receivedMessage
        console.log($w('#customcolorbutton2').style.backgroundColor)
    }
    lastCustomColorChangeTime = Date.now();
});
// customcolor3
export function customcolorbutton3_click(event) {
    stopAnimation()
    if (numOfColors == colorsSelected) {
        console.log("pass")
    } else if (numOfColors > 1 && colorsSelected < numOfColors) {
        $w('#customcolorbutton3').disable()
        colorsSelected++
        $w('#customcolortext3').text = colorsSelected.toString()
        $w('#customcolortext3').show()
        let offset = ((previewArray.length / numOfColors) * (colorsSelected - 1))
        for (let i = 0; i < (previewArray.length / numOfColors); i++) {
//            console.log($w("#group1").children[i].id);            previewArray[i + offset].style.backgroundColor = $w('#customcolorbutton3').style.backgroundColor
        }
    } else {
        for (let i in previewArray) {
//            console.log($w("#group1").children[i].id);            previewArray[i].style.backgroundColor = $w('#customcolorbutton3').style.backgroundColor
        }
    }
}
$w("#html3").onMessage((event) => {
    //NOTE: maybe try to change this to "only send if new event doesn't occor within 0.2 seconds" so it uses last color instead of first. However, this will add latency
    if (lastCustomColorChangeTime + 500 < Date.now()) { //if it's been at least 0.5 seconds since this event was fired (Safari fires a rapid string of events as user drags color pointer)
        let receivedMessage = event.data;
        console.log(receivedMessage)
        $w('#customcolorbutton3').style.backgroundColor = receivedMessage
        console.log($w('#customcolorbutton3').style.backgroundColor)
    }
    lastCustomColorChangeTime = Date.now();
});
// customcolor4
export function customcolorbutton4_click(event) {
    stopAnimation()
    if (numOfColors == colorsSelected) {
        console.log("pass")
    } else if (numOfColors > 1 && colorsSelected < numOfColors) {
        $w('#customcolorbutton4').disable()
        colorsSelected++
        $w('#customcolortext4').text = colorsSelected.toString()
        $w('#customcolortext4').show()
        let offset = ((previewArray.length / numOfColors) * (colorsSelected - 1))
        for (let i = 0; i < (previewArray.length / numOfColors); i++) {
//            console.log($w("#group1").children[i].id);            previewArray[i + offset].style.backgroundColor = $w('#customcolorbutton4').style.backgroundColor
        }
    } else {
        for (let i in previewArray) {
//            console.log($w("#group1").children[i].id);            previewArray[i].style.backgroundColor = $w('#customcolorbutton4').style.backgroundColor
        }
    }
}
$w("#html4").onMessage((event) => {
    //NOTE: maybe try to change this to "only send if new event doesn't occor within 0.2 seconds" so it uses last color instead of first. However, this will add latency
    if (lastCustomColorChangeTime + 500 < Date.now()) { //if it's been at least 0.5 seconds since this event was fired (Safari fires a rapid string of events as user drags color pointer)
        let receivedMessage = event.data;
        console.log(receivedMessage + "is this nan?")
        $w('#customcolorbutton4').style.backgroundColor = receivedMessage
        console.log($w('#customcolorbutton4').style.backgroundColor)
    }
    lastCustomColorChangeTime = Date.now();
});

// **********
// All pattern buttons
// **********

export function rainbowbutton_click(event) {
    stopAnimation()
    for (let i in previewArray) {
        previewArray[i].style.backgroundColor = colorArray[i];
    }
    currentMode = 'rainbowpat'
}

// *********
// Pride pattern dropdown
// *********

export function pridedropdown_change(event) {
    let flag_type = $w('#pridedropdown').value
    if (flag_type == "pride") {
        rainbowbutton_click()
        currentMode = 'pride'
        $w('#pridebutton').show()
        $w('#lesbianbutton').hide()
        $w('#bibutton').hide()
        $w('#transbutton').hide()
        $w('#gaybutton').hide()
        $w('#acebutton').hide()
        $w('#arobutton').hide()
        $w('#panbutton').hide()
        $w('#nbbutton').hide()
    } else if (flag_type == "gay") {
        gay_flag()
        currentMode = 'gay'
        $w('#pridebutton').hide()
        $w('#lesbianbutton').hide()
        $w('#bibutton').hide()
        $w('#transbutton').hide()
        $w('#gaybutton').show()
        $w('#acebutton').hide()
        $w('#arobutton').hide()
        $w('#panbutton').hide()
        $w('#nbbutton').hide()
    } else if (flag_type == "lesbian") {
        lesbian_flag()
        currentMode = 'lesbian'
        $w('#pridebutton').hide()
        $w('#lesbianbutton').show()
        $w('#bibutton').hide()
        $w('#transbutton').hide()
        $w('#gaybutton').hide()
        $w('#acebutton').hide()
        $w('#arobutton').hide()
        $w('#panbutton').hide()
        $w('#nbbutton').hide()
    } else if (flag_type == "bi") {
        bi_flag()
        currentMode = 'bi'
        $w('#pridebutton').hide()
        $w('#lesbianbutton').hide()
        $w('#bibutton').show()
        $w('#transbutton').hide()
        $w('#gaybutton').hide()
        $w('#acebutton').hide()
        $w('#arobutton').hide()
        $w('#panbutton').hide()
        $w('#nbbutton').hide()
    } else if (flag_type == "trans") {
        trans_flag()
        currentMode = 'trans'
        $w('#pridebutton').hide()
        $w('#lesbianbutton').hide()
        $w('#bibutton').hide()
        $w('#transbutton').show()
        $w('#gaybutton').hide()
        $w('#acebutton').hide()
        $w('#arobutton').hide()
        $w('#panbutton').hide()
        $w('#nbbutton').hide()
    } else if (flag_type == "ace") {
        acebutton_click()
        currentMode = 'ace'
        $w('#pridebutton').hide()
        $w('#lesbianbutton').hide()
        $w('#bibutton').hide()
        $w('#transbutton').hide()
        $w('#gaybutton').hide()
        $w('#acebutton').hide()
        $w('#arobutton').hide()
        $w('#panbutton').hide()
        $w('#nbbutton').show()
    } else if (flag_type == "aro") {
        arobutton_click()
        currentMode = 'aro'
        $w('#pridebutton').hide()
        $w('#lesbianbutton').hide()
        $w('#bibutton').hide()
        $w('#transbutton').hide()
        $w('#gaybutton').hide()
        $w('#acebutton').hide()
        $w('#arobutton').show()
        $w('#panbutton').hide()
        $w('#nbbutton').hide()
    } else if (flag_type == "pan") {
        panbutton_click()
        currentMode = 'pan'
        $w('#pridebutton').hide()
        $w('#lesbianbutton').hide()
        $w('#bibutton').hide()
        $w('#transbutton').hide()
        $w('#gaybutton').hide()
        $w('#acebutton').hide()
        $w('#arobutton').hide()
        $w('#panbutton').hide()
        $w('#nbbutton').show()
    } else if (flag_type == "nb") {
        nbbutton_click()
        currentMode = 'nonbinary'
        $w('#pridebutton').hide()
        $w('#lesbianbutton').hide()
        $w('#bibutton').hide()
        $w('#transbutton').hide()
        $w('#gaybutton').hide()
        $w('#acebutton').hide()
        $w('#arobutton').hide()
        $w('#panbutton').hide()
        $w('#nbbutton').show()
    }

}

// *************
// Animation buttons
// *************

export function rainbowzoombutton_click(event) {
    stopAnimation()
    let x = 0
    animationInterval = setInterval(() => {
        for (let i = 0; i < previewArray.length; i++) {
            previewArray[i].style.backgroundColor = colorArray[(parseInt(i) + x) % 12]
        }

        x++
    }, 100) // repeat every 100 milliseconds
    currentMode = 'rainbow'
}
export function colorchasebutton_click(event) {
    stopAnimation()
    theaterChase(previewArray,  80)
}
function theaterChase(arr,  delay) {
    stopAnimation()
    let i = 0;
    animationInterval = setInterval(() => {
    for (let j = 0; j < arr.length; j++) {
        if (j === i || j === i + 1 || j === i + 2 || j === i + 3) {
            arr[j].style.backgroundColor = colorArray[j]; // Illuminate elements in the chase pattern
        }
        else {
            arr[j].style.backgroundColor = 'grey'; // Turn off other elements
        }
    }
    i = (i + 1) % arr.length; // Move the chase pattern
  }, delay);
  currentMode = 'colorchase'
}
function hexToRgbString(hex) {
    // Remove the hash symbol if present
    hex = hex.replace(/^#/, '');

    // Parse hex values
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Convert to the desired format
    return `COLOR${r.toString().padStart(3, '0')}${g.toString().padStart(3, '0')}${b.toString().padStart(3, '0')}`;
}


export function stopAnimation() {
    //NOTE: Probably make this just a stopAnimation() cmd, calls at the start of all button clicks
    clearInterval(animationInterval); // stops rainbow animation, have to add to all functions
}

//******************
// Custom command stuff
//******************

export function previewbutton_click(event) {
    stopAnimation()
    let custom_cmd = $w('#custominput').value
    custom_cmd = custom_cmd.toLowerCase()
    $w('#errortext').hide()
    switch (custom_cmd) {
    case "rainbow":
        rainbowbutton_click()
        break
    case "pride":
        rainbowbutton_click()
        break
    case "gay":
        gay_flag();
        break
    case "lesbian":
        lesbian_flag()
        break
    case "bi":
    case "bisexual":
        bi_flag()
        break
    case "trans":
    case "transexual":
        trans_flag()
        break
    case "aro":
    case "aromantic":
        arobutton_click()
        break
    case "ace":
    case "asexual":
        acebutton_click()
        break
    case "pan":
    case "pansexual":
        panbutton_click()
        break
    case "nonbinary":
    case "non binary":
    case "non-binary":
    case "enby":
        nbbutton_click()
        break
    default:
        $w('#errortext').show()
        for (let x = 0; x < 5; x++) {
            setTimeout(function () {
                for (let i in previewArray) {
                    previewArray[i].style.backgroundColor = "red"

                }
            }, 500);
            setTimeout(function () {
                for (let i in previewArray) {
                    previewArray[i].style.backgroundColor = "white"

                }
            }, 500);
        }
    }
}


export function gay_flag(){
        previewArray[0].style.backgroundColor = "#078D70"
        previewArray[1].style.backgroundColor = "#078D70"
        previewArray[2].style.backgroundColor = "#26CEAA"
        previewArray[3].style.backgroundColor = "#26CEAA"
        previewArray[4].style.backgroundColor = "#98E8C1"
        previewArray[5].style.backgroundColor = "white"
        previewArray[6].style.backgroundColor = "white"
        previewArray[7].style.backgroundColor = "#7BADE2"
        previewArray[8].style.backgroundColor = "#5049CC"
        previewArray[9].style.backgroundColor = "#5049CC"
        previewArray[10].style.backgroundColor = "#3D1A78"
        previewArray[11].style.backgroundColor = "#3D1A78"
}
export function bi_flag(){
        previewArray[0].style.backgroundColor = "#D60270"
        previewArray[1].style.backgroundColor = "#D60270"
        previewArray[2].style.backgroundColor = "#D60270"
        previewArray[3].style.backgroundColor = "#D60270"
        previewArray[4].style.backgroundColor = "#D60270"
        previewArray[5].style.backgroundColor = "#9B4F96"
        previewArray[6].style.backgroundColor = "#9B4F96"
        previewArray[7].style.backgroundColor = "#0038A8"
        previewArray[8].style.backgroundColor = "#0038A8"
        previewArray[9].style.backgroundColor = "#0038A8"
        previewArray[10].style.backgroundColor = "#0038A8"
        previewArray[11].style.backgroundColor = "#0038A8"
}
export function lesbian_flag(){
        previewArray[0].style.backgroundColor = "#D52D00"
        previewArray[1].style.backgroundColor = "#D52D00"
        previewArray[2].style.backgroundColor = "#EF7627"
        previewArray[3].style.backgroundColor = "#EF7627"
        previewArray[4].style.backgroundColor = "#FF9A56"
        previewArray[5].style.backgroundColor = "white"
        previewArray[6].style.backgroundColor = "white"
        previewArray[7].style.backgroundColor = "#D162A4"
        previewArray[8].style.backgroundColor = "#B55690"
        previewArray[9].style.backgroundColor = "#B55690"
        previewArray[10].style.backgroundColor = "#A30262"
        previewArray[11].style.backgroundColor = "#A30262"
}
export function trans_flag(){
        previewArray[0].style.backgroundColor = "#5BCEFA"
        previewArray[1].style.backgroundColor = "#5BCEFA"
        previewArray[2].style.backgroundColor = "#5BCEFA"
        previewArray[3].style.backgroundColor = "#F5A9B8"
        previewArray[4].style.backgroundColor = "#F5A9B8"
        previewArray[5].style.backgroundColor = "white"
        previewArray[6].style.backgroundColor = "white"
        previewArray[7].style.backgroundColor = "#F5A9B8"
        previewArray[8].style.backgroundColor = "#F5A9B8"
        previewArray[9].style.backgroundColor = "#5BCEFA"
        previewArray[10].style.backgroundColor = "#5BCEFA"
        previewArray[11].style.backgroundColor = "#5BCEFA"
}
export function gozags_click(event) {
    stopAnimation()
    for (let i in previewArray) {
        if ((parseInt(i) % 2)) {
            previewArray[i].style.backgroundColor = "blue"
        } else {
            previewArray[i].style.backgroundColor = "red"
        }
    }
    currentMode = 'gozags'
}

export function fasu_click(event) {
    stopAnimation()
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here: 
    var colors = ['red', 'blue', 'yellow'];
    for (var i = 0; i < 12; i++) {
        // Calculate the index of the color in the array
        var colorIndex = i % colors.length;
        // Get the color at the current index
        previewArray[i].style.backgroundColor = colors[colorIndex];
        // Output the color
        // console.log(color);
    }
    currentMode = 'fasu'
}

export function pcld_click(event) {
    stopAnimation()
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here: 
    for (let i in previewArray) {
        if (parseInt(i) < 4) {
            previewArray[i].style.backgroundColor = "orange"
        } else if (parseInt(i) < 8) {
            previewArray[i].style.backgroundColor = "red"
        } else {
            previewArray[i].style.backgroundColor = "yellow"
        }
    }
    currentMode = 'pcld'
}

export function christmas_click(event) {
    stopAnimation()
    for (let i in previewArray) {
        if ((parseInt(i) % 2)) {
            previewArray[i].style.backgroundColor = "green"
        } else {
            previewArray[i].style.backgroundColor = "red"
        }
    }
    currentMode = 'christmas'
}

export function grinch_click(event) {
    stopAnimation()
    previewArray[0].style.backgroundColor = "grey"
    previewArray[1].style.backgroundColor = "green"
    previewArray[2].style.backgroundColor = "green"
    previewArray[3].style.backgroundColor = "green"
    previewArray[4].style.backgroundColor = "grey"
    previewArray[5].style.backgroundColor = "green"
    previewArray[6].style.backgroundColor = "grey"
    previewArray[7].style.backgroundColor = "green"
    previewArray[8].style.backgroundColor = "green"
    previewArray[9].style.backgroundColor = "grey"
    previewArray[10].style.backgroundColor = "grey"
    previewArray[11].style.backgroundColor = "green"
    currentMode = 'grinch'
}

export function hanukkah_click(event) {
    stopAnimation()
    for (let i in previewArray) {
        if ((parseInt(i) % 2)) {
            previewArray[i].style.backgroundColor = "blue"
        } else {
            previewArray[i].style.backgroundColor = "white"
        }
    }
    currentMode = 'hanukkah'
}

export function kwanzaa_click(event) {
    stopAnimation()

    var colors = ['red', 'black', 'green'];
    for (var i = 0; i < 12; i++) {
        // Calculate the index of the color in the array
        var colorIndex = i % colors.length;
        // Get the color at the current index
        previewArray[i].style.backgroundColor = colors[colorIndex];
        // Output the color
        // console.log(color);
    }
    currentMode = 'kwanzaa'
}

export function halloween_click(event) {
    stopAnimation()
    for (let i in previewArray) {
        if ((parseInt(i) % 2)) {
            previewArray[i].style.backgroundColor = "orange"
        } else {
            previewArray[i].style.backgroundColor = "black"
        }
    }
    currentMode = 'halloween'
}

export function joker_click(event) {
    stopAnimation()
    console.log("pressed")
    for (let i in previewArray) {
        if ((parseInt(i) % 2)) {
            previewArray[i].style.backgroundColor = "green"
        } else {
            previewArray[i].style.backgroundColor = "purple"
        }
    }
    currentMode = 'joker'
}

export function usa_click(event) {
    stopAnimation()
    // This function was added from the Properties & Events panel. To learn more, visit http://wix.to/UcBnC-4
    // Add your code for this event here: 

    var colors = ['red', 'white', 'blue'];
    for (var i = 0; i < 12; i++) {
        // Calculate the index of the color in the array
        var colorIndex = i % colors.length;
        // Get the color at the current index
        previewArray[i].style.backgroundColor = colors[colorIndex];
        // Output the color
        // console.log(color);
    }
    currentMode = 'usa'
}

export function gaybutton_click(event) {
    stopAnimation()
}

export function onoff_change(event) {
    stopAnimation()
    if ($w('#onoffswitch').checked == true) {
        for (let i in previewArray) {
//            console.log($w("#group1").children[i].id);            previewArray[i].style.backgroundColor = "white"
        }
        $w('#colordrop').enable()
        $w('#customcolorbutton').enable()
        $w('#customcolorbutton2').enable()
        $w('#customcolorbutton3').enable()
        $w('#customcolorbutton4').enable()
        $w('#redbutton').enable()
        $w('#orangebutton').enable()
        $w('#yellowbutton').enable()
        $w('#limebutton').enable()
        $w('#greenbutton').enable()
        $w('#mintbutton').enable()
        $w('#cyanbutton').enable()
        $w('#coralblue5button').enable()
        $w('#bluebutton').enable()
        $w('#purplebutton').enable()
        $w('#pinkbutton').enable()
        $w('#fuchsiabutton').enable()
        $w('#rainbowbutton').enable()
        $w('#gozags').enable()
        $w('#fasu').enable()
        $w('#pcld').enable()
        $w('#christmas').enable()
        $w('#grinch').enable()
        $w('#hanukkah').enable()
        $w('#kwanzaa').enable()
        $w('#halloween').enable()
        $w('#joker').enable()
        $w('#usa').enable()
        $w('#pridedropdown').enable()
        $w('#gaybutton').enable()
        $w('#pridebutton').enable()
        $w('#lesbianbutton').enable()
        $w('#bibutton').enable()
        $w('#transbutton').enable()
        $w('#rainbowzoombutton').enable()
        $w('#colorchasebutton').enable()
        $w('#ambientbutton').enable()
        $w('#colorwipebutton').enable()
        $w('#pulsebutton').enable()
        $w('#multiwipebutton').enable()
        $w('#twinklebutton').enable()
        $w('#previewbutton').enable()
        $w('#previewbutton2').enable()
        $w('#custominput').enable()
        $w('#custominput2').enable()
        $w('#submitbutton').enable()
        $w('#acebutton').enable()
        $w('#arobutton').enable()
        $w('#panbutton').enable()
        $w('#nbbutton').enable()
    } else {
        for (let i in previewArray) {
//            console.log($w("#group1").children[i].id);            previewArray[i].style.backgroundColor = "grey"
        }
        $w('#colordrop').disable()
        $w('#customcolorbutton').disable()
        $w('#customcolorbutton2').disable()
        $w('#customcolorbutton3').disable()
        $w('#customcolorbutton4').disable()
        $w('#redbutton').disable()
        $w('#orangebutton').disable()
        $w('#yellowbutton').disable()
        $w('#limebutton').disable()
        $w('#greenbutton').disable()
        $w('#mintbutton').disable()
        $w('#cyanbutton').disable()
        $w('#coralblue5button').disable()
        $w('#bluebutton').disable()
        $w('#purplebutton').disable()
        $w('#pinkbutton').disable()
        $w('#fuchsiabutton').disable()
        $w('#rainbowbutton').disable()
        $w('#gozags').disable()
        $w('#fasu').disable()
        $w('#pcld').disable()
        $w('#christmas').disable()
        $w('#grinch').disable()
        $w('#hanukkah').disable()
        $w('#kwanzaa').disable()
        $w('#halloween').disable()
        $w('#joker').disable()
        $w('#usa').disable()
        $w('#pridedropdown').disable()
        $w('#gaybutton').disable()
        $w('#pridebutton').disable()
        $w('#lesbianbutton').disable()
        $w('#bibutton').disable()
        $w('#transbutton').disable()
        $w('#rainbowzoombutton').disable()
        $w('#colorchasebutton').disable()
        $w('#ambientbutton').disable()
        $w('#colorwipebutton').disable()
        $w('#pulsebutton').disable()
        $w('#multiwipebutton').disable()
        $w('#twinklebutton').disable()
        $w('#previewbutton').disable()
        $w('#previewbutton2').disable()
        $w('#custominput').disable()
        $w('#custominput2').disable()
        $w('#submitbutton').disable()
        $w('#acebutton').disable()
        $w('#arobutton').disable()
        $w('#panbutton').disable()
        $w('#nbbutton').disable()
    }
}

function sendValue(msg){
	sendFormatter(msg,userID) //userID *MUST* be sent from frontend in each message since backend instances may be shared across devices
}

export function submitbutton_click(event) {
    stopAnimation()
    // for (let i in previewArray) {
    //     //            console.log($w("#group1").children[i].id);        previewArray[i].style.backgroundColor = "white"
    // }
    colordrop_change()
    $w('#changetext').show()
    setTimeout(function () {
        $w('#changetext').hide()
    }, 5000);
    sendValue(currentMode)
}

export function colordrop_change(event) {
    stopAnimation()
    let num_string = $w('#colordrop').value
    numOfColors = parseInt(num_string)
    console.log(numOfColors)
    // reset preview
    for (let i in previewArray) {
        //            console.log($w("#group1").children[i].id);        previewArray[i].style.backgroundColor = "white"
    }
    // adjust num of custom colors
    // not sure why it's only happening on submit
    if (numOfColors == 1) {
        $w('#customcolorbutton2').hide()
        $w('#html2').hide()
        $w('#customcolorbutton3').hide()
        $w('#html3').hide()
        $w('#customcolorbutton4').hide()
        $w('#html4').hide()
    } else if (numOfColors == 2) {
        $w('#customcolorbutton2').show()
        $w('#html2').show()
        $w('#customcolorbutton3').hide()
        $w('#html3').hide()
        $w('#customcolorbutton4').hide()
        $w('#html4').hide()
    } else if (numOfColors == 3) {
        $w('#customcolorbutton2').show()
        $w('#html2').show()
        $w('#customcolorbutton3').show()
        $w('#html3').show()
        $w('#customcolorbutton4').hide()
        $w('#html4').hide()
    } else if (numOfColors == 4) {
        $w('#customcolorbutton2').show()
        $w('#html2').show()
        $w('#customcolorbutton3').show()
        $w('#html3').show()
        $w('#customcolorbutton4').show()
        $w('#html4').show()
    }
    // reset selectedColors
    colorsSelected = 0
    // prolly a neater way to do this but idc
    $w('#redbutton').enable()
    $w('#rednumtext').hide()
    $w('#orangebutton').enable()
    $w('#orangenumtext').hide()
    $w('#yellowbutton').enable()
    $w('#yellownumtext').hide()
    $w('#limebutton').enable()
    $w('#limenumtext').hide()
    $w('#greenbutton').enable()
    $w('#greennumtext').hide()
    $w('#mintbutton').enable()
    $w('#mintnumtext').hide()
    $w('#cyanbutton').enable()
    $w('#cyannumtext').hide()
    $w('#coralblue5button').enable()
    $w('#coralblue5numtext').hide()
    $w('#bluebutton').enable()
    $w('#bluenumtext').hide()
    $w('#purplebutton').enable()
    $w('#purplenumtext').hide()
    $w('#pinkbutton').enable()
    $w('#pinknumtext').hide()
    $w('#fuchsiabutton').enable()
    $w('#fuchsianumtext').hide()
    $w('#customcolorbutton').enable()
    $w('#customcolortext').hide()
    $w('#customcolorbutton2').enable()
    $w('#customcolortext2').hide()
    $w('#customcolorbutton3').enable()
    $w('#customcolortext3').hide()
    $w('#customcolorbutton4').enable()
    $w('#customcolortext4').hide()
}


export function colorwipebutton_click() {
    stopAnimation()
    let x = 0
    let i = 0
    animationInterval = setInterval(() => {
        for (let i = 0; i < previewArray.length; i++) {
            setTimeout(function () {
                previewArray[i].style.backgroundColor = colorArray[x]
            }, 2000);
        }
        x++
    }, 500) // repeat every 100 milliseconds
    currentMode = 'colorwipe'
}


export function twinklebutton_click() {
    stopAnimation()

    animationInterval = setInterval(() => {
        for (let i = 0; i < previewArray.length; i++) {
            previewArray[i].style.backgroundColor = '#' + (Math.random().toString(16) + "000000").substring(2, 8)
        }
    }, 500) // repeat every 100 milliseconds
    currentMode = 'twinkle'
}

export function multiwipebutton_click() {
    stopAnimation()
    let i = 0;
    let color = colorArray[getRandomNumber(0,12)]
    animationInterval = setInterval(() => {
        for (let j = 0; j < previewArray.length; j++) {
            let rand = getRandomNumber(0,4)
            if (rand == 2) {
                color = colorArray[getRandomNumber(0,12)]; // Illuminate elements in the chase patternY
            }
            // else {
            previewArray[j].style.backgroundColor = color; // Turn off other elements
            // }
        }
    i = (i + 1) % previewArray.length; // Move the chase pattern
  }, 500);
  currentMode = 'multicolorwipe'
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pulsebutton_click() {
    stopAnimation();
    // Define starting and ending colors
    animationInterval = setInterval(() => {
        const startColor = [255, 0, 0]; // Red
        const endColor = [192, 192, 192]; // Light Gray

        // Define number of steps
        const steps = 12;

        // Loop through steps and fade colors

        for (let step = 0; step <= steps; step++) {
            const interpolatedColor = interpolateColorHex(startColor, endColor, steps, step);
            // console.log(interpolatedColor);
            for(let i in previewArray){
                previewArray[i].style.backgroundColor = interpolatedColor
            }
        }
    },100);
    currentMode = 'pulses'
}

/**
*	Adds an event handler that runs when the element is clicked.
	[Read more](https://www.wix.com/corvid/reference/$w.ClickableMixin.html#onClick)
*/
export function ambientbutton_click() {
    stopAnimation();
    // Define colors array as RGB array
    // let x = 0
    if(gradient_forward == 19){
        gradient_forward = 0;
    }
    animationInterval = setInterval(() => {
        // Loop through each step
        // console.log("please god")
        if(gradient_forward == 19){
            gradient_forward = 0;
            reverse_gradient = true
        }
        if(gradient_backward == 0){
            gradient_backward = 19
            reverse_gradient = false
        }
        if(!reverse_gradient){
            for(let i = 0; i < previewArray.length; i++){
                // console.log("called " + i)
                previewArray[i].style.backgroundColor = gradient[gradient_forward];
            }          
            gradient_forward = gradient_forward + 1;
        }
        else{
            for(let i = 0; i < previewArray.length; i++){
                // console.log("called " + i)
                previewArray[i].style.backgroundColor = gradient[gradient_backward];
            }          
            gradient_backward = gradient_backward - 1;
        }
        // Loop from 0 to 19

            
    }, 100) // repeat every 100 milliseconds
    currentMode = 'ambient'

}
// Function to interpolate between two colors and return hex value
function interpolateColorHex(colorStart, colorEnd, steps, step) {
    const r = Math.round(colorStart[0] + (colorEnd[0] - colorStart[0]) * step / steps);
    const g = Math.round(colorStart[1] + (colorEnd[1] - colorStart[1]) * step / steps);
    const b = Math.round(colorStart[2] + (colorEnd[2] - colorStart[2]) * step / steps);
    return rgbToHex(r, g, b);
}

// Function to convert RGB to hexadecimal
function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


export function custominput_keyPress(event) {
    if(event.key == "Enter"){
        previewbutton_click();
    }
}

export function previewbutton2_click(event) {
    stopAnimation()
    let custom_cmd = $w('#custominput2').value
    custom_cmd = custom_cmd.toLowerCase()
    $w('#errortext').hide()
    switch (custom_cmd) {
    case "rainbowzoom":
    case "rainbow zoom":
        rainbowzoombutton_click()
        break
    case "color chase":
    case "colorchase":
        colorchasebutton_click()
        break
    case "ambient":
        ambientbutton_click()
        break
    case "colorwipe":
    case "color wipe":
        colorwipebutton_click()
        break
    case "pulse":
        pulsebutton_click()
        break
    case "multicolorwipe":
    case "multicolor wipe":
    case "multiwipe":
        multiwipebutton_click()
        break
    case "twinkle":
        twinklebutton_click()
        break
    default:
        $w('#errortext2').show()
        $w('#errortext').show()
        for (let x = 0; x < 5; x++) {
            setTimeout(function () {
                console.log("AHAAHAHAHAHAHAHAHAHAHAHSJFDKHASKJHFKHKJLJLKKLJKLJ")
                for (let i in previewArray) {
                    previewArray[i].style.backgroundColor = "red"

                }
            }, 10);
            setTimeout(function () {
                console.log("AHAAHAHAHAHAHAHAHAHAHAHSJFDKHASKJHFKHKJLJLKKLJKLJ")
                for (let i in previewArray) {
                    previewArray[i].style.backgroundColor = "white"

                }
            }, 10);
        }
        $w('#errortext2').hide()
        $w('#errortext').hide()
    }
}
export function custominput2_keyPress(event) {
	if(event.key == "Enter"){
        previewbutton2_click();
    }
}


export function leftbutton_click(event) {
	$w('#slideshow1').previous()
    // console.log($w('#sigtextleft').text)
    // if($w('#sigtextleft').text == "animations") {
    //     $w('#sigtextleft').text = "patterns"
    //     $w('#sigtextright').text = "static colors"
    // } else if($w('#sigtextleft').text == "patterns") {
    //     $w('#sigtextleft').text = "static colors"
    //     $w('#sigtextright').text = "animations"
    // } else {
    //     $w('#sigtextleft').text = "animations"
    //     $w('#sigtextright').text = "patterns"
    // }
}

export function rightbutton_click(event) {
	$w('#slideshow1').next()
    // console.log($w('#sigtextright').text)
    // if($w('#sigtextright').text == "patterns") {
    //     $w('#sigtextleft').text = "static colors"
    //     $w('#sigtextright').text = "animations"
    // } else if($w('#sigtextright').text == "animations") {
    //     $w('#sigtextleft').text = "patterns"
    //     $w('#sigtextright').text = "static colors"
    // } else {
    //     $w('#sigtextleft').text = "animations"
    //     $w('#sigtextright').text = "patterns"
    // }
}


export function slideshow1_change(event) {
	if ($w('#slideshow1').currentIndex == 0) {
        $w('#sigtextleft').text = "animations"
        $w('#sigtextright').text = "patterns"
    } else if ($w('#slideshow1').currentIndex == 1) {
        $w('#sigtextleft').text = "static colors"
        $w('#sigtextright').text = "animations"
    } else {
        $w('#sigtextleft').text = "patterns"
        $w('#sigtextright').text = "static colors"
    }
}

export function nbbutton_click(event) {
	currentMode = "nonbinary"
    let i = 0
    while(i < 3) {
        previewArray[i].style.backgroundColor = "#fff430"
        i++
    }
    while(i < 6) {
        previewArray[i].style.backgroundColor = "#FFFFFF"
        i++
    }
    while(i < 9) {
        previewArray[i].style.backgroundColor = "#9c59d1"
        i++
    }
    while(i < 12) {
        previewArray[i].style.backgroundColor = "#292929"
        i++
    }

}

export function panbutton_click(event) {
	currentMode = "pan"
    let i = 0
    while(i < 4) {
        previewArray[i].style.backgroundColor = "#ff1b8d"
        i++
    }
    while(i < 8) {
        previewArray[i].style.backgroundColor = "#ffd900"
        i++
    }
    while(i < 12) {
        previewArray[i].style.backgroundColor = "#1bb3ff"
        i++
    }
}

export function acebutton_click(event) {
	currentMode = "ace"
    let i = 0
    while(i < 3) {
        previewArray[i].style.backgroundColor = "#000000"
        i++
    }
    while(i < 6) {
        previewArray[i].style.backgroundColor = "#a4a4a4"
        i++
    }
    while(i < 9) {
        previewArray[i].style.backgroundColor = "#FFFFFF"
        i++
    }
    while(i < 12) {
        previewArray[i].style.backgroundColor = "#810081"
        i++
    }
}

export function arobutton_click(event) {
	currentMode = "aro"
    let i = 0
    while(i < 2) {
        previewArray[i].style.backgroundColor = "#3aa740"
        i++
    }
    while(i < 5) {
        previewArray[i].style.backgroundColor = "#a8d47a"
        i++
    }
    while(i < 7) {
        previewArray[i].style.backgroundColor = "#ffffff"
        i++
    }
    while(i < 9) {
        previewArray[i].style.backgroundColor = "#aaabab"
        i++
    }
    while(i < 12) {
        previewArray[i].style.backgroundColor = "#000000"
        i++
    }
}