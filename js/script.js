(() => {
	const APIKEY = '6aa9fae56836443c8046fb41032ea9cb';

	let request = new Request('https://newsapi.org/v1/articles?source=hacker-news&sortBy=top&apiKey=' + APIKEY),
		requestParams = {
			method : 'GET',
			mode : 'cors'
		};
		
	fetch(request, requestParams)
		.then( response => response.json() )
		.then( responseObj => {
			let articles = responseObj.articles,
				sectionTemplate = new NewsSectionTemplate('#newsContainer'),
				container = sectionTemplate.target;
			for(let article of articles){
				sectionTemplate.populateTemplate(
					Adapter.spliceEmptyProperties(article)
				);
				sectionTemplate.render();
			}
		})
		.catch( err => console.log(err) );
	
})();