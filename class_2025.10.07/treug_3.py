
class Treug2:

    def __init__(self, a, b, c):
        if a + b <= c or a + c <= b or c + b <= a:
            raise ValueError("Вышла ошибочка " + str(max(a, b, c)))
        self.__a = a
        self.__b = b
        self.__c = c
        # print(self.__a + self.__b + self.__c)
    
    @property    
    def get_a(self):
        return self.__a
    @property
    def get_b(self):
        return self.__b
    @property
    def get_c(self):
        return self.__c
    
    def perim(self):
        p = self.__a + self.__b + self.__c

        
        return p
treug_1 = Treug2(3, 4, 5)

print(treug_1.get_a)
print(treug_1.get_b)
print(treug_1.get_c)
print(treug_1.perim())



