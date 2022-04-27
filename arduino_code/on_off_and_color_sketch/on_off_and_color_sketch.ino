#include <Wire.h>
#include <LIDARLite.h>

// Globals for lidar sensor
LIDARLite lidarLite;
int cal_cnt = 0;

// define for position switch
#define pos2 A2
#define pos3 A3
#define pos4 A4
#define pos5 A5

// digital pin 2 has a pushbutton attached to it for on/off
int push_button = 2;

// these are for position switch, initialize to 0 and read values later
int pos2_status = 0;
int pos3_status = 0;
int pos4_status = 0;
int pos5_status = 0;

// initialize color code to 0 and later change according to position status
int color_code = 0;

void setup() {
  Serial.begin(9600);

  // for on_off push button
  pinMode(push_button, INPUT);

  // for position switch
  pinMode(pos2, INPUT);
  pinMode(pos3, INPUT);
  pinMode(pos4, INPUT);
  pinMode(pos5, INPUT);

  // for lidar
  lidarLite.begin(0, true); // Set configuration to default and I2C to 400 kHz
  lidarLite.configure(0); // Change this number to try out alternate configurations


}


// function to flip 1 to 0 for on_off
int flip_on_off(int x) {
  int on_off = (x == 1) ? 0 : 1;
  return on_off;
}


// the loop routine runs over and over again forever:
void loop() {

  // position stuff
  int pos2_status = digitalRead(pos2);
  int pos3_status = digitalRead(pos3);
  int pos4_status = digitalRead(pos4);
  int pos5_status = digitalRead(pos5);

  if (pos2_status == 0) {
    color_code = 2;
  } else if (pos3_status == 0) {
    color_code = 3;
  } else if (pos4_status == 0) {
    color_code = 4;
  } else if (pos5_status == 0) {
    color_code = 5;
  }
  // end of position stuff


  // on-off stuff
  int button_state = digitalRead(push_button);
  // end of on-off stuff


  // lidar stuff
  int distance;

  // At the beginning of every 100 readings,
  // take a measurement with receiver bias correction
  if ( cal_cnt == 0 ) {
    distance = lidarLite.distance();      // With bias correction
  } else {
    distance = lidarLite.distance(false); // Without bias correction
  }

  // Increment reading counter
  cal_cnt++;
  cal_cnt = cal_cnt % 100;

  // end of lidar stuff

  char buffer[50];

  sprintf(buffer, "%d,%d,%d", flip_on_off(button_state), color_code, distance);
  Serial.println(buffer);
  delay(1); // delay in between reads for stability
}