let containerTable = document.getElementById ("container-table")

let info
let eventosFiltradosPast
let eventosFiltradosU




fetch (`https://mindhub-xj03.onrender.com/api/amazing`)
.then (res => res.json())
.then (data => {
    info = data

    function filtro (eventos){
        return eventos.date > data.currentDate
    }
    eventosFiltradosU = info.events.filter((filtro))
    
    function filtro2 (eventos){
        return eventos.date < data.currentDate
    }
     eventosFiltradosPast = info.events.filter((filtro2))
    
     
    let eventoMayorAcistencia = mayorAcistencia(eventosFiltradosPast)
    let eventoMenorAcistencia = menorAcistencia(eventosFiltradosPast)
    let eventoMayorcapacidad =  mayorCapacidad(info.events)
    const tablaUno=document.getElementById("primerTabla")

    tablaUno.innerHTML +=`
        <tr>
          <td>${eventoMayorAcistencia.name}  ${(eventoMayorAcistencia.assistance/eventoMayorAcistencia.capacity*100).toFixed(2)}%</td>
          <td>${eventoMenorAcistencia.name}  ${(eventoMenorAcistencia.assistance/eventoMenorAcistencia.capacity*100).toFixed(2)}%</td>
          <td>${eventoMayorcapacidad.name}  ${eventoMayorcapacidad.capacity} </td>
        </tr>
      `
    const category = info.events.map (box => box.category)
    const setInfo = new Set (category)
    const arrayCategory = Array.from (setInfo)    
    
  

     
    let tablaImpresaPasado = imprimirPasado (arrayCategory)
    let tablaImpresaFuturo = imprimirFuturo(arrayCategory)
      

    function imprimirPasado (categorias){
        let imprimirTabla = []
        for (let categoria of categorias){            
            let arrayFiltradoCategorias = eventosFiltradosCategoria (eventosFiltradosPast,categoria)
            if (arrayFiltradoCategorias.length == 0){
            } else {
                let recaudacion = recaudarPasado (arrayFiltradoCategorias)
                let porcentajeTotal = porcentajePasado(arrayFiltradoCategorias).toFixed(2)
                imprimirTabla.push({categoria: categoria,recaudacion: recaudacion, porcentaje: porcentajeTotal})
            }
        }
        return imprimirTabla
    }
     
    
      
    function imprimirFuturo (categorias){   
        let imprimirTabla = []
        for (let categoria of categorias){          
            let arrayFiltradoCategorias = eventosFiltradosCategoria (eventosFiltradosU,categoria)
            if (arrayFiltradoCategorias.length == 0){
            } else{
                let recaudacion = recaudarFuturo (arrayFiltradoCategorias)
                let porcentajeTotal = porcentajeFuturo(arrayFiltradoCategorias).toFixed(2)
                imprimirTabla.push({categoria: categoria,recaudacion: recaudacion, porcentaje: porcentajeTotal})
            }
        }   
        return imprimirTabla   
    }
    const tablaDos= document.getElementById("segundaTabla")
    const tablaTres=document.getElementById("terceraTabla")
      
    let template =""

    for(let evento of tablaImpresaPasado){
        template +=`
          <tr>
              <td>${evento.categoria}</td>
              <td>$${evento.recaudacion.toLocaleString()}</td>
              <td>${evento.porcentaje}</td>
          </tr>
        `
      }

    let template2 =""

    for(let evento of tablaImpresaFuturo){
        template2 +=`
          <tr>
              <td>${evento.categoria}</td>
              <td>$${evento.recaudacion.toLocaleString()}</td>
              <td>${evento.porcentaje}</td>
          </tr>
        `
    }
    tablaDos.innerHTML=template2
    tablaTres.innerHTML=template
} 
)
.catch(err => console.log (err))


function mayorAcistencia(eventosFiltradosPast){
    let mayor = eventosFiltradosPast[0].assistance/eventosFiltradosPast[0].capacity*100
    let mayorEvento = eventosFiltradosPast[0]   
    for(let evento of eventosFiltradosPast){
      let porcentaje= evento.assistance/evento.capacity*100
      if(porcentaje>mayor){
        mayor=porcentaje
        mayorEvento=evento
        }
    }
    return mayorEvento        
} 

function menorAcistencia(eventosFiltradosPast){
    let menor = eventosFiltradosPast[0].assistance/eventosFiltradosPast[0].capacity*100
    let menorEvento = eventosFiltradosPast[0]      
    for(let evento of eventosFiltradosPast){
        let porcentaje= evento.assistance/evento.capacity*100
        if(porcentaje<menor){
           menor=porcentaje
           menorEvento=evento
        }
    }
    return menorEvento        
} 
    
function mayorCapacidad(eventos){
    let mayor = eventos[0].capacity
    let mayorCapacidad = eventos[0]          
    for(let evento of eventos){
        let capacidad= evento.capacity
        if(capacidad>mayor){
            mayor=capacidad
            mayorCapacidad=evento
            }
        }
    return mayorCapacidad        
} 
        
        //filtra los eventos de una categoria (que ingresa por datos)
function eventosFiltradosCategoria (eventos,datos){
    return eventos.filter ( item => item.category.includes (datos))
}


function recaudarPasado (eventos) {
    let total =0
    for ( let recaudacion2 of eventos){  
        total += recaudacion2.price * recaudacion2.assistance
    }      
    return total
}

function recaudarFuturo (eventos) {
    let total =0
    for ( let recaudacion of eventos){
        total += recaudacion.price * recaudacion.estimate
    }
    return total
}

function porcentajePasado (eventos) {
    let total =0
    for ( let porcentaje of eventos){      
        total += porcentaje.assistance / porcentaje.capacity * 100
    }
    total = total/eventos.length            
    return total
}

function porcentajeFuturo (eventos) {
    let total =0
    for ( let porcentaje of eventos){   
        total += porcentaje.estimate / porcentaje.capacity * 100
    }
    total = total/eventos.length
    return total
}

            
     
    
     

 

