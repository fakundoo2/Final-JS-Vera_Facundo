let nuevoNombre;
let nuevoApellido;
let nuevoEdad;
let nuevoDni;
let isActive = true;
let nuevoPersona;

let _empleados = [];
let _despedidos = [];

const botonAgregar = document.querySelector("#btn-agregar");
const listaEmpleados = document.querySelector("#lista-empleados");
const listaJefes = document.querySelector("#lista-jefes");
const listaDespedidos = document.querySelector("#lista-despedidos");

fetch("./empleados/empleados.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(empleado =>{
            let div = document.createElement("div");
            div.classList.add("marco");
            div.classList.add("azul");
            div.classList.add("col-3");
            div.innerHTML +=`
                <p>Cargo:  ${empleado.cargo}</p>
                <p>Nombre:  ${empleado.nombre}</p>
                <p>Apellido:  ${empleado.apellido}</p>
                <p>Edad: ${empleado.edad}</p>
                <p>DNI:  ${empleado.dni}</p>
            `
            listaJefes.append(div);
        })
        
    })

botonAgregar.addEventListener("click",() => {
    listaEmpleados.innerHTML = "";
    capturarDatos(); 
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Contrato exitoso",
        showConfirmButton: false,
        timer: 1500
      });   
})

function capturarDatos(){
        
    function persona(nombre,apellido,edad,dni){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
    }

    nuevoNombre = document.querySelector("#nombre").value;
    nuevoApellido = document.querySelector("#apellido").value;
    nuevoEdad = document.querySelector("#edad").value;
    nuevoDni = document.querySelector("#dni").value;

    nuevoPersona = new persona(nuevoNombre,nuevoApellido,nuevoEdad,nuevoDni);
    _empleados.push(nuevoPersona);

    cargarEmpleados();
    
}

function cargarEmpleados(){
    listaEmpleados.innerHTML = "";
    for(empleado of _empleados){
        let div = document.createElement("div");
        div.classList.add("marco");
        div.classList.add("verde");
        div.classList.add("col-2");
        div.innerHTML +=`
                <p>Nombre:${empleado.nombre}</p>
                <p>Apellido:${empleado.apellido}</p>
                <p>Edad:${empleado.edad}</p>
                <p>DNI:${empleado.dni}</p>
                <button class="btn-despedir" id="${empleado.dni}">DESPEDIR</button>
        `
        listaEmpleados.append(div);
    }

    localStorage.setItem("empleados", JSON.stringify(_empleados));
    botonDespedir();
}

function botonDespedir(){
    let botonDespedido = document.querySelectorAll(".btn-despedir");

    botonDespedido.forEach(boton => {
        boton.addEventListener("click", agregarAdespidos);
        
    })

}

function cargarDespedidos(){
    listaDespedidos.innerHTML = "";
    for(despedido of _despedidos){
        let div = document.createElement("div");
        div.classList.add("marco");
        div.classList.add("rojo");
        div.classList.add("col-2");
        div.innerHTML +=`
                <p>Nombre:${despedido.nombre}</p>
                <p>Apellido:${despedido.apellido}</p>
                <p>Edad:${despedido.edad}</p>
                <p>DNI:${despedido.dni}</p>
        `
        listaDespedidos.append(div);
    }

    Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Despedido!!",
        showConfirmButton: false,
        timer: 1500
      }); 

}

function agregarAdespidos(e) {
    const idboton = e.currentTarget.id;
    let empleadoDespedidoindex = _empleados.findIndex(des => des.dni === idboton);
    const empleadoDespedido = _empleados.find(des => des.dni === idboton);
    _despedidos.push(empleadoDespedido);
    _empleados.splice(empleadoDespedidoindex,1);
    
    localStorage.setItem("despedidos", JSON.stringify(_despedidos));

    cargarEmpleados();
    cargarDespedidos();   
}

cargarEmpleados();

