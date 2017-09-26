let dayList = document.querySelector(`#dayList`);
let dateInfo = document.querySelector(`#dateInfo`);
let cHeaderText = document.querySelector(`#cHeaderText`);
let prevBtn = document.querySelector(`#prevBtn`);
let nextBtn = document.querySelector(`#nextBtn`);
let setNoteBtn = document.querySelector(`#setNoteBtn`);
let descriptionTitle = document.querySelector(`#descriptionTitle`);
let infoDescription = document.querySelector(`#infoDescription`);
let control = new Date();
let descriptionIsOpen = false;
const descriptionHeight = 200;
let globalId;                       // the id of the date pressed
control.setDate(15);

// ----------------------------------------------------------------------------
populateCalendar(dayList, control);

prevBtn.addEventListener(`click`, function() {
  control.setMonth(control.getMonth() - 1);
  populateCalendar(dayList, control);
});

nextBtn.addEventListener(`click`, function() {
  control.setMonth(control.getMonth() + 1);
  populateCalendar(dayList, control);
});

setNoteBtn.addEventListener(`click`, function() {
  if (globalId != undefined) {
    if (infoDescription.value == `` && (globalId in DB)) {
      delete DB[globalId];
    } else {
      DB[globalId] = infoDescription.value;
      infoDescription.value = ``;
    }
    populateCalendar(dayList, control);
    closeDescription();
  }
});


// ----------------------------------------------------------------------------
