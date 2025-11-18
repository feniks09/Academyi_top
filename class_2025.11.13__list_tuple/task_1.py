# 1. Задвоить элементы в списке. 
# То есть компьютер превращает список 
# [4, print, "xyz", None] в список 
# [4, 4, print, print, "xyz", "xyz", None, None]

list_1 = [4, print, "xyz", None]
list_2 = []
count = 0
i = 0
for i in list_1:
    i +=1
    list_1.insert(count, i)
    count += 1

# print(list_1)
# list_1.insert(0, 4)
# list_1.insert(2, print)
# list_1.insert(4, "xyz")
# list_1.insert(6, None)
# count = 0
# for list_ in list_1:
#     list_2.extend([list_, list_])
    


print(list_2)
