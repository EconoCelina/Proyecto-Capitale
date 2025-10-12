const paises = [
    {
        id:1,
        pais: "Argentina",
        capital: "Buenos Aires"
    },
    {
        id:2,
        pais: "Alemania",
        capital: "Berlin"
    },
    {
        id:3,
        pais: "Tajikistan",
        capital: "Dushanbe"
    },
    {
        id:4,
        pais: "China",
        precio: "Beijing"
    },
    {
        id:5,
        pais: "Rusia",
        capital: "Moscu"
    },
    {
        id:6,
        pais: "Paraguay",
        capital: "Asuncion"
    },
    {
        id:7,
        pais: "Chile",
        capital: "Santiago"
    },
    {
        id:8,
        pais: "Australia",
        capital: "Canberra"
    },
    {
        id:9,
        pais: "Sudan",
        capital: "Khartoum"
    },
    {
        id:10,
        pais: "Egipto",
        capital: "Cairo"
    },
    {
        id:11,
        pais: "Estados Unidos",
        capital: "Washisngton DC"
    },
    {
        id:12,
        pais: "Canadá",
        capital: "Ottawa"
    },
]

let paisAdivinar = document.getElementById("pais-adivinar")
let derecha = document.getElementById("boton-derecha")
let izquierda = document.getElementById("boton-izquierda")
let inicio = document.getElementById("inicio")
let indice = 0


derecha.onclick = () => {
    indice++
    inicio.innerHTML = paises[indice].pais
}

izquierda.onclick = () => {
    indice--
    inicio.innerHTML = paises[indice].pais
}

let input = document.getElementById("input")
let mensaje = document.getElementById("mensaje")
let botonAdivinar = document.getElementById("boton-adivinar");

function adivinarCapital (){
    let respuesta = input.value
    if(respuesta.toLowerCase() === paises[indice].capital.toLowerCase() ){
        mensaje.innerHTML = "¡Correcto! Sigue así"
    }else {
        mensaje.innerHTML = "Incorrecto, ¡Prueba de nuevo!"
    }
}

botonAdivinar.onclick = () => {
    adivinarCapital();
};

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

botonbuscar.onclick = () => {
    let busqueda_usuario = input2.value.toLowerCase()
    const encontrado = cards.some(card => card.toLowerCase() === busqueda_usuario);
    if(encontrado === true){
        mensaje2.innerHTML = "Está en nuestra lista"
    } else{
        mensaje2.innerHTML = "No lo encontramos"
    }

}





