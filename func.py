def function(a):
    '''это очь крутая функц'''
    # print("Я внутри блока функции", a)
    return a + 1

def sum(b):
    a = 15 + b
    return a

def sum_1():
    b = 4 + 4
    return(b)
c = function(1)
# function(1)
# print(function(1))
# print(15 + function(1))

# print(function(sum(sum_1())))

# print(function(function(function(1))))
print(c)
# print(f"{function(1)=}")

# print('имя', function.__name__)
# # print('имя', __qualname__)
# print('док', function.__doc__)

# print(callable(function))
