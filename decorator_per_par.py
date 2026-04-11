def decorate_param(name):
    print("Я доп параметр", name)
    def decorate_func(func):
        print("Я реальный декаратор")
        def wrapper(*args, **kwargs):
            print("Начинае декор")
            rez = func(*args, **kwargs)
            print(f'{rez=}')
            print("Хватит с декора")
            return rez
        return wrapper
    return decorate_func

@ decorate_param("Я крут")
def sum(a, b, c,):
    return a + b + c

rez = sum(a = 10, b = 2, c = 6)
print(rez)