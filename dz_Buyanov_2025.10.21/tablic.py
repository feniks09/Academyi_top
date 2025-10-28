# Ввести товар и его стоимость через "-"
# Вывести на экран вид товара стоимость его
# Вывести итоговую стоимость
answer = input("Введите вид товара и его стоимость, через пробел: ")
if answer:
    answer_list = answer.split(" ")
    vid_product = answer_list[0]
    cost_product_1 = answer_list[1]
    cost_productes = int(cost_product_1)*3


print(("Товар - " + str(vid_product) + ", стоимость одного: " + cost_product_1 + "\n" )*3,\
"Стоимость всех товаров -" + str(cost_productes))



# Ввести товар и его стоимость через "-"
# Вывести на экран вид товара стоимость его
# Вывести итоговую стоимость
# a = 3
# dict_1 = {}
# while a > 0:
#     answer = input("Введите вид товара и его стоимость, через пробел")
#     if answer:
#         answer_list = answer.split(" ")
#         dict_1["вид продукта"] = answer_list[0]
#         dict_1["стоимость"] = answer_list[1]
        
#     a -= 1
#     # print(("Товар - " + str(vid_product) + "\n")*3, "Стоимость товара -" + str(cost_product))
# print(dict_1)
