let containerCardPast = document.getElementById (`containerPastE`)   
let containerCheckbox = document.getElementById (`contenedor-checkbox`)
const inputBusqueda = document.getElementById (`busqueda`)
let info
let eventosFiltradosPast




fetch (`https://mindhub-xj03.onrender.com/api/amazing`)
.then (res => res.json())
.then (data => {
    info = data

    function filtro (eventos){
       return eventos.date < data.currentDate
    }
    eventosFiltradosPast = info.events.filter((filtro))

    containerCardPast.innerHTML = crearTemplateEventos (eventosFiltradosPast)
    const category = info.events.map (box => box.category)
    const setInfo = new Set (category)
    const arrayCategory = Array.from (setInfo)
    const templateCategory = arrayCategory.reduce (funcionReduce , ``)
    containerCheckbox.innerHTML = templateCategory

} )
.catch(err => console.log (err))

const funcionReduce = (acumulador,elementoActual, indice, array) =>{
    return acumulador += `<div class="form-check">
                            <input class="form-check-input" type="checkbox" id="${elementoActual} - ${indice}" value="${elementoActual}">
                            <label class="form-check-label" for="${elementoActual} - ${indice}"> ${elementoActual}</label>
                        </div>`
}



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



containerCheckbox.addEventListener  (`change`, ( ) => {
    dobleFiltro ()
    
})
inputBusqueda.addEventListener (`input`, () => {
    dobleFiltro ()

})    

function filtrarEventos (datos, category){
    if (category.length == 0){
        return datos
    }
    return datos.filter ( datos => category.includes (datos.category))

}

function filtrarPorNombre (datos, busqueda){
    return datos.filter( item => item.name.toLowerCase().includes(busqueda.toLowerCase()))
   
}
function dobleFiltro (){
    const checkboxChecked = Array.from (document.querySelectorAll (`input[type="checkbox"]:checked`)).map ( check => check.value)
    let filtrarPorBusqueda = filtrarPorNombre (eventosFiltradosPast, inputBusqueda.value )
    let filtrarCheck = filtrarEventos (filtrarPorBusqueda, checkboxChecked)
    containerCardPast.innerHTML = crearTemplateEventos (filtrarCheck)

}