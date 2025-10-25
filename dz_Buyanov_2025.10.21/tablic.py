# Ввести товар и его стоимость через "-"
# Вывести на экран вид товара стоимость его
# Вывести итоговую стоимость
answer = input("Введите вид товара и его стоимость, через пробел")
if answer:
    answer_list = answer.split(" ")
    vid_product = answer_list[0]
    cost_product = answer_list[1]

print(("Товар - " + str(vid_product) + "\n")*3, "Стоимость товара -" + str(cost_product))


