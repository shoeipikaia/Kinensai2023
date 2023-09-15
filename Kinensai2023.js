// カウントダウンタイマーの設定
const endTimes = [
    new Date(2023, 8, 17, 12, 0, 0).getTime(),
    new Date(2023, 8, 17, 15, 0, 0).getTime(),
    new Date(2023, 8, 18, 11, 45, 0).getTime(),
    new Date(2023, 8, 18, 15, 30, 0).getTime()
];

let currentEndTimeIndex = 0;

function updateCountdown() {
    const now = new Date().getTime();
    let distance = endTimes[currentEndTimeIndex] - now;

    if (distance < 0) {
        currentEndTimeIndex++;
        if (currentEndTimeIndex >= endTimes.length) {
            clearInterval(interval);
            document.getElementById("countdown").innerHTML = "オファーは終了しました";
            return;
        }
        distance = endTimes[currentEndTimeIndex] - now;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = "次のオファー開始まで: " + days + "日 " + hours + "時間 " + minutes + "分 " + seconds + "秒";
}

const interval = setInterval(updateCountdown, 1000);

function updateProgressBar() {
    const now = new Date().getTime();
    const distance = endTime - now;
    const totalDuration = 72 * 60 * 60 * 1000; // 72時間
    const progress = 100 - (distance / totalDuration) * 100;

    document.getElementById("progressBar").style.width = progress + "%";
}

    setInterval(updateProgressBar, 1000);

particlesJS("particles-js", {
particles: {
    number: { value: 450, density: { enable: true, value_area: 1200 } },
    color: { value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"] },
    shape: {
    type: "edge",
    stroke: { width: 0, color: "#000000" },
    polygon: { nb_sides: 4 }
    },
    opacity: { value: 0.7, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
    size: { value: 8, random: true, anim: { enable: true, speed: 3, size_min: 2, sync: false } },
    line_linked: { enable: false },
    move: { 
        enable: true, 
        speed: 5, 
        direction: "bottom", 
        random: true, 
        straight: false, 
        out_mode: "out", 
        bounce: false, 
        attract: { enable: false, rotateX: 600, rotateY: 1200 } 
    }
},
interactivity: {
    detect_on: "canvas",
    events: {
    onhover: { enable: false },
    onclick: { enable: false },
    resize: true
    }
},
retina_detect: true
});
