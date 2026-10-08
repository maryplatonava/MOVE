document.addEventListener("DOMContentLoaded", function () {

  const entryPage = document.getElementById("entryPage");
  const roadmapPage = document.getElementById("roadmapPage");
  const moveButton = document.getElementById("moveButton");
  const headerArrow = document.getElementById("headerArrow");

  const stages = Array.from(document.querySelectorAll(".stage"));

  const form = document.getElementById("documentForm");
  const formMessage = document.getElementById("formMessage");

  const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxe_7zKDQvhdomCP9f616caD2gtFkWMgMyHNpKpUcjjNsDICwm330_aqIQSWRTRAxt3hw/exec";


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
     DOCUMENT FORM WITH GOOGLE SHEETS
  ============================== */

  if (form) {

    form.addEventListener("submit", function (event) {

      event.preventDefault();

      const emailInput = document.getElementById("email");

      if (!emailInput) return;

      const email = emailInput.value.trim();

      if (!email) {
        if (formMessage) {
          formMessage.textContent = "Please enter a valid email.";
          formMessage.style.color = "#d1483d";
        }
        return;
      }

      if (formMessage) {
        formMessage.textContent = "Sending...";
        formMessage.style.color = "#2f5fbb";
      }

      // Отправляем эмейл на Google Apps Script
      fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({
          email: email,
          timestamp: new Date().toISOString()
        })
      })
      .then(() => {
        setTimeout(() => {
          window.location.href = "success.html";
        }, 500);
      })
      .catch(error => {
        console.error("Error:", error);
        if (formMessage) {
          formMessage.textContent = "Connection error. Please try again.";
          formMessage.style.color = "#d1483d";
        }
      });

    });

  }

});
