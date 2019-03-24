# the goal of this class is to take index.html, copy it, and edit it. This should be called
#immediately after spider.
import os
def copyFile(itemId):
	#if this file exists, delete it
	if os.path.exists("../itemInfo/"+itemId+"/index.html"):
		os.remove("../itemInfo/"+itemId+"/index.html")

	#turn the template file into a string. we manipulate it in the next few lines
	with open('../server/template.html','r') as myfile:
		file = myfile.read();
		myfile.close();

	#two arrays to quickly add the required values to the file
	filePaths = ['/quantityBuy.txt','/quantitySell.txt','/unitPriceSell.txt','/unitPriceBuy.txt'];
	searchTargets = ['<div id = "sellprice">','<div id = "sellquant">','<div id = "buyprice">','<div id = "buyquant">']

	for i in range(0,len(filePaths)):
		with open("../itemInfo/"+itemId+""+filePaths[i]) as myfile:
			#temp is a list of numbers found in the itemInfo folder
			temp = myfile.read();
			myfile.close()
		#if the filepaths[i] exists in the string, add temp values to it
		if file.find(searchTargets[i]) == -1:
			print("-1");
			return;
		else:
			file = file.replace(searchTargets[i], searchTargets[i]+""+ temp);
	file = file.replace(",</div>","<div>");

	#print(file);
	
	with open("../itemInfo/"+itemId+"/index.html",'a') as myfile:
		myfile.write(file);
		myfile.close();