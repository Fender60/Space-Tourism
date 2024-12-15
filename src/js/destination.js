
const planetLinks = document.querySelectorAll('.planet__header-link a');
const image = document.querySelector('.planet__image img');
const title = document.querySelector('.planet__title');
const text = document.querySelector('.planet__description');
const distance = document.querySelector('.planet__distance-distance');
const travel = document.querySelector('.planet__time-time');


//get data
async function fetchDataAndProcess() {
	try {
	const response = await fetch('../data.json');
	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	}
	const data = await response.json();
	const pagesData = data.destinations;
	changeContent(pagesData);
	} catch (error) {
	console.error('Error:', error);
	}
 }

 fetchDataAndProcess();


function changeContent(pagesData){
		activeLink(planetLinks, (linkText) => {

		switch(linkText.text) {
			case 'Moon':
				updateContent(pagesData[0]);
				break;

			case 'Mars':
				updateContent(pagesData[1]);
				break;

				case 'Europa':
					updateContent(pagesData[2]);
				break;

				case 'Titan':
					updateContent(pagesData[3]);
				break;
		}
	});
};

function updateContent(pagesData) {
	const content = document.querySelector('.planet__content');
	const planetPicture = document.querySelector('.planet__image');
	const planetLocation = document.querySelector('.planet__location');
	content.classList.add('hidden');
	planetPicture.classList.add('hidden');
	planetLocation.classList.add('hidden');
	setTimeout(() => {
			image.src = pagesData.images.png;
			title.textContent = pagesData.name;
			text.textContent = pagesData.description;
			distance.textContent = pagesData.distance;
			travel.textContent = pagesData.travel;

			content.classList.remove('hidden');
			planetPicture.classList.remove('hidden');
			planetLocation.classList.remove('hidden');
	}, 300);
		}