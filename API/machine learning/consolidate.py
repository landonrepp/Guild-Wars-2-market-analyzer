from glob import glob
import json
import csv
from itertools import zip_longest as zip
import numpy as np

def filename(x):
    return x.replace('./exportFiles\\','').replace('.json','')

files = glob("./exportFiles/*")
# li = [int(filename(i)) for i in files]
# li.sort()
# print(li)

with open("buyOrders.csv","a") as mf:
    for i in files:
        with open(i,"r") as mf2:
            data = np.array([j["buyPrice"] for j in json.loads(mf2.read())])
            if np.std(data) > 200:
                # print(np.std(data))
                mf.write(filename(i)+','+','.join([str(d) for d in data])+'\n')

a = zip(*csv.reader(open("buyOrders.csv", "r")))
csv.writer(open("buyOrdersT.csv", "w")).writerows(a)

