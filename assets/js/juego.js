/**
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Treboles)
 * 2H = Two of Hearts (Treboles)
 * 2S = Two of Spades (Treboles)
 */

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0, puntosComputadora = 0;

const btnNuevo = document.querySelector("#btnNuevo");
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");

const imagenes = document.querySelector("#jugador-cartas");

const puntajeJugador = document.querySelectorAll('small');


const crearDeck = ()=>{
    for(let i = 2; i<=10;i++){
        for (let tipo of tipos) {
        deck.push(i+tipo+'.png');
        }

    }
    for(let espe of especiales){
        for (let tipo of tipos) {
            deck.push(espe+tipo+'.png');
            }
    }
    deck = _.shuffle(deck);
    return deck;
}

crearDeck();

const pedirCarta =()=>{
    if(deck.length===0){
        throw 'There are no cards in the deck';
    }
    let carta = deck.pop();
    return carta;
}



const valorCarta = (carta)=>{
    const valor = carta.substring(0,carta.length-5);
    return  (isNaN(valor)) ?
            (valor=='A') ? 11:10
            :valor*1;
}

const mostrarCarta = (carta)=>{
    let imagen = document.createElement('img');
    imagen.src = `assets/cartas/${carta}`;
    imagen.classList.add('carta');
    imagenes.append(imagen);
}

//events

btnNuevo.addEventListener('click',()=>{
    deck = [];
    crearDeck();
    puntajeJugador[0].innerText = 0;
    puntosJugador = 0;
    while(imagenes.firstChild){
        imagenes.removeChild(imagenes.firstChild);
    }
    btnPedir.disabled = false;
    btnDetener.disabled = false;
});

btnPedir.addEventListener('click',() =>{
    console.log(deck);
    const carta = pedirCarta();
    mostrarCarta(carta);
    puntosJugador+=valorCarta(carta);
    puntajeJugador[0].innerHTML = puntosJugador;

    if(puntosJugador>21){
        console.warn('Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }else if(puntosJugador===21){
        console.warn('21, Genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }
});