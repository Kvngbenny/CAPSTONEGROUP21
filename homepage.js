// Course catalog grouped by year so students can select either BIT 1 or BIT 2.
// The course names are kept in human-friendly language to make the search feel natural.
const visualBasicFileLink = "resources/VB3.pptx";
const javaDevelopmentFileLink = "resources/Java-Complete-Reference.pdf";
const discretemathFileLink = "resources/Discrete-Math.pdf";
const calculusFileLink = "resources/Calculus-II.pdf";
const probabilityFileLink = "";
const communicationFileLink = "resources/Communication-Skills-II.pdf";
const economicsFileLink = "resources/Economics-II.pdf";
const databaseConceptsFileLink = "";
const webBasedConceptsFileLink = "";
const systemAnalysisFileLink = "";
const literatureFileLink = "resources/Communication-Skills-II.pdf";
const informationTechnologyFileLink = "resources/Information-Technology-II.pdf";
const structuredProgrammingFileLink = "resources/Structured-Programming-II.pdf";
const openSourceFileLink = "resources/Open-Source-Operating-Systems.pptx";
const informationSystemsFileLink = "resources/Information-Systems.pdf";

const courseCatalog = {
  BIT1: [
    { code: "BIT152", name: "Introduction to Structured Programming II", fileLink: structuredProgrammingFileLink },
    { code: "BIT158", name: "Introduction To Information Technology II", fileLink: informationTechnologyFileLink },
    { code: "BIT166", name: "Discrete Math", fileLink: discretemathFileLink },
    { code: "MATH162", name: "Calculus II and Mathematics for IT II", fileLink: calculusFileLink },
    { code: "STAT166", name: "Probability and Statistics", fileLink: probabilityFileLink },
    { code: "ENGL158", name: "Communication Skills II", fileLink: communicationFileLink },
    { code: "ECON152", name: "Principles of Economics II", fileLink: economicsFileLink },
    { code: "ENGL263", name: "Literature in English", fileLink: literatureFileLink }
  ],

  BIT2: [
    { code: "BIT263", name: "Programming with Visual Basic", fileLink: visualBasicFileLink },
    { code: "BIT297", name: "Database Concepts and Technologies", fileLink: databaseConceptsFileLink },
    { code: "BIT293", name: "Web-Based Concepts and Technology", fileLink: webBasedConceptsFileLink },
    { code: "BIT253", name: "Developmental Systems using Java", fileLink: javaDevelopmentFileLink },
    { code: "BIT261", name: "Information Systems in Organisations", fileLink: informationSystemsFileLink },
    { code: "ENGL263", name: "Literature in English", fileLink: literatureFileLink },
    { code: "BIT255", name: "Open Source Operating Systems", fileLink: openSourceFileLink },
    { code: "BIT291", name: "System Analysis and Design", fileLink: systemAnalysisFileLink }
  ]
};

const yearSelect = document.getElementById("year-select");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchQuery = document.getElementById("search-query");
const searchHint = document.getElementById("search-hint");
const searchResults = document.getElementById("search-results");
const courseDetails = document.getElementById("course-details");
const courseCode = document.getElementById("course-code");
const courseName = document.getElementById("course-name");
const courseDescription = document.getElementById("course-description");
const courseLink = document.getElementById("course-link");

function getSelectedCourses() {
  const selectedYear = yearSelect.value;
  return selectedYear ? courseCatalog[selectedYear] : [];
}

function renderResults(results) {
  if (!results.length) {
    searchResults.innerHTML = '<p class="no-results">No matching course was found for this year. Try another code or course title.</p>';
    return;
  }

  searchResults.innerHTML = results
    .map(
      (course) => `
        <button class="result-item" type="button" data-code="${course.code}" data-name="${course.name}">
          <span class="course-code">${course.code}</span>
          <span class="course-name">${course.name}</span>
        </button>
      `
    )
    .join("");

  document.querySelectorAll(".result-item").forEach((item) => {
    item.addEventListener("click", () => {
      openCourse(item.dataset.code, item.dataset.name);
    });
  });
}

function openCourse(code, name) {
  const selectedYear = yearSelect.value;
  const selectedCourse = getSelectedCourses().find(
    (course) => course.code === code && course.name === name
  ) || getSelectedCourses().find((course) => course.code === code);

  if (!selectedCourse || !selectedYear) {
    return;
  }

  courseCode.textContent = selectedCourse.code;
  courseName.textContent = selectedCourse.name;
  courseDescription.textContent = `This ${selectedYear} course is recorded as ${selectedCourse.name}.`;

  if (selectedCourse.fileLink) {
    courseLink.href = selectedCourse.fileLink;
    courseLink.textContent = "Open course resource";
    courseLink.hidden = false;
  } else {
    courseLink.hidden = true;
    courseLink.removeAttribute("href");
  }

  courseDetails.hidden = false;
  courseDetails.scrollIntoView({ behavior: "smooth", block: "start" });
}

function searchMaterials() {
  const selectedYear = yearSelect.value;
  const keyword = searchInput.value.trim().toLowerCase();
  const availableCourses = getSelectedCourses();

  if (!selectedYear) {
    searchHint.hidden = false;
    searchQuery.textContent = "Please select BIT1 or BIT2";
    searchResults.innerHTML = '<p class="no-results">Please choose your BIT level before searching for a course.</p>';
    courseDetails.hidden = true;
    return;
  }

  const filtered = availableCourses.filter((course) => {
    const codeMatch = course.code.toLowerCase().includes(keyword);
    const nameMatch = course.name.toLowerCase().includes(keyword);
    return !keyword || codeMatch || nameMatch;
  });

  searchHint.hidden = false;
  searchQuery.textContent = keyword ? `${selectedYear} — ${searchInput.value.trim()}` : `${selectedYear} — all courses`;
  renderResults(filtered);
}

searchButton.addEventListener("click", searchMaterials);
searchInput.addEventListener("input", searchMaterials);
yearSelect.addEventListener("change", searchMaterials);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchMaterials();
  }
});

searchMaterials();
