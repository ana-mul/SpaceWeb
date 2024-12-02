//CREW
const crewBtn = document.querySelectorAll(".list-btn");
crewBtn.forEach((isClicked) => {
  isClicked.addEventListener("click", () => {
    crewBtn.forEach((btn) => {
      btn.style.backgroundColour = "";

      isClicked.style.backgroundColor = "white";
    });
  });
});

//DESTINATION
const chooseDestination = document.querySelectorAll(".destination-li");

chooseDestination.forEach((choose) => {
  choose.addEventListener("click", () => {
    chooseDestination.forEach((b) => {
      b.classList.remove("choose");

      choose.classList.add("choose");
    });
  });
});

//TOGGLE MENU MOBILE
const toggleOpen = document.getElementById("menu-toggle");
const toggleClose = document.getElementById("menu-close");
const navBar = document.querySelector(".nav-bar");

const toggleMenu = () => {
  const navBarStyle = getComputedStyle(navBar).display;
  if (navBarStyle === "none") {
    navBar.style.display = "flex";
    toggleClose.style.display = "block";
    toggleOpen.style.display = "none";
  } else {
    navBar.style.display = "none";
    toggleClose.style.display = "none";
    toggleOpen.style.display = "block";
  }
};

toggleOpen.addEventListener("click", toggleMenu);
toggleClose.addEventListener("click", toggleMenu);

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

      ["commander", "mission-specialist", "pilot", "flight-engineer"].forEach(
        (id, index) => {
          document
            .getElementById(id)
            ?.addEventListener("click", () => updateCrew(index));
        }
      );
    } else if (currentPage === "technology") {
      //technology
      const updateTechnology = (technologyIndex) => {
        const technologies = data.technology[technologyIndex];
        if (technologies) {
          document.querySelector(".tech-info-h2-b").textContent =
            technologies.name;
          document.querySelector(".tech-info-p").textContent =
            technologies.description;

          // images
          const portraitImage = technologies.images.portrait;
          const landscapeImage = technologies.images.landscape;

          // select img
          const techImageElement = document.querySelector(".tech-img");

          // responsive
          if (window.innerWidth <= 1200) {
            techImageElement.src = landscapeImage;
          } else {
            techImageElement.src = portraitImage;
          }
        } else {
          console.log("Technology not found");
        }
      };

      updateTechnology(0);

      ["vehicle", "spaceport", "capsule"].forEach((id, index) => {
        document
          .getElementById(id)
          .addEventListener("click", () => updateTechnology(index));
      });
    } else {
      console.log("Page not found");
    }
  })
  .catch((error) => {
    console.log("Error loading JSON: ", error);
  });
