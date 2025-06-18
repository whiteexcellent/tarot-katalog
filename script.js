// --- Adım 1: Kart Veritabanımızı Oluşturalım ---

// Her bir kartı bir nesne olarak tanımlayıp, tüm kartları bir dizi (array) içinde saklayacağız.
const tarotCards = [
    {
        name: 'Joker',
        image: 'images/joker.jpg',
        description: 'Joker kartı yeni başlangıçları, masumiyeti, macerayı ve potansiyeli temsil eder. Bilinmeyene atılan bir adımı ve olasılıklarla dolu bir yolculuğu simgeler.'
    },
    {
        name: 'Büyücü',
        image: 'images/buyucu.jpg',
        description: 'Büyücü, irade gücünü, yaratıcılığı, beceriyi ve kaynakları doğru kullanmayı temsil eder. Elindeki araçlarla istediklerini gerçekleştirme gücüne sahiptir.'
    },
    {
        name: 'Azize',
        image: 'images/azize.jpg',
        description: 'Azize kartı sezgiyi, gizemi, bilinçaltını ve saklı bilgiyi simgeler. Olayların ardındaki derin anlamları ve görünmeyeni temsil eder.'
    },
    {
        name: 'İmparatoriçe',
        image: 'images/imparatorice.jpg',
        description: 'İmparatoriçe; doğurganlığı, bereketi, doğayı ve anneliği temsil eder. Yaratıcılığın, şefkatin ve duygusal zenginliğin kartıdır.'
    },
    {
        name: 'İmparator',
        image: 'images/imparator.jpg',
        description: 'İmparator, otoriteyi, yapıyı, düzeni ve babalığı simgeler. Mantık, disiplin ve liderlik ile hedeflere ulaşmayı temsil eder.'
    },
    {
        name: 'Aşıklar',
        image: 'images/asiklar.jpg',
        description: 'Aşıklar kartı, ilişkileri, seçimleri, uyumu ve değerleri temsil eder. Önemli bir karar anını veya bir birlikteliği simgeler.'
    }
    // ... Buraya diğer 72 kartı da aynı formatta ekleyebilirsiniz.
];


// --- Adım 2: Kartları Ekranda Gösterecek Fonksiyonu Yazalım ---

// HTML'de kartları göstereceğimiz ızgara alanını seçiyoruz.
const cardGrid = document.getElementById('card-grid');

// Bu fonksiyon, verdiğimiz kart verisi listesini alıp her biri için HTML oluşturur.
function displayCards(cards) {
    // Başlamadan önce ızgaranın içini temizleyelim ki kartlar tekrar tekrar eklenmesin.
    cardGrid.innerHTML = '';

    // Kart listesindeki her bir kart için döngü başlatıyoruz.
    cards.forEach(card => {
        // Her kart için bir <div> elemanı oluşturuyoruz.
        const cardElement = document.createElement('div');
        // Bu elemana CSS'te tanımladığımız 'card' class'ını ekliyoruz.
        cardElement.classList.add('card');
        
        // Kartın HTML içeriğini oluşturuyoruz.
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.name}">
            <h3>${card.name}</h3>
        `;
        
        // Oluşturduğumuz bu kart elemanını ızgaranın (cardGrid) içine ekliyoruz.
        cardGrid.appendChild(cardElement);
    });
}

// --- Adım 3: Sayfa Yüklendiğinde Kartları Gösterelim ---

// Sayfa ilk yüklendiğinde tüm kartları göstermek için fonksiyonumuzu çağırıyoruz.
displayCards(tarotCards);
// --- Adım 4: Arama Çubuğunu İşlevsel Hale Getirme ---

// HTML'deki arama kutusunu seçiyoruz.
const searchInput = document.getElementById('searchInput');

// Arama kutusuna her harf girildiğinde veya silindiğinde bu fonksiyon çalışacak.
searchInput.addEventListener('input', (e) => {
    // Arama kutusuna yazılan metni alıp küçük harfe çeviriyoruz (büyük-küçük harf duyarsız arama için).
    const searchTerm = e.target.value.toLowerCase();
    
    // Ana kart listemizi, arama terimini içeren kartlarla filtreliyoruz.
    const filteredCards = tarotCards.filter(card => {
        return card.name.toLowerCase().includes(searchTerm);
    });
    
    // Yalnızca filtrelenmiş kartları ekranda göstermek için fonksiyonumuzu tekrar çağırıyoruz.
    displayCards(filteredCards);
});


// --- Adım 5: Kartlara Tıklama ve Detay Penceresi (Modal) İşlevselliği ---

// Modal penceresini ve içindeki elemanları seçiyoruz.
const modal = document.getElementById('cardModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeButton = document.querySelector('.close-button');

// Kartların bulunduğu ızgara alanına bir tıklama dinleyicisi ekliyoruz (Event Delegation).
cardGrid.addEventListener('click', (e) => {
    // Tıklanan elemanın bir kart veya kartın içindeki bir şey olup olmadığını kontrol ediyoruz.
    const clickedCardElement = e.target.closest('.card');
    
    // Eğer bir karta tıklandıysa...
    if (clickedCardElement) {
        // Tıklanan kartın adını HTML'den alıyoruz.
        const cardName = clickedCardElement.querySelector('h3').textContent;
        
        // Bu isme sahip olan kartın tüm verilerini ana `tarotCards` dizimizden buluyoruz.
        const cardData = tarotCards.find(card => card.name === cardName);
        
        // Bulduğumuz verilerle modal penceresinin içeriğini dolduruyoruz.
        modalImage.src = cardData.image;
        modalTitle.textContent = cardData.name;
        modalDescription.textContent = cardData.description;
        
        // Modalı görünür yapıyoruz.
        modal.style.display = 'block';
    }
});

// Kapatma (X) butonuna tıklandığında modalı gizle.
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Modalın dışındaki gri alana tıklandığında modalı gizle.
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});