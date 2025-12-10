svaz_sotr = ""
svaz_cabin = ""
list_sotrudn = input("Введите сотрудников через пробел: ").split()
list_cabinet = input("Введите кабинет через пробел: ").split()

svaz_flag = True

removd_sotrudnik_flag = False
removd_cabinet_flag = False
is_program_worc = True
count_past = False
svaz_sotrudn_cobinet = {}
part = 0
while is_program_worc:
    
    if removd_sotrudnik_flag:
        print("Удалили сотрудника по имени: ", removd_sotrudnik)
    if removd_cabinet_flag:
        print("Удалили кабинет : ", removd_cabinet)
    if list_sotrudn:
        print("Список сотрудников")
        for number, sotrudnik in enumerate(list_sotrudn):
            print(" номер сотрудника %i" % int(number + 1),"имя сотрудника", sotrudnik)
    if list_cabinet:
        print("Список кабинетов")
        for number, cabinet in enumerate(list_cabinet):
            print("Номер кабинета %i" % int(number + 1), "Название кабинета", cabinet)
    print(svaz_sotrudn_cobinet)
    if svaz_sotrudn_cobinet:
        print("связь сотрудников и кабинетов")
        for key, value in svaz_sotrudn_cobinet.items():
            print(f"Сотрудник {key} связан с кабинетом {value}") 
    print("1 - Связать сотрудника и кабинет")
    print("2 - Отвязать сотрудника от кабинета")
    print("3 - Добавить сотрудника")
    print("4 - Удалить сотрудника")
    print("5 - Добавить кабинет")
    print("6 - Удалить кабинет")
    print("0 - Выйти из приложения")
    print(">>> _")

    menu = int(input("Выбирете 0/1/2/3/4/5/6: "))
    count_past = False
    if menu == 0:
        is_program_worc == False
    elif menu == 1:
        svaz = input("Введте номер сотрудника и \
        \n номер кабинета к которому его надо привязать через пробел:").split()
        svaz_sotr = int(svaz[0])
        svaz_cabin = int(svaz[1])
        if svaz_flag:
            svaz_sotrudn_cobinet = {list_sotrudn[svaz_sotr-1] : list_cabinet[svaz_cabin-1]}
    elif menu == 2:
        pass
    elif menu == 3:
        new_sotrudn = input("Добавить сотруюника в список сотруднико: ")
        list_sotrudn.append(new_sotrudn)
    elif menu == 4:
        input_remov = int(input("Введите номер сотрудника которого нужно удалить: "))
        removd_sotrudnik = list_sotrudn.pop(input_remov-1)
        if removd_sotrudnik:
            removd_sotrudnik_flag = True
    elif menu == 5:
        new_cabinet = input("Добавить кабинет с названием в список кабинетов: ")
        list_cabinet.append(new_cabinet)
    elif menu == 6:
        input_remov = int(input("Введите номер кабинета которого нужно удалить: "))
        removd_cabinet = list_cabinet.pop(input_remov-1)
        if removd_cabinet:
            removd_cabinet_flag = True

    else:
        print("Не верная команда попрубуйте еще раз")


