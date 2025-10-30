baza = {"name" : False, "soname" : False, "age" : False}

baza["name"] = input("Введите ваше имя: ").lower()
baza["soname"] = input("Введите вашу фамилию: ").lower()
baza["age"] = input("Введите ваш возраст: ").lower()
if baza:
    print(baza)
    print("Ваше имя: ", baza["name"])

