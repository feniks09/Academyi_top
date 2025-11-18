# 2. Компьютер спрашивает у пользователя, 
# сколько тот хочет положить в список целых чисел. 
# Далее указанное число раз компьютер запрашивает у пользователя 
# эти числа. Потом компьютер выводит построчно элементы списка,
# указывая их индекс. Затем удаляет из списка те числа,
# что находятся в нём под нечётными индексами (счёт с нуля). 
# Потом компьютер опять выводит построчно элементы списка, указывая их индекс.

list_1 = []
N = input("Сколько цифр ввести: ")
N = int(N)
# count = 0
for i in range(N):
    chislo = input("Введите число %i : " % (i + 1))
    chislo = int(chislo)
    list_1.append(chislo)
    # count += 1
    # print(i, list_1[i])

for index, value in enumerate(list_1):
    print(index, value)
list_2 = list_1[:]
# for num in list_2:
#     if num % 2 == 0:
#         del list_1[i]
# N = len(list_1)
# for i in range(N-1 , -1, -1):
#     if i % 2 != 0:
#         print(f"Мы удалили это число: {list_1.pop(i)} под индексом {i}")
# print(list_1)

# for index, value in enumerate(list_1):
#     print(index, value)

# print(list_1.index(10))
# print(list_1.count(10))

num_nch = []
for i in range(len(list_1)):
    if i % 2 != 0:
        num = list_1[i]
        num_nch.append(num)
for num in num_nch:
    if num in list_1:
        i = list_1.index(num)
        list_1.pop(i)        


print(list_1)
