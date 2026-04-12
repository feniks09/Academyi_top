def mydecorator_1(func):
    print('я выше так как я первый дек')
    def wrapper():
        print("До основной функции")
        func()
        print("После орегиналь функции")
    print('а я первый с конца')
    return wrapper

def mydecorator_2(func):
    print('я второй декаратор я в теме')
    def wrapper():
        print('до оригинальной функции')
        func()
        print('после оригинала')
    print('я вообще в конце')
    return wrapper


# def bazis():
#     print("Я основная функция")

# print(mydecorator_1(bazis)())

# wrapped = mydecorator_1(bazis)

# wrapped()
print("")
@mydecorator_1
@mydecorator_2
def bazis():
    print("Нет это я настоящий оригинал")

bazis()


