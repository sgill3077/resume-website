document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});

document.addEventListener("DOMContentLoaded", function () {

  // Animate sections on load
  const sections = document.querySelectorAll(".section");

  sections.forEach((section, index) => {
    setTimeout(() => {
      section.classList.add("visible");
    }, index * 300);
  });

  // Keyboard accessibility for collapsible buttons
  document.querySelectorAll('.collapsible-header').forEach(button => {
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });

  // Initialize resume download link
  updateDownloadLink();

  // Contact form handling
  const form = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      const data = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
formMessage.innerHTML =
  "<span style='color: green;'>✅ Thanks for your message! I'll get back to you soon.</span>";

          form.reset();
        } else {
          formMessage.innerHTML =
            '<span style="color: red;">❌ Oops! Something went wrong. Please try again.</span>';
        }
      })
      .catch(() => {
        formMessage.innerHTML =
          '<span style="color: red;">❌ There was an error submitting the form.</span>';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send';
      });
    });
  }

});


// Toggle dark mode
function toggleTheme() {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}


// Toggle projects section
function toggleProjects() {
  const projectsList = document.getElementById('projects-list');
  const toggleBtn = document.getElementById('projects-toggle');
  const header = document.querySelector('#projects .collapsible-header');

  const isExpanded = projectsList.style.display !== 'none';

  projectsList.style.display = isExpanded ? 'none' : 'block';
  toggleBtn.textContent = isExpanded ? '+' : '-';

  header.setAttribute('aria-expanded', !isExpanded);
}


// Toggle individual project details
function toggleProjectDetails(header) {
  const button = header.querySelector('.toggle-button');
  const details = header.nextElementSibling;

  const isExpanded = details.style.display !== 'none';

  details.style.display = isExpanded ? 'none' : 'block';
  button.textContent = isExpanded ? '+' : '-';

  header.setAttribute('aria-expanded', !isExpanded);
}


// Resume download selector
function updateDownloadLink() {
  const format = document.getElementById('resume-format');
  const downloadBtn = document.getElementById('download-resume-btn');

  if (!format || !downloadBtn) return;

  if (format.value === 'pdf') {
    downloadBtn.href = 'assets/shimron_gill_resume.pdf';
  } else {
    downloadBtn.href = 'assets/shimron_gill_resume.docx';
  }
}

function toggleMenu() {
  document
    .querySelector(".nav-container")
    .classList.toggle("menu-open");
}
