'use strict'

let computerGuess;
let userGuesses = [];
let attempts = 0;
let maxGuesses;

// Variables de la barra numérica
let low = 1;
let high = 100;

function updateRange(){

    // POSICIÓN Y NUMERACIÓN DEL RANGO 1-100
    const rangeOutput = document.getElementById('rangeOutput');
    rangeOutput.innerText = `${low} - ${high}`;
    rangeOutput.style.marginLeft = low + '%';
    rangeOutput.style.marginRight = 100 - high + '%';
    // ANIMACIÓN: agregamos una clase para animar en CSS
    rangeOutput.classList.add('flash');


    const lowValue = document.getElementById("low");
    lowValue.style.flex = low + '%';
    lowValue.style.background = "#ef7b54";

    const space = document.getElementById("space");
    space.style.flex = high - low + '%';
    space.style.background = "#83e1d0";

    const highValue = document.getElementById("high");
    highValue.style.flex = 100 - high + '%';
    highValue.style.background = "#ef7b54";
}


// INICIALIZÓ LA FUNCIÓN PARA ACABAR EL JUEGO
function gameEnded(){

    // QUE APAREZCA EL BOTON DE JUEGO NUEVO AL ACABAR
    document.getElementById("newGameButton").style.display = "inline";
    document.getElementById('inputBox').setAttribute('readonly', 'readonly');
}

// Función de nuevo juego
function newGame(){
    // Para cargar la ventana 
    window.location.reload();
}

// FUNCIÓN INICIALIZADA EN LA ETIQUEDA BODY
// Con esta función, nos arroja un número random para adivinar
function init(){
    computerGuess = Math.floor(Math.random() * 100 + 1);


    // Desaparecer secciones del juego de la pantalla principal
    document.getElementById("newGameButton").style.display = "none";
    document.getElementById("gameArea").style.display = "none";
}

function startGameView(){

    // Desaparecemos pantalla principal para empezar a jugar
    document.getElementById("welcomeScreen").style.display = "none";

    // Aparecemos la sección del juego
    document.getElementById("gameArea").style.display = "block";

}

function easyMode(){
    // Llamamos la función startGame para que aparezca la sección del juego
    // tras apretar el botón de easyMode
    startGameView();


    maxGuesses = 10;
    
}


function hardMode(){
    // Llamamos la función startGame para que aparezca la sección del juego
    // tras apretar el botón de hardMode
    startGameView();

    maxGuesses = 5;
}

function compareGuess(){
    // Recoger valor numérico del inputBox
    const userGuess = Number(document.getElementById('inputBox').value);
    
    // Agregamos al array de Guesses, el valor de userGuess
    userGuesses.push(" " + userGuess);

    // Que aparezcan los numeros de adivinanza del usuario
    document.getElementById("guesses").innerHTML = userGuesses;


    attempts++;
    document.getElementById("attempts").innerHTML = attempts;

    // SI LOS INTENTOS SON MENORES A LA MAX CANTIDAD DE ADIVINANZAS 
    // ENTONCES QUE SIGA EL JUEGO
    if(attempts < maxGuesses){ 



        // PARA SABER SI EL USUARIO TIENE UN NÚMERO MENOR O MAYO
        if(userGuess > computerGuess){

            // PARA LA BARRA
            if(userGuess < high) high = userGuess;

            // "Tu adivinanza es muy alta"
            document.getElementById("textOutput").innerHTML = 
            "Tu número es alto";

            document.getElementById('inputBox').value = "";


        } else if(userGuess < computerGuess){

            //  PARA LA BARRA EN LA LET LOW
            if(userGuess > low) low = userGuess;

            // "Tu  adivinanza es baja"
            document.getElementById("textOutput").innerHTML = 
            "Tu número es bajo";

            document.getElementById('inputBox').value = "";


        }else {
            // CORRECTO
            document.getElementById("textOutput").innerHTML = 
            
            "Correcto! Necesitaste de " + attempts + " intentos" ;

            // Llamó a la función de juego terminado
            gameEnded();
        }

    }else {

        if(userGuess > computerGuess){
            // "PERDISTE: 
            document.getElementById("textOutput").innerHTML = 
            
            "PERDISTE! <br> El número era: " + computerGuess;
            
            gameEnded();

        } else if(userGuess < computerGuess){
            // "Tu  adivinanza es baja"
            document.getElementById("textOutput").innerHTML = 
            
            "PERDISTE! <br> El número era: " + computerGuess;
        
            gameEnded();

        }else {
            // 
            document.getElementById("textOutput").innerHTML = "Correcto! Necesitaste de " + attempts + " intentos" ;

            gameEnded();
        }

    }

    // Llamó a la función de la barra 
    updateRange();
}