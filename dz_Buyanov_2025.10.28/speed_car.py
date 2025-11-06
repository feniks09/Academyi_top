# Запросить у пользователя скорости машин и расстояние между ними.
# С помощью форматирования строк вывести решение
# задачи:
# Через какое время машины окажутся рядом?
# На 8 баллов: машины едут навстречу

speed_car = input("Введите скорость машины, через пробел: ").split()
dist_car = input("Введите растояние между машинами, через пробел: ")
vektor = input("Введите направление движенния:\
    1-встречное\ 2-попутное\ 3-противоположное: ")

speed_car_1 = speed_car[0]
speed_car_2 = speed_car[1]


speed_car_1 = int(speed_car_1)
speed_car_2 = int(speed_car_2)
dist_car = int(dist_car)

print(type(speed_car_1))
print(type(dist_car))
if vektor == "1":
    time = dist_car/(speed_car_1 + speed_car_2)
    print_time = "маши едут на встречу друг другу время встречи %(time)f часа"
    vector = "на встречу друг другу"
    print(print_time % ({"time" : time}))
elif vektor == "2":
    if speed_car_1 == speed_car_2 and dist_car > 0:
        raise ValueError("Машины никогда не встретятся")
    time = abs(dist_car/(speed_car_1 - speed_car_2))
    print_time = ("маши едут в одном направлении время встречи %(time)f часа")
    vector = "в одном направлени"
    print(print_time % {"time" : time})
elif vektor == "3":
    vector = "в разных направлениях"
    raise ValueError("Машины никогда не встретятся хотя земля круглая")

if time:
    time = time * 60
    time_houer = time // 60
    time_minots = time % 60

tack_print = (
   "Дано: Машина А едит со скоростью %(speed_car_1)i км\ч \n \
     Машина Б едит со скоростью %(speed_car_2)i км\ч \n \
     Растояние между машинами %(dist_car)i км \n \
     Машины едут %(vector)s \n \
     Ответ: машины встретятся через: %(time_houer)0.0f:%(time_minots)0.0f часа\ов")
    
print(tack_print % 
    {
    "speed_car_1" : speed_car_1,
    "speed_car_2" : speed_car_2,
    "dist_car" : dist_car,
    "vector" : vector,
    "time_houer" : time_houer,
    "time_minots" : time_minots
    }
)



