#used to make http/https requests
import urllib.request, urllib.error

#functin: takes a string text, delets the target, and makes either side of target
#an element of a list; returns list of spit elements
def split_text(text,target):
        words = text.split(target)
        return words
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
        try:
                response = urllib.request.urlopen("https://api.guildwars2.com/v2/commerce/listings/"+itemName)
        except urllib.error.HTTPError as e:
                return
                
        page = response.read()
        #converts type byte into type string
        strPage = page.decode("utf-8")

        strPage.replace("un","")
        #list of words from the page
        lstPage = split_text(strPage,"sells")
        buyList = split_text(lstPage[0]," ")
        buyList = clean(buyList)
        sellList = split_text(lstPage[1]," ")
        sellList = clean(sellList)
        #print(sellList)
        #print(sellList[18])
        


        #checks to see if there are more than 9 buy orders at this price
        if(len(buyList[11]) > 2):
                with open("../itemInfo/"+itemName+"/quantityBuy.txt","a") as myfile:
                        myfile.write(digit(buyList[11])+",")

        #takes the latest price and puts it into the file
                with open("../itemInfo/"+itemName+"/unitPriceBuy.txt","a") as myfile:
                        myfile.write(digit(buyList[9])+",")

        #same thing as the last two file wites but for the sell list

                with open("../itemInfo/"+itemName+"/unitPriceSell.txt","a") as myfile:
                        myfile.write(digit(sellList[6])+",")

                with open("../itemInfo/"+itemName+"/quantitySell.txt","a") as myfile:
                        myfile.write(digit(sellList[8])+",")

        #if the listings aren't high enough, take the next numbers
        else:
                with open("../itemInfo/"+itemName+"/quantity.txt","a") as myfile:
                        myfile.write(digit(buyList[19])+",")


                with open("../itemInfo/"+itemName+"/unitPrice.txt","a") as myfile:
                        myfile.write(digit(buyList[17])+",")
        
                with open("../itemInfo/"+itemName+"/unitPriceSell.txt","a") as myfile:
                        myfile.write(digit(sellList[14])+",")

                with open("../itemInfo/"+itemName+"/quantitySell.txt","a") as myfile:
                        myfile.write(digit(sellList[17])+",")

