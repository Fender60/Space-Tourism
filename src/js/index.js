const burger = document.querySelector('.header__burger');
const mobileMenu = document.querySelector('.header__list');
const menuLinks = document.querySelectorAll('.header__link a');

//open/close burger menu
burger.addEventListener('click', function(e){
	document.body.classList.toggle('_lock');
	burger.classList.toggle('active');
	mobileMenu.classList.toggle('active');
});

//Change style active link
const activeLink = (links, callback) => {
	for(let i = 0; i < links.length; i++) {
		links[i].addEventListener('click', function(event) {
			if(links[i].getAttribute('href') === '#') {
				event.preventDefault();
			}
			if(!links[i].classList.contains('active')) {
				links.forEach(element => element.classList.remove('active'));
				links[i].classList.add('active');
				if(typeof callback === 'function') {
					callback({
						text: links[i].textContent.trim(),
						className: links[i].className
					 });
				}
			}
		});
	}
};
activeLink(menuLinks);
