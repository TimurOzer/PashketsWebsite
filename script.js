// Tokenomics slider functionality
const slider = document.querySelector('.tokenomics-slider');
const slides = Array.from(slider.children);
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');

let currentIndex = 0;

function updateSliderPosition() {
    // Slider pozisyonunu güncelle
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevButton.addEventListener('click', () => {
    // Eğer geçerli indeks 0'dan büyükse bir azalt
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        // En son slidere git
        currentIndex = slides.length - 1;
    }
    updateSliderPosition();
});

nextButton.addEventListener('click', () => {
    // Eğer geçerli indeks son slideden küçükse bir artır
    if (currentIndex < slides.length - 1) {
        currentIndex++;
    } else {
        // İlk slide'a dön
        currentIndex = 0;
    }
    updateSliderPosition();
});

// Responsive Nav Menu Toggle
const navLinks = document.querySelector('.nav-links');
const toggleButton = document.querySelector('.nav-toggle');

toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
