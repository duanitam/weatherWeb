const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');


console.log('Client side Javascript is loaded');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    msg1.textContent = `Loading....`;
    msg2.textContent = ``;
    const location = search.value;

    fetch(`http://localhost:3001/weather?location=${location}`).then( (response) => {
        response.json().then( (data) => {
            if(data.error){
            return  msg1.textContent = data.error;
            }
            msg1.textContent = `Location: ${data.location} `;
            msg2.textContent = `Forecast: ${data.forecast}`;
           console.log(data.location);
           console.log(data.forecast);
        })
    });

});
