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

// İlk yüklemede ana bölüm göster
showSection('home'); // İlk bölüm olarak Home'u göster

let currentCardIndex = 0;
const cards = document.querySelectorAll('.card');
const nextCardButton = document.getElementById('nextCard');

// "İleri" butonuna tıklama işlemi
nextCardButton.addEventListener('click', () => {
    currentCardIndex++;
    
    // Kart sayısını aşmadığımızdan emin ol
    if (currentCardIndex >= cards.length) {
        currentCardIndex = 0; // Sıfırlama
    }
    
    // Kartları güncelle
    updateCardVisibility();
});

// Kart görünürlüğünü güncelleyen fonksiyon
function updateCardVisibility() {
    cards.forEach((card, index) => {
        card.style.display = index === currentCardIndex ? 'block' : 'none'; // Sadece aktif kartı göster
    });
}

// İlk yüklemede ana bölüm göster
showSection('home'); // İlk bölüm olarak Home'u göster
