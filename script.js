// Tokenomics Slider
const cards = document.querySelectorAll('.tokenomics-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentCard = 0;

function showCard(index) {
    cards.forEach((card, i) => {
        if (i === index) {
            card.style.display = 'block';  // Kartı göster
        } else {
            card.style.display = 'none';   // Diğer kartları gizle
        }
    });
}

// Başlangıçta ilk kartı göster
showCard(currentCard);

// İleri butonuna basıldığında
nextBtn.addEventListener('click', () => {
    currentCard = (currentCard + 1) % cards.length;  // Sonraki karta geç
    showCard(currentCard);
});

// Geri butonuna basıldığında
prevBtn.addEventListener('click', () => {
    currentCard = (currentCard - 1 + cards.length) % cards.length;  // Önceki karta dön
    showCard(currentCard);
});
