while True:
    material = input("Введите вид учебного материала Книги/видео/аудио1: ")
    kotergor = input("Введите категорю учебного матерала: ")
    try:
        cost = input("Введите стоимость матерала: ")
        cost = int(cost)
        print(f"Учебный материал - {material}, Категрия - {kotergor}, Стоимость - {cost}, добавлен")
        break
    except ValueError:
        print("Введите положит число!!!")
