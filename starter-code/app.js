//API

fetch("./data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    if (data.destinations && data.destinations.length > 0) {
      const destination = data.destinations[0]; 

      document.querySelector(".destination-img").src = destination.images.webp;
      document.querySelector(".destination-h2").textContent = destination.name;
      document.querySelector(".destination-p").textContent = destination.description;
      document.querySelector(".distance-p").textContent = destination.distance;
      document.querySelector(".travel-time-p").textContent = destination.travel;
    } else {
      console.log("No destinations available in the JSON.");
    }
  })
  .catch((error) => {
    console.log("Error loading JSON: ", error);
  });


