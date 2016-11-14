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
	showSpinner(){
		for(let prop of this.target){
			prop.innerHTML = `<img class="spinner" src="./spinner.gif" />`;
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
		urlToImage,
		url
	} = {}){
		this.markup = `<section class="panel theme-white">
					<h5 class="panel-header">${author}</h5>
					<small class="panel-date">${publishedAt}</small>
					<h3 class="panel-title">${title}</h3>
					<p>${description}</p>
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