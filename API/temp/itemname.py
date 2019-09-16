#used to make http/https requests
import urllib.request

#gets rid of empy elements in a list
def clean(index):
        grabber = []
        for i in range(0,len(index)):
                if index[i] != "":
                        grabber.append(index[i])
        return grabber

#searches a string for the target and outputs the target's position
def findTargetPosition(index, target):
        x = index.find(target)
        return x + target.length

def findAveragePrice(index,target):
        price = []
        quantity = 0
        for i in index:
                if(index[i] == "\"unit_price\":"):
                        tempPrice = index[i+1]
                        tempPrice = tempPrice.split(",")
                        price.append(tempPrice[0])
                if(index[i] == "\"quantity\":"):
                        break


def digit(target):
        output = ""
        for i in range(0,len(target)):
                if(target[i].isdigit()):
                   output = output + target[i]     
        return output

def updater(itemName):
        #gets page as type byte
        page = urllib.request.urlopen("http://www.gw2spidy.com/api/v0.9/json/item-search/"+itemName).read()    
        #converts type byte into type string
        strPage = page.decode("utf-8")
        itemlist = strPage.split(",")
        return itemlist[4]
                        

itemname = ['Ancient Wood Plank', 'Bolt of Cotton', 'Bolt of Gossamer', 'Bolt of Jute', 'Bolt of Linen', 'Bolt of Silk', 'Bolt of Wool', 'Bronze Ingot', 'Copper Ingot', 'Cured Coarse Leather Square', 'Cured Hardened Leather Square', 'Cured Rawhide Leather Square', 'Cured Rugged Leather Square', 'Cured Thick Leather Square', 'Cured Thin Leather Square', 'Darksteel Ingot', 'Elder Wood Plank', 'Gold Ingot.png Gold Ingot', 'Green Carved Burl', 'Green Infused Power Core', 'Green Wood Dowel', 'Green Wood Plank', 'Hard Wood Plank', 'Iron Ingot', 'Mithril Ingot', 'Orichalcum Ingot', 'Platinum Ingot', 'Seasoned Wood Plank', 'Silver Ingot.png Silver Ingot', 'Soft Wood Dowel', 'Soft Wood Plank','Steel Ingot', 'Stretched Rawhide Leather Square', 'Carnelian Fragment', 'Emerald Sliver', 'Exquisite Citrine Jewel', 'Ruby Sliver', 'Sapphire Sliver', 'Topaz Sliver']
items = ['19712', '19742', '19746', '19720', '19744', '19747', '19740', '19679', '19680', '19734', '19737', '', '19736', '19735', '19733', '19681', '19709', '', '', '', '19758', '19710', '19711', '19683', '80831', '19685', '19686', '19714', '', '19761', '19713', '19681', '19738', '', '', '', '', '', '',]



#for i in range(0,len(itemname)):
#        items.append(digit(updater(itemname[i])))

templist1 = []
templist2 = []
for i in range(0,len(items)):
        if(items[i] != ""):
                templist1.append(itemname[i])
                templist2.append(items[i])

                
print (templist1)
print (templist2)


