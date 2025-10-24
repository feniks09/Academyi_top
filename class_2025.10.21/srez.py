phrase = "Каждый охотник желает знать где сидит его фазан"
phrase_list = phrase.split()
nachalo = phrase_list[:6]
konets = phrase_list[6:]

print(nachalo)
print(konets)

print("Каждый" in phrase_list)
print("охотник" in phrase)
if "желает" in nachalo:
    print(nachalo)

