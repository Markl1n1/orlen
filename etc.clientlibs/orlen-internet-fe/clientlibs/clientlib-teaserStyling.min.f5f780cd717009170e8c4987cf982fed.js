document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".cmp-teaser__action-link");
  buttons.forEach((element) => {
    const styling = element.getAttribute("styling");
    const newLine = element.getAttribute("newLine");
    if (newLine === "true") {
      element.style.display = "table";
    }
    if (styling === "fullBrand") {
      element.classList.add(
        "fullBrand-styling",
        "common-styling",
        "common-styling-fullBrand",
      );
      element.classList.remove("cmp-teaser__action-link");
    } else if (styling == "contourOnly") {
      element.classList.add("contourOnly-styling", "common-styling");
      element.classList.remove("cmp-teaser__action-link");
    } else if (styling == "whiteBackground") {
      element.classList.add("whiteBackground-styling", "common-styling");
      element.classList.remove("cmp-teaser__action-link");
    } else if (styling == "brandArrow") {
      element.classList.add("brandArrow-styling", "common-styling-text");
      element.classList.remove("cmp-teaser__action-link");
    } else {
      element.style.marginTop = "5px";
      element.style.marginBottom = "5px";
    }
  });
});
