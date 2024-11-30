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
        const sectionId = this.getAttribute('href').substring(1); // href'den bölüm ID'sini al
        const sectionIndex = Array.from(sections).findIndex(section => section.id === sectionId); // ID'ye göre index bul
        
        // Eğer 'View Online' butonuna tıklanıyorsa, yönlendirme yap
        if (this.textContent.includes('View Online')) {
            event.preventDefault(); // Varsayılan bağlantı davranışını önler
            window.location.href = 'whitepaper.html'; // Doğru yolu belirtin
        } else {
            // Seçili bölümü göster
            if (sectionIndex !== -1) {
                currentSectionIndex = sectionIndex; // Seçili bölüm indeksini güncelle
                showSection(currentSectionIndex); // İlgili bölümü göster
            }
        }
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
                backgroundColor: ['#FED8B1', '#FED8B1'],
                borderColor: ['#000000', '#000000'],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // Yatay bar grafik
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100, // Maksimum %100 olacak
                    ticks: {
                        color: '#FED8B1' // X ekseni metin rengi
                    }
                },
                y: {
                    ticks: {
                        color: '#FED8B1' // Y ekseni metin rengi
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            if (context.dataIndex === 0) {
                                return `Tokens: ${currentTokens.toLocaleString()} / ${targetTokens.toLocaleString()}`;
                            } else {
                                return `Amount: $${currentAmount.toLocaleString()} / $${targetAmount.toLocaleString()}`;
                            }
                        }
                    }
                }
            }
        }
    });

    // Hedef ve Ulaşılan miktarı grafik altına ekleyin
    const chartContainer = document.getElementById('chartInfo');
    chartContainer.innerHTML = `
        <p>Target Tokens: ${targetTokens.toLocaleString()}, Current Tokens: ${currentTokens.toLocaleString()}</p>
        <p>Target Amount: $${targetAmount.toLocaleString()}, Collected Amount: $${currentAmount.toLocaleString()}</p>
    `;
}

document.addEventListener('DOMContentLoaded', function () {
    // Resim URL'leri
    const images = {
        base: 'https://raw.githubusercontent.com/TimurOzer/PashketsWebsite/main/img/cat.png', // Kedi resmi
        hats: [] // 38 şapka URL'sini buraya ekleyeceğiz
    };

    // 38 şapka URL'sini otomatik oluşturma
    for (let i = 1; i <= 38; i++) {
        images.hats.push(`https://raw.githubusercontent.com/TimurOzer/PashketsWebsite/main/img/hat${i}.png`);
    }

    const baseImage = document.getElementById('cat-image'); // Kedi resmi
    const hatImage = document.getElementById('hat-image'); // Şapka resmi
    let selectedHatIndex = 0; // Başlangıçta varsayılan şapka

    // Başlangıçta kedi resmi yükle
    baseImage.src = images.base;
    hatImage.src = images.hats[selectedHatIndex];

    // Şapka değiştirme fonksiyonu
    function changeHat(index) {
        selectedHatIndex = (index + images.hats.length) % images.hats.length; // Döngüsel indeks
        hatImage.src = images.hats[selectedHatIndex]; // Şapkanın kaynağını güncelle
        hatImage.style.display = 'block'; // Şapkayı göster
    }

    // Next butonuna tıklama
    document.getElementById('next-hat').addEventListener('click', function () {
        changeHat(selectedHatIndex + 1); // Bir sonraki şapka
    });

    // Previous butonuna tıklama
    document.getElementById('prev-hat').addEventListener('click', function () {
        changeHat(selectedHatIndex - 1); // Bir önceki şapka
    });

    // İndirme fonksiyonu
    document.getElementById('download-button').addEventListener('click', function () {
        const canvasContainer = document.getElementById('canvas-container');
        
        // Canvas oluşturma
        html2canvas(canvasContainer, {
            backgroundColor: null,
            useCORS: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'pashket.png'; // İndirilen dosya adı
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(error => {
            console.error("Error generating image:", error);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const memesContainer = document.querySelector('.memes-container');
    
    // Meme görsellerini oluştur
    for (let i = 1; i <= 74; i++) {
        const meme = document.createElement('img');
        meme.src = `https://raw.githubusercontent.com/TimurOzer/PashketsWebsite/refs/heads/main/img/pashamemes%20(${i}).jpg`;
        meme.alt = `Meme ${i}`;
        meme.classList.add('meme-image');  // .meme-image sınıfını kullan

        meme.addEventListener('click', function() {
            // Eğer meme büyütülmüşse, indir ve küçült
            if (meme.classList.contains('enlarged')) {
                const link = document.createElement('a');
                link.href = meme.src;
                link.download = `meme_${i}.jpg`;
                link.click();
                meme.classList.remove('enlarged');  // Büyütmeyi kaldır
            } else {
                // Tüm resimlerin büyütme sınıfını kaldır
                const memes = document.querySelectorAll('.meme-image');
                memes.forEach(item => item.classList.remove('enlarged'));

                // Sadece tıklanan resme "enlarged" sınıfını ekle
                meme.classList.add('enlarged');
            }
        });
        
        memesContainer.appendChild(meme);
    }
});

// Roadmap adımları
const roadmapSteps = [
    { quarter: "Q1 2024", details: "Token Launch & Community Building" },
    { quarter: "Q2 2024", details: "Exchange Listings & Reward Programs" },
    { quarter: "Q3 2024", details: "Partnerships & Ecosystem Development" },
    { quarter: "Q4 2024", details: "Major Update & Future Plans" },
    { quarter: "Q1 2025", details: "New Partnerships & Market Expansion" },
    { quarter: "Q2 2025", details: "Launch of Staking Program" },
    { quarter: "Q3 2025", details: "Integration with DeFi Platforms" },
    { quarter: "Q4 2025", details: "Expansion to New Markets" },
];

// Başlangıç indexi
let currentStepIndex = 0;

// DOM öğeleri
const roadmapContainer = document.getElementById("snakeRoadmap");
const prevButton = document.getElementById("prevStep");
const nextButton = document.getElementById("nextStep");

// Yol haritasını güncelle
function updateRoadmap(direction) {
    if (direction === "next" && currentStepIndex < roadmapSteps.length - 1) {
        currentStepIndex++;
        addStepToRoadmap(roadmapSteps[currentStepIndex]);
    } else if (direction === "prev" && currentStepIndex > 0) {
        currentStepIndex--;
        removeLastStep();
    }
}

// Yeni bir adım ekle
function addStepToRoadmap(step) {
    const stepElement = document.createElement("div");
    stepElement.className = "snake-step";
    stepElement.setAttribute("data-step", step.quarter);

    const stepTitle = document.createElement("h3");
    stepTitle.innerText = step.quarter;

    const stepDetails = document.createElement("p");
    stepDetails.innerText = step.details;

    stepElement.appendChild(stepTitle);
    stepElement.appendChild(stepDetails);

    roadmapContainer.appendChild(stepElement);
}

// Son adımı kaldır
function removeLastStep() {
    const steps = document.querySelectorAll(".snake-step");
    if (steps.length > 0) {
        roadmapContainer.removeChild(steps[steps.length - 1]);
    }
}

// Düğme olayları
prevButton.addEventListener("click", () => updateRoadmap("prev"));
nextButton.addEventListener("click", () => updateRoadmap("next"));


// Sayfa yüklendiğinde grafik fonksiyonunu çalıştır
document.addEventListener('DOMContentLoaded', renderPreOrderChart);


