import RPi.GPIO as GPIO
import time
 
# 设置编码方式
GPIO.setmode(GPIO.BOARD)
 
# 设置GPIO引脚
GPIO.setup(16, GPIO.OUT)
 
# 用16号引脚输出一个高电平，灯亮
GPIO.output(16, GPIO.HIGH)
 
# 等3秒
time.sleep(3)
 
# 用16号引脚输出一个低电平，灯灭
GPIO.output(16, GPIO.LOW)
 
# 等3秒
time.sleep(3)
 
# 再亮灯
GPIO.output(16, GPIO.HIGH)
 
# 等3秒
time.sleep(3)
 
# 使用结束，释放引脚
GPIO.cleanup()