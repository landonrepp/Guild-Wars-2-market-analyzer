import time,math,json
import urllib.request as request
import math
import urllib.error as err
from math import floor
import queue
import os

with open("imagePaths.txt","r") as mf:
        paths = mf.read().replace("\'","\"")
paths = json.loads(paths)
q = queue.Queue()
for i in paths:
    q.put(i)
print("downloading",q.qsize(),"images")
header = {'user-agent': "Mozilla/5.0"}
opener = request.build_opener()
opener.addheaders = [
    ("accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3"),
    ("accept-encoding", "gzip, deflate, br"),
    ("accept-language", "en-US,en;q=0.9"),
    ("upgrade-insecure-requests", "1"),
    ("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36")
]
request.install_opener(opener)
attempts = 0
dirs = [i.split(".")[0] for i in os.listdir("images")]
print(dirs)
while not q.empty() and attempts<10000:
    i = q.get()
    if str(i["id"]) not in dirs:
        print(i["id"])
        attempts +=1
        try:
            request.urlretrieve(i["icon"],"images/"+str(i["id"])+".png")
        except err.HTTPError as rr:
            print(str(rr) + " : " + str(i))
            q.put(i)
if not q.empty:
    with open('imagePaths.txt','w') as mf:
        mf.write(str(list(paths)))