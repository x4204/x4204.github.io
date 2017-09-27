let populateCalendar = function(list, theDate) {
	cHeaderText.innerHTML = `${MONTHS[theDate.getMonth()][0]}, ${theDate.getFullYear()}`;
	let startDate = new Date(theDate.getTime());
	startDate.setDate(1); 														// set to the first day of month
	let firstDate = new Date(startDate.getTime());    // get the first day of the month
	let lastDate = new Date(startDate.getTime());			// get the last day of the month
	if (lastDate.getFullYear() % 4 == 0)
		lastDate.setDate(lastDate.getDate() + MONTHS[lastDate.getMonth()][1] + 1);
	else
		lastDate.setDate(lastDate.getDate() + MONTHS[lastDate.getMonth()][1]);
	let dayOfWeek = startDate.getDay(); 							// get which day of week is the first day of month
	if (dayOfWeek == 0) dayOfWeek = 6;
	else dayOfWeek -= 1;
	startDate.setDate(startDate.getDate() - dayOfWeek); // get the day of which the calendar starts
	let str = ``;
	for (let i = 0; i < 35; i++) { 											// populate the calendar
		let today = new Date().toString().split(` `).splice(1, 3).join(` `);
		let sd = startDate.toString().split(` `).splice(1, 3).join(` `);

		if (startDate >= firstDate && startDate < lastDate) {
			let id = sd.toLowerCase().split(` `).join(`_`);
			if (sd == today) {
				str += `<li id="${id}" class="today active">${startDate.getDate()}</li>\n`;
			} else if (id in DB) {
				str += `<li id="${id}" class="event active">${startDate.getDate()}</li>\n`;
			}	else {
				str += `<li id="${id}" class="active">${startDate.getDate()}</li>\n`;
			}
		} else {
			str += `<li class="inactive">${startDate.getDate()}</li>\n`;
		}
		startDate.setDate(startDate.getDate() + 1);
	}
	list.innerHTML = str;
	let active = document.querySelectorAll(`.active`);
	addEventListeners(active);
}

let addEventListeners = function(active) {
	for(let i = 0; i < active.length; i++) {
		active[i].addEventListener(`click`, function() {
			if (globalId == undefined) {
				globalId = active[i].id;
				openDescription();
			} else if (active[i].id == globalId) {
				if (descriptionIsOpen) {
					closeDescription();
				} else {
					openDescription();
				}
			} else {
				globalId = active[i].id;
				if (descriptionIsOpen) {
					closeDescription();
					setTimeout(function() {
						descriptionTitle.innerHTML = active[i].id.split(`_`).join(` `).toUpperCase();
						openDescription();
					}, 400);
				} else {
					descriptionTitle.innerHTML = active[i].id.split(`_`).join(` `).toUpperCase();
					openDescription();
				}
			}
			// console.log(active[i].id);
		});
	}
}

let openDescription = function() {
	descriptionIsOpen = true;
	if (globalId in DB) {
		infoDescription.value = DB[globalId];
	} else {
		infoDescription.value = ``;
	}
	let h = 0;
	let intvl = setInterval(function() {
		h += 3.0;
		dateInfo.style.height = `${h}px`;
		if (h >= descriptionHeight)
			clearInterval(intvl);
	}, 5);
}

let closeDescription = function() {
	descriptionIsOpen = false;
	let h = descriptionHeight;
	let intvl = setInterval(function() {
		h -= 3.0;
		dateInfo.style.height = `${h}px`;
		if (h < 0) {
			clearInterval(intvl);
			dateInfo.style.height = `0px`;
		}
	}, 5);
}




























// comment
