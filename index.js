const partyButton = document.querySelector('.js-party');
const wishButton = document.querySelector('.js-wish');
const blowButton = document.querySelector('.js-blow');
const cakeButton = document.querySelector('.js-cake');
const closeNoteButton = document.querySelector('.blow-note__close');
const blowNote = document.querySelector('.blow-note');
const cakeCandles = document.querySelectorAll('.candles span');
const body = document.body;
const confettiContainer = document.querySelector('.confetti-container');

const colors = ['#ff4ec4', '#ffcd3c', '#6c9bff', '#a75cff', '#40e0d0', '#ff6a8a'];

function createConfetti() {
    const count = 30;
    for (let i = 0; i < count; i += 1) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.top = `${Math.random() * -15}%`;
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        piece.style.width = `${10 + Math.random() * 10}px`;
        piece.style.height = `${8 + Math.random() * 12}px`;
        piece.style.opacity = `${0.75 + Math.random() * 0.25}`;

        const duration = 2000 + Math.random() * 1400;
        piece.animate([
            { transform: piece.style.transform + ' translateY(0)', opacity: 1 },
            { transform: piece.style.transform + ` translateY(${window.innerHeight + 100}px) rotate(${720 + Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration,
            easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
            fill: 'forwards'
        });

        confettiContainer.appendChild(piece);
        setTimeout(() => piece.remove(), duration + 150);
    }
}

function togglePartyMode() {
    const isParty = body.classList.toggle('party-mode');
    partyButton.textContent = isParty ? 'Chill mode' : 'Party mode';
    createConfetti();
}

function showBlowNote() {
    cakeCandles.forEach((candle) => candle.classList.add('blown'));
    blowNote.classList.add('visible');
    createConfetti();
}

function hideBlowNote() {
    blowNote.classList.remove('visible');
}

function scrollToWish(event) {
    event.preventDefault();
    document.querySelector('#message').scrollIntoView({ behavior: 'smooth' });
    createConfetti();
}

function animateText() {
    const title = document.querySelector('.hero h1');
    const letters = title.textContent.split('');
    title.textContent = '';
    letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(18px)';
        span.style.transition = `transform 0.35s ease ${index * 0.05}s, opacity 0.35s ease ${index * 0.05}s`;
        title.appendChild(span);
        requestAnimationFrame(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        });
    });
}

function createGlow() {
    const cake = document.querySelector('.cake');
    cake.animate([
        { boxShadow: 'inset 0 16px 24px rgba(255,255,255,0.36), 0 24px 45px rgba(164,40,147,0.24)' },
        { boxShadow: 'inset 0 16px 24px rgba(255,255,255,0.45), 0 24px 55px rgba(203, 50, 191, 0.35)' }
    ], {
        duration: 1800,
        direction: 'alternate',
        iterations: Infinity,
        easing: 'ease-in-out'
    });
}

function init() {
    const audio = document.querySelector('.background-audio');

    if (wishButton) wishButton.addEventListener('click', scrollToWish);
    if (partyButton) partyButton.addEventListener('click', togglePartyMode);
    animateText();
    createGlow();
    if (blowButton) blowButton.addEventListener('click', showBlowNote);
    if (cakeButton) {
        cakeButton.addEventListener('click', showBlowNote);
        cakeButton.addEventListener('keypress', (event) => {
            if (event.key === 'Enter' || event.key === ' ') showBlowNote();
        });
    }
    if (closeNoteButton) closeNoteButton.addEventListener('click', hideBlowNote);
    if (audio) {
        audio.play().catch(() => {
            // Some browsers prevent autoplay without user interaction.
        });
    }
    window.addEventListener('mousemove', (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 24;
        const y = (event.clientY / window.innerHeight - 0.5) * 24;
        document.querySelector('.hero').style.transform = `translate(${x}px, ${y}px)`;
    });
}

init();
