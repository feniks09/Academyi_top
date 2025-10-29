# a = range(10)

# for i in a:
#     print(i, end=(" "))

# for i in range(6, 19):
#     if i % 3 == 0:
#         print(i, end=(" "))

# for i in range(3, 20, 3):
#     print(i, end=" ")

#все двузначные числа с 0 на конце
# метод черз шаг 10
# for i in range(10, 81, 10):
#     print(i, end=" ")

# # метод черз остаток от деления
# for i in range(1, 100):
#     if i % 10 == 0:
#         print(i, end=" ")

# # метод через поиск 0 в конце
# for i in range(10, 100):
#     i = str(i)
#     if i[1] == 0:
#         print(i, end=" ")

# # метод через проверку включения i
# for i in range(1, 100):
#     if "0" in str(i):
#         print(i, end=" ")

# вывести все трехзначные числа которые делятся 13
# метод остаток от деления
# for i in range(1, 1000):
#     if i % 13 == 0:
#         print(i, end=" ")
# print("\n Привет", end="\n")

# for i in range(1000):
#     if i % 13 == 0 and i % 14 != 0:
#         print(i, end=" ")

# Вывести в обратном поряде числа меньше 1000

for i in range(0, -1000, -1):
    print(i, end='')

# for i in range(1000, -1, -1):
#     print(i, end=' ')

# Вывести в обратном поряде числа меньше 1000
# методом цикла while

a = 0
while a > -1000:
    print(a, end=" ")
    a -= 1




# a = 1000
# while a > 0:
#     a -= 1
#     if a % 13 == 0 and a % 14 != 0:
#         print(a, end=" ")