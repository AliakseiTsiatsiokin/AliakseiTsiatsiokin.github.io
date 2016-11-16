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
	static parseArticlesResponse(response, category){
		let articles = response.articles;
		
		if(articles === undefined){
			return [];
		}
		
		for(let article of articles){
			article.category = category;
		}
		return articles;
	}
}