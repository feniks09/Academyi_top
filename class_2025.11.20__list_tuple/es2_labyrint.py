
CELL_EMPTY_FLOOR = "."
CELL_VOID = " "
CELL_WALL = "#"
CELL_PLAYER = "@"

x = CELL_VOID
W = CELL_WALL
_ = CELL_EMPTY_FLOOR
maze_cells = [
    [_,_,_,_,_,_,x,x,_,_,],
    [_,_,_,_,_,_,_,_,_,_,],
    [_,_,W,W,_,W,W,_,x,_,],
    [_,_,W,_,_,_,W,W,W,_,],
    [_,_,W,_,_,_,_,_,W,_,],
    [_,_,W,_,_,_,_,_,W,_,],
    [_,_,W,_,_,_,W,W,W,_,],
    [_,_,W,W,W,W,W,_,_,_,],
    [_,_,_,_,_,x,x,_,_,_,],
    [_,_,_,_,_,_,_,_,_,_,]
]
del _
del W
del x
maze_height = len(maze_cells)
maze_width = len(maze_cells[0])

player_y = 4 # Положение по высоте
player_x = 0 # Положение по ширине
player_dy = 0 # намерение о смещении по вертикале
player_dx = 0 # намерение о смещении по горизонтали

is_game_player = True

while is_game_player:
    ## отрисовка ##
    # очистка экрана
    print("\n" * 100)

    # отрисовка лабиринта
    for y, cells_line in enumerate(maze_cells):
        for x, cell in enumerate(cells_line):
            if x == player_x and y == player_y:
                print(CELL_PLAYER, end = " ")
            else:
                print(cell, end = " ")
        print()
    
    pass
    is_game_player = False

