create table tblOrderStats(
    PRIMARY KEY (orderStatsID) int,
    FOREIGN KEY (itemsID)
    REFERENCES tblItems(itemsID),
    orderNumber INT,
    buyMean REAL,
    buyStdDev REAL,
    sellMean REAL,
    sellStdDev REAL,
)