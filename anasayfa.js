let clickCount = 0;
let isClickLocked = false; // Telefonlar sapıtmasın diye sihirli kilit amınake

// 🎵 MÜZİK SUSTURMA MOTORU (HTML'deki musicToggleBtn ile tam eşitlendi)
const musicToggleBtn = document.getElementById('musicToggleBtn');
const bgMusic = document.getElementById('bg-music');

if (musicToggleBtn && bgMusic) {
    musicToggleBtn.addEventListener('click', function() {
        if (bgMusic.muted) {
            bgMusic.muted = false;
            musicToggleBtn.classList.remove('music-muted');
            musicToggleBtn.innerText = "🔊"; 
        } else {
            bgMusic.muted = true;
            musicToggleBtn.classList.add('music-muted');
            musicToggleBtn.innerText = "🔇"; 
        }
    });
}

document.getElementById('curtain-content').addEventListener('click', function() {
    if (isClickLocked) return;

    isClickLocked = true;
    setTimeout(() => {
        isClickLocked = false;
    }, 500);

    clickCount++; 

    const kediFoto = document.getElementById('click-image');
    const altyazi = document.getElementById('click-text');

    if (clickCount === 1) {
        kediFoto.className = "shake-1";
        kediFoto.src = "konusankedy.gif";
        altyazi.innerText = "MUEHEHEHE! SENİ KANDIRDIK ESLEM!! BİİZ PİTOPATİPİ UZAYLILARIYIZ!! Cihazını Ele GEÇİRİYORUZ!!\nİş birliği yapmazsan kötü seyler olur. FOTOĞRAFA TIKLAMANI EMREDİYORUZ!!!";
    }
    else if (clickCount === 2) {
        kediFoto.className = "shake-2";
        kediFoto.src = "konusankedy.gif";
        altyazi.innerText = "DAHA SERT BAS İNSAN!!!!";
    }
    else if (clickCount === 3) {
        kediFoto.className = "shake-3";
        kediFoto.src = "konusankedy.gif";
        altyazi.innerText = "DAHA SERT DEDİM SAPSAL!!!";
    }
    else if (clickCount === 4) {
        kediFoto.className = "shake-2";
        kediFoto.src = "kebab.jpg";
        altyazi.innerText = "BU NASIL GELD- ...........";
    }
    else if (clickCount === 5) {
        kediFoto.className = "";
        kediFoto.src = "kebab.jpg";
        altyazi.innerText = "Oh- .......";
    }
    else if (clickCount === 6) {
        kediFoto.className = "";
        kediFoto.src = "ıslak.jpg";
        altyazi.innerText = "....";  
    }
    else if (clickCount === 7) {
        kediFoto.className = "";
        kediFoto.src = "uykulu.jpg";
        altyazi.innerText = "...";  
    }
    else if (clickCount === 8) {
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
        const curtain = document.getElementById('black-curtain');
        curtain.style.opacity = '0';
        
        setTimeout(() => {
            curtain.style.visibility = 'hidden';
            curtain.style.display = 'none'; // Ekrandan tamamen siliyoruz ki arkaya tıklanabilsin
        }, 800);

        document.getElementById('main-content').style.display = 'block';
        
        const leftLauncher = document.getElementById('launcher-left');
        const rightLauncher = document.getElementById('launcher-right');
        if(leftLauncher) leftLauncher.style.display = 'block';
        if(rightLauncher) rightLauncher.style.display = 'block';

        if (bgMusic) {
            bgMusic.play().catch(error => console.log("Müzik engellendi:", error));
        }

        startConfetti();
    }
});

// CANAVAR KONFETİ MOTORU
function startConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;
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

// 🐕 SPAM ENGELLEMELİ PIBBLLE MOTORU (ID'si HTML ile tam eşitlendi!)
const pibbleImg = document.getElementById("pibbleImg");
const osurukSes = document.getElementById("osurukSes"); 
let isOsuruyor = false; 

if (pibbleImg && osurukSes) {
    pibbleImg.addEventListener("click", function() {
        if (isOsuruyor) return; 
        
        isOsuruyor = true;
        pibbleImg.classList.add("pibble-crazy-mode");
        
        pibbleImg.play()
            .then(() => {
                pibbleImg.currentTime = 0; 
            })
            .catch(e => console.log("Video oynatılamadı:", e));
        
        setTimeout(function() {
            osurukSes.currentTime = 0;
            osurukSes.play().catch(e => console.log("Ses oynatılamadı:", e));
        }, 700);

        osurukSes.onended = function() {
            pibbleImg.classList.remove("pibble-crazy-mode");
            isOsuruyor = false;
        };
    });
}