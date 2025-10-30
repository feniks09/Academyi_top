<<<<<<< HEAD
# t = "мама мыла раму"
# print(t[-1:-len(t)-1:-1])
# print(len(t))
# # for i in range(len(t)-1, -1, -1):
# #     print(t[i], end="")

# print(t[::-1])
# middele = 0
# print("мама мыла раму"[-1:middele:-1]) if middele else print("мама мыла раму")


# middele = -7

# print("Привет"[-1:middele:-1]) if middele else print("Пока"[-1::-1])

# # Вывести на печать только нечетные числа от 77 до 777 включая
# [print(i, end=" ") for i in range(77, 778) if i % 2 != 0]

# # Вывести на печать только нечетные числа от 77 до 777 включая
# # используя переменные

# N_start = 77
# N_stop = 777

# [print(i, end=" ") for i in range(N_start, N_stop + 1) if i % 2 != 0]


# # Вывести на печать только нечетные числа от 77 до 777 включая
# # запросив ввод от пользователя

# N_start = input("Введите начало диапозона: ")
# N_stop = input("Введите конец диапозона включительно: ")

# try:
#     N_start = int(N_start)
#     N_stop = int(N_stop)
# except ValueError("Введенное значение не число"):
#     N_start = None
#     N_stop = None

# [print(i, end=" ") for i in range(N_start, N_stop + 1) if i % 2 != 0]




# # C помощью среза вывести каждый 3 символ любого текста

# t = "Сегодня хорошая погода"
## методом обращения к индексу

# print(t[2]) if t else None

## Методом среза

# print(t[2:3]) if t else None

## C помощью среза и range двумя способами вывести три последних слова любого текста

t = "Сегодня я занимался испанским языком"

t_list = t.split()
## t_list = str(t_list)
print(t_list)

print(t_list[-3:])
t_list_3 = t_list[-3:]
[print(t, end=" ") for t in t_list[-3:]]

[print(t_list[t], end=" ") for t in range(len(t_list)-3, len(t_list))]


=======
t = "мама мыла раму"
print(t[-1:-len(t)-1:-1])
print(len(t))
# for i in range(len(t)-1, -1, -1):
#     print(t[i], end="")

print(t[::-1])
>>>>>>> 3928d8464ac75be9ba0b947bdda6537741473bfd
