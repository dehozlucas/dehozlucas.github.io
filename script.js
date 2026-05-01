// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
    initClickFeedback();
    initHeroScroll();
});


function initScrollAnimations() {
    const elements = document.querySelectorAll("section, .project");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.15
    });

    elements.forEach(el => observer.observe(el));
}

function initClickFeedback() {
    const clickable = document.querySelectorAll("a, .project");

    clickable.forEach(el => {
        el.addEventListener("mousedown", () => {
            el.style.transform += " scale(0.97)";
        });

        el.addEventListener("mouseup", () => {
            el.style.transform = el.style.transform.replace(" scale(0.97)", "");
        });

        el.addEventListener("mouseleave", () => {
            el.style.transform = el.style.transform.replace(" scale(0.97)", "");
        });
    });
}

function toggleGame(id) {
    const el = document.getElementById(id);

    if (el.classList.contains("open")) {
        el.classList.remove("open");
    } else {
        el.classList.add("open");
    }
}

function initHeroScroll() {
    const projects = document.querySelectorAll(".hero-project");

    function updateActive() {
        const center = window.innerHeight / 2;

        projects.forEach(project => {
            const rect = project.getBoundingClientRect();
            const middle = rect.top + rect.height / 2;

            if (Math.abs(center - middle) < rect.height / 2) {
                project.classList.add("active");
            } else {
                project.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", updateActive);
    window.addEventListener("load", updateActive);
}

let current = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides.forEach(s => s.classList.remove("active"));
    slides[index].classList.add("active");
}

function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
}

function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
}

setInterval(nextSlide, 6000);