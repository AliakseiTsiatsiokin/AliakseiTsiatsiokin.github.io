class Template{
	constructor(selector){
		this.target = document.querySelectorAll(selector);
	}
	render(markup){
		for(let prop of this.target){
			prop.innerHTML += markup;
		}
	}
	clearContainer(){
		for(let prop of this.target){
			prop.innerHTML = '';
		}
	}
	showSpinner(){
		for(let prop of this.target){
			prop.innerHTML = '<img class="spinner" src="./spinner.gif" />';
		}
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
					<h5>${author}</h5>
					<small>${publishedAt}</small>
					<h3>${title}</h3>
					<p>${description}</p>
					${urlToImage ? `<img class="section-image" src=${urlToImage} />` : ``}
					${url ? `<a class="link-learn-more" href=${url} target="_blank">Learn more...</a>` : ``}
				</section>`;
	}
	render(){
		super.render(this.markup);
	}
}