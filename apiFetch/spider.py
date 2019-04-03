import pymysql as pms
import urllib.request, urllib.error,json,datetime
from time import gmtime, strftime,strftime



global con
global cur

def openCon():
    global con
    global cur

    con = pms.connect(
    host="localhost",
    user="landonrepp",
    passwd="Ilike0909",
    db="gw2"
    )
    cur = con.cursor()

def closeCon():
    global con
    con.close()

def updater(itemArr,startTime):
    startTime = strftime("%Y-%m-%d %H:%M:%S",startTime)
    global con
    global cur
    #gets page as type byte
    reqStr = "https://api.guildwars2.com/v2/commerce/prices?ids="+str(itemArr)[1:-1].replace(" ","")
    # print(reqStr)

        
    try:
        response = urllib.request.urlopen(reqStr)
        page = response.read()
        #converts type byte into type string
        strPage = page.decode("utf-8")
        page = "" #clear page from ram
        strPage = json.loads(strPage)
    except Exception as exp:
        print(exp)
        return False
    buyOrders = [(i["id"],i["buys"]["quantity"],i["buys"]["unit_price"],startTime) for i in strPage]
    sellOrders = [(i["id"],i["sells"]["quantity"],i["sells"]["unit_price"],startTime) for i in strPage]
    #TTD: PUT ITEMS ID INTO THIS
    insert_statement = "INSERT INTO tblBuyOrders (itemsID,quantity,unitPrice,time) values (%s,%s,%s,%s)"
    cur.executemany(insert_statement,buyOrders)
    insert_statement = "INSERT INTO tblSellOrders (itemsID,quantity,unitPrice,time) values (%s,%s,%s,%s)"
    cur.executemany(insert_statement,sellOrders)
    con.commit()
    return True