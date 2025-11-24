a = [1, 3, 2, 9, 2, 7, 5]
print(a)
b = []
N = len(a)
for i in range(N):
    for j in range(N):
        if not j == i:
            print(a[i], a[j])
            if a[i] > a[j]:
                a[i], a[j] = a[j], a[i]
                print(a[i], a[j], "замена")
        else:
            print(a[i], a[j], a[i] == a[j] )

[b.append(a[i]) for i in range(len(a)-1, -1, -1)]

print(b)

