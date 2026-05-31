document.getElementById('curtain-content').addEventListener('click', function() {
    // 1. Siyah Perdeyi Akıcı Şekilde Kaldır
    const curtain = document.getElementById('black-curtain');
    curtain.style.opacity = '0';
    curtain.style.visibility = 'hidden';

    // 2. Ana İçeriği Göster
    document.getElementById('main-content').style.display = 'block';

    // 3. Müziği Başlat
    const music = document.getElementById('bg-music');
    music.play().catch(error => console.log("Müzik engellendi:", error));

    // 4. Sabit Emojileri Görünür Yap ve Konfeti Yağmurunu Başlat
    const leftLauncher = document.getElementById('launcher-left');
    const rightLauncher = document.getElementById('launcher-right');
    
    if (leftLauncher && rightLauncher) {
        leftLauncher.style.display = 'block';
        leftLauncher.style.opacity = '1';
        rightLauncher.style.display = 'block';
        rightLauncher.style.opacity = '1';
    }

    startConfetti();
});

function startConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confeties = [];
    const colors = ["#D72323", "#F5EDED", "#333333", "#F4CE14", "#3A98B9"];

    // Cihaz mobil mi?
    const isMobile = window.innerWidth <= 768;

    function fire(x, angle) {
        // İSTEĞİN: Konfeti miktarını arttırdık! PC'de 350, mobilde 180 adet canavar fırlayacak
        const particleCount = isMobile ? 180 : 350;

        for (let i = 0; i < particleCount; i++) {
            confeties.push({
                x: x,
                y: canvas.height - 35, 
                angle: angle + (Math.random() * 1.4 - 0.7), // O efsane çılgın saçılma açısı
                speed: isMobile ? (Math.random() * 16 + 6) : (Math.random() * 26 + 9),              
                // İSTEĞİN: Konfeti kağıtlarının boyutunu (radius) gözle görülür şekilde büyüttük!
                radius: isMobile ? (Math.random() * 3.5 + 3.5) : (Math.random() * 6 + 5),              
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: 1,
                gravity: isMobile ? 0.22 : 0.26, 
                drag: 0.95
            });
        }
    }

    // Sol ve Sağ köşelerdeki 🎉 emojilerinin tam göbeğinden ateşle
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
            p.opacity -= 0.005; // Havada süzülme süresini bir tık uzattım, şov sürsün diye

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