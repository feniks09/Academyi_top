name = ["Привет"]
text = name[0][5]
print(text)

ids = []  # Пустой список
print("ids:", ids)

ids.append(123) # Добавляем новый элемент в конец списка
print("ids:", ids)

ids.append(3)
ids.append(5)

print(ids)

print(len(name))

# список имен животных

pet_name = [] 

for i in range(3):
    name = input("Введите имя питомца вариант %i: " % (i +1))
    pet_name.append(name)

print(pet_name)

for name in pet_name:  # перебираем элементы списка
    print(name, end = ", ")
# распоковка контейнеров
print("И еще раз список имен пиомцев: ", *pet_name)




