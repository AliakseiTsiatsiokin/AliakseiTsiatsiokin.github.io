class Template{
	constructor(selector){
		this.target = document.querySelectorAll(selector);
	}
	render(markup){
		for(let prop of this.target){
			prop.innerHTML += markup;
		}
		return this;
	}
	clearContainer(){
		for(let prop of this.target){
			prop.innerHTML = '';
		}
		return this;
	}
	pasteError(errorMessage){
		this.markup += `<section><p>${errorMessage}</p></section>`;
		return this;
	}
}

class NewsSectionTemplate extends Template{
	constructor(selector){
		super(selector);
	}
	populateTemplate({
		author = 'Unknown author',
		publishedAt = 'No publish date',
		title = 'Untitled',
		description = 'No description provided',
		category,
		urlToImage,
		url
	} = {}){
		this.markup = `<section class="panel theme-white allCategory ${category}Category">
					<h5 class="panel-header no-margin-top">${author}</h5>
					<small class="panel-date">${publishedAt}</small>
					<h3 class="panel-title">${title}</h3>
					<p>${description.length <= 100 ? description : `${description.slice(0, 100)}...`}</p>
					${urlToImage ? `<img class="section-image" src=${urlToImage} />` : ``}
					${url ? `<a class="link-learn-more" href=${url} target="_blank">Learn more...</a>` : ``}
				</section>`;
		return this;
	}
	render(){
		super.render(this.markup);
		return this;
	}
}