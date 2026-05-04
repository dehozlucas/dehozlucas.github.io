// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
    initClickFeedback();
    initHeroScroll();
    initVideoGrid();
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

setInterval(nextSlide, 10000);

function initVideoGrid() {
    const grids = document.querySelectorAll(".video-grid");

    grids.forEach(grid => {
        const videoSrc = grid.dataset.video;

        const columns = 4;

        for (let i = 0; i < columns; i++) {
            const tile = document.createElement("div");
            tile.classList.add("video-tile");

           const video = document.createElement("video");

            video.src = videoSrc;
            video.muted = true;
            video.loop = true;
            video.autoplay = true;
            video.playsInline = true;
            video.controls = false;
            video.preload = "auto";

            video.style.width = "100%";
            video.style.height = "100%";
            video.style.objectFit = "cover";

            video.oncanplay = () => {
                video.currentTime = Math.random() * (video.duration || 5);
                video.play().catch(() => {});
            };

           video.addEventListener("loadedmetadata", () => {
                const duration = video.duration;

                const minSpacing = 0.15; // 15%
                const baseOffset = i * minSpacing;

                // pequeño random dentro del segmento (para que no se vea demasiado perfecto)
                const randomOffset = Math.random() * (minSpacing * 0.5);

                let time = (baseOffset + randomOffset) * duration;

                // loop por si se pasa de 1
                time = time % duration;

                video.currentTime = time;

                video.play().catch(() => {});
            });

            tile.appendChild(video);
            grid.appendChild(tile);
        }
    });
}