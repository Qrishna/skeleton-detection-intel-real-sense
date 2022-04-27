let wrist_data;
let x;
let y;
let serial;
let LatestSerialData = "waiting for data...";


function setup_serial_stuff() {
	serial = new p5.SerialPort();
	serial.list();
	serial.open('/dev/tty.usbmodem14102');
	serial.on('connected', serverConnected);
	serial.on('list', gotList);
	serial.on('data', gotSerialData);
	serial.on('error', gotError);
	serial.on('open', gotOpen);
	serial.on('close', gotClose);
}


function serverConnected() {
	print("Connected to Server");
}

function gotList(thelist) {
	print("List of Serial Ports:");

	for (let i = 0; i < thelist.length; i++) {
		print(i + " " + thelist[i]);
	}
}

function gotOpen() {
	print("Serial Port is Open");
}

function gotClose() {
	print("Serial Port is Closed");
	latestData = "Serial Port is Closed";
}

function gotError(theerror) {
	print(theerror);
}

function gotSerialData() {
	let currentString = serial.readLine();
	trim(currentString);

	if (!currentString) return;
	LatestSerialData = currentString.split(",");
}


function setup() {
	print(displayWidth, displayHeight)
	createCanvas(displayWidth, displayHeight)
	background(255)
	setInterval(get_data_from_file, 100)
	setup_serial_stuff()
}


function get_data_from_file() {
	loadStrings("right-wrist.csv", gotDataFromFile)
}


function gotDataFromFile(some_string) {
	wrist_data = split(some_string.toString(), ",")
	x = int(wrist_data[0])
	y = int(wrist_data[1])
}


function draw_a_point(x, y) {
	if ((x) && (y)) {
		// print("Here are the x,y: ", x, y)
		for (let i = 0; i < 100; i++) {
			let paintX = x + random(-20, 20);
			let paintY = y + random(-20, 20);
			point(paintX, paintY)
		}
	}
}

function determine_stroke_color(some_color_code){
	let stroke_color = '';
	switch (some_color_code) {
		  case '2':
		    stroke_color = 'purple'
			break;
		  case '3':
			  stroke_color = 'blue'
			  break;
		  case '4':
			  stroke_color = 'cyan'
			break;
		  case '5':
			  stroke_color = 'red'
			  break;
		  default:
			stroke_color = 'black'
		}
	return stroke_color;
}

function draw() {
	fill(0)
	translate(width / 2, height / 2);
	scale(1, -1);

	// strokeWeight(20);


	// main logic
	let on_off = LatestSerialData[0]
	let color_code = LatestSerialData[1]
	let distance = LatestSerialData[2]


	if (on_off == 1) {
		let stroke_color = determine_stroke_color(color_code);
	  	stroke(stroke_color); // Change the color

		if (distance) {
			strokeWeight(distance/10); // set the stroke weight based on the distance
		}
		console.log(`Button is pressed! x: ${x}, y: ${y}, on/off: ${on_off}, distance: ${distance/10}/, color: ${stroke_color}`)
		draw_a_point(x, y)

	} else {
		console.log("Button is not pressed. Waiting for it to be pressed...")
	}
}