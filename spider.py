#used to make http/https requests
import urllib.request, urllib.error,json,datetime
from time import gmtime, strftime
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['testDB']

def updater(itemArr,startTime):
    #gets page as type byte
    reqStr = "https://api.guildwars2.com/v2/commerce/prices?ids="+str(itemArr)[1:-1].replace(" ","")
    # print(reqStr)
    buyOrders = []
    sellOrders = []

    
    while True:
        try:
            response = urllib.request.urlopen(reqStr)
            page = response.read()
            #converts type byte into type string
            strPage = page.decode("utf-8")
            page = "" #clear page from ram
            strPage = json.loads(strPage)
            break
        except Exception as exp:
            print(exp)
    for i in range(len(strPage)):
        # for j in range(len(strPage[i]["buys"])):
        #    strPage[i]["buys"][j]["time"] = startTime

        if len(strPage[i]["buys"])>0:
            strPage[i]["buys"]["time"] = startTime
            strPage[i]["buys"]["id"] = strPage[i]["id"]
            buyOrders.append(strPage[i]["buys"])

        # for j in range(len(strPage[i]["sells"])):
        #    strPage[i]["sells"][j]["time"] = startTime

        if len(strPage[i]["sells"])>0:
            strPage[i]["sells"]["time"] = startTime
            strPage[i]["sells"]["id"] = strPage[i]["id"]
            sellOrders.append(strPage[i]["sells"])
    # print(json.dumps(buyOrders, sort_keys= True, indent=4, separators=(',', ': ')))
    db.buyOrders.insert_many(buyOrders)
    db.sellOrders.insert_many(sellOrders)

