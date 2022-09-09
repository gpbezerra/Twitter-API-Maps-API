// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: -22.726388, lng: -43.5671647 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

function request() {
  fetch('http://localhost:3000/tweet/gpbezerr4/1', { method: 'GET' })
    .then(response => response.json())
    .then(data => {
      let location = document.getElementById("location");
      location.innerHTML = `Localização tweet: ${data.location[0].full_name}`
      let tweetId = document.getElementById("tweetId");
      tweetId.innerHTML = `Id tweet: ${data.data[0].id}`
      let tweetText = document.getElementById("tweetText");
      tweetText.innerHTML = `Id tweet: ${data.data[0].text} `
    } )
    .catch(err => console.log(err.message))

   
}


window.initMap = initMap;
