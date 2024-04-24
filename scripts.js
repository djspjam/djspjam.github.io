document.addEventListener('DOMContentLoaded', function() {
    const misaDate = new Date('May 24, 2024 19:00:00').getTime();
    const recepcionDate = new Date('May 24, 2024 20:00:00').getTime();

    document.getElementById('name-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const userName = document.getElementById('user-name').value;
        document.getElementById('sobreContainer').style.display = 'flex'; 
        document.getElementById('name-form-container').style.display = 'none'; 
        personalizeInvitation(userName); 
    });

    document.getElementById('sobre').addEventListener('click', function() {
        document.getElementById('invitacion').style.display = 'block';
        document.getElementById('sobreContainer').style.display = 'none'; 
        applyDropInAnimation();
    });

    function personalizeInvitation(name) {
        const personalizedNameElement = document.getElementById('personalized-name');
        personalizedNameElement.textContent = `Gracias por asistir a mi evento, ${name}`;
    }

    function applyDropInAnimation() {
        document.querySelectorAll('.section h2').forEach(function(element) {
            element.classList.add('drop-in');
        });
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
});

