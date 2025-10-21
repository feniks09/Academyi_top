class My_discount_Error(ValueError):
    pass
def prise_fin(prise, discont):
    if discont < 0:
        raise ValueError("Скидка ничтожно мала")
    if discont > 1:
        raise My_discount_Error("Значение превышает валидное")
    new_price = prise*(1-discont)
    return new_price
try:
    a = prise_fin(100, 1.3)
    print(a)
except My_discount_Error as e:
    print(f"Произошла супер специальная ошибка {e}")
except ValueError as e:
    print(f"Произошла супер специальная ошибка {e}")
print("Идем дальше")

class Treyg:
    def __init__(self, a, b, c):
        self.a = a
        self.b = b
        self.c = c
    def print_(self):
        a = self.a + self.b + self.c
        print(self.a)
    def tip_treyg(self):
        if self.a == self.b and self.a == self.c:
            print("Треугольник равносторонний")
        elif self.a == self.b or self.b == self.c or self.c == self.a:
            print("Треугольник равнобедренный")
        #elif  self.a == self.b and self.a != self.c:
        #    print("Треугольник равнобедренный")
        #elif self.b == self.c and self.b != self.a:
        #    print("Треугольник равнобедренный")
        #elif self.c == self.a and self.c != self.b:
        #    print("Треугольник равнобедренный")
        #elif self.a != self.b or self.a != self.c or self.b != self.c:
            #print("Треугольник разносторонний")
        else:
            print("Треугольник разносторонний")

    def tip_treyg_pf(self):
        if ((self.a**2) + (self.b**2)) == self.c**2:
            print("Прямоугол")
        elif ((self.a**2) + (self.b**2)) >= self.c**2:
            print("остроугол")
        else:
            print("Тупоугол")


treyg_1 = Treyg(3, 4, 3)
treyg_1.print_()
treyg_1.tip_treyg()
treyg_1.tip_treyg_pf()
