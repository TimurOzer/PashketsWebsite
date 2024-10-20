// Tüm bölümleri gösteren fonksiyon
function showSection(sectionId) {
    // Tüm bölümlerin opaklığını sıfırla
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0'; // Saydam yap
    });
    
    // Hedef bölümü göster
    const targetSection = document.getElementById(sectionId);
    targetSection.style.opacity = '1'; // Hedef bölümün opaklığını artır
}

// Butonlara tıklama olaylarını ekle
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Varsayılan bağlantı davranışını önler
        
        const sectionId = this.getAttribute('href').substring(1); // href'den bölüm ID'sini al
        
        showSection(sectionId); // İlgili bölümü göster
    });
});


let currentCardIndex = 0;
const cards = document.querySelectorAll('.card');
const nextCardButton = document.getElementById('nextCard');

// İlk kartı aktif yap
cards[currentCardIndex].classList.add('active');

// "İleri" butonuna tıklama işlemi
nextCardButton.addEventListener('click', () => {
    // Mevcut kartı soldan sağa kaydır
    cards[currentCardIndex].style.transform = 'translateX(-100%)'; // Mevcut kartı sola kaydır

    // Geçerli kartı gizle ve bir sonraki kartı göster
    currentCardIndex++;
    
    // Kart sayısını aşmadığımızdan emin ol
    if (currentCardIndex >= cards.length) {
        currentCardIndex = 0; // Sıfırlama
    }

    // Yeni kartı aktif yap ve sağdan sola getir
    cards.forEach(card => card.classList.remove('active')); // Önceki kartların aktif sınıfını kaldır
    cards[currentCardIndex].classList.add('active'); // Yeni kartı aktif yap
    cards[currentCardIndex].style.transform = 'translateX(100%)'; // Yeni kartı sağdan getir
    setTimeout(() => {
        cards[currentCardIndex].style.transform = 'translateX(0)'; // Yeni kartı yerine kaydır
    }, 50); // Kısa bir süre sonra kartı tam merkeze kaydır
});




// İlk yüklemede ana bölüm göster
showSection('home'); // İlk bölüm olarak Home'u göster
