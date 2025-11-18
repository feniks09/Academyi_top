# Компьютер загадывает длину списка от 0 до 10.

# Далее компьютер наполняет список загаданное число раз
# случайными числами от -100 до 100 и находит ПРЕДМАКСИМУМ
# среди этих чисел.

# Предмаксимум - это такое значение, которое может стать
# максимумом, если убрать текущий максимум; то есть
# предмаксимум больше всех значений, кроме максимума.

# Для пустого списка предмаксимум - это None.

# (Можно использовать функцию max!)

# Например, компьютер построил список:
#     [4, -67, 6, 95, 95, 11, -34]

# Тогда предмаксимум:
#     11

import random

list_num = []
list_max = []
N = random.randint(0, 10)

for i in range(N):
    num = random.randint(-100, 100)
    list_num.append(num)

if list_num:
    num_max = list_num[0]
else:
    num_max = None

for i in range(1, len(list_num)):
    if list_num[i] > num_max:
        list_max.append(num_max)
        num_max = list_num[i]

print(list_num)

print(list_max)
print(list_max[-1])