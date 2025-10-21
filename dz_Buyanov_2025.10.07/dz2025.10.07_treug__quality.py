
# Получить данные о сторонах треугольника
# Проверить треугольник на не равенство
# Найти для площадь и периметр для треугольников
# Определить тип треугольника: равностороний, разносторонний, равнобедренный,
# Определить тип треугольника: прямоугольный, остоугольный, тупоугольный   
class TreugError:
    pass
import math


class Treug:

    def __init__(self, a, b, c):
        if a + b <= c or a + c <= b or c + b <= a:
            raise TreugError("треугольник не возможен", str(max(a, b, c)),  "это сторона максимальна")
        self.__a = a
        self.__b = b
        self.__c = c
        #print(self.__a + self.__b + self.__c)
    
    def __str__(self):
        return f"{self.__a}, {self.__b}, {self.__c}"
    
    # Определяем getter для атрибута - a
    def get_a(self):
        return self.__a
    # Определяем getter для атрибута - b
    def get_b(self):
        return self.__b
    # Определяем getter для атрибута  - с
    def get_c(self):
        return self.__c
    # Определяем периметр треугольника
    def perimetr(self):
        return self.__a + self.__b + self.__c
    # Определяем площадь треугольника
    def squer(self):
        p = self.perimetr()
        return math.sqrt(p*(p-self.__a)*(p-self.__b)*(p-self.__c))
    # Определяем тип треугольника(по стороны)
    def tip_treyg_side(self):
        if self.__a == self.__b and self.__a == self.__c:
            print("Треугольник равносторонний")
        elif self.__a == self.__b or self.__b == self.__c or self.__c == self.__a:
            print("Треугольник равнобедренный")
        else:
            print("Треугольник разносторонний")
    # Определяем тип треугольника(по углам)
    def tip_treyg_angle(self):
        if ((self.__a**2) + (self.__b**2)) == self.__c**2:
            print("Прямоугол")
        elif ((self.__a**2) + (self.__b**2)) >= self.__c**2:
            print("остроугол")
        else:
            print("Тупоугол")
    

    

treug_1 = Treug(4,3,5)
print(treug_1.get_a())
print(treug_1.get_b())
print(treug_1.get_c())
print(treug_1.perimetr())
print(treug_1.squer())
treug_1.tip_treyg_side()
treug_1.tip_treyg_angle()