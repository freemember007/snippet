/** show sideMap and mainMap
 * @author: freemem <freemember007@gmail.com>
 * @lib: http://maplacejs.com/
 */
$(function() {
	var i, itemEL;
	var location = {};
	var locations = [];
	var itemEls = $("div.item") ;
	for (i = 0; i < itemEls.length; i++) {
		itemEL = $(itemEls[i]);
		location = {
			lat: itemEL.attr("data-latitude"),
			lon: itemEL.attr("data-longitude"),
			title: itemEL.find('.title > a').text(),
			html: itemEL.find('.title').html(),
			html2: "<div class=\"item\" style=\"width:300px;padding-right:0;border:0;\">" + itemEL.html() + "</div>",
			// icon: 'http://www.google.com/mapfiles/markerA.png',
			icon2: itemEL.find('img').attr('src')
		};
		locations.push(location);
	}

	function initSideMap() {
		new Maplace({
			locations: locations,
			controls_on_map: false,
			map_div: "#J_SideMap"
		}).Load();
	}

	function initMainMap() {
		for (i = 0; i < locations.length; i++) {
			locations[i].html = locations[i].html2;
			locations[i].icon = locations[i].icon2;
		}
		new Maplace({
			locations: locations,
			controls_on_map: true,
			controls_title: '鎸夌敤鎴锋樀绉版煡鐪�',
			view_all: false,
			view_all_text: '鍏ㄩ儴',
			map_div: "#J_MainMap"
		}).Load();
	}
	
	initSideMap();

	$("#J_CityOption:nth-child(2)").click(function() {
		initMainMap();
	})
});
