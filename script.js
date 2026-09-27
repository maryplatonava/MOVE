const entryPage = document.getElementById("entryPage");
const roadmapPage = document.getElementById("roadmapPage");
const moveButton = document.getElementById("moveButton");
const headerArrow = document.getElementById("headerArrow");
const stages = [...document.querySelectorAll(".stage")];
const form = document.getElementById("documentForm");
const formMessage = document.getElementById("formMessage");

function showRoadmap() {
  entryPage.style.display = "none";
  roadmapPage.classList.add("visible");
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.body.classList.add("roadmap-active");
}

moveButton.addEventListener("click", showRoadmap);
headerArrow.addEventListener("click", showRoadmap);

stages.forEach((stage) => {
  const button = stage.querySelector(".stage-circle");
  button.addEventListener("click", () => {
    stages.forEach((item) => item.classList.remove("active"));
    stage.classList.add("active");

    if (stage.dataset.stage === "0") {
      document.querySelector(".stage-details").style.display = "";
    } else {
      document.querySelector(".stage-details").style.display = "none";
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();

  if (!email) return;

  formMessage.textContent = "Check your email — your document list is on its way.";
  form.reset();
});
