from bs4 import BeautifulSoup
html = "<html><body><h1 class= 'text'>Привет мир</h1></body></html>"
soup = BeautifulSoup(html, 'html.parser')

print(html)
print(type(soup))

print(soup.find('h1'))

tag = soup.h1
print(tag.get_text())
print(tag.text)

print(tag.name)

print(tag['class'])
print(tag.get('class'))
