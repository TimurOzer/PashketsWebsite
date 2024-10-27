// Belirli bir bölümün görünümünü değiştirirken animasyonu sağlamak için
const sections = document.querySelectorAll('.section');
let currentSectionIndex = 0;

function showSection(index) {
    // Tüm bölümleri gizle
    sections.forEach((section, i) => {
        section.classList.remove('active', 'visible'); // "active" ve "visible" sınıflarını kaldır
        if (i === index) {
            section.style.display = 'block'; // Aktif bölümü göster
            setTimeout(() => {
                section.classList.add('visible'); // Geçişi başlat
            }, 10); // Kısa bir gecikme ile görünür yap
        } else {
            section.style.display = 'none'; // Diğerlerini gizle
        }
    });
    
    // İlk bölüm için animasyonu hemen başlat
    if (index === 0) {
        sections[index].classList.add('visible');
    }
}

// İlk yüklemede ana bölüm göster
showSection(currentSectionIndex); // İlk bölüm olarak home'u göster

// Butonları dinle ve tıklandığında ilgili bölümü göster
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Varsayılan bağlantı davranışını önler
        
        const sectionId = this.getAttribute('href').substring(1); // href'den bölüm ID'sini al
        const sectionIndex = Array.from(sections).findIndex(section => section.id === sectionId); // ID'ye göre index bul
        showSection(sectionIndex); // İlgili bölümü göster
    });
});

// İlk yüklemede ana bölüm göster
document.addEventListener('DOMContentLoaded', () => {
    showSection(currentSectionIndex); // İlk bölüm olarak Home'u göster
    revealSectionsOnScroll(); // Sayfa yüklenince görünürlüğü kontrol et
});

// Kart gösterme işlemleri
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

// Veriler
const targetTokens = 150000000;
const targetAmount = 10000;
const currentTokens = 150000000; // Güncel pre-order token miktarı (örnek değer)
const currentAmount = 0; // Toplanan miktar (örnek değer)

// Grafik fonksiyonu
function renderPreOrderChart() {
    const ctx = document.getElementById('preOrderChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Pre-order Tokens', 'Collected Amount ($)'],
            datasets: [{
                label: 'Progress',
                data: [
                    (currentTokens / targetTokens) * 100, // Token yüzdesi
                    (currentAmount / targetAmount) * 100 // Para yüzdesi
                ],
                backgroundColor: ['#ff6a00', '#00bfff'],
                borderColor: ['#ff6a00', '#00bfff'],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // Yatay bar grafik
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100 // Maksimum %100 olacak
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Sayfa yüklendiğinde grafik fonksiyonunu çalıştır
document.addEventListener('DOMContentLoaded', renderPreOrderChart);
