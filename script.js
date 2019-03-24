$(document).ready(function(){
	var itemList = ['Ancient Wood Plank', 'Bolt of Cotton', 'Bolt of Gossamer', 'Bolt of Jute', 'Bolt of Linen', 'Bolt of Silk', 'Bolt of Wool', 'Bronze Ingot', 'Copper Ingot', 'Cured Coarse Leather Square', 'Cured Hardened Leather Square', 'Cured Rugged Leather Square', 'Cured Thick Leather Square', 'Cured Thin Leather Square', 'Darksteel Ingot', 'Elder Wood Plank', 'Green Wood Dowel', 'Green Wood Plank', 'Hard Wood Plank', 'Iron Ingot', 'Mithril Ingot', 'Orichalcum Ingot', 'Platinum Ingot', 'Seasoned Wood Plank', 'Soft Wood Dowel', 'Soft Wood Plank', 'Steel Ingot', 'Stretched Rawhide Leather Square'];
	var itemId = ['19712', '19742', '19746', '19720', '19744', '19747', '19740', '19679', '19680', '19734', '19737', '19736', '19735', '19733', '19681', '19709', '19758', '19710', '19711', '19683', '80831', '19685', '19686', '19714', '19761', '19713', '19681', '19738'];
	function search(){
		search = document.getElementById("search");
		searchResults = []

		for(i = 0; i<itemList.length;i++){
			temp = itemList[i].slice(0,search.length);
			if(search == temp){
				searchResults.push(itemList[i]);
			}
			if (searchResults.length === 5){
				break;
			}
		}
		return searchResults;
	}

	function pullRequest(itemId) {
		// body...
	}
})
	