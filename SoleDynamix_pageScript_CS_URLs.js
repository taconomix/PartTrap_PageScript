
	//Adds a description to the condition specific URLs
	$(document).ready(function() {
		
		var path = { 
			site: window.location.origin + '/en/page/',
			type: ['Plantar-Fasciitis', 'Pronation', 'Hammer-Toes', 'Flat-Feet', 'Supination', 'Metatarsalgia', 'Heel-Spurs', 'Bunions', 'Mortons-Neuroma'], 
			page: ['114', '127', '128', '129', '130', '131', '132', '133', '134'],
		}
		
		
		var i = path.page.indexOf($(".page.pt-page-content").attr('data-pageid'));
        var newLink = path.site + path.page[i] + '/' + path.type[i] + '-Relief';
		
		if (window.location.pathname.indexOf(path.type[i]) < 0) 
		{
			window.location.href= newLink;
		}
	});
