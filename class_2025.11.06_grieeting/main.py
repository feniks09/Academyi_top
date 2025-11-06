is_program_work = True
is_choice_wrong = False
temperature_celcius = 20
# choice = 0
while is_program_work:
    # Секция кода: отрисовка данных и приглашение к вводу
    print("Пульт температуры")
    print("")
    print("Текущая температура: %i" % temperature_celcius)
    print("1 - +1 градус")
    print("2 - -1 градус")
    print("0 - выход")
    print("")

    if is_choice_wrong:
        print("Ошибка не корректный ввод")
        
    # choice = int(choice)
    # if choice < 0 or choice > 2:
    #     print("Ошибка")
    print(">>> ")
            
    # Секция кода: получение данных от пользователья (ввод)
    choice = input().strip()
    
    # Секция кода: обработка данных, обновления состояния
    
    is_choice_wrong = False
    
    if choice == "0":
        is_program_work = False
    elif choice == "1":
        temperature_celcius += 1
    elif choice == "2":
        temperature_celcius -= 1
    else:
        is_choice_wrong = True
