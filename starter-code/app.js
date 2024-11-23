//API
fetch("./data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const currentPage = document.body.dataset.page; // current page

    if (currentPage === "destination") {
      // destination
      const updateDestinations = (destinationIndex) => {
        const destination = data.destinations[destinationIndex];
        if (destination) {
          document.querySelector(".destination-img").src =
            destination.images.webp;
          document.querySelector(".destination-h2").textContent =
            destination.name;
          document.querySelector(".destination-p").textContent =
            destination.description;
          document.querySelector(".distance-p").textContent =
            destination.distance;
          document.querySelector(".travel-time-p").textContent =
            destination.travel;
        } else {
          console.log("Destination not found.");
        }
      };

      updateDestinations(0);

      ["moon", "mars", "europe", "titan"].forEach((id, index) => {
        document
          .getElementById(id)
          ?.addEventListener("click", () => updateDestinations(index));
      });
    } else if (currentPage === "crew") {
    //crew 
      const updateCrew = (crewIndex) => {
        if (crewIndex < 0 || crewIndex >= data.crew.length) {
          console.log("Invalid crew index:", crewIndex);
          return;
        }

        const members = data.crew[crewIndex];
        if (members) {
          document.querySelector(".crew-img").src = members.images.webp;
          document.querySelector(".role").textContent = members.role;
          document.querySelector(".name").textContent = members.name;
          document.querySelector(".bio").textContent = members.bio;
        } else {
          console.log("Crew member not found");
        }
      };

      updateCrew(0);

      ["commander", "mission-specialist", "pilot", "flight-engineer"].forEach((id, index) => {
        document.getElementById(id)?.addEventListener("click", () => updateCrew(index));
      });
    } else {
      console.log("Página no reconocida.");
    }
  })
  .catch((error) => {
    console.log("Error loading JSON: ", error);
  });
