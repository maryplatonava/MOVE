const entryPage = document.getElementById("entryPage");
const roadmapPage = document.getElementById("roadmapPage");
const moveButton = document.getElementById("moveButton");
const headerArrow = document.getElementById("headerArrow");

const stages = [...document.querySelectorAll(".stage")];

const form = document.getElementById("documentForm");
const formMessage = document.getElementById("formMessage");


/* =========================
   OPEN ROADMAP
========================= */

function showRoadmap() {
  if (entryPage) {
    entryPage.style.display = "none";
  }

  if (roadmapPage) {
    roadmapPage.classList.add("visible");
  }

  document.body.classList.add("roadmap-active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


if (moveButton) {
  moveButton.addEventListener("click", showRoadmap);
}

if (headerArrow) {
  headerArrow.addEventListener("click", showRoadmap);
}


/* =========================
   ROADMAP
========================= */

function updateRoadmap(selectedIndex) {

  stages.forEach((stage, index) => {

    const circle = stage.querySelector(".stage-circle");

    /* CURRENT */
    if (index === selectedIndex) {

      stage.classList.add("active");
      stage.classList.remove("completed");

      if (circle) {
        circle.setAttribute("aria-current", "step");
      }
    }

    /* COMPLETED */
    else if (index < selectedIndex) {

      stage.classList.remove("active");
      stage.classList.add("completed");

      if (circle) {
        circle.removeAttribute("aria-current");
      }
    }

    /* UPCOMING */
    else {

      stage.classList.remove("active");
      stage.classList.remove("completed");

      if (circle) {
        circle.removeAttribute("aria-current");
      }
    }


    /* SHOW / HIDE CONTENT */

    const details = stage.querySelector(".stage-details");

    if (details) {

      if (index === selectedIndex) {
        details.style.display = "";
      } else {
        details.style.display = "none";
      }

    }

  });

}


/* =========================
   CLICK ON STAGE
========================= */

stages.forEach((stage, index) => {

  const circle = stage.querySelector(".stage-circle");

  if (!circle) return;

  circle.addEventListener("click", () => {

    updateRoadmap(index);

  });

});


/* =========================
   INITIAL STATE
========================= */

if (stages.length > 0) {

  updateRoadmap(0);

}


/* =========================
   DOCUMENT FORM
========================= */

if (form) {

  form.addEventListener("submit", (event) => {

    event.preventDefault();

    const emailInput = document.getElementById("email");

    if (!emailInput) return;

    const email = emailInput.value.trim();

    if (!email) return;

    if (formMessage) {

      formMessage.textContent =
        "Check your email — your document list is on its way.";

    }

    form.reset();

  });

}
