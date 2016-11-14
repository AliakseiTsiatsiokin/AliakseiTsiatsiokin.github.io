(() => {
	
	let loader = new Loader();
	document.getElementById('navigation').addEventListener('click', (event) => {
		event.preventDefault();
		let target = event.target;
		if(target.matches('.nav-list a')){
			loader.private.category = target.getAttribute('data-cat');
		}
	});

	document.getElementById('search').addEventListener('change', (event) => {
		loader.private.source = event.target.value;
	});
	
})();