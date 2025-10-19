year_old = input("Введите ваш вораст: ")

try:
    year_old = int(year_old)
    if year_old < 0:
        raise ValueError(
        "Вы еще не родились")
    elif year_old > 200:
        raise ValueError(
        "Вы уже там...!!!")
except ValueError as e:
        print("Ошибочка!!! -", e)
        year_old = None
if year_old:
    print("Ваш возраст: ", year_old)
print("работаем братья")                    