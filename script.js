const html = document.querySelector('html')
const botonEnfoque = document.querySelector('.app__card-button--enfoque')
const botonCorto = document.querySelector('.app__card-button--corto')
const botonLargo = document.querySelector('.app__card-button--largo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botones = document.querySelectorAll('.app__card-button')
const botonMusica = document.querySelector('#alternar-musica')
const musica = new Audio('./sonidos/luna-rise-part-one.mp3')
const comenzar = document.querySelector('#start-pause')
const textoIniciarPausar = document.querySelector('#start-pause span')
const iconoIniciarPausar = document.querySelector('.app__card-primary-butto-icon')
const contadorPantalla = document.querySelector('#timer')




const musicaPlay = new Audio('./sonidos/play.wav')
const musicaBeepCero = new Audio('./sonidos/beep.mp3')
const musicaPause = new Audio('./sonidos/pause.mp3')


let tiempoTranscurridoEnSegundos = 1500
let idIntervalo = null




musica.loop = true

botonMusica.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})



botonEnfoque.addEventListener('click', ()=>{
    tiempoTranscurridoEnSegundos = 1500
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
})


botonCorto.addEventListener('click',()=>{
    tiempoTranscurridoEnSegundos = 300
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
})

botonLargo.addEventListener('click',()=>{
    tiempoTranscurridoEnSegundos = 900
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')
})


// Crea una función llamada "Cambiar Contexto" 
// para automatizar el cambio de imágenes, colores de fondo de los elementos y textos;
function cambiarContexto(contexto){


    mostrarTiempo()
    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src',`./imagenes/${contexto}.png`)

    switch (contexto) {
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;
        case "descanso-corto":
            titulo.innerHTML = `
            ¿Qué tal tomar un respiro? 
            <strong class="app__title-strong">  ¡Haz una pausa corta!</strong> `

            break;
        case "descanso-largo":
            titulo.innerHTML = `
            Hora de volver a la superficie
            <strong class="app__title-strong"> Haz una pausa larga. </strong>
            `    
        default:
            
            break;
    }
}

const cuentaRegresiva = () =>{
    
    if (tiempoTranscurridoEnSegundos <= 0) {
        musicaBeepCero.play()
        alert('Tiempo final')
        reiniciar()
        return
    }
    textoIniciarPausar.textContent = "Pausar"
    iconoIniciarPausar.setAttribute('src', `./imagenes/pause.png`)
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo()
    
}

comenzar.addEventListener('click', iniciarPausar)

function iniciarPausar() {
    
    musicaPlay.play()
    if (idIntervalo) {
        reiniciar()
        return
    }
    idIntervalo = setInterval(cuentaRegresiva,1000)
    
}

function reiniciar(params) {
    musicaPause.play()
    clearInterval(idIntervalo)
    idIntervalo = null
    textoIniciarPausar.textContent = "Comenzar"
    iconoIniciarPausar.setAttribute('src', `./imagenes/play_arrow.png`)
}


function mostrarTiempo(params) {
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000) 
    const tiempoFormateado = tiempo.toLocaleTimeString('es-CO', {minute: '2-digit', second:'2-digit'}) 
    contadorPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo()


















