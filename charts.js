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
