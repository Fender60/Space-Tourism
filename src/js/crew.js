
const informationButtons = document.querySelectorAll('.team__information-buttons button');
const role = document.querySelector('.team__information-role');
const personName = document.querySelector('.team__information-name');
const bio = document.querySelector('.team__information-bio');
const image = document.querySelector('.team__picture img');
let pagesData;


//slider
let startX = 0;
let endX = 0;
let currentIndex = 0;
let isSwipe = false;

const slider = document.querySelector('.team__information');
const loadSlide = (index) => {
	if (index < 0 || index === informationButtons.length) return;
		const elements = [...informationButtons];
		currentIndex = index;
		elements.forEach(element => element.classList.remove('active'));
		elements[index].classList.add('active');
		updateContent(pagesData[index]);
}
const changeSlide = (direction) => {
		if (direction === 'left') {
			loadSlide(currentIndex + 1);
		} else if (direction === 'right') {
			loadSlide(currentIndex - 1);
		}
}

slider.addEventListener('touchstart', (e) => {
	startX = e.touches[0].clientX;
	isSwipe = false; 
});

slider.addEventListener('touchmove', (e) => {
	endX = e.touches[0].clientX;

	if (Math.abs(endX - startX) > 10) {
		isSwipe = true;
	}
});

slider.addEventListener('touchend', () => {
	if (!isSwipe) {
		return;
	}

	const deltaX = endX - startX;

	if (Math.abs(deltaX) > 50) {
		if (deltaX < 0) {
			changeSlide('left'); 
		} else {
			changeSlide('right');
		}
	}
});

//get data
async function fetchDataAndProcess() {
	try {
	const response = await fetch('../data.json');
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	const data = await response.json();
	pagesData = data.crew;
	changeContent(pagesData);
	} catch (error) {
	console.error('Error:', error);
	}
 }

 fetchDataAndProcess();


const changeContent = (pagesData) =>{
	activeLink(informationButtons, (classButton) => {
		
		switch(classButton.className) {
			case 'douglas active':
				updateContent(pagesData[0]);
				currentIndex = 0;
				break;
			case 'mark active':
				updateContent(pagesData[1]);
				currentIndex = 1;
				break;
			case 'victor active':
				updateContent(pagesData[2]);
				currentIndex = 2;
				break;
			case 'anousheh active':
				updateContent(pagesData[3]);
				currentIndex = 3;
				break;
		}
	});
};

function updateContent(pagesData) {
	const personPicture = document.querySelector('.team__picture');
	personPicture.classList.add('hidden')
	setTimeout(() => {
	image.src = pagesData.images.png;
	role.textContent = pagesData.role;
	personName.textContent = pagesData.name;
	bio.textContent = pagesData.bio;
		personPicture.classList.remove('hidden')
}, 300);
}