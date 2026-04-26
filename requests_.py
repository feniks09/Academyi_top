import requests

# response = requests.get("https://mail.ru")
# print(response.headers)

# session = requests.Session()
# response = session.get('https://mail.ru')

# print(response.headers)

with requests.Session() as session:
    response = session.get('https://mail.ru')


print(dir(response))
# print(dir(session))
print(response.text)