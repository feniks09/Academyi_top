is_program_work = True
temperature_celcius = 20

while is_program_work:
    print("Пульт температуры")
    print("")
    print("Текущая температура: %i" % temperature_celcius)
    print("1 - +1 градус")
    print("2 - -1 градус")
    print("0 - выход")
    print("")
    
    choice = input(">>> ")
    
    if choice == "0":
        is_program_work = False
    elif choice == "1":
        temperature_celcius += 1
    elif choice == "2":
        temperature_celcius -= 1
    
        
        