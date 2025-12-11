def create_bottle():

    class Bottle:

        volumne_max = input("Введите максимальный объем бутылки: ")
        volumne_now = input("Введите объем воды в бутылке сейчас: ")
        try:
            volumne_max = int(volumne_max)
            volumne_now = int(volumne_now)
            if volumne_now > volumne_max:
                raise ValueError(f"Объем жидкости в бутылке \
не может быть больше {volumne_max} объема")
        except ValueError as e:
            print(f"Ошибка {e}")
            print(f"Ведите число не больше {volumne_max}")
            volumne_max = None
            volumne_now = None
            
        
    bottle = Bottle()
    
    return bottle
my_bottle = create_bottle()

print(f"Бутылка объемом {my_bottle.volumne_max} куб. ед, \
сейчас в ней {my_bottle.volumne_now} куб. ед" )

