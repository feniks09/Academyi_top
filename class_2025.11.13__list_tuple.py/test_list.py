# 1. Задвоить элементы в списке. 
# То есть компьютер превращает список 
# [4, print, "xyz", None] в список 
# [4, 4, print, print, "xyz", "xyz", None, None]

list_1 = [4, print, "xyz", None]
# list_2 = []
# list_2 = list_1[:]
list_2 = list_1.copy() # print(list_)
# for i in list_1:
#     list_2.append(i)
#     print(i)
# list_1.append(1000)


# print(list_1)
# print(list_2)




# print(list_1 == list_2) 
# print(id(list_1))
# print(id(list_2))
# print(f"{list_1 is list_2}")
# print(f"это первый элемент 1 и 2 списков {list_1[0] == list_2[0]}")
# print(f"это id объекта {id(list_1),\
#                         id(list_2)}") 
# list_3 = [0]
# for i in range(len(list_1)):
#     if i == 0:
#         list_3[i] = list_1[i]
#     else:
#         list_3.append(list_1[i])
#         list_3.append(list_1[i])
# print(list_3)

# list_4 = []
# count = 0
# for i in list_1:
#     list_4.insert(count, i)
#     list_4.insert(count, i)
#     count += 1
# print(list_4)

count = 0
for namber in list_2:
    list_1.insert(count, namber)
    count += 2
print(list_1) 

# a = [[namber, namber] for namber in list_1]
# b = [namber for namber in a]

# print(a[0][0], a[0][1])
# print(b)
# a = 1, 2, 3,
# print(a)
# a, b  = [a, b for a, b in a] 
# print(a, b)








