document.querySelector('body').querySelectorAll('*').forEach(element => {
    const nodes = Array.from(element.childNodes);
    nodes.forEach(node => {
        if (node.nodeType === 3) {  // テキストノードの場合
            const replacedText = node.nodeValue.replace(/([\u4E00-\u9FFF]+)/g, '<span class="kanji">$1</span>');
            if (replacedText !== node.nodeValue) {
                const div = document.createElement('div');
                div.innerHTML = replacedText;
                while (div.firstChild) {
                    node.parentNode.insertBefore(div.firstChild, node);
                }
                node.parentNode.removeChild(node);
            }
        }
    });
});



// Function to set the images' src attributes on page load
function setImagesSrc() {
    const images = document.querySelectorAll('.gift-box img');
    const availableImages = ["images/頭囚正方形.png", "images/カイン.png"];
    
    // Set the images' src attributes
    images.forEach((img, index) => {
        if (index !== 4) {
            const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
            img.src = randomImage;
        }
    });
}

let remainingSeconds = 100;

function updateCountdownDisplay() {
    document.getElementById('giftCountdown').textContent = `権利失効まで殘り${remainingSeconds}秒`;
}

function startCountdown() {
    updateCountdownDisplay();
    const countdownInterval = setInterval(() => {
        remainingSeconds -= 1;
        updateCountdownDisplay();

        if (remainingSeconds <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

// Start the countdown when the page loads
window.addEventListener('load', startCountdown);


// Call the function on page load
window.addEventListener('load', setImagesSrc);
// Function to randomize the images except the center one
function randomizeImages() {
    const images = document.querySelectorAll('.gift-box img');
    const middleImage = images[4].src;  // The center image
    let otherImages = Array.from(images).filter((img, index) => index !== 4).map(img => img.src);
    
    // Shuffle the other images
    for (let i = otherImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [otherImages[i], otherImages[j]] = [otherImages[j], otherImages[i]];
    }
    
    // Update the images' src attributes
    images.forEach((img, index) => {
        if (index === 4) {
            img.src = middleImage;
        } else {
            img.src = otherImages.shift();
        }
    });
}

// Call the function on page load
window.addEventListener('load', randomizeImages);


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
    const distance = endTimes - now;
    const totalDuration = 72 * 60 * 60 * 1000; // 72時間
    const progress = 100 - (distance / totalDuration) * 100;

    document.getElementById("progressBar").style.width = progress + "%";
}

setInterval(updateProgressBar, 1000);



// Run adjustLayout on page load and on window resize
window.addEventListener('load', adjustLayout);
window.addEventListener('resize', adjustLayout);


function adjustLayout() {
    const baseElement = document.querySelector('.base');
    const baseWidth = baseElement.offsetWidth;

    // Calculate the image size (e.g., if base width is 600px, set image size to 100px)
    const imageSize = baseWidth / 5;  // Adjust this calculation as needed
    document.documentElement.style.setProperty('--dynamic-image-size', `${imageSize}px`);

    // Calculate the gap based on the base width and image size
    const numberOfImages = 3;  // Number of images in a row
    const gap = (baseWidth - (numberOfImages * imageSize)) / (numberOfImages + 1);
    document.documentElement.style.setProperty('--dynamic-gap', `${gap}px`);
}


function showContainer() {
    document.querySelector('.container').style.display = 'block';
    document.querySelector('.gift-container').style.display = 'none';
    particlesJS("particles-js-2", {
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
}








// Function to copy the link to the clipboard
function copyLink() {
    const textArea = document.createElement('textarea');
    textArea.value = 'https://shoeipikaia.github.io/Kinensai2023/';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('リンクがコピーされました！');
}
