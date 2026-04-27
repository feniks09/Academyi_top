import bs4
import requests

url = 'https://pgexercises.com/questions/basic/selectall.html'
print('asd')
response = requests.get(url, timeout=10)
print('asdsad')
# print(response.text)
# with open('home_wark/refer_2.txt', 'r', encoding='UTF-8') as f:
#     sours=f.read()
soup = bs4.BeautifulSoup(response.text, features='html.parser')
tag = soup.find("table")
# print(tag)
# print(tag.name)
# print(tag.attrs['class'])
tag_th = tag.find_all('th')
tag_td = tag.find_all('td')
# print(tag_th)
# th_s = []
# for th in tag_th:
#     # print(th.get_text())
#     th_s.append(th.get_text())
# print(th_s)
# print([line.get_text() for line in tag_th])
# print([line.get_text() for line in tag_td])

tag_tr_td = soup.find_all('tr')
# print(tag_tr_td)
# print([row.find('td') for row in tag_tr_td])
rows = [row.find('td') for row in tag_tr_td]

# print(tag_th.get_text())
# print(tag.contents)
# print(tag.get_text())
# # print(soup.text)
# print(soup.contents)
tag = soup.find('ul', class_='topiclisting')

topic_linc = [a['href'] for a in tag.find_all('a')]
ref = "https://pgexercises.com/questions/"
a = []
for href in topic_linc:
    https = f'{ref}{href}'
    a.append(https)
    # print(https)
print(a)
print(ref + topic_linc[0])

tag = soup.find("table", id= 'exprestable')
print(tag)
line_th = [line.text for line in tag.find_all('th')]
line_td = [line.text for line in tag.find_all('td')]

print(line_th)
print(line_td)