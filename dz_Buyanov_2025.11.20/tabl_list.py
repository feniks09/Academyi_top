# Пользователь вводит целое число N - длину списка.

# Далее пользователь вводит N раз целые числа - содержимое
# списка.

# Далее пользователь вводит целое число P - индекс элемента
# списка.

# Если индекс P корректный, то компьютер меняет все элементы
# списка, начиная с индекса 0 и заканчивая включительно
# индексом P, на значение None.

# Например, пользователь ввёл список [6, 4, 3, -4, -1, -123],
# а затем ввёл индекс 4. Компьютер в этом случае изменил
# список так: [None, None, None, None, None, -123].

# Если индекс P некорректный, то выводится фраза "Индекс
# некорректный" и программа завершает работу.

N = input("Введите количество чисел: ")

N = int(N)

list_table = [input("Введите число %i :" %(i + 1)) for i in range(N)]
print(list_table)

list_table = [int(num) for num in list_table]
print(list_table)

index = input("Введите индекс: ")
index = int(index)

if 0 <= index <= len(list_table) - 1:
    for i in range(index + 1):
        list_table[i] = None
# elif -len(list_table) <= index <= -1 :
#     for i in range(index):
#         list_table[i] = None

    print(list_table)

else:
    print("Индекс не корректный")


# f = [5,5,5]
# f[-1] = None
# print(f)
