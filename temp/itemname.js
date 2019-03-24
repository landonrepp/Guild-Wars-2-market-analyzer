function getItemID(itemName) {
var myUrl = "http://www.gw2spidy.com/api/v0.9/json/item-search/"+itemName+"/1";
var jsonData = UrlFetchApp.fetch(myUrl);
var jsonString = jsonData.getContentText();
var jsonObject = JSON.parse(jsonString);

if(jsonObject == undefined)
  return "problem with parsing: " + jsonString;

if(jsonObject.count == 0)
  return -1;

var dataID = null;  
var last_page = jsonObject.last_page;
var page;
for(page = 1; page <= last_page && dataID==null; page++) {
  var myUrl = "http://www.gw2spidy.com/api/v0.9/json/item-search/"+itemName+"/"+page;
  var jsonData = UrlFetchApp.fetch(myUrl);
  var jsonString = jsonData.getContentText();
  var jsonObject = JSON.parse(jsonString);
  var results = jsonObject.results;

  var i, len = results.length;
  for(i = 0; i < len && dataID==null; i++) {
    var data = results[i];
    if(data.name == itemName)
      dataID = data.data_id;
  }
  Utilities.sleep(2000);  
}
return dataID;
}

itemname = ['Ancient Wood Plank', ' Bolt of Cotton', ' Bolt of Gossamer', ' Bolt of Jute', ' Bolt of Linen', ' Bolt of Silk', ' Bolt of Wool', ' Bronze Ingot', ' Copper Ingot', ' Cured Coarse Leather Square', ' Cured Hardened Leather Square', ' Cured Rawhide Leather Square', ' Cured Rugged Leather Square', ' Cured Thick Leather Square', ' Cured Thin Leather Square', ' Darksteel Ingot', ' Elder Wood Plank', ' Gold Ingot.png Gold Ingot', ' Green Carved Burl', ' Green Infused Power Core', ' Green Wood Dowel', ' Green Wood Plank', ' Hard Wood Plank', ' Iron Ingot', ' Mithril Ingot', ' Orichalcum Ingot', ' Platinum Ingot', ' Seasoned Wood Plank', ' Silver Ingot.png Silver Ingot', ' Soft Wood Dowel', ' Soft Wood Plank', ' Steel Ingot', ' Stretched Rawhide Leather Square', ' Carnelian Fragment', ' Emerald Sliver', ' Exquisite Citrine Jewel', ' Ruby Sliver', ' Sapphire Sliver', ' Topaz Sliver', ' Ancient Wood Plank', ' Bolt of Cotton', ' Bolt of Gossamer', ' Bolt of Jute', ' Bolt of Linen', ' Bolt of Silk', ' Bolt of Wool', ' Bronze Ingot', ' Copper Ingot', ' Cured Coarse Leather Square', ' Cured Hardened Leather Square', ' Stretched Rawhide Leather Square', ' Cured Rugged Leather Square', ' Cured Thick Leather Square', ' Cured Thin Leather Square', ' Darksteel Ingot', ' Elder Wood Plank', ' Gold Ingot', ' Mortar Seed Turret', ' Green Infused Power Core', ' Green Wood Dowel', ' Green Wood Plank', ' Hard Wood Plank', ' Iron Ingot', ' Mithril Ingot', ' Orichalcum Ingot', ' Platinum Ingot', ' Seasoned Wood Plank', ' Silver Ingot', ' Soft Wood Dowel', ' Soft Wood Plank', ' Steel Ingot', ' Stretched Rawhide Leather Square']
itemid = []

for(i=0;i<itemname.length;i++){
  itemid.append(getItemID(itemname.i))
}

console.log(getItemID())

itemname = ['Ancient Wood Plank', 'Bolt of Cotton', 'Bolt of Gossamer', 'Bolt of Jute', 'Bolt of Linen', 'Bolt of Silk', 'Bolt of Wool', 'Bronze Ingot', 'Copper Ingot', 'Cured Coarse Leather Square', 'Cured Hardened Leather Square', 'Cured Rawhide Leather Square', 'Cured Rugged Leather Square', 'Cured Thick Leather Square', 'Cured Thin Leather Square', 'Darksteel Ingot', 'Elder Wood Plank', 'Gold Ingot.png Gold Ingot', 'Green Carved Burl', 'Green Infused Power Core', 'Green Wood Dowel', 'Green Wood Plank', 'Hard Wood Plank', 'Iron Ingot', 'Mithril Ingot', 'Orichalcum Ingot', 'Platinum Ingot', 'Seasoned Wood Plank', 'Silver Ingot.png Silver Ingot', 'Soft Wood Dowel', 'Soft Wood Plank','Steel Ingot', 'Stretched Rawhide Leather Square', 'Carnelian Fragment', 'Emerald Sliver', 'Exquisite Citrine Jewel', 'Ruby Sliver', 'Sapphire Sliver', 'Topaz Sliver', 'Ancient Wood Plank', 'Bolt of Cotton', 'Bolt of Gossamer', 'Bolt of Jute', 'Bolt of Linen', 'Bolt of Silk', 'Bolt of Wool', 'Bronze Ingot', 'Copper Ingot', 'Cured Coarse Leather Square', 'Cured Hardened Leather Square', 'Stretched Rawhide Leather Square', 'Cured Rugged Leather Square', 'Cured Thick Leather Square', 'Cured Thin Leather Square', 'Darksteel Ingot', 'Elder Wood Plank', 'Gold Ingot', 'Mortar Seed Turret', 'Green Infused Power Core', 'Green Wood Dowel', 'Green Wood Plank', 'Hard Wood Plank', 'Iron Ingot', 'Mithril Ingot', 'Orichalcum Ingot', 'Platinum Ingot', 'Seasoned Wood Plank', 'Silver Ingot', 'Soft Wood Dowel', 'Soft Wood Plank', 'Steel Ingot', 'Stretched Rawhide Leather Square']


for i in range(0,len(itemname)):
        templist = itemname[i].split(" ")
        tempstr = ""
        for j in range(0,len(templist)):      
                tempstr = tempstr +"%"+ templist[j]
        itemname[i] = tempstr
print(itemname)