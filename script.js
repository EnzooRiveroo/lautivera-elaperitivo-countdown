//* FUNCION PARA EL BOTÓN DE ENVIAR Y EMAILJS *//

function handleSubmit() {

    const emailInput = document.getElementById('email');
    const submitBtn = document.getElementById('submit-btn');

    const emailValue = emailInput.value.trim();

    if (!emailValue) {
        alert("Por favor, introduce un correo válido.");
        return;
    }

    // INICIO DE CARGA/ANIMACIÓN
    submitBtn.classList.remove('sent');
    submitBtn.textContent = 'Enviando...';
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // LLAMADA REAL A EMAILJS
    emailjs.send("service_lautielaperitivo", "template_2416td5", {
        email: emailValue
    })
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            setTimeout(() => {
                // 3. TRANSICIÓN A 'ENVIADO' (Éxito)
                submitBtn.classList.remove('loading');
                submitBtn.style.fontSize = '';
                submitBtn.textContent = 'Enviado ✔';
                submitBtn.classList.add('sent');
                emailInput.value = '';

                // 4. RESET DEL BOTÓN
                setTimeout(() => {
                    submitBtn.classList.remove('sent');
                    submitBtn.textContent = 'Enviar';
                    submitBtn.disabled = false;
                }, 1500);
            }, 1500);

        }, (error) => {
            console.error('FAILED...', error);
            alert('Hubo un error al enviar el correo. Por favor, inténtalo de nuevo.');
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Enviar';
            submitBtn.disabled = false;
        });
}

//* INICIO: FUNCIÓN PARA EL CONTADOR CON EFECTO FLIP-CARD *//

function updateFlipCard(element, newValue) {
    const currentValue = element.textContent;

    if (newValue === currentValue) return;
    const top = document.createElement('div');
    top.classList.add('top-half');
    top.textContent = currentValue;

    const bottom = document.createElement('div');
    bottom.classList.add('bottom-half');
    bottom.textContent = newValue;

    const newTop = document.createElement('div');
    newTop.classList.add('top-half', 'new-top-half');
    newTop.textContent = newValue;
    element.textContent = newValue;
    element.append(top, newTop, bottom);
    newTop.addEventListener('animationstart', () => {
        element.style.color = 'transparent';
    });

    newTop.addEventListener('animationend', () => {
        top.remove();
        newTop.remove();
        bottom.remove();
        element.style.color = 'white';
    });
}

function startCountdown() {
    // Fecha y hora(10 de enero de 2026)
    const countdownDate = new Date("January 10, 2026 20:30:00").getTime(); 
    // Referencias del DOM (las obtengo)
    const dTen = document.querySelector('[data-days-tens]');
    const dUnit = document.querySelector('[data-days-units]');
    const hTen = document.querySelector('[data-hours-tens]');
    const hUnit = document.querySelector('[data-hours-units]');
    const mTen = document.querySelector('[data-minutes-tens]');
    const mUnit = document.querySelector('[data-minutes-units]');
    const sTen = document.querySelector('[data-seconds-tens]');
    const sUnit = document.querySelector('[data-seconds-units]');
    
    // Función principal de actualización
    const updateTime = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        // Cuando termine el contador
        if (distance < 0) {
            clearInterval(x);
            const countdownElement = document.getElementById("countdown");
            if (countdownElement) {
                countdownElement.innerHTML = "<div class='finished-message'>¡YA DISPONIBLE: EL APERITIVO!</div>";
            }
            return;
        }

        // Cálculos de tiempo
        const totalSeconds = Math.floor(distance / 1000);
        const days = Math.floor(totalSeconds / (60 * 60 * 24));
        const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;
        const strDays = String(days);
        const strHours = String(hours).padStart(2, '0');
        const strMinutes = String(minutes).padStart(2, '0');
        const strSeconds = String(seconds).padStart(2, '0');
        let daysTens = '0';
        let daysUnits = '0';

        if (strDays.length === 1) {
            daysTens = '0';
            daysUnits = strDays[0];
        } else if (strDays.length >= 2) {
            daysTens = strDays[strDays.length - 2];
            daysUnits = strDays[strDays.length - 1];
        }
        updateFlipCard(dTen, daysTens);
        updateFlipCard(dUnit, daysUnits);

        updateFlipCard(hTen, strHours[0]);
        updateFlipCard(hUnit, strHours[1]);

        updateFlipCard(mTen, strMinutes[0]);
        updateFlipCard(mUnit, strMinutes[1]);

        updateFlipCard(sTen, strSeconds[0]);
        updateFlipCard(sUnit, strSeconds[1]);
    };
    updateTime();
    // Actualiza el contador cada 1 segundo
    const x = setInterval(updateTime, 1000);
}
document.addEventListener('DOMContentLoaded', startCountdown);