class Loader{
	constructor(){
	
		let self = this;
	
		this.private = new Proxy({}, {
			set : function(target, prop, value){
				switch(prop){
					case 'category' : {
						if(target[prop] !== value){
							let allowedValues = ['top', 'latest', 'all'];
							for(let category of allowedValues){
								if(value === category){
									target[prop] = value;
								}
							}
						}
						return target[prop];
					}
					case 'source' : {
						if(target[prop] !== value){
							target[prop] = value;
							self.handleParamChange();
						}
						return target[prop];
					}	
					default : {
						if(target[prop] === undefined){
							target[prop] = value;
						}
						return target[prop];
					}
				}
			},
			deleteProperty : function(target, prop){
				return target[prop];
			},
			defineProperty : function(target, prop){
				return target[prop];
			}
		});
		
		this.sectionTemplate = new NewsSectionTemplate('#newsContainer');
		this.articles = [];

		this.private.apiKey = '6aa9fae56836443c8046fb41032ea9cb';
		this.private.category = 'all';
		this.private.source = 'hacker-news';
	}
	generateUrl(category){
		return `https://newsapi.org/v1/articles?source=${this.private.source}&sortBy=
			${category ? category : this.private.category}&apiKey=${this.private.apiKey}`;
	}
	handleParamChange(){
		this.articles = [];
		this.sectionTemplate.clearContainer();
		this.fetchNews('top', this.setResponse);
		this.fetchNews('latest', this.setResponse);
	}
	fetchNews(category, callback, ...callbackParams){
	
		fetch(new Request(this.generateUrl(category)), {
			method : 'GET',
			mode : 'cors'
		})
		.then( response => response.json() )
		.then(responseObj => {
			this.articles = Adapter.parseArticlesResponse(responseObj, category);
			if(callback){
				callback.call(this, ...callbackParams);
			}
		})
		.catch( err => console.log(err) );
	}
	setResponse(){
		for(let article of this.articles){
			article = Adapter.spliceEmptyProperties(article);
			this.sectionTemplate.populateTemplate(
				article
			);
			this.sectionTemplate.render();
		}
	}
}