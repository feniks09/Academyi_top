from random import randint
a = randint(1, 10)
b = randint(1, 10)
count_False = 0
count_True = 0
answer = 21
while not answer == 0:
    rezult = a + b
    answer = int(input("Сколько будет %(a)i + %(b)i = " % {"a" : a, "b" : b}))
    if answer != rezult:
        print("Не бъется попробуй еще раз")
        count_False += 1
        # if answer == 0:
        #     print("уходим братья")
        #     break
    else:
        print(answer, " это верно")
        count_True += 1
    a = randint(1, 10)
    b = randint(1, 10)
else:
    print("братья ушли!!!")
print("Неправильные ответы %(count_False)i \
Правильныве ответы %(count_True)i\
" % {"count_False" : count_False, "count_True" : count_True})
# a = int(input("Введите значение от 0 до 10: "))
# while a != 10:
#     a += 1
#     print(a)
# print(a)

# count = 0
# while count < 10:
#     count += 1
#     print(count)