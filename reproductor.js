var medio, play, barra, progreso, maximo, bucle;

function iniciar() {
    maximo = 705; // Ancho de la barra según el CSS
    medio = document.getElementById('medio');
    barra = document.getElementById('barra');
    progreso = document.getElementById('progreso');
    play = document.getElementById('play');

    // Manejadores de eventos de los botones
    play.addEventListener('click', accionPlay, false);
    
    document.getElementById('reiniciar').addEventListener('click', function() {
        medio.currentTime = 0;
    }, false);

    document.getElementById('retrasar').addEventListener('click', function() {
        medio.currentTime = Math.max(0, medio.currentTime - 5);
    }, false);

    document.getElementById('adelantar').addEventListener('click', function() {
        medio.currentTime = Math.min(medio.duration, medio.currentTime + 5);
    }, false);

    document.getElementById('silenciar').addEventListener('click', silenciarVideo, false);

    document.getElementById('masVolumen').addEventListener('click', function() {
        if (medio.volume < 1) medio.volume = Math.min(1, medio.volume + 0.1);
    }, false);

    document.getElementById('menosVolumen').addEventListener('click', function() {
        if (medio.volume > 0) medio.volume = Math.max(0, medio.volume - 0.1);
    }, false);

    barra.addEventListener('click', desplazarMedio, false);
}

function accionPlay() {
    if (!medio.paused && !medio.ended) {
        medio.pause();
        play.value = '\u25BA';
        window.clearInterval(bucle);
    } else {
        medio.play();
        play.value = '||';
        bucle = setInterval(redimensionaBarra, 1000);
    }
}

function redimensionaBarra() {
    if (!medio.ended) {
        var total = parseInt(medio.currentTime * maximo / medio.duration);
        progreso.style.width = total + 'px';
    } else {
        progreso.style.width = '0px';
        play.value = '\u25BA';
        window.clearInterval(bucle);
    }
}

function desplazarMedio(e) {
    var ratonX = e.pageX - barra.offsetLeft;
    var nuevoTiempo = ratonX * medio.duration / maximo;
    medio.currentTime = nuevoTiempo;
    progreso.style.width = ratonX + 'px';
}

function silenciarVideo() {
    if (medio.muted) {
        medio.muted = false;
        this.value = 'silenciar';
    } else {
        medio.muted = true;
        this.value = 'escuchar';
    }
}

// Función extra para cambiar entre los 3 vídeos
function cambiarVideo(ruta) {
    medio.src = ruta;
    medio.load();
    medio.play();
    play.value = '||';
    bucle = setInterval(redimensionaBarra, 1000);
}

window.addEventListener('load', iniciar, false);