# Компьютер запрашивает у пользователя число N
# и создает таблицу (списки вложенные в список)
# размером N строк на N столбцов, заполненную
# следующим образом:
# при N = 1
#         [
#           [1]
#         ]
#     при N = 2
#         [
#           [1, 0],
#           [0, 1]
#         ]
N = input("Введите число: ")
N = int(N)
tabel = [[] for i in range(N)]
# print(tabel)
for i in range(N):
    for k in range(N):
        tabel[i].append()
    
        # tabel[1].append([i])


print(tabel)