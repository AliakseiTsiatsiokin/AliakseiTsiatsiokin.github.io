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
									self.handleCategoryChange();
								}
							}
						
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
		this.private.category = 'top';
	}
	generateUrl(category){
		return `https://newsapi.org/v1/articles?source=hacker-news&sortBy=
			${category ? category : this.private.category}&apiKey=${this.private.apiKey}`;
	}
	handleCategoryChange(){
	
		this.sectionTemplate.showSpinner();
		
		this.articles = [];
	
		switch(this.private.category){
			case 'all' : {
				this.fetchNews('top');
				this.fetchNews('latest', this.setResponse);
				
				break;
			}
			default : {
				this.fetchNews(null, this.setResponse);
			}
		}
	}
	fetchNews(category, callback, ...callbackParams){
	
		this.sectionTemplate.showSpinner();
	
		fetch(new Request(this.generateUrl(category)), {
			method : 'GET',
			mode : 'cors'
		})
		.then( response => response.json() )
		.then( responseObj => {
			this.articles = [...this.articles, ...Adapter.parseArticlesResponse(responseObj)];
			if(callback){
				callback.call(this, ...callbackParams);
			}
		})
		.catch( err => console.log(err) );
	}
	setResponse(){
		this.sectionTemplate.clearContainer();
		for(let article of this.articles){
			this.sectionTemplate.populateTemplate(
				Adapter.spliceEmptyProperties(article)
			);
			this.sectionTemplate.render();
		}
	}
}