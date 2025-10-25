# Нарисовать только границу поля и пустую середину

print(("O"*10 + "\n") + ("O"+ " "*8 + "O" + "\n")*8
+ ("O"*10 + "\n"))

# Нарисовать только границу поля и пустую середину 
# с использованием цикла

width = 10
height = 10
while height >= 0:
    if height == 10:
        print("O"*width) 
    if height <= 9 and height > 1:      
        print("O"+ " "*(width-2) + "O")
    if height == 0:
        print("O"*width)
    height -= 1
