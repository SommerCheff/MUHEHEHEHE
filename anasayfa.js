let clickCount = 0;

document.getElementById('curtain-content').addEventListener('click', function() {
    clickCount++; // Sayacı arttır

    const kediFoto = document.getElementById('click-image');
    const altyazi = document.getElementById('click-text');

    if (clickCount === 1) {
        // 1. TIKLAMA: Hafif titreme
        kediFoto.className = "shake-1"; 
        altyazi.innerText = "MUEHEHEHE! Cihazını Ele GEÇİRİYORUZ!!\nYardimci Olmak için FOTOĞRAFA TIKLA!!!";
    } 
    else if (clickCount === 2) {
        // 2. TIKLAMA: Orta deprem
        kediFoto.className = "shake-2"; 
        altyazi.innerText = "DAHA SERT BAS İNSAN!!!!";
    } 
    else if (clickCount === 3) {
        // 3. TIKLAMA: Kıyamet depremi
        kediFoto.className = "shake-3"; 
        altyazi.innerText = "DAHA SERT DEDİM İKİ AYAK UZERİNDE DURAN SAPSAL!!!";
    } 
    else if (clickCount === 4) {
        // 4. TIKLAMA: Komik fotoğraf gelir, sallanma hafifler
        kediFoto.className = "shake-1"; 
        kediFoto.src = "yesiluzayli.gif"; // Komik fotoğrafının adı
        altyazi.innerText = "HAYİR GEÇ BUNU ÇABUK BAS!!!\nBU SON ŞANSIN İNSAN KILIĞINDAKİ ŞEY!!!";
    } 
    else if (clickCount === 5) {
        // 5. TIKLAMA: KRİTİK NOKTA! Titreme biter, her şey sıfırlanır ve yavaşça yeni foto/yazı gelir
        kediFoto.className = ""; // Titreşim sınıflarını tamamen sildik
        kediFoto.src = "papa.PNG"; // Son asil fotoğrafının adı
        
        // Yazının 4. etapta kalmaması için burada net olarak yeni metni atıyoruz!
        altyazi.innerText = "Sanirim artık bir anlamı kalmadı... İyice rezil olduk...\nAma 1 kez daha tıklamaktan zarar gelmez!! Sadece 1 kezcik daha tıkla insan kılıklı şey!!";

        // Eski sınıfları tamamen kazıyalım
        kediFoto.classList.remove("fade-in-effect", "shake-1", "shake-2", "shake-3");
        altyazi.classList.remove("fade-in-effect");

        // Tarayıcının animasyonu tetiklemesi için görünümü anlık sıfırlıyoruz (Bilişimci hilesi)
        void kediFoto.offsetWidth;
        void altyazi.offsetWidth;

        // Şimdi ikisine de aynı anda yoktan var olma efektini enjekte ediyoruz
        kediFoto.classList.add("fade-in-effect");
        altyazi.classList.add("fade-in-effect");
    } 
    else if (clickCount === 6) {
        // 6. TIKLAMA: MUTLU SON! Perde kalkar, şov başlar
        const curtain = document.getElementById('black-curtain');
        curtain.style.opacity = '0';
        curtain.style.visibility = 'hidden';

        document.getElementById('main-content').style.display = 'block';
        document.getElementById('launcher-left').style.display = 'block';
        document.getElementById('launcher-right').style.display = 'block';

        const music = document.getElementById('bg-music');
        music.play().catch(error => console.log("Müzik engellendi:", error));

        startConfetti();
    }
});

// startConfetti() fonksiyonun alt tarafta aynen durmaya devam etsin pampa, ona dokunma...

// EL YAPIMI O ESKİ CANAVAR KONFETİ MOTORU (Buna dokunmuyoruz pampa, aynen kalıyor)
function startConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confeties = [];
    const colors = ["#D72323", "#F5EDED", "#333333", "#F4CE14", "#3A98B9"];
    const isMobile = window.innerWidth <= 768;

    function fire(x, angle) {
        const particleCount = isMobile ? 180 : 350;
        for (let i = 0; i < particleCount; i++) {
            confeties.push({
                x: x,
                y: canvas.height - 35, 
                angle: angle + (Math.random() * 1.4 - 0.7), 
                speed: isMobile ? (Math.random() * 16 + 6) : (Math.random() * 26 + 9),              
                radius: isMobile ? (Math.random() * 3.5 + 3.5) : (Math.random() * 6 + 5),              
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: 1,
                gravity: isMobile ? 0.22 : 0.26, 
                drag: 0.95
            });
        }
    }

    if (isMobile) {
        fire(30, -Math.PI / 4);
        fire(canvas.width - 30, -3 * Math.PI / 4);
    } else {
        fire(50, -Math.PI / 4);
        fire(canvas.width - 50, -3 * Math.PI / 4);
    }

    const leftLauncher = document.getElementById('launcher-left');
    const rightLauncher = document.getElementById('launcher-right');

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let currentOpacity = 0;

        confeties.forEach((p, index) => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed;
            p.speed *= p.drag;       
            p.y += p.gravity;         
            p.opacity -= 0.005; 
            currentOpacity = p.opacity;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.fill();

            if (p.opacity <= 0 || p.y > canvas.height) {
                confeties.splice(index, 1);
            }
        });

        if (leftLauncher && rightLauncher) {
            if (currentOpacity > 0) {
                leftLauncher.style.opacity = currentOpacity;
                rightLauncher.style.opacity = currentOpacity;
            } else {
                leftLauncher.style.display = 'none';
                rightLauncher.style.display = 'none';
            }
        }

        if (confeties.length > 0) {
            requestAnimationFrame(update);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    update();
}

window.addEventListener('resize', () => {
    const canvas = document.getElementById("confetti-canvas");
    if(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});