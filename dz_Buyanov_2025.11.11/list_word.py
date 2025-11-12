phrases = []
filtered_phrases = []

for i in range(10):
    word_ = input("Введите фразу %i " % (i + 1))
    phrases.append(word_)

N = input("Введите число N ")
N = int(N)
for word_ in phrases:
    long = len(word_)
    if long > N:
        filtered_phrases.append(word_)
        # print(word_)
print(phrases)
print(filtered_phrases)