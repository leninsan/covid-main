// 
// DATOS DE COLOMBIA Y DE LAS CARDS MUNDIALES
let cargarJSON =()=> {
    //   aqui realizamos la conecion ya sea a una archvo o a una appi
    let totalConfirmedWorld=0;
    let totalDeathsWorld=0;
    let totalRecoveredWorld=0;

    let totalPaisesInfectados=0;
    fetch('https://api.covid19api.com/summary')

        .then((respuesta)=>respuesta.json()) 
        .then(data => { 
                
              data.Countries.forEach(element => {
                 

                  //conteo de los paises infectados
                  if (element.TotalConfirmed>0){
                      totalPaisesInfectados+=1;
                  }

                  //dato de colombia para la portada
                  if(element.Country=="Colombia"){
 
                      document.querySelector(".col_cantidad").textContent=element.TotalConfirmed;
                      document.querySelector(".col_muertos").textContent = element.TotalDeaths;
                      document.querySelector(".col_recuperados").textContent = element.TotalRecovered;
                   
                  }
                 
                  totalConfirmedWorld += element.TotalConfirmed;
                  totalDeathsWorld += element.TotalDeaths;
                  totalRecoveredWorld+= element.TotalRecovered;
               

              });



              document.querySelector('.fecha_confirmed').textContent = data.Date.slice(0,-20);
              document.querySelector('.fecha_deaths').textContent = data.Date.slice(0, -20);
              document.querySelector('.fecha_pais').textContent = data.Date.slice(0, -20);
              document.querySelector('.fecha_recovered').textContent = data.Date.slice(0, -20);
              
              document.querySelector(".total_confirmed_world").textContent = new Intl.NumberFormat().format(totalConfirmedWorld);

              document.querySelector(".total_deaths_world").textContent = new Intl.NumberFormat().format(totalDeathsWorld);
               
              document.querySelector(".total_paises_infectados").textContent = new Intl.NumberFormat().format(totalPaisesInfectados);

              document.querySelector(".total_recuperados_world").textContent = new Intl.NumberFormat().format(totalRecoveredWorld);

            
        
        }, 
        error => {
            console.log(error);
        })
}


let cargarDatosPais = () => {
    let paises='<option>Seleccionar País</option>';
    fetch('https://api.covid19api.com/countries')

        .then((respuesta) => respuesta.json())
        .then(data => {
            // console.log(data);
            let html = '<option>Seleccionar País</option>';
            let paisSinEspacio="";
            data.forEach(element => {

              paisSinEspacio = (element.Country);
                         
              html += `<option value="${paisSinEspacio}">${element.Country}</option>  `;

            });
           
            document.getElementById("paises").innerHTML = html;
        },
            error => {
                console.log(error);
            })
}
cargarJSON();
cargarDatosPais();

// DATA TABLE SEDES
$(".tablaConsultaPais").DataTable({
    // "ajax": "ajax/tablaSede.ajax.php", //llenamos la datatable a traves de ajax  desde este archivo
    "deferRender": true,
    "retrieve": true,
    "processing": true,
    "responsive": true,
    "language": {

        "sProcessing": "Procesando...",
        "sLengthMenu": "Mostrar _MENU_ registros",
        "sZeroRecords": "No se encontraron resultados",
        "sEmptyTable": "Ningún dato disponible en esta tabla",
        "sInfo": "Mostrando registros del _START_ al _END_",
        "sInfoEmpty": "Mostrando registros del 0 al 0",
        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix": "",
        "sSearch": "Buscar:",
        "sUrl": "",
        "sInfoThousands": ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst": "Primero",
            "sLast": "Último",
            "sNext": "Siguiente",
            "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

    }

});

$("#paises").change(function () {

    
   let pais = document.querySelector('#paises').value;

   document.querySelector('.paisResultado').textContent = pais;
 
   fetch('https://api.covid19api.com/summary')

       .then((respuesta) => respuesta.json())
       .then(data => {

               data.Countries.forEach(element => {
                   //dato de colombia para la portada
                   if (element.Country == pais) {
                      console.log(element)
                       document.querySelector(".confirmedCountry").textContent = new Intl.NumberFormat().format(element.TotalConfirmed);
                       document.querySelector(".deathsCountry").textContent = new Intl.NumberFormat().format(element.TotalDeaths);
                       document.querySelector(".recoveredCountry").textContent=new Intl.NumberFormat().format(element.TotalRecovered);

                       if (element.NewConfirmed > 0) {
                          document.querySelector(".newConfirmed").textContent = new Intl.NumberFormat().format(element.NewConfirmed);
                       }
                       else{
                          document.querySelector(".newConfirmed").textContent = 0;
                       }
                       


                        document.querySelector('.confirmatedDate').textContent = data.Date.slice(0, -20);
                        document.querySelector('.recoveredDate').textContent = data.Date.slice(0, -20);
                        document.querySelector('.deathsDate').textContent = data.Date.slice(0, -20);
                        document.querySelector('.newDate').textContent = data.Date.slice(0, -20);

                   }
 
               });
           },
           error => {
               console.log(error);
           })




})

    

    

  






