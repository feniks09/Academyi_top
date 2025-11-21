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
print(list_num)

#     num_max = list_num[0]
# else:
#     num_max = None

# for i in range(len(list_num)):
#     for i in range(i):
#         if list_num[i] > list_num[i+1]:
#             list_num[i] = list_num[i+1]
#             num_max = list_num[i]
if list_num:
    num_max = list_num[0]
    print("это максимум :", max(list_num))

    num_max_2 = max(list_num)

    i = list_num.index(num_max_2)
    list_num.pop(i)
    if list_num:
        print("это предмаксимум :", max(list_num))
    else:
        print("В списке только одно число предмаксимума нет")
else:
    num_max = None





