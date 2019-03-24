delimiter //
CREATE PROCEDURE getHotItems()
BEGIN
SELECT itemsID from tblItems where blnCraftable = 1;
END//

delimiter ;