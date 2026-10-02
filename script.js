document.addEventListener("DOMContentLoaded", function () {

  const entryPage = document.getElementById("entryPage");
  const roadmapPage = document.getElementById("roadmapPage");
  const moveButton = document.getElementById("moveButton");
  const headerArrow = document.getElementById("headerArrow");

  const stages = Array.from(document.querySelectorAll(".stage"));

  const form = document.getElementById("documentForm");
  const formMessage = document.getElementById("formMessage");


  /* ==============================
     OPEN ROADMAP
  ============================== */

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


  /* ==============================
     ROADMAP STATES
  ============================== */

  function setStage(selectedIndex) {

    stages.forEach(function (stage, index) {

      const circle = stage.querySelector(".stage-circle");
      const details = stage.querySelector(".stage-details");

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


      /* CONTENT */

      if (details) {

        if (index === selectedIndex) {
          details.style.display = "";
        } else {
          details.style.display = "none";
        }

      }

    });

  }


  /* ==============================
     CLICKABLE STAGES
  ============================== */

  stages.forEach(function (stage, index) {

    const circle = stage.querySelector(".stage-circle");

    if (!circle) return;

    circle.addEventListener("click", function (event) {

      event.preventDefault();

      setStage(index);

    });

  });


  /* ==============================
     START WITH PREPARE
  ============================== */

  if (stages.length > 0) {
    setStage(0);
  }


  /* ==============================
     DOCUMENT FORM
  ============================== */

  if (form) {

    form.addEventListener("submit", function (event) {

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

});
