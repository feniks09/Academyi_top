http_ = "https://github.com/feniks09/Academyi_top/commits/main/"
if http_.startswith("https://"):
    print(http_)
print(http_.startswith("https://"))
http = "https://yandex.ru/"
if http.endswith(".ru/"):
    print(http)
adres = http_.split('/')
print(adres)

adres_new = "/".join(adres)
print(adres_new)