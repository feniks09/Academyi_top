a = [1, 2, 3, 4, 5, 6]
b = []
# sum = 0
# for i in range(7):
#     sum += i
#     if sum > 0:
#         b.append(sum)

#     print(sum)
pref_sum = 0
for i in range(6):
    # pref_sum = a[i+1] - a[i]
    # sum = a[i]
    pref_sum += a[i]
    b.append(pref_sum)
print(a)
print(b)
# print(pref_sum)

# for i in range(6):
#     sum = a[i]
#     for j in range(6):
#         sum = a[j]+a[i]
#         if sum == 4 and i != j:
#             print(i, j)

a = [1, 2, 3, 4, 5, 6]

N = len(a)
print(N)
target = 4
for i in range(N-1):
    for j in range(i + 1, N):
        if a[i] + a[j] == target:
            print(i, j)




