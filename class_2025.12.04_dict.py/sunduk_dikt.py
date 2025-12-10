width = int(input("Введитите ширину: "))
length = int(input("Введите длину: "))
depth = int(input("Введит глубиу: "))
condition = input("Введите состояние крышки open/close: ")

# size = {"width" : width, "length" : length, "depth" : depth}

# cap =  {"condition" : condition}
# chest = {
#     "size" : {
#                     "width" : width, 
#                     "length" : length, 
#                     "depth" : depth
#     }, 
#     "cap" : {
#             "condition" : condition
            
#     }
# }


thing = {
        "chest" : 
        {
                "size" : 
                        { 
                            "width" : width,
                            "length" : length,
                            "depth" : depth
                },
                "cap" : 
                        {
                            "condition" : condition
                }

        }
}
# print(size)
# print(cap)
# print(chest)

# print(f"Сундук имеет ширину: {size["width"]}, длину: {size["length"]} и ширину  {size["depth"]}," 
#       f"в настоящее время {cap["condition"]}")

# print(f"Cундук имеет ширину: {chest["size"]["width"]}," 
#                         f"длин: {chest["size"]["length"]}"
#                         f"глубину: {chest["size"]["depth"]}"
# f"и его крышка {chest["cap"]["condition"]}"
#                         )

print(f"Сундук имеет ширину - {thing["chest"]["size"]["width"]}, "
      f"длину - {thing["chest"]["size"]["length"]}, "
      f"глубину - {thing["chest"]["size"]["depth"]}, "
      f"крышка сундука - {thing["chest"]["cap"]["condition"]}")