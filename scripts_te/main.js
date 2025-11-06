Swal.fire({
    title: "Ingresa tu nombre de usuario",
    input: "text",
    inputAttributes: {
    autocapitalize: "off"
    },
    confirmButtonText: "Continuar",
    showLoaderOnConfirm: true,
    preConfirm: async (nombre) => {
        if (!nombre || nombre === "") {
        Swal.showValidationMessage("Por favor ingresa un nombre");
        return false;
        }
        return nombre;
    },
    allowOutsideClick: () => !Swal.isLoading()
}).then((result) => {
    if (result.isConfirmed) {
        const nombreJugador = result.value;
        localStorage.setItem("jugador", nombreJugador)
    Swal.fire({
        icon: "success",
        title: `Bienvenido ${nombreJugador}`,
        text: "Tu nombre fue guardado correctamente"
    });
    }
});

let paisAdivinar = document.getElementById("pais-adivinar")
let bandera = document.getElementById("bandera")
let derecha = document.getElementById("boton-derecha")
let izquierda = document.getElementById("boton-izquierda")
let inicio = document.getElementById("inicio")
const input = document.getElementById("input")
let mensaje = document.getElementById("mensaje")
const botonAdivinar = document.getElementById("boton-adivinar")

let buenas = document.getElementById("counter_buenas")
let malas = document.getElementById("counter_malas")
let contador_puntos = document.getElementById("puntos")

let contador_buenas = 0
let contador_malas = 0
let paises = []
let indice = 0

const local_storage_clave_buena = "contador_buenas"
const local_storage_clave_mala = "contador_malas"
const jugador_storage = "jugador"
const ranking_storage = "ranking_jugadores"

const API_KEY = "9d200c2749993ee7b2fb82dcf54bfb9d";
const URL = `https://api.countrylayer.com/v2/all?access_key=${API_KEY}`;


function obtenerPaises() {
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        paises = data.filter(pais => pais.capital && pais.alpha2Code);
        if(paises.length > 0){
            mostrarPais();
        }else{
            inicio.innerHTML = "No hay paises disponibles";
        }
    })
    .catch((error)=>{
        inicio.innerHTML = "Error al cargar paises";
    });
}

obtenerPaises()

function mostrarPais() {
    let pais = paises[indice];
    if (pais){
        inicio.innerHTML = pais.translations?.es || pais.name
        bandera.src = `https://www.banderas-mundo.es/data/flags/w702/${pais.alpha2Code.toLowerCase()}.webp`;
    }
}


derecha.onclick = () => {
    indice++;
    mostrarPais();
};

izquierda.onclick = () => {
    indice--
    mostrarPais()
}


function adivinarCapital (){
    let respuesta = input.value.toLowerCase()
    let acierto = respuesta.toLowerCase() === paises[indice].capital.toLowerCase()
    const nombreJugador = localStorage.getItem(jugador_storage);
    if(acierto){
        mensaje.innerHTML = "¡Correcto! Sigue así"
    }
    else {
        mensaje.innerHTML = "Incorrecto, ¡Prueba de nuevo!"
    }

    if(nombreJugador){
        contador(acierto, nombreJugador);
    };
    mostrarPais();
}

botonAdivinar.onclick = adivinarCapital;

input.addEventListener("keydown", (enter)=>{
    if(enter.key === "Enter") {
        botonAdivinar.click()
    }
})


function contador(acierto, nombreJugador) {
    if (acierto) {
    contador_buenas++;
    buenas.innerText = contador_buenas;
    localStorage.setItem(local_storage_clave_buena,contador_buenas);
    actualizarPuntaje(nombreJugador, 3);
} else {
    contador_malas++;
    malas.innerText = contador_malas;
    localStorage.setItem(local_storage_clave_mala,contador_malas);
    actualizarPuntaje(nombreJugador, -1);
}
}

function actualizarPuntaje (nombre, punto){
    try{
        let ranking;
        const rankingJSON = localStorage.getItem(ranking_storage);
        if(rankingJSON){
            ranking = JSON.parse(rankingJSON);
        }else{
            ranking =[];
        }

        const jugador = ranking.find((j) => j.nombre === nombre )

        if (jugador){
            jugador.puntaje += punto;
        }else{
            ranking.push({nombre: nombre, puntaje: punto});
        }
        renderizarJugadores(ranking)
        localStorage.setItem(ranking_storage, JSON.stringify(ranking));
    }catch (error){
        contador_puntos.innerText ="Ha habido un error"
    }
}

function renderizarJugadores(listajugadores) {
    ranking.innerHTML = ""; 
    listajugadores.sort((a, b) => b.puntaje - a.puntaje);
    listajugadores.forEach(jugador => {
        const card = document.createElement("div")
        card.classList.add("card2")
        card.innerHTML =`<span class="nombre-jugador">${jugador.nombre}</span>
            <span class="puntaje-jugador">${jugador.puntaje} puntos</span>`;
        ranking.append(card)

    });
}





