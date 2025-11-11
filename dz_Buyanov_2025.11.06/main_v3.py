MIN_TEMPERATURE_CELCIUS = 15
MAX_TEMPERATURE_CELCIUS = 30

is_program_work = True
is_choice_wrong = False
is_temperature_celsius_error = False
temperature_celsius = 20

while is_program_work:
    # Секция кода 1: отрисовка данных и приглашения к вводу
    print("[ПУЛЬТ ТЕМПЕРАТУРЫ]\n")
    # print("")
    print("Текущая температура: %i \n" % temperature_celsius)
    # print("")
    print("1 - +1 градус")
    print("2 - -1 градус")
    print("0 - выход\n")
    # print("")

    if is_choice_wrong:
        print("Ошибка: некорректный ввод")
        print("")
    
    # Вариант с еще одной логической переменной сложнее так как
    # появляется еще одна переменная и двойное ветвление
    # if is_temperature_celsius_error:
    #     if temperature_celsius <= 15:
    #         print("Температура не может быть меньше 15 градусов")
    #     elif temperature_celsius >= 30:
    #         print("Температура не может быть больше 30 градусов")
    
            
    if temperature_celsius <= 16:
            print("Температура не может быть меньше 15 градусов, даже не крути!!")
    elif temperature_celsius >= 30:
            print("Температура не может быть больше 30 градусов, даже не крути!!")


    print(">>> ", end="")

    # Секция кода 2: получение данных от пользователя (ввод)
    choice = input().strip()  # Метод стрип пораждает новую строку без внешних пробельных символов

    # Секция кода 3: логика обработки данных, обновление состояния
    is_choice_wrong = False

    if choice == "0":
        is_program_work = False
    elif choice == "1":
        temperature_celsius += 1
    elif choice == "2":
        temperature_celsius -= 1
    else:
        is_choice_wrong = True
    
    # if not 15 <= temperature_celsius <= 30:
    #     is_temperature_celsius_error = True
    #     if temperature_celsius > 30:
    #         temperature_celsius = 30
    #     elif temperature_celsius < 15:
    #         temperature_celsius = 15

    if temperature_celsius > 30:
        temperature_celsius = 30
    elif temperature_celsius < 15:
        temperature_celsius = 15
             
             



    # elif temperature_celsius > 30:
    #     is_temperature_celsius_max = True
    # #     is_program_work = False


    

    
