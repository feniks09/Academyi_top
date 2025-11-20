# N = 5
# N_2 = 3
# a = ["A", "B", "C", "D"]
# N = len(a)
# for i in range(N):
#     print("Я из первого цикала")
#     for j in range(N):
#         print(a[i], a[j])


N = 2
a = 0
b = 1
list_1 = []
for i in range(N):
    print("Я из первого цикала")
    list_1.append([])
    for j in range(N):
        if i % 2 == 0:
            list_1[i].append(a)
            list_1[i].append(b)
        else:
            list_1[i].append(b)
            list_1[i].append(a)

#         # list_1[j].append(b)

# [print(num) for num in list_1]

N = 2
list_2 = [[] for _ in range(N)]
# [list_2[j].append(a) 
#  for i in range(N)
#  for j in range(N) if i % 2 == 0 ]
# print(list_2)


# [list_2[i].append(a) for i in range(N)]
# [list_2[i].append(b) for i in range(N)]

a = 0
b = 1

[list_2[i].append(a) if i % 2 == 0 else 
list_2[i].append(b) if i % 2 == 0 else 
list_2[i].append(b) if i % 2 != 0
for i in range(N)
for j in range(N)]
# [list_2[i].append(a) if i % 2 != 0 else list_2[i].append(b) for i in range(N)]

print(list_2)
# list_2 = [(1, 1), (2, 3)]
# [print(num_1, num_2) for num_1, num_2 in list(list_2)]
# [print(num) for num in list_2]


# [print(i) for i in range(5)
#  for j in range(5)]

# [print("Ф") if a == 0 else
# print("И") if a >= 0 else "d"
#  for a in b
#  ]



