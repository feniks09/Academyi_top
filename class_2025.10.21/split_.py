text = "мама, мыла, раму"
text_list = text.split(",")
print(text_list)

words = input("Введите слова: ")
words_list = words.split()
print(words_list)
print(len(words_list))



countres = {7: "Russia"}
number = "+79055485524"
country_cod = int(number[1])
print(country_cod, type(country_cod))
print(countres[country_cod])
