/**
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Treboles)
 * 2H = Two of Hearts (Treboles)
 * 2S = Two of Spades (Treboles)
 */

(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0, puntosComputadora = 0;

    const btnNuevo = document.querySelector("#btnNuevo");
    const btnPedir = document.querySelector("#btnPedir");
    const btnDetener = document.querySelector("#btnDetener");

    const imagenesJugador = document.querySelector("#jugador-cartas");
    const imagenesComputer = document.querySelector("#computadora-cartas");

    const puntajes = document.querySelectorAll('small');


    const crearDeck = () => {
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo + '.png');
            }

        }
        for (let espe of especiales) {
            for (let tipo of tipos) {
                deck.push(espe + tipo + '.png');
            }
        }
        deck = _.shuffle(deck);
        return deck;
    }

    crearDeck();

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'There are no cards in the deck';
        }
        let carta = deck.pop();
        return carta;
    }



    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 5);
        return (isNaN(valor)) ?
            (valor == 'A') ? 11 : 10
            : valor * 1;
    }



    //turn computer

    const turnComputer = (pointsMin) => {
        do {
            const carta = pedirCarta();

            puntosComputadora += valorCarta(carta);
            puntajes[1].innerHTML = puntosComputadora;

            let imagen = document.createElement('img');
            imagen.src = `assets/cartas/${carta}`;
            imagen.classList.add('carta');
            imagenesComputer.append(imagen);
            console.log(puntosComputadora);

            if (pointsMin > 21) {
                break;
            }
        } while ((puntosComputadora < pointsMin) && (pointsMin <= 21));

        setTimeout(() => {
            if (puntosComputadora === pointsMin) {
                alert('Nobody wins');
            } else if (pointsMin > 21) {
                alert('Computer win');
            } else if (puntosComputadora > 21) {
                alert('WIN');
            } else {
                alert('Computer win');
            }
        }, 10);
    }

    //events

    btnNuevo.addEventListener('click', () => {
        deck = [];
        crearDeck();
        puntajes[0].innerText = 0;
        puntajes[1].innerText = 0;
        puntosJugador = 0;
        puntosComputadora = 0;

        imagenesComputer.innerHTML = '';
        imagenesJugador.innerHTML = '';
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();

        puntosJugador += valorCarta(carta);
        puntajes[0].innerHTML = puntosJugador;

        const imagen = document.createElement('img');
        imagen.src = `assets/cartas/${carta}`;
        imagen.classList.add('carta');
        imagenesJugador.append(imagen);


        if (puntosJugador > 21) {
            console.warn('Perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnComputer(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21, Genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnComputer(puntosJugador);

        }
    });

    btnDetener.addEventListener('click', () => {
        turnComputer(puntosJugador);
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    });

})();



