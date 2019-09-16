import time,math,json
import urllib.request as request
import math
from math import floor

response = request.urlopen("https://api.guildwars2.com/v2/commerce/listings")
items = (response.read().decode("utf-8"))
items = json.loads(items)
items = [items[j*200:min((j+1)*200,len(items))] for j in range(math.ceil(len(items)/200))]

paths = []
urls = []
for i in items:
    print(i[0],i[-1])
    try:
        response = request.urlopen("https://api.guildwars2.com/v2/items?ids="+str(i)[1:-1].replace(" ",""))
        apiData = response.read().decode("utf-8")
        apiData = json.loads(apiData)
        for j in apiData:
            if j["icon"] not in urls:
                paths.append(
                    {
                        "id": j["id"],
                        "icon":j["icon"]
                    }
                    )
                urls.append(j["icon"])
    except:
        print("https://api.guildwars2.com/v2/items?ids="+str(i)[1:-1].replace(" ",""))

print("downloading",len(paths),"images")
with open('imagePaths.txt','w') as mf:
    mf.write(str(paths))
