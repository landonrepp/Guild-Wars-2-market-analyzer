delimiter //
CREATE PROCEDURE getSidebarLines()
BEGIN
    select itm.*,
    buy.quantity as 'buyQuantity',
    buy.unitPrice as 'buyPrice',
    sell.quantity as 'sellQuantity',
    sell.unitPrice as 'sellPrice'
    from tblItems itm 
    inner join tblBuyOrders buy on itm.itemsID = buy.itemsID 
    left join tblSellOrders sell on itm.itemsID = sell.itemsID
    where buy.time = (
        select max(buy2.time) 
        from tblBuyOrders buy2 
        where itemsID = 72)
    and
    sell.time = (
        select max(sell2.time) 
        from tblSellOrders sell2 
        where itemsID = 72);
END//
delimiter ;