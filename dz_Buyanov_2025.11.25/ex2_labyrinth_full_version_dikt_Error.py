# ## Проименованные символы, что есть что на карте
CELL_EMPTY_FLOOR = "."
CELL_VOID = "x"
CELL_WALL = "#"
CELL_PLAYER = "@"

# ## "Тело" лабиринта, карта местности
_ = CELL_EMPTY_FLOOR # Эти переменные-всевдонимы для удобства рисования карты
x = CELL_VOID
W = CELL_WALL

maze_cells = [
    [_,_,_,_,_,_,_,x,x,_,_,_,],
    [_,W,W,_,W,W,_,_,_,_,_,_,],
    [_,W,_,_,_,W,_,_,_,_,_,x,],
    [_,W,_,_,_,W,_,_,_,_,x,x,],
    [_,W,W,W,W,W,_,_,x,_,_,x,],
    [_,_,_,_,_,_,_,x,x,_,_,_,],
    [_,_,_,_,x,x,x,x,x,x,_,_,],
]
del _ # Эти переменные-всевдонимы больше не нужны, удаляем
del W
del x
maze_height = len(maze_cells)
maze_width = len(maze_cells[0])
# ## Переменные, описывающие игрока (игрового персонажа)
player_y = 2  # Положение по высоте
player_x = 3  # Положение по ширине
player_dy = 0  # Намерения о смещении по вертикали
player_dx = 0  # Намерения о смещении по горизонтали

# ## Технические переменные
is_game_play = True

Error = {
    "Error_out_fild" : False,
    "Error_barrier" : False,
    "Error_input" : False
    }
Error_print =  {
    "Error_out_fild" : "[!] Нельзя выйти за пределы карты",
    "Error_barrier" : "[!] Нельзя пройти сквозь препятствие",
    "Error_input" : "[!] Вы ввели не верную команд"
    }
count = 0
# ## Основной цикл приложения
while is_game_play:
    #-- Отрисовка --#
    # "Очистка" экрана
    print("\n" * 100)

    # Отрисовка лабиринта
    for y, cells_line in enumerate(maze_cells):
        for x, cell in enumerate(cells_line):
            if y == player_y and x == player_x:
                print(CELL_PLAYER, end=" ")
            else:
                print(cell, end=" ")
        print()

    print("\n счетчик ходов равен %i \n" % count)

    if Error["Error_out_fild"]:
        print(Error_print["Error_out_fild"])
    if Error["Error_barrier"]:
        print(Error_print["Error_barrier"])
    if Error["Error_input"]:
        print(Error_print["Error_input"])

    # Отрисовка текста меню и пояснений
    print(
        "\n"
        "a - шаг влево   w - шаг вверх\n"
        "d - шаг вправо  s - шаг вниз\n"
        "   0 - выход из программы\n"
        "\n"
        ">>> ",
        end=""
    )

    #-- Ввод --#
    player_action = input().strip()  # strip для удаления внешних пробельных символов

    #-- Основная логика --#
    # Очистка намерения двигаться, оставшегося с прошлой итерации
    player_dx = 0
    player_dy = 0
    # Обновляем флажек ошибок ввода команд
    Error["Error_input"] = False

    # Разбор пользовательского ввода
    if player_action == "0":
        is_game_play = False
    elif player_action == "a":
        player_dx = -1
    elif player_action == "d":
        player_dx = 1
    elif player_action == "w":
        player_dy = -1
    elif player_action == "s":
        player_dy = 1
    else:
        Error["Error_input"] = True

    # Обработка намерения двигаться.
    # Желаемое новое положение игрока
    player_new_x = player_x + player_dx
    player_new_y = player_y + player_dy

    # Проверки на невозможность движения
    is_player_x_correct = 0 <= player_new_x < maze_width
    is_player_y_correct = 0 <= player_new_y < maze_height
    is_player_inside_maze = is_player_x_correct and is_player_y_correct

    # Сброс ошибки выхода за пределы поля и прохода через преграду
    Error["Error_out_fild"] = False
    Error["Error_barrier"] = False
    # Проверка выхода за пределы
    if not is_player_inside_maze:
        player_new_x = player_x  # Сброс в исходную позицию
        player_new_y = player_y
        Error["Error_out_fild"] = True


    # Проверка преград на пути

    if maze_cells[player_new_y][player_new_x] != CELL_EMPTY_FLOOR:
        player_new_x = player_x  # Сброс в исходную позицию
        player_new_y = player_y
        Error["Error_barrier"] = True

    # Осуществление перемещения
    # if player_x >= 0 and player_y >= 0:
    player_x = player_new_x
    player_y = player_new_y
    # Подсчет реального перемещения играка, намерения пройти через стену 
    # и выйти за границу поля не считаются 
    if not Error["Error_out_fild"] and not Error["Error_barrier"] and not Error["Error_input"]:
        count += 1

    

