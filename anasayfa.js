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

    function fire(x, angle) {
        for (let i = 0; i < 250; i++) {
            confeties.push({
                x: x,
                y: canvas.height - 30, 
                angle: angle + (Math.random() * 1.4 - 0.7), 
                speed: Math.random() * 24 + 8,              
                radius: Math.random() * 4 + 4,              
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: 1,
                gravity: 0.25,
                drag: 0.95
            });
        }
    }

    // Sol ve Sağ köşelerden fırlat
    fire(40, -Math.PI / 4);
    fire(canvas.width - 40, -3 * Math.PI / 4);

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
            p.opacity -= 0.006; 

            // Kâğıtların o anki şeffaflık durumunu emojilere de aktarmak için yakalıyoruz
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

        // Kâğıtlar şeffaflaştıkça köşedeki sabit emojileri de aynı oranda eritip siliyoruz!
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