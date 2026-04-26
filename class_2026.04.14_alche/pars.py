from bs4 import BeautifulSoup
html = "<html><body><h1 class= 'text title' id='#1323434'>Привет мир</h1><h2 class= 'text'>Привет мир я h2</h2></body></html>"
soup = BeautifulSoup(html, 'html.parser')

tag_h1 = soup.find('h1', class_='text')

print(tag_h1)

print(tag_h1.name)
print(tag_h1.attrs)
print(tag_h1.contents)

tag_html = soup.find('html')
# print(tag_html)
# print(tag_html.contents)
print(tag_html.get_text())

# print(html)
# print(type(soup))

# print(tag.name)

# print(tag['class'])
# print(tag.get('class'))
# print(soup.text)
# print(soup.get_text())
# print(soup)
# print(soup.name)
# print(soup.h1)
# print(soup.h1.name)


# # print(dir(soup.h1.attrs))
# print(soup.h1.attrs)
# print(soup.h1.attrs['class'])
# print(soup.h1.attrs['id'])
# # print(soup.h1.attrs.keys())
# # print(soup.h1.attrs.values())
# # print(soup.h1.attrs.items())
# print(soup.h1['class'])
# print(soup.h1['id'])
# print(soup.h1.get('class'))
# print(soup.h1.keys())
# print(soup.h1['class'])
# print(soup.h1['id'])
# print(soup.h1.get('class'))
# print(soup.h1.get('id'))

# print(soup.h1)
# print(soup.h2)

# print(soup.h1.get_text())
# print(soup.h2.text)

# tag = soup.h1
# tag_2 = soup.h2
# print(tag)
# print(tag_2)

# print(tag.text)
# print(tag_2.get_text())

# print(tag.name)