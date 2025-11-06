# Запросить у пользователя скорости машин и расстояние между ними.
# С помощью форматирования строк вывести решение
# задачи:
# Через какое время машины окажутся рядом?
# На 8 баллов: машины едут навстречу

speed_car = input("Введите скорость машины, через пробел: ").split()
dist_car = input("Введите растояние между машинами, через пробел: ") 
speed_car_1 = speed_car[0]
speed_car_2 = speed_car[1]
dist_car = int(dist_car)

print(type(speed_car_1))
print(type(dist_car))

speed_car_1 = int(speed_car_1)
speed_car_2 = int(speed_car_2)

time = (speed_car_1 + speed_car_2)/dist_car
print(time)



