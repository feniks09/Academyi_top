values = ""
while values != "stop":
    values = input("Введите провое, второе число и действие в формате\n\
    \"a + b\" или \"a - b\" или \"a * b\" или \"a / b\": ")
    if values:
        values_list = values.split(" ")
        variable_1 = values_list[0]
        variable_2 = values_list[2]
        deystvie = values_list[1]
        try:
            if deystvie == "+":
                rezult = int(variable_1) + int(variable_2)
            elif deystvie == "-":
                rezult = int(variable_1) - int(variable_2)
            elif deystvie == "*":
                rezult = int(variable_1) * int(variable_2)
            elif deystvie == "/":
                rezult = int(variable_1) / int(variable_2)
            else:
                print("Вы ввели не существующее действие!!")
                rezult = None
        except (ValueError, ZeroDivisionError) as e:
            if isinstance(e, ValueError):
                print("Введенное значение не число,", "ошибка следующая: ", e)
            else:
                print("Делить на ноль незя!!!,", "ошибка следующая: ", e)
            rezult = None

        # print(values_list)
        # print(variable_1)
        # print(variable_2)
        # print(deystvie)
        if rezult:
            print(rezult)
        else:
            print("НЕ ПОНИМАЮ ДЕЙСТВИ потому что", rezult)
    else:
        print("Вы ввели пустую строку")
    
    
