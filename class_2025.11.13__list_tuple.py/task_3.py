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

for i in range(len(list_num)):
    # for j in range(i + 1):
    if list_num[i-1] > list_num[i]:
        max = list_num[i]
        print(max)
        # elif j > i:
        #     print("Это мах: ", list_num[j])

