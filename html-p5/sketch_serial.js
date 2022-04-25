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
	LatestSerialData = currentString;
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
		print("Here are the x,y: ", x, y)
		for (let i = 0; i < 100; i++) {
			let paintX = x + random(-20, 20);
			let paintY = y + random(-20, 20);
			point(paintX, paintY)
		}
		// point(x + random(-10, 10), y + random(-10, 10));
	}
}


function draw() {
	fill(0)
	translate(width / 2, height / 2);
	scale(1, -1);
	stroke('purple'); // Change the color
	// strokeWeight(20);


	// main logic
	let on_off = LatestSerialData

	// need to read the distance and color
	let distance = 5
	let color = 'purple'

	if (on_off == 0) {
		console.log("Button is pressed! x, y, on/off, distance, color::", x, y, on_off, distance, color)
		draw_a_point(x, y)
	} else {
		console.log("Button is not pressed. Waiting for it to be pressed...")
	}
}