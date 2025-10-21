while True:
    material = input("Введите вид учебного материала Книги/видео/аудио1: ")
    kotergor = input("Введите категорю учебного матерала: ")
    cost = input("Введите стоимость матерала: ")
    if cost:
        try:
            cost = int(cost)
        except ValueError:
            print("Ошибка ввода Введите положит число!!!")
        print(f"Учебный материал - {material}, Категрия - {kotergor}, Стоимость - {cost}, добавлен")

    
    