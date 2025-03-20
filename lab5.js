document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dots = document.querySelectorAll(".dot");
    const counterText = document.getElementById("counter-text");
    const playPauseBtn = document.querySelector(".play-pause");

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    let isPlaying = false;

    function updateSlider() {
        const offset = -currentIndex * 100 + "%";
        document.querySelector(".slides").style.transform = `translateX(${offset})`;

        // Оновлюємо активну точку
        dots.forEach(dot => dot.classList.remove("active"));
        dots[currentIndex].classList.add("active");

        // Оновлюємо лічильник слайдів
        counterText.textContent = `${currentIndex + 1} / ${totalSlides}`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    function toggleAutoPlay() {
        if (isPlaying) {
            clearInterval(autoPlayInterval);
            playPauseBtn.textContent = "▶";
        } else {
            autoPlayInterval = setInterval(nextSlide, 2000);
            playPauseBtn.textContent = "⏸";
        }
        isPlaying = !isPlaying;
    }

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);
    playPauseBtn.addEventListener("click", toggleAutoPlay);

    dots.forEach(dot => {
        dot.addEventListener("click", function () {
            currentIndex = parseInt(this.getAttribute("data-index"));
            updateSlider();
        });
    });

    updateSlider();
});
