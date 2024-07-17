// Typing effect
const typingElement = document.getElementById('typing-effect');
const texts = ['Information Technology Professional', 'Problem Solver', 'Programmer'];
let textIndex = 0;
let charIndex = 0;

function typeText() {
    if (charIndex < texts[textIndex].length) {
        typingElement.textContent += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    } else {
        setTimeout(eraseText, 2000);
    }
}

function eraseText() {
    if (charIndex > 0) {
        typingElement.textContent = texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, 500);
    }
}

typeText();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Menu toggle
const menuIcon = document.querySelector('.menu-icon');
const menuItems = document.querySelector('.menu-items');

menuIcon.addEventListener('mouseenter', () => {
    menuItems.style.display = 'block';
});

menuItems.addEventListener('mouseleave', () => {
    menuItems.style.display = 'none';
});

// Interactive cursor
const cursorFollower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursorFollower.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursorFollower.style.transform = 'scale(1)';
});

// Hover effect for cards
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        cursorFollower.style.transform = 'scale(1.5)';
    });

    card.addEventListener('mouseleave', () => {
        cursorFollower.style.transform = 'scale(1)';
    });
});

// p5.js animation
let particles = [];

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
}

function draw() {
    clear();
    
    if (random(1) < 0.1) {
        particles.push(new Particle());
    }
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();
        if (particles[i].isFinished()) {
            particles.splice(i, 1);
        }
    }
}
class Particle {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.size = random(5, 15);
        this.color = color(255, 105, 180, 100);
        this.speedX = random(-1, 1);
        this.speedY = random(-1, 1);
        this.life = 255;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 2;
        
        // Interact with cursor
        let d = dist(this.x, this.y, mouseX, mouseY);
        if (d < 50) {
            let angle = atan2(this.y - mouseY, this.x - mouseX);
            this.x += cos(angle) * 2;
            this.y += sin(angle) * 2;
        }
    }
    
    display() {
        noStroke();
        fill(red(this.color), green(this.color), blue(this.color), this.life);
        ellipse(this.x, this.y, this.size);
    }
    
    isFinished() {
        return this.life < 0;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Cursor interaction with particles
function mouseMoved() {
    particles.forEach(particle => {
        let d = dist(particle.x, particle.y, mouseX, mouseY);
        if (d < 50) {
            let angle = atan2(particle.y - mouseY, particle.x - mouseX);
            particle.x += cos(angle) * 5;
            particle.y += sin(angle) * 5;
        }
    });
}

// Add new particles on click
function mouseClicked() {
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle());
    }
}