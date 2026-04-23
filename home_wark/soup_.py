import bs4
import requests

# url = 'https://pgexercises.com/questions/basic/'
# print('asd')
# result = requests.get(url)
# with open('home_wark/refer.txt', 'r', encoding='UTF-8') as f:
#     sours=f.read()
print('asdsad')
with open('home_wark/refer_2.txt', 'r', encoding='UTF-8') as f:
    sours=f.read()
soup = bs4.BeautifulSoup(sours, features='html.parser')

# print(soup.text)
# print(soup.contents)
# tag = soup.find('ul', class_='topiclisting')

# topic_linc = [a['href'] for a in tag.find_all('a')]
# ref = "https://pgexercises.com/questions/"
# a = []
# for href in topic_linc:
#     https = f'{ref}{href}'
#     a.append(https)
#     # print(https)
# print(a)
# print(ref + topic_linc[0])

tag = soup.find("table", id= 'exprestable')
print(tag)
line_th = [line.text for line in tag.find_all('th')]
line_td = [line.text for line in tag.find_all('td')]

# print(line_th)
# print(line_td)