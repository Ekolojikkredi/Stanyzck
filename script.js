// Atık türlerine göre puanlar
const pointsSorted = {
    plastik: 2,
    cam: 3,
    pil: 6,
    elektronik: 5,
    metal: 4,
    kagit: 2,
    yag: 5,
    tekstil: 2
};

const pointsUnsorted = {
    plastik: 1,
    cam: 1,
    pil: 2,
    elektronik: 2,
    metal: 1,
    kagit: 1,
    yag: 2,
    tekstil: 1
};

// Öğrenci verilerini tutacak nesne
let students = {};

// Toplam atık sayacı
let totalWaste = 0;

// Veri girişini işlemek için fonksiyon
function submitData() {
    // Form verilerini al
    const wasteType = document.getElementById('wasteType').value;
    const weight = parseFloat(document.getElementById('wasteWeight').value);
    const sortingStatus = document.getElementById('sortingStatus').value;
    const studentNumber = document.getElementById('studentNumber').value;

    // Gerekli alanların doldurulup doldurulmadığını kontrol et
    if (!studentNumber || isNaN(weight) || weight <= 0 || !wasteType || !sortingStatus) {
        alert("Lütfen tüm alanları düzgün doldurduğunuzdan emin olun.");
        return;
    }

    // Puan hesaplama
    let points = 0;
    if (sortingStatus === "sorted") {
        points = weight * (pointsSorted[wasteType] || 0);
    } else if (sortingStatus === "unsorted") {
        points = weight * (pointsUnsorted[wasteType] || 0);
    }

    // Toplam atık sayaç güncelleme
    totalWaste += weight;
    document.getElementById("totalWasteCounter").innerText = `${totalWaste} kg`;

    // Öğrenci verisini kaydetme
    if (!students[studentNumber]) {
        students[studentNumber] = { totalPoints: 0, wasteEntries: [] };
    }
    
    students[studentNumber].totalPoints += points;
    students[studentNumber].wasteEntries.push({ wasteType, weight, points, sortingStatus });

    alert(`Veri başarıyla kaydedildi. Kazanılan Puan: ${points}`);
    console.log(students);
}

// Öğrenci verilerini görüntülemek için fonksiyon
function viewStudentData() {
    const studentNumber = document.getElementById('viewStudentNumber').value;

    // Öğrenci numarası boşsa uyarı ver
    if (!studentNumber) {
        alert("Lütfen öğrenci numarasını girin.");
        return;
    }

    // Öğrenci verisi bulunamazsa uyarı ver
    if (students[studentNumber]) {
        const student = students[studentNumber];
        let studentInfo = `
            <h3>Öğrenci Numarası: ${studentNumber}</h3>
            <p><strong>Toplam Puan:</strong> ${student.totalPoints}</p>
            <p><strong>Atık Girişleri:</strong></p>
            <ul>`;

        student.wasteEntries.forEach(entry => {
            studentInfo += `
                <li>
                    Tür: ${entry.wasteType}, 
                    Miktar: ${entry.weight} kg, 
                    Durum: ${entry.sortingStatus === "sorted" ? "Ayrıştırıldı" : "Ayrıştırılmadı"},
                    Kazanılan Puan: ${entry.points}
                </li>`;
        });

        studentInfo += `</ul>`;
        document.getElementById('studentData').innerHTML = studentInfo;
    } else {
        alert('Öğrenci bulunamadı!');
        document.getElementById('studentData').innerHTML = '<p>Öğrenci verisi bulunamadı.</p>';
    }
}

// Bilgileri değiştirmek için menüleri gösterme fonksiyonu
function showInfo(section) {
    // Tüm içerik bölmelerini gizle
    const sections = document.querySelectorAll('.info-section');
    sections.forEach(sec => sec.style.display = 'none');
    
    // Seçilen bölümün görünmesini sağla
    const activeSection = document.getElementById(section);
    if (activeSection) {
        activeSection.style.display = 'block';
    }
}

// Başlangıçta ilk bilgi gösterme
showInfo('ekolojikKredi');
