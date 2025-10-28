dict_1 = {}
answer = input("Введите вид товара и его стоимость, через пробел")
if answer:
    answer_list = answer.split(" ")
    dict_1["вид продукта"] = answer_list[0]
    dict_1["стоимость"] = answer_list[1]
# dict_1["продукт"] = "ghrgfhr"
# dict_1["продукт_"] = "duhfeuwhf"
# dict_1.clear()
print(dict_1)