list_color = []

for i in range(7):
    color = input("Введите цвета радуги: %i - " % (i + 1))
    list_color.append(color)
# print(list_color)
# for color in list_color:
#     i = (len(list_color))
#     print(i, color)

# вывести список на печать с индексом перед цветом
for i in range(len(list_color)):
    print(i, list_color[i])

# вывести список в обратном порядке
for i in range(len(list_color)-1, -1, -1):
    print(i, list_color[i])
    
    
