
# 1 #
print("Задача № 1")
numbers = []

for number in range(10):
    numbers.append(number)

print(numbers)

nambers = [namber for namber in range(10)]

print(nambers)
print()


# 2 #
print("Задача № 2")
numbers = []
start = -5
finish = 12

for number in range(start, finish + 1):
    if number % 3 == 0:
        numbers.append(number)

print(numbers)

nambers = [number for namber in range(start, finish + 1) if namber % 3 == 0]

print(numbers)
print(" ")
# 3 #
print("Задача № 3")
numbers = []

for number in range(15):
    if number % 2 == 1:
        continue
    numbers.append(number)
print(numbers)
numbers = [number for number in range(15) if number % 2 != 1]
print(numbers)
print("")
# 4 #
print("Задача № 4")
numbers = [65.0, -1.0, 4.0, 5.6, 5.6, -3.09, 12.9, 4.0, 5.0, -1.0, -0.001, 2.17, 3.0]
output_list = []
threshold = 12.0  # Порог, пороговое значение

for number in numbers:
    if number > threshold:
        output_list.append(number)

print(output_list)

output_list = [number for number in numbers if number > threshold]

print(output_list)
print(" ")

# 5 # Можно упростить! #
print("Задача № 5")
numbers = [65.0, -1.0, 4.0, 5.6, 5.6, -3.09, 12.9, 4.0, 5.0, -1.0, -0.001, 2.17, 3.0]
output_list = []

for number in numbers:
    if number > 0:
        output_list.append(-number)
    elif number < 0:
        output_list.append(-number)
    else:
        output_list.append(number)

print(output_list)

output_list = [-number if number > 0 else -number if number < 0 else number 
               for number in numbers]
print(output_list)

output_list = [-number if number != 0 else number for number in numbers]
print(output_list)
print(" ")

# 6 # Можно упростить! #
print("Задача № 6")
numbers = [65.0, -1.0, 4.0, 5.6, 5.6, -3.09, 12.9, 4.0, 5.0, -1.0, -0.001, 2.17, 3.0]
output_list = []
threshold = 5.0
index = 0

for number in numbers:
    if number > threshold:
        output_list.append(index)
    index += 1

print(output_list)

output_list =[index for index, number in enumerate(numbers) if number > threshold]
print(output_list)
print(" ")
# 7 #
print("Задача № 7")
input_list = ["жа", "ло", "ко", "за", "ти", "на", "ра", "на", "жа", "ба", "ко", "жа", "ль"]
output_list = []

for i in range(len(input_list) // 2):
    output_list.append(input_list[2 * i] + input_list[2 * i + 1])

print(output_list)


input_list = [input_list[2 * i] + input_list[2 * i + 1] for i in range(len(input_list)//2)]

print(output_list)
print(" ")

# 8 # Можно упростить! #
print("Задача № 8")
input_list = ["лом", "********", "барбарис", "", [3, 4, 6], "ещё бы", range(7, 11), "+++++"]
output_list = []

for iterable in input_list:
    temp_list = []
    output_list.append(temp_list)
    for item in iterable:
        temp_list.append(item)

print(output_list)

print()
output_list_1 = [[] for i in range(len(input_list))]

output_list_2 = [output_list_1[index].append(element) 
for index, iterable in enumerate(input_list)
                 for element in iterable
            ]

print(output_list_1)










