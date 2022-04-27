import random
import time

x = 0
y = 0
while x<1440/2:
    # x,y,z = random.uniform(200.0,600.0),random.uniform(200.0,600.0),random.uniform(200.0,600.0)
    # x,y,z = random.randint(0,1440),random.randint(0,900),random.randint(200,500)
    time.sleep(0.02)
    with open("html-p5/right-wrist.csv", "w") as fp:
        # print("%s,%s\r\n" %(x, y) )
        fp.write("%s,%s\r\n" %(x, y) )
        # time.sleep(0.9)
        print("%s,%s\r" %(x, y))
        x+=1
        y+=1
    if x == (1440/2-1):
        x = 0
        # y = 0
    if y == (900/2-1):
        y = 0
        # x=0
