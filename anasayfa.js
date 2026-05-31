let clickCount = 0;
let isClickLocked = false; // Telefonlar sapıtmasın diye koyduğumuz sihirli kilit amınake

document.getElementById('curtain-content').addEventListener('click', function() {
    // Eğer kilit aktifse (yani telefon çok hızlı üst üste tıklamaya çalışıyorsa) işlemi engelle
    if (isClickLocked) return;

    // Kilidi devreye sok
    isClickLocked = true;
    
    // Yarım saniye (500ms) sonra kilidi tekrar aç ki bir sonraki tıkı atabilsin
    setTimeout(() => {
        isClickLocked = false;
    }, 500);

    clickCount++; // Şimdi sayacı güvenle 1 arttırabiliriz pampa

    const kediFoto = document.getElementById('click-image');
    const altyazi = document.getElementById('click-text');

    if (clickCount === 1) {
        // 1. TIKLAMA: Hafif titreme
        kediFoto.className = "shake-1"; 
         kediFoto.src = "konusankedy.gif";
        altyazi.innerText = "MUEHEHEHE! SENİ KANDIRDIK ESLEM!! BİİZ PİTOPATİPİ UZAYLILARIYIZ!! Cihazını Ele GEÇİRİYORUZ!!\nİş birliği yapmazsan kötü seyler olur. FOTOĞRAFA TIKLAMANI EMREDİYORUZ!!!";
    } 
    else if (clickCount === 2) {
        // 2. TIKLAMA: Orta deprem
        kediFoto.className = "shake-2"; 
         kediFoto.src = "konusankedy.gif";
        altyazi.innerText = "DAHA SERT BAS İNSAN!!!!";
    } 
    else if (clickCount === 3) {
        // 3. TIKLAMA: Kıyamet depremi
        kediFoto.className = "shake-3"; 
         kediFoto.src = "konusankedy.gif";
        altyazi.innerText = "DAHA SERT DEDİM SAPSAL!!!";
    } 
    else if (clickCount === 4) {
        // 4. TIKLAMA: Komik fotoğraf gelir, sallanma hafifler
        kediFoto.className = "shake-2"; 
        kediFoto.src = "kebab.jpg"; 
        altyazi.innerText = "BU NASIL GELD- ...........";
    } 
      else if (clickCount === 5) {
        // 4. TIKLAMA: Komik fotoğraf gelir, sallanma hafifler
        kediFoto.className = ""; 
        kediFoto.src = "kebab.jpg"; 
        altyazi.innerText = "Oh- .......";
    } 
      else if (clickCount === 6) {
        // 4. TIKLAMA: Komik fotoğraf gelir, sallanma hafifler
        kediFoto.className = ""; 
        kediFoto.src = "ıslak.jpg"; 
        altyazi.innerText = "....";   
    } 
     else if (clickCount === 7) {
        // 4. TIKLAMA: Komik fotoğraf gelir, sallanma hafifler
        kediFoto.className = ""; 
        kediFoto.src = "uykulu.jpg"; 
        altyazi.innerText = "...";   
    } 
    else if (clickCount === 8) {
        // 5. TIKLAMA: KRİTİK NOKTA! Titreme biter, yavaşça yeni foto/yazı gelir
        kediFoto.className = ""; 
        kediFoto.src = "papa.png"; 
        
        altyazi.innerText = "... Bütün bir yolcuğumun böyle utanç duruma düşmem için miydi? Onurum kırıldı. \n Tıklayıp tıklamaman artık umrumda değil. İstersen tıkla sen bilirsin...";

        kediFoto.classList.remove("fade-in-effect", "shake-1", "shake-2", "shake-3");
        altyazi.classList.remove("fade-in-effect");

        void kediFoto.offsetWidth;
        void altyazi.offsetWidth;

        kediFoto.classList.add("fade-in-effect");
        altyazi.classList.add("fade-in-effect");
    } 
    else if (clickCount === 9) {
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


// 🐕 SPAM ENGELLEMELİ PIBBLLE MOTORU (Satır 191 ve sonrasına bunu yapıştır bradar)
const pibbleImg = document.getElementById("pibbleImg");
const osurukSes = document.getElementById("osurukses"); // Küçük harfli ID ile eşitlendi!
let isOsuruyor = false; // İşte o muazzam emniyet kilidi amınake!

if (pibbleImg && osurukSes) {
    pibbleImg.addEventListener("click", function() {
        if (isOsuruyor) return; // Eğer hayvan zaten osuruyorsa yeni tıklamayı engelle!
        
        isOsuruyor = true;
        pibbleImg.classList.add("pibble-crazy-mode");
        
        pibbleImg.currentTime = 0;
        pibbleImg.play().catch(e => console.log("Video oynatılamadı:", e));
        
        // Tam dumanın çıktığı 1. saniyede (1000ms) ses devreye girer
        setTimeout(function() {
            osurukSes.currentTime = 0;
            osurukSes.play().catch(e => console.log("Ses oynatılamadı:", e));
        }, 1000); 

        // Ses bittiği an her şeyi sıfırla ve kilidi aç amınake
        osurukSes.onended = function() {
            pibbleImg.classList.remove("pibble-crazy-mode");
            isOsuruyor = false; 
        };
    });
}