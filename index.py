import spider, time, createPages,math,json
import urllib.request as request
import math

response = request.urlopen("https://api.guildwars2.com/v2/commerce/listings")
items = (response.read().decode("utf-8"))
items = json.loads(items)
items = [items[j*200:min((j+1)*200,len(items))] for j in range(math.ceil(len(items)/200))]


while True:
    tTime = time.time()
    for item in items:
        # print("from",item[0],"to",item[-1])
        spider.updater(item,tTime)

    time.sleep(min(0,1200-max((time.time()-tTime),0)))
