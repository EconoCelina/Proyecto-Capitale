let paisAdivinar = document.getElementById("pais-adivinar")
let bandera = document.getElementById("bandera")
let derecha = document.getElementById("boton-derecha")
let izquierda = document.getElementById("boton-izquierda")
let inicio = document.getElementById("inicio")
const input = document.getElementById("input")
let mensaje = document.getElementById("mensaje")
const botonAdivinar = document.getElementById("boton-adivinar");
let paises = []
let indice = 0


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
    .catch(() => {
        inicio.innerHTML = "No se pudieron cargar los países";
    });
}

function mostrarPais() {
    let pais = paises[indice];
    if (pais){
        inicio.innerHTML = pais.translations?.es || pais.name 
        bandera.src = `https://flagsapi.com/${pais.alpha2Code}/flat/64.png`;
        input.value = "";
        mensaje.innerHTML = "";
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
    if(respuesta.toLowerCase() === paises[indice].capital.toLowerCase() ){
        mensaje.innerHTML = "¡Correcto! Sigue así"
    }else {
        mensaje.innerHTML = "Incorrecto, ¡Prueba de nuevo!"
    }
}

input.addEventListener("keydown", (enter)=>{
    if(enter.key === "Enter") {
        botonAdivinar.click()
    }
})

obtenerPaises()

let buenas = document.getElementById("counter_buenas")
let malas = document.getElementById("counter_malas")
let contador_buenas = 0
let contador_malas = 0
const local_storage_clave_buena = "contador_buenas"
const local_storage_clave_mala = "contador_malas"

function contador(acierto) {
    if (acierto) {
    contador_buenas++;
    buenas.innerText = contador_buenas;
    localStorage.setItem(local_storage_clave_buena,contador_buenas)
} else {
    contador_malas++;
    malas.innerText = contador_malas;
    localStorage.setItem(local_storage_clave_mala,contador_malas)
}
}

function adivinarCapital() {
    let respuesta = input.value;
    if (respuesta.toLowerCase() === paises[indice].capital.toLowerCase()) {
    mensaje.innerHTML = "¡Correcto! Sigue así";
    contador(true);
} else {
    mensaje.innerHTML = "Incorrecto, ¡Prueba de nuevo!";
    contador(false);
}
}

botonAdivinar.onclick = () => {
    adivinarCapital();
};


const cards = ["Cuba", "Bielorrusia", "Brasil", "España", "Islandia", "Japon", "Reoública de Macedonia", "Malta", "Mexico", "Rumania", "Sudáfrica", "Venezuela"]
let input2 = document.getElementById("input2")
let botonbuscar = document.getElementById("boton-buscar")
let mensaje2 = document.getElementById("mensaje2")

//let cards = document.querySelectorAll(".card")
//No supe como hacer para generar un array a partir de las cards que estan en mi HTML. 

//botonbuscar.onclick = () => {
//    let busqueda_usuario = input2.value.toLowerCase()
//    const busqueda = cards.find(card => card === //busqueda_usuario)
//}

input2.addEventListener("keydown", (enter)=>{
    if(enter.key === "Enter") {
        botonbuscar.click()
    }

})


botonbuscar.onclick = () => {
    let busqueda_usuario = input2.value.toLowerCase()
    const encontrado = cards.some(card => card.toLowerCase() === busqueda_usuario);
    if(encontrado === true){
        mensaje2.innerHTML = "Está en nuestra lista"
    } else{
        mensaje2.innerHTML = "No lo encontramos"
    }

}





