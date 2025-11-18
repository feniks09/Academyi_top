# 3. Компьютер загадывает длину списка от 0 до 10. 
# Далее компьютер наполняет список загаданное число 
# раз случайными числами от -100 до 100 
# и находит максимум среди этих чисел. 
# (Не использовать функцию max
import random

N = random.randint(0, 10)
print(N)
list_num = []

for i in range(N):
    num = random.randint(-100, 100)
    list_num.append(num)

print(list_num)
max_2 = 0
for i in range(len(list_num)):
    if i == 0:
        max_2 = list_num[i]
    if list_num[i] >= max_2:
        max_2 = list_num[i]
        # print(max_2)
print(max_2)

# list_2 = [0]
# for num in list_num:
#     if list_2[0] <= num:
#         list_2[0] = num
#     else:
#         list_2[0] = num


# print(list_2[0])