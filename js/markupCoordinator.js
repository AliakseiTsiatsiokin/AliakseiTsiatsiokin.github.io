class MarkupCoordinator{
	constructor(selector){
		this.controlledItems = document.querySelectorAll(selector);
	}
	show(){
		for(let item of this.controlledItems){
			item.classList.remove('hidden');
		}
	}
	showOnly(filter){
		for(let item of this.controlledItems){
			if(item.matches(filter)){
				item.classList.remove('hidden');
			}
		}
	}
	hide(){
		for(let item of this.controlledItems){
			item.classList.add('hidden');
		}
	}
	hideOnly(filter){
		for(let item of this.controlledItems){
			if(item.matches(filter)){
				item.classList.add('hidden');
			}
		}
	}
}