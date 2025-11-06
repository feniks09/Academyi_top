time = float(input("ВВедите время в десяты долях часа: "))
time = time * 60
time_houer = time // 60
time_minots = time % 60

time = ("Время %(time_houer)0.1f:%(time_minots)0.1f")

print(time % {"time_houer" : time_houer, "time_minots" : time_minots})

print(f"Время {time_houer:0.0f}:{time_minots:0.0f}")