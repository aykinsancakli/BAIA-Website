///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Make mobile navigation work
const btnNavEl = document.querySelector('.btn-mobile-nav');
const headerEl = document.querySelector('header');

btnNavEl.addEventListener('click', function () {
  headerEl.classList.toggle('nav-open');
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation
const allLinks = document.querySelectorAll('a:link');

allLinks.forEach((link) =>
  link.addEventListener('click', function (e) {
    const href = link.getAttribute('href');

    // Check if the link is an internal link (starts with #)
    if (href.startsWith('#')) {
      e.preventDefault(); // Prevent default behavior for internal links

      // Scroll back to top
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // Scroll to other sections
      else {
        const sectionEl = document.querySelector(href);
        if (sectionEl) {
          sectionEl.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Close mobile navigation for main-nav-links
      if (link.classList.contains('main-nav-link')) {
        headerEl.classList.remove('nav-open');
      }
    }
    // External links should not be handled, default behavior will be applied
  })
);

///////////////////////////////////////////////////////////
// Sticky Navigation
const sectionHeroEl = document.querySelector('.section-hero');

const stickyNav = function (entries) {
  // console.log(entries);
  const [entry] = entries;
  // console.log(entry);

  if (entry.isIntersecting === false) {
    document.body.classList.add('sticky');
  }
  if (entry.isIntersecting === true) {
    document.body.classList.remove('sticky');
  }
};

const options = {
  root: null,
  threshold: 0,
  rootMargin: '-80px',
};

const observer = new IntersectionObserver(stickyNav, options);
observer.observe(sectionHeroEl);

// Reveal sections
const allSections = document.querySelectorAll('.section');
console.log(allSections);
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  // After operations are done stop observing (even better for performance)
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.08,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
