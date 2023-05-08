let containerCardUpcoming = document.getElementById (`containerCardUpcoming`)   

function creatCard (events) {
    return `<div class="card d-flex flex-column mb-3 justify-content-center align-items-center m-2" style="width: 18rem;">
            <img src=${events.image} class="card-img-top p-2" alt="Feria">
            <div class="card-body d-flex flex-column align-items-center">
            <h5 class="card-title">${events.name}</h5>
            <p class="card-text text-center"> ${events.description}</p>
            <h6 class="card-text">price: ${events.price}</h6>
            <a href="./assets/pages/Details.html" class="btn btn-primary">See More</a>
            </div>
    </div>`
    
}


function listaCrad (lista, donde){
    let template = ``
    for (let elemento of lista) {
        template += creatCard (elemento)
        
    }
    donde.innerHTML = template
}

function filtro (eventos){
    return eventos.date > data.currentDate

}
let eventosFiltrados = data.events.filter((filtro))


listaCrad (eventosFiltrados, containerCardUpcoming )
