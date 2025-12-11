def create_bottle():

    class Botella:
        pass

    bottle = Botella()
    bottle.volumne_max = 4
    bottle.volumne_now = "пустая"

    return bottle
my_bottle = create_bottle()
print(f"Бутылка объемом {my_bottle.volumne_max} куб. ед, \
сейчас она {my_bottle.volumne_now}" )

