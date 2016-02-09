from bs4 import BeautifulSoup
#import csv


import urllib
r = urllib.urlopen('http://www.glastonberrygrove.net/texts/script8.html').read()
soup = BeautifulSoup(r, 'html.parser')

str.format(soup.prettify())
