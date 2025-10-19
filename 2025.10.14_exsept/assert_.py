# написать задачу которая спрашивает год рождения
# Если возраст отрицательный выбрасывает ошибку

yaer_new = 2025
age = input("Введите возраст: ")
try:
    age = int(age)
    assert age > 0, "Вы еще не родились"
    assert age < 200, "Стока не живут"

except (ValueError, AssertionError) as e:
    print("Возникла ошибка: ", e)
    age = None
if age:
    age_ = yaer_new - age
    print(age_)
