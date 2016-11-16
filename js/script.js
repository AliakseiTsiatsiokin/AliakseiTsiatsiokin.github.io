(() => {

	let loader = new Loader(),
		navBar = document.getElementById('navigation'),
		searchDropdown = document.getElementById('search');
		
	navBar.addEventListener('click', (event) => {
		event.preventDefault();
		let target = event.target, 
			categoryToShow = target.getAttribute('data-cat');
			
		if(target.matches('.nav-list a:not(.selected)')){
		
			let sectionsCoordinator = new MarkupCoordinator('#newsContainer section');
		
			document.querySelector('.nav-list .selected').classList.remove('selected');
			target.classList.add('selected');
			sectionsCoordinator.hide();
			sectionsCoordinator.showOnly(`.${categoryToShow}Category`);
		}
	});

	searchDropdown.addEventListener('change', (event) => {
		loader.private.source = event.target.value;
	});
	
})();