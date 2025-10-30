list_ = []

for i in range(3):
    a = input("введите значения: ")
    list_.append(a)

for i in range(3):
    list_[i] = i


list_.extend(["efre", 1, "rfjrej"])
list_.insert(0, "ghbdtn")
print(list_)
for list in list_:
    print(list)

list_1 = [0, 3, 4, 4]
list_2 = [3, 4, 5, 6]
list_3 = list_1 + list_2
print(list_3)

list_4 = [i for i in range(10) if i % 2 != 0] 
print(list_4)