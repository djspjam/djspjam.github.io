document.addEventListener('DOMContentLoaded', function() {
    const misaDate = new Date('May 24, 2024 19:00:00').getTime();
    const recepcionDate = new Date('May 24, 2024 20:00:00').getTime();

    const audioElement = document.getElementById('background-audio');
    const audioButton = document.getElementById('audio-control');

    audioButton.addEventListener('click', function() {
        if (audioElement.paused) {
            audioElement.play();
            audioButton.textContent = '🔊'; // Icono de altavoz activado
        } else {
            audioElement.pause();
            audioButton.textContent = '🔇'; // Icono de altavoz desactivado
        }
    });

    const nameForm = document.getElementById('name-form');
    const sobreContainer = document.getElementById('sobreContainer');
    const invitacion = document.getElementById('invitacion');
    const userNameInput = document.getElementById('user-name');
    const personalizedElement = document.getElementById('personalized-name');
    const rsvpForm = document.getElementById('rsvp-form');
    const guestsNumberSelect = document.getElementById('guests-number');
    const guestNameInput = document.getElementById('guest-name'); // Asegúrate de que el ID es correcto.

    nameForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const userName = userNameInput.value.trim();
        if (userName) {
            sobreContainer.style.display = 'flex'; 
            nameForm.parentNode.style.display = 'none'; 
            personalizeInvitation(userName); 
        }
    });

    document.getElementById('sobre').addEventListener('click', function() {
        invitacion.style.display = 'block';
        sobreContainer.style.display = 'none'; 
        applyDropInAnimation();
    });

    function personalizeInvitation(name) {
        personalizedElement.textContent = `Gracias por asistir a mi evento, ${name}`;
    }

    function applyDropInAnimation() {
        document.querySelectorAll('.section h2').forEach(element => element.classList.add('drop-in'));
    }

    function updateCountdown() {
        const now = new Date().getTime();
        updateEventCountdown(misaDate, 'misa-countdown', now);
        updateEventCountdown(recepcionDate, 'recepcion-countdown', now);
    }

    function updateEventCountdown(eventDate, elementId, now) {
        let timeleft = eventDate - now;
        let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        document.getElementById(elementId).innerHTML = `
            <div class="countdown-container">
                <span class="countdown-box">${days}<span class="countdown-label"> días</span></span>
                <span class="countdown-box">${hours}<span class="countdown-label"> horas</span></span>
                <span class="countdown-box">${minutes}<span class="countdown-label"> minutos</span></span>
                <span class="countdown-box">${seconds}<span class="countdown-label"> segundos</span></span>
            </div>
        `;
    }

    setInterval(updateCountdown, 1000);

    function showSlides() {
        let slides = document.querySelectorAll('.carousel .slides img');
        slides.forEach(slide => slide.style.display = "none");
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].style.display = "block";  
        setTimeout(showSlides, 5000); // Change image every 5 seconds
    }

    rsvpForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const guestName = guestNameInput.value.trim();
        const guestsNumber = guestsNumberSelect.value;
        const whatsappMessage = `Hola, ${guestName} confirma ${guestsNumber} asistentes.`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/+525548528300?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    });

    showSlides();
});
