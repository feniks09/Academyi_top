# Рокировка пары столбцов или пары строк:
#     - есть таблица целых чисел (список списков):
#         - построена вручную (литерал)

#         ИЛИ

#         - [+1 балл] сгенерирована компьютером
#           (ширина и высота из диапазона от 0 до 10;
#           значения от -10 до 10)

#     - компьютер распечатывает таблицу

#     - компьютер запрашивает два индекса строк

#     - если индексы корректны, то компьютер меняет местами
#       указанные строки

#       то есть если была таблица:
#           0 1 2 3 4   строка 0
#           5 6 7 1 2   строка 1
#           6 7 1 2 9   строка 2

#       и было указано поменять местами строки 1 и 2,
#       то получилась таблица:
#           0 1 2 3 4   строка 0
#           6 7 1 2 9   новая строка 1
#           5 6 7 1 2   новая строка 2

#     - компьютер распечатывает получившуюся таблицу

#     - компьютер спрашивает два индекса столбцов

#     - если индексы корректны, то компьютер меняет местами
#       указанные столбцы

#       то есть если была таблица:
#           0 1 2 3 4
#           5 6 7 1 2
#           6 7 1 2 9

#           0 1 2 3 4  <--- номера столбцов

#       и было указано поменять местами столбцы 1 и 2,
#       то получилась таблица:
#           0 2 1 3 4
#           5 7 6 1 2
#           6 1 7 2 9

#           0 1 2 3 4  <--- номера столбцов
#             * *      <--- обновлённые столбцы

#     - компьютер распечатывает таблицу


#     [+COIN] Если сделано меню и можно выбирать, пару столбцов
#     или пару строк менять местами.

#           Текущее состояние таблицы
 
#           0 2 1 3 4   0
#           5 7 6 1 2   1
#           6 1 7 2 9   2

#           0 1 2 3 4

#           1 - поменять местами строки
#           2 - поменять местами столбцы
#           0 - выйти


import random
menu = True
table_list = []
for i in range(10):
        table_list.append([])
        for k in range(10):
            num = random.randint(0, 9)
            table_list[i].append(num)
is_progran_work = True
width = len(table_list[0])
height = len(table_list)

while is_progran_work:
    print("Текущее состояние таблицы: ")
    print()
    if table_list:
        for num in table_list:
            print(*num)
    
# table_list = [random.randint(-10,10) for i in range(10) for i  in range(10)]
    #     print(table_list[i], end = " ")
    # print()  

    # for i in range(len(table_list)):
    #     for j in range(len(table_list[i])):
    #         print(table_list[i][j], end=' ')
    #     print()

    menu = input() # вводится команда 0 / 1 / 2 2
    # 1 - поменять местами строки  
    # 2 - поменять местами столбцы 
    # 0 - выйти  
    menu = int(menu)
    
    if menu == 0:
        is_progran_work = False # 0 - выйти  
    elif menu == 1:
        print("Вторая таблица")
        index = input("Введите индексы строк,\n\
которые надо поменять местами, через пробел: ").split()
        chenge = True
        index_1 = int(index[0])
        index_2 = int(index[1])
        if index_1 < len(table_list) and index_2 < len(table_list):
            table_list[index_1], table_list[index_2] = table_list[index_2], table_list[index_1]
        # for num in table_list:
        #     print(*num)
    elif menu == 2:
        index = input("Введите индесы столбцов,\n\
которые надо поменять местами, через пробел:").split()
        if index:
            index_1 = int(index[0])
            index_2 = int(index[1])
            if index_1 < len(table_list[0]) and index_2 < len(table_list[0]):
                table_list_2 = []
                for i in range(len(table_list)):
                    table_list_2.append(table_list[i][index_1])
                    for j in range(len(table_list[0])):
                        table_list[i][index_1] = table_list[i][index_2]
                    table_list[i][index_2] = table_list_2[i]
# print(table_list_2)
# for num in table_list:
#     print(*num)

