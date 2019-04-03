import spider, time,math,json
import urllib.request as request
import math
from math import floor

response = request.urlopen("https://api.guildwars2.com/v2/commerce/listings")
items = (response.read().decode("utf-8"))
items = json.loads(items)
items = [items[j*200:min((j+1)*200,len(items))] for j in range(math.ceil(len(items)/200))]


while True:
    spider.openCon()
    
    tTime = time.gmtime()
    strtTime = time.time()
    for item in items:
        print("from",item[0],"to",item[-1])
        while not spider.updater(item,tTime):
            print("error")
            pass

    spider.closeCon()
    time.sleep(int(max(0,1200-max((time.time()-strtTime),0))))
