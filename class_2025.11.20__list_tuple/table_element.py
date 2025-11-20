a = [[1, 2, 6, 4, 4], [0, 5, 5, 1], [7, 7, 8, 6]]
N = len(a)
# M = len(a[0])
# # N = len(a[i])
# [print(a[i][i]) for i in range(N) for j in range(len(a[j]))]
b = []

for i in range(N):
    for j in range(len(a[i])):
        # b.append(a[i][j])
        print(a[i][j], end = " ")
    print()

print(* [2, 5, 6, 7])

for strica in a:
    print(*strica)
# print(b)
# M = len(b)
# for i in range(M):
   
# print(b)

# for num in b:
#     print(num)




# a = [a[i] for i in range(N)
# ]
# print(a)