""" х должно быть числом"""
x = 10
def espero():
    """x должно быть числом"""
    print("Напечатали", x)

espero()


start_ = "привет"
finish_ = "Пока"
print(start_ + " "*4 + finish_)
# print("*".join([start_, finish_,"как дела"]))
a = ''.join([('*'+"0") for i in range(10)])
print(a)


words = ['кто это', "это он", "что", "выБ"]

long_words = [word for word in words if len(word) > 3]
print(long_words)


cnachalo = "было слово"
potom = "потом код"

rezult = cnachalo, potom
print(type(rezult))
print(cnachalo)
print(potom)
print(rezult, sep= " 8")


a =6
b = 6

c = a + b

print(a)
print(c)

print("1\n2\n3\n4\n5")
print(1, 2, 3, 4, 5, sep="\n")