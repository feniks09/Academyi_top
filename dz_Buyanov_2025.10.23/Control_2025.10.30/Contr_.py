lst = [1, 22, '74', 333, '5', 6, 37, 11]


# # 1. Вывести числа из списка в столбик. Строки не выводить (вручную, без ветвления) 
# # через проверку на принадлежность классу
# [print(i) for i in lst if isinstance(i, int)]

# # вручную через срезы
list_int = lst[:2] + [lst[3]] + lst[-3:]

for i in list_int:
    print(i, end="\n")

# # 2. Сохранить строки из списка в две переменные, приведя к типу int

# lst_1 = int(lst[2])
# lst_2 = int(lst[4])

# print(lst_1, lst_2)


## 3. Вывести числа, которые делятся на 37 (циклом! строки не выводить!)
# # через проверку на принадлежность классу

# [print(i) for i in lst if isinstance(i, int) and i % 37 == 0]

# # через проверку типов

# [print(i) for i in lst if type(i) == int and i % 37 == 0]

# через обычный цикл
# for i in lst:
#     if isinstance(i, int):
#         if i % 37 == 0:
#             print(i)

# # через обычный цикл
# for i in lst:
#     if type(i) == int and i % 37 == 0:
#         print(i)



# lst = [1, 22, '74', 333, '5', 6, 37, 11]
# Вывести числа которые изначально формате int, 
# Числа которые изначально в фрмате строк (str) не выводить (циклом!)
# c использованием исключений на ошибку значения

# for i in lst:

#     try:

#         if i == "74" or i == "5":
#             raise ValueError       
#         else:
#             print(i)

#     except ValueError:
#         pass

# Вывести числа которые фармате int, 
# Числа которые изначально
# в фрмате строк (str) не выводить (циклом!)
# c использованием исключений на ошибку типа

# lst = [1, 22, '74', 333, '5', 6, 37, 11]

# for i in lst:

#     try:

#         if not (i + 1):
#             raise TypeError       
#         else:
#             print(i)

#     except TypeError:
#         pass
# # Вывести числа, которые делятся на 37 
# # (циклом! числа которые изначально в формате строк не выводить!)
# # c использованием исключений
# for i in lst:
#     # i = int(i)
#     try:
        
#         if i % 37 == 0:
#             raise ValueError()    
        
#     except (ValueError, TypeError) as e:
#         if isinstance(e, TypeError):
#             pass
#         else:
#             print(i)


# lst = [1, 22, '74', 333, '5', 6, 37, 11]

# # Вывести числа, которые делятся на 37 
# # (циклом! числа которые изначально в формате строк не выводить!)
# # c использованием исключения asser через преобразование в int
# for i in lst:
#     i = int(i)

#     try:
#         # assert i != 74 or i != 5
#         assert i % 37 == 0 and i != 74 and i != 5
#         print(i)

#     except AssertionError:
#         pass

# print("идем дальше")

# # Вывести числа, которые делятся на 37 
# # (циклом! числа которые изначально в формате строк не выводить!)
# # c использованием исключения asser через проверку тип int

# for i in lst:
#     if type(i) == int:

#         try:
        
#             assert i % 37 == 0
#             print(i)

#         except AssertionError:
#             pass

# print("идем дальше")





