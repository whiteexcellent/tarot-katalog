// --- Adım 1: Kart Veritabanımızı Oluşturalım ---

// Her bir kartı bir nesne olarak tanımlayıp, tüm kartları bir dizi (array) içinde saklayacağız.
const tarotCards = [
    {
        name: 'Joker',
        image: 'images/joker.jpg',
        upright: 'Düz anlamı: Joker kartı yeni başlangıçları, masumiyeti, macerayı ve potansiyeli temsil eder...',
        reversed: 'Ters anlamı: Dikkatsizliği, pervasızlığı, gereksiz riskler almayı ve hazırlıksızlığı simgeler...'
    },
    {
        name: 'Büyücü',
        image: 'images/buyucu.jpg',
        upright: 'Düz anlamı: Büyücü kartı irade gücünü, yaratıcılığı, beceriyi ve kaynakları doğru kullanmayı temsil eder. Elindeki araçlarla istediklerini gerçekleştirme gücüne sahiptir.',
        reversed: 'Büyücü, irade gücünü, yaratıcılığı, beceriyi ve kaynakları doğru kullanmayı temsil eder. Elindeki araçlarla istediklerini gerçekleştirme gücüne sahiptir.'
    },
    {
        name: 'Azize',
        image: 'images/azize.jpg',
        upright: 'Azize kartı sezgiyi, gizemi, bilinçaltını ve saklı bilgiyi simgeler. Olayların ardındaki derin anlamları ve görünmeyeni temsil eder.',
        description: 'Azize kartı sezgiyi, gizemi, bilinçaltını ve saklı bilgiyi simgeler. Olayların ardındaki derin anlamları ve görünmeyeni temsil eder.'
    },
    {
        name: 'İmparatoriçe',
        image: 'images/imparatorice.jpg',
        upright: '',
        description: 'İmparatoriçe; doğurganlığı, bereketi, doğayı ve anneliği temsil eder. Yaratıcılığın, şefkatin ve duygusal zenginliğin kartıdır.'
    },
    {
        name: 'İmparator',
        image: 'images/imparator.jpg',
        upright: '',
        description: 'İmparator, otoriteyi, yapıyı, düzeni ve babalığı simgeler. Mantık, disiplin ve liderlik ile hedeflere ulaşmayı temsil eder.'
    },
    {
        name: 'Aşıklar',
        image: 'images/asiklar.jpg',
        upright: 'Aşıklar kartı, ilişkileri, seçimleri, uyumu ve değerleri temsil eder. Önemli bir karar anını veya bir birlikteliği simgeler.',
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
    const clickedCardElement = e.target.closest('.card');
    if (clickedCardElement) {
        // Gerekli verileri ve HTML elementlerini seçiyoruz
        const cardName = clickedCardElement.querySelector('h3').textContent;
        const cardData = tarotCards.find(card => card.name === cardName);
        const modalContent = document.querySelector('.modal-content');
        const modalTitle = document.getElementById('modalTitle');
        const modalUpright = document.getElementById('modalUpright');
        const modalReversed = document.getElementById('modalReversed');
        const readMoreBtn = document.getElementById('read-more-btn');

        // Modal içeriğini dolduruyoruz
        modalTitle.textContent = cardData.name;
        
        // --- UZUN METİN KONTROL MANTIĞI ---

        const characterLimit = 1500; // Karakter limiti
        const fullUprightText = cardData.description || cardData.upright || ''; // Önce 'description', sonra 'upright' verisini ara

        // Başlamadan önce butonu her zaman gizle
        readMoreBtn.style.display = 'none';

        if (fullUprightText.length > characterLimit) {
            // Metin limitten uzunsa...
            const truncatedText = fullUprightText.substring(0, characterLimit);
            modalUpright.textContent = truncatedText + "...";
            readMoreBtn.style.display = 'block'; // Butonu göster

            // Butona tıklandığında metnin tamamını göster ve butonu tekrar gizle
            readMoreBtn.onclick = function() {
                modalUpright.textContent = fullUprightText;
                readMoreBtn.style.display = 'none';
            };
        } else {
            // Metin limitten kısaysa, tamamını direkt göster
            modalUpright.textContent = fullUprightText;
        }

        // Ters anlam metni varsa göster, yoksa boş bırak
        modalReversed.textContent = cardData.reversed || ''; 

        // Arka plan resmini ayarlıyoruz
        modalContent.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${cardData.image}')`;
        
        // Pencereyi görünür yapıyoruz
        modal.style.display = 'flex';
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

// --- Tema Değiştirme Mantığı ---

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Sayfa yüklendiğinde kullanıcının son seçimini kontrol et
// Eğer localStorage'da 'dark' teması kayıtlıysa uygula
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.textContent = 'Aydınlık Mod'; // Düğme metnini güncelle
}

// Düğmeye tıklandığında temayı değiştir
themeToggle.addEventListener('click', () => {
    // body elementindeki 'dark-theme' sınıfını ekle/kaldır
    body.classList.toggle('dark-theme');

    // Kullanıcının seçimini tarayıcı hafızasına kaydet
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = 'Aydınlık Mod'; // Düğme metnini güncelle
    } else {
        localStorage.removeItem('theme');
        themeToggle.textContent = 'Karanlık Mod'; // Düğme metnini eski haline getir
    }
});
