input_size_area = input("Введите размер поля в формате 7х8: ")
if input_size_area:
    size_area_list = input_size_area.split("x")
    print(size_area_list)
try:
    area_width = int(size_area_list[0])
    area_height = int(size_area_list[1])
except ValueError:
    print("Вы ввели не число, а", size_area_list)

while area_height > 0:
    print("o" * area_width)
    area_height -= 1