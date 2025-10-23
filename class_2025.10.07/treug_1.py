# Получить от пользователя стороны треугольника
# Написать класс, который умеет вычислять площадь, петриметр и т.д.
# определять тип треугольника

import math


class TriangleInequalityError(ValueError):
    pass

# Неравенство тругольника

class Triangle:
    
    def __init__ (self, a, b, c):
        if a + b <= c or a + c <= b or b + c <= a:
            raise TriangleInequalityError(
                'Не выполнено неравенство треугольника: ' + str(
                    max(a, b, c)) + ' больше чем две другие')
        self.__a = a
        self.__b = b
        self.__c = c

    def __str__(self):
        return f"{self.__a}, {self.__b}, {self.__c}"

    def perimeter(self):
        return self.__a + self.__b + self.__c

    def sqare(self):
        p2 = self.perimeter()
        return math.sqrt(p2 * (p2 - self.a) * (p2 - self.b) * (p2 - self.c))

    @property
    def a(self):
        return self.__a
        
    @property
    def b(self):
        return self.__b
        
    @property
    def c(self):
        return self.__c
        

tri_1 = Triangle(2, 6, 5) 
print(tri_1.perimeter())
print(tri_1.sqare())
print(tri_1.a)








