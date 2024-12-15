const technologyButtons = document.querySelectorAll('.content__buttons button');
const title = document.querySelector('.content__title');
const description = document.querySelector('.content__description');
const image = document.querySelector('.content__image');
let pagesData;

//slider
let startX = 0;
let endX = 0;
let currentIndex = 0;
let isSwipe = false;

const loadSlide = (index) => {
	if (index < 0 || index === technologyButtons.length) return;
		const elements = [...technologyButtons];
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

image.addEventListener('touchstart', (e) => {
	startX = e.touches[0].clientX;
	isSwipe = false; 
});

image.addEventListener('touchmove', (e) => {
	endX = e.touches[0].clientX;

	if (Math.abs(endX - startX) > 10) {
		isSwipe = true;
	}
});

image.addEventListener('touchend', () => {
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
	pagesData = data.technology;
	changeContent(pagesData);

	} catch (error) {
	console.error('Error:', error);
	}
 }

 fetchDataAndProcess();


//Change content
const changeContent = (pagesData) =>{
	activeLink(technologyButtons, (classButton) => {

		switch(classButton.className) {
			case 'one active':
				updateContent(pagesData[0]);
				currentIndex = 0;
				break;
			case 'two active':
				updateContent(pagesData[1]);
				break;
			case 'three active':
				updateContent(pagesData[2]);
				currentIndex = 2;
				break;
		}
	});
};

function updateContent(pagesData) {
	const content = document.querySelector('.content__information');
	content.classList.add('hidden');
	image.classList.add('hidden');
	setTimeout(() => {
	title.textContent = pagesData.name;
	description.textContent = pagesData.description;
	image.style.background = pagesData.images;
	content.classList.remove('hidden');
	image.classList.remove('hidden');
	}, 300);
}