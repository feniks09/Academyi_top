things = [3, "dddd", None]

print(f"{things = }")
a = [print]
a[0](things)

things.append(things)

print(things)

namber = things[:]
print(namber)