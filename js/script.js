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
				container = document.getElementById('newsContainer');
			for(let article of articles){
				container.innerHTML += NewsSectionTemplate.populateTemplate(
					Adapter.spliceEmptyProperties(article)
				);
			}
		})
		.catch( err => console.log(err) );
	
})();

class NewsSectionTemplate{
	constructor(){}
	static populateTemplate({
		author = 'Unknown author',
		publishedAt = 'No publish date',
		title = 'Untitled',
		description = 'No description provided',
		urlToImage,
		url
	} = {}){
		return `<section class="panel theme-white">
					<h5>${author}</h5>
					<small>${publishedAt}</small>
					<h3>${title}</h3>
					<p>${description}</p>
					${urlToImage ? `<img class="section-image" src=${urlToImage} />` : ``}
					${url ? `<a class="link-learn-more" href=${url} target="_blank">Learn more...</a>` : ``}
				</section>`;
	}
}

class Adapter{
	constructor(){}
	static spliceEmptyProperties(object){
		let splicedObj = {};
		
		let generator = function* (){
			let objKeys = Object.keys(this);
			for(let key of objKeys){
				if(this[key] !== null && this[key] !== undefined){
				  yield key;
				}
			}
		}
		
		object[Symbol.iterator] = generator;

		for(let key of object){
			splicedObj[key] = object[key];
		}
		
		return splicedObj;
	}
}