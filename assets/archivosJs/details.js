let containerDetail = document.getElementById(`containerDetail`)
let info = data.events

let parametros = new URLSearchParams (location.search)
let capturaId = parametros.get(`_id`)
let busquedaId = info.find (item => item._id == capturaId)

containerDetail.innerHTML = `<div class="card mb-3" style="max-width: 540px;">
<div class="row g-0">
  <div>
    <img class="col-12" src=${busquedaId.image} alt="${busquedaId.name}">
  </div>
  <div>
    <div class="card-body">
      <h5 class="card-title text-center">${busquedaId.name}</h5>
      <div class="py-2">
            <ul>
                <li class="list">Date: ${busquedaId.date}</li>
                <li class="list">Description: ${busquedaId.description}</li>
                <li class="list">Category: ${busquedaId.category}</li>
                <li class="list">Place: ${busquedaId.place}</li>
                <li class="list">Capacity: ${busquedaId.capacity}</li><li class="list">${busquedaId.assistance ? "Assistance" : "Estimate"}: ${busquedaId.assistance ? busquedaId.assistance :busquedaId.estimate}</li>
                
                <li class="list">Price: $${busquedaId.price}</li>
            </ul>
        </div>
    </div>
  </div>
</div>
</div>`