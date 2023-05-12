let containerCardUpcoming = document.getElementById (`containerCardUpcoming`)   

// function creatCard (events) {
//     return `<div class="card d-flex flex-column mb-3 justify-content-center align-items-center m-2" style="width: 18rem;">
//             <img src=${events.image} class="card-img-top p-2" alt="Feria">
//             <div class="card-body d-flex flex-column align-items-center">
//             <h5 class="card-title">${events.name}</h5>
//             <p class="card-text text-center"> ${events.description}</p>
//             <h6 class="card-text">price: ${events.price}</h6>
//             <a href="./assets/pages/Details.html" class="btn btn-primary">See More</a>
//             </div>
//     </div>`
    
// }


// function listaCrad (lista, donde){
//     let template = ``
//     for (let elemento of lista) {
//         template += creatCard (elemento)
        
//     }
//     donde.innerHTML = template
// }

 function filtro (eventos){
    return eventos.date > data.currentDate

}
let eventosFiltrados = data.events.filter((filtro))


// listaCrad (eventosFiltrados, containerCardUpcoming )

// listaCrad (eventosFiltrados, containerCardPast )

let containerCheckbox = document.getElementById (`contenedor-checkbox`)
let info = data.events

//creacion del array + filtro
const category = info.map (box => box.category)
const setInfo = new Set (category)
const arrayCategory = Array.from (setInfo)

//creacion template de checkbox por categoria
const funcionReduce = (acumulador,elementoActual, indice, array) =>{
    return acumulador += `<div class="form-check">
                            <input class="form-check-input" type="checkbox" id="${elementoActual} - ${indice}" value="${elementoActual}">
                            <label class="form-check-label" for="${elementoActual} - ${indice}"> ${elementoActual}</label>
                        </div>`
}
const templateCategory = arrayCategory.reduce (funcionReduce , ``)
containerCheckbox.innerHTML = templateCategory

//creacion card
function crearTemplateEventos (lista){
    return lista.reduce ((acumulado, elementoA ) => {
        return acumulado +=  `<div class="card d-flex flex-column mb-3 justify-content-center align-items-center m-2" style="width: 18rem;">
                                    <img src=${elementoA.image} class="card-img-top p-2" alt="Feria">
                                    <div class="card-body d-flex flex-column align-items-center">
                                        <h5 class="card-title">${elementoA.name}</h5>
                                        <p class="card-text text-center"> ${elementoA.description}</p>
                                        <h6 class="card-text">price: ${elementoA.price}</h6>
                                        <a href="../pages/Details.html?_id=${elementoA._id}" class="btn btn-primary">See More</a>
                                    </div>
                                </div>` 
    }, ``)
}

containerCardUpcoming.innerHTML = crearTemplateEventos (eventosFiltrados)

// filtrar por check
containerCheckbox.addEventListener  (`change`, ( ) => {
    dobleFiltro ()
    // const checkboxChecked = Array.from (document.querySelectorAll (`input[type="checkbox"]:checked`)).map ( check => check.value)
    // console.log(checkboxChecked)
    // const eventosFiltrados = filtrarEventos (info, checkboxChecked)
    // containerCardIndex.innerHTML = crearTemplateEventos (eventosFiltrados)
    
})

function filtrarEventos (datos, category){
    if (category.length == 0){
        return datos
    }
    return datos.filter ( datos => category.includes (datos.category))

}

//searche
const inputBusqueda = document.getElementById (`busqueda`)

inputBusqueda.addEventListener (`input`, () => {
    dobleFiltro ()
    
    // const filtrarPorBusqueda = filtrarPorNombre( info, inputBusqueda.value)
    // if (containerCheckbox.checked){
    //     const filtrarPorCheck = filtrarEventos (filtrarPorBusqueda)
    // }
    
})
function filtrarPorNombre (datos, busqueda){
    return datos.filter( item => item.name.toLowerCase().includes(busqueda.toLowerCase()))
   
}
function dobleFiltro (){
    const checkboxChecked = Array.from (document.querySelectorAll (`input[type="checkbox"]:checked`)).map ( check => check.value)
    let filtrarPorBusqueda = filtrarPorNombre (eventosFiltrados, inputBusqueda.value )
    let filtrarCheck = filtrarEventos (filtrarPorBusqueda, checkboxChecked)
    containerCardUpcoming.innerHTML = crearTemplateEventos (filtrarCheck)

}
