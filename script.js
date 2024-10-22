// Tüm bölümleri gösteren fonksiyon
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active'); // Tüm bölümleri gizle
    });
    
    const targetSection = document.getElementById(sectionId);
    targetSection.classList.add('active'); // Hedef bölümü göster
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

    // Sonraki karta geçiş
    currentCardIndex++;
    if (currentCardIndex >= cards.length) {
        currentCardIndex = 0; // Kartlar bittiğinde başa dön
    }

    // Yeni kartı aktif yap ve sağdan sola getir
    cards.forEach(card => card.classList.remove('active')); // Önceki kartların aktif sınıfını kaldır
    cards[currentCardIndex].classList.add('active'); // Yeni kartı aktif yap
    cards[currentCardIndex].style.transform = 'translateX(100%)'; // Yeni kartı sağdan getir
    setTimeout(() => {
        cards.forEach(card => card.classList.remove('active')); // Diğer kartları devre dışı bırak
        cards[currentCardIndex].classList.add('active'); // Yeni kartı aktif yap
        cards[currentCardIndex].style.opacity = '1';
        cards[currentCardIndex].style.transform = 'translateX(0)';
    }, 300); // Kısa bir süre sonra kartı tam merkeze kaydır
});

// Bölümleri ekrana kaydırıldıkça görünür yapma fonksiyonu
function revealSectionsOnScroll() {
    const sections = document.querySelectorAll('.section');
    const revealPoint = window.innerHeight / 1.2; // Görünme eşiği

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < revealPoint) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });
}

// Scroll olayını dinleyelim
window.addEventListener('scroll', revealSectionsOnScroll);

// İlk başta home kısmı zaten görünür olacak
document.addEventListener('DOMContentLoaded', () => {
    revealSectionsOnScroll(); // Sayfa yüklenince görünürlüğü kontrol et
});

// Butonlara smooth scroll ekleyelim
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Varsayılan link davranışını önleyelim
        const sectionId = this.getAttribute('href');
        
        document.querySelector(sectionId).scrollIntoView({
            behavior: 'smooth' // Yumuşak kaydırma
        });
    });
});

// İlk yüklemede ana bölüm göster
showSection('home'); // İlk bölüm olarak Home'u göster
