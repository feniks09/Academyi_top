def decor(func):
    print('Всем паривет я декаратор')
    def wrapper(a, b):
        print('Начнем декарирование функции', func.__name__)
        rez = func(a, b)
        print(f"{rez=}")
        print('C декарациями харе',func.__name__)
        return rez
    return wrapper

@ decor
def add(a, b):
    return a + b
@decor
def sur(a, b):
    return a * b

# add(1, 5)
# sur(3, 5)
# print(f' результат сложения: {add(2, 5)}, результат умножения: {sur(3, 5)}')

r = add(2, 2)
d = sur(3, 5)

print('r', r)
print('d', d)