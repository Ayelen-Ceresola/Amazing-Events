let containerDetail = document.getElementById(`containerDetail`)
let info 



fetch (`https://mindhub-xj03.onrender.com/api/amazing`)
.then (res => res.json())
.then (data => {
    info = data

    let parametros = new URLSearchParams (location.search)
    let capturaId = parametros.get(`_id`)
    let busquedaId = info.events.find (item => item._id == capturaId)
    imprimirCard(busquedaId,containerDetail)
  } )
.catch(err => console.log (err))

function imprimirCard (data,containerDetail){
containerDetail.innerHTML = `<div class="card mb-3" style="max-width: 540px;">
<div class="row g-0">
  <div>
    <img class="col-12" src=${data.image} alt="${data.name}">
  </div>
  <div>
    <div class="card-body">
      <h5 class="card-title text-center">${data.name}</h5>
      <div class="py-2">
            <ul>
                <li class="list">Date: ${data.date}</li>
                <li class="list">Description: ${data.description}</li>
                <li class="list">Category: ${data.category}</li>
                <li class="list">Place: ${data.place}</li>
                <li class="list">Capacity: ${data.capacity}</li><li class="list">${data.assistance ? "Assistance" : "Estimate"}: ${data.assistance ? data.assistance :data.estimate}</li>
                
                <li class="list">Price: $${data.price}</li>
            </ul>
        </div>
    </div>
  </div>
</div>
</div>`
}