# # напечатать все четные числа от 0 до 1000
a = range(1000)
if 10 in a:
    print(a[0]) 
for i in range(1000):
    if i % 2 == 0:
        print(i, end=" ")

# # напечатать все нечетные числа от 0 до 1000
for i in range(1000):
    if i % 2 != 0:
        print(i, end=" ")
# напечатать все цифры из диапозона в которых есть цифра 3
for i in range(1000):
    if "3" in str(i):
        print(i, end=" ")

# # напечатать все трехзначные цифры кончающиеся на 7

for i in range(100, 1000):
    if "7" in str(i)[2]:
        print(i, end=" ")

# # Напечатать все двузначные цифры сумма которых четная

for i in range(10, 100):
    i_1 = str(i)[0]
    i_2 = str(i)[1]
    if (int(i_1) + int(i_2)) % 2 == 0:
        print(i, end=" ")

# # Напечатать все трехзначные цифры в которых нет нулей

for i in range(100, 1000):
    if not "0" in str(i):
        print(i, end=" ")

# # Напечатать последовательность 0 -1 1 -2 2 -3 3 ..... до 20 -20

for i in range(0, -21, -1):
    if i == 0:
        print(i, end=" ")
    elif i == -20:
        print(-i, i, end=" ")
    else:
        print(i, -i, end=" ")


# # напечатать последовательность 1, 100, 2, 99, 3, 98 ...... до ""встречи"
# # метод прямой печати

for i in range(1, 101):
    print(i, 101-i, sep=", ", end=", ")
print("... до \"встречи\"")   

    



# напечатать последовательность 1, 100, 2, 99, 3, 98 ...... до ""встречи"
# через сохрание в список

list_ = []
for i in range(1, 101):
    list_.append(i)
    list_.append(101-i)
    # print(i, 101-i, end=" ")
    # print(list_)
for i in list_:
   print(i, sep=", ", end=", ")

print("...до \"встречи\"")