
// document.getElementById('search').addEventListener('click', function () {
//     // Get input values
//     const address = document.getElementById('address').value;
//     const norad = document.getElementById('norad').value;

//     // Make an API request to get the coordinates of address entered 
   
//     fetch(`https://geocode.maps.co/search?q=${encodeURI(address)}`)
//         .then(res => res.json())
//         .then(data => {

//             // extract lat and long from array
//             const latitude = data[0].lat;
//             const longitude = data[0].lon;
           
//             // make API request to Sat
//             const satUrl = `https://satellites.fly.dev/passes/${norad}?lat=${latitude}&lon${longitude}&limit=1&days=15&visible_only=true`;

//             return fetch(satUrl);
//         })
//         .then(response => response.json())
//         .then(data => {
//             // Extract information about satellite passes
//             const riseTime = new Date(data[0].rise.utc_datetime);
//             const culminationTime = new Date(data[0].culmination.utc_datetime);
//             const setTime = new Date(data[0].set.utc_datetime)

//             displaySatelliteInfo(riseTime, culminationTime, setTime)
//         })
//         .catch(error => console.error('Error:', error));
        
    
// });

// function displaySatelliteInfo(riseTime, culminationTime, setTime){
//     // format date and time
//     const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'};
//     const riseTimeString = riseTime.toLocalDateString('en-US', options);
//     const culminationTimeString = culminationTime.toLocalDateString('en-US', options);
//     const setTimeString = setTime.toLocalDateString('en-US', options);

//     // display info on the DOM
//     const infoContainer = document.createElement('div');
//     infoContainer.innerHTML = `
//                 <h2>Satellite Pass Information</h2> 
//                 <p>Rise Time: ${riseTimeString}</p> 
//                 <p>Culmination Time: ${culminationTimeString}</p> 
//                 <p>Set Time: ${setTimeString}</p>`;

//     document.body.appendChild(infoContainer);
// }

// main.js

document.getElementById('search').addEventListener('click', function () {
    // Get user input values
    const address = document.getElementById('address').value;
    const norad = document.getElementById('norad').value;

    // Make API request to Maps Geocode
    const geocodeUrl = `https://geocode.maps.co/search?q=${encodeURI(address)}`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            // Extract latitude and longitude from the response
            const latitude = data[0].lat;
            const longitude = data[0].lon;

            // Make API request to Satellite Passes API
            const satelliteUrl = `https://satellites.fly.dev/passes/${norad}?lat=${latitude}&lon=${longitude}&limit=1&days=15&visible_only=true`;

            return fetch(satelliteUrl);
        })
        .then(response => response.json())
        .then(data => {
            // Extract information about satellite passes
            const riseTime = new Date(data[0].rise.utc_datetime);
            const culminationTime = new Date(data[0].culmination.utc_datetime);
            const setTime = new Date(data[0].set.utc_datetime);

            // Display information on the DOM
            displaySatelliteInfo(riseTime, culminationTime, setTime);
        })
        .catch(error => console.error('Error:', error));
});

function displaySatelliteInfo(riseTime, culminationTime, setTime) {
    // Format date and time
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };

    const riseTimeString = riseTime.toLocaleDateString('en-US', options);
    const culminationTimeString = culminationTime.toLocaleDateString('en-US', options);
    const setTimeString = setTime.toLocaleDateString('en-US', options);

    // Display information on the DOM
    const infoContainer = document.createElement('div');
    infoContainer.innerHTML = `
        <h2>Satellite Pass Information</h2>
        <p>Rise Time: ${riseTimeString}</p>
        <p>Culmination Time: ${culminationTimeString}</p>
        <p>Set Time: ${setTimeString}</p>
    `;

    document.body.appendChild(infoContainer);
}