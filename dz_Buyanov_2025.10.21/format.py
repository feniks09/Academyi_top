speed_1 = input("Введите скорость первой машины: ")
speed_2 = input("Введите скорость второй машины: ")
distance = input("Введите растояние между машинами")
direcsion_1 = input("Укажите направление движения машин: (встречное-1\одно-2\противоположное-3")

speed_1 = int(speed_1)
speed_2 = int(speed_2)
distance = int(distance)
time = float(distance/(speed_1 + speed_2))
direcsion_1 = int(direcsion_1)

if speed_1 < 0 or speed_2 < 0:
    raise ValueError("Машины едут обратно во времени")
elif speed_1 == 0 and speed_2 == 0:
    raise ValueError("Машины встретятся если поедут во встречном направленни")

if direcsion_1 == 1:
    time = float(distance/(speed_1 + speed_2))
elif direcsion_1 == 2:
    if speed_1 > speed_2:
        time = float(distance/(speed_1 - speed_2))
    elif speed_1 < speed_2:
        time = float(distance/(speed_2 - speed_1))
    else:
        print("Машины будут ехать паралельно")
elif direcsion_1 == 3:
    print("Машины не встретитятся")        
    
    
    

print("Дано: Скорость первой машины %i" % speed_1,\
" Скорость второй машины %i" % speed_2,\
"Растояние между машинами %i" % distance, "\n", \ 
"Ответ: Машины встретятся %i" % time)

