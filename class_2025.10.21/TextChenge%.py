name = "Василий"
year = 2025
age = 35
love = 99.999999
# text = "Поздравляю тебя %s c днем рождения желаю тебе %s успехов по жизни \n\
# в этом %i году Вам исполняется %i лет, дарим вам %f любви"

# print(text % (name, name, year, age, love))

text = "Поздравляю тебя %(name)s c днем рождения желаю тебе %(name)10s успехов по жизни \n\
в этом %(year)i году Вам исполняется %(age)i лет, дарим вам %(love)f любви"

print(text % ({"name" : name, "year" : year, "age" : age, "love" : love}))


name = input("Какт Вас зовут:")
age = float(input("сколько Вам лет:"))

answer = "Я %(name)s мне %(age)01.0f лет"

print(answer % ({"name" : name, "age" : age}))


