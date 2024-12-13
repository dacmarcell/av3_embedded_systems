# Project objective: Use the PIR sensor to detect whether there's movement or not
#
# Hardware and connections used:
#   PIR VCC to 3.3 V
#   PIR GND to GND
#   PIR D Pin to GPIO Pin 16
#
# Programmer: Adrian Josele G. Quional

# modules
from machine import Pin,ADC
from time import sleep

BETA = 3950
V_REF=3.3

# creating a PIR object, setting it as IN
pir = Pin(16, Pin.IN)
adc = ADC(Pin(11, Pin.IN))

# continuously read data from the PIR sensor
# print a status whether a motion or detected or not 
while True:
   if pir.value() == 1:
       analogValue = adc.read_u16()
       resistance = (analogValue / 65535) * VRef
       kelvinTemperature = 1/(1 - 298.15 + 1 / BETA * math.log(resistance / 1000))
       print(f"PIR value: {pir.value()}     Status: Motion detected!")
   
   else:
       print(f"PIR value: {pir.value()}     Status: Waiting for movement...")

    # PIR sensor would check for movement every second
   sleep(1)
