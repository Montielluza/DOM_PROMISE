const listaUsuarios = [
    { id: 1, name: "Alejandro Gómez", email: "alejandro.gomez@example.com" },
    { id: 2, name: "María Fernanda López", email: "maria.lopez@example.com" },
    { id: 3, name: "Carlos Andrés Ruiz", email: "carlos.ruiz@example.com" },
    { id: 4, name: "Laura Daniela Martínez", email: "laura.martinez@example.com" },
    { id: 5, name: "Juan Sebastián Torres", email: "juan.torres@example.com" }
];

function buscarUsuarioPorId(idIngresado) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            let usuarioEncontrado = null;

            for (let i = 0; i < listaUsuarios.length; i++) {

                if (listaUsuarios[i].id === idIngresado) {
                    usuarioEncontrado = listaUsuarios[i];
                    break;
                }
            }

            if (usuarioEncontrado) {
                resolve(usuarioEncontrado);
            } else {
                reject("Usuario no encontrado");
            }

        }, 2000);

    });
}

const inputIdUsuario = document.getElementById("inputIdUsuario");
const botonBuscarUsuario = document.getElementById("botonBuscarUsuario");
const contenedorEstado = document.getElementById("contenedorEstado");
const modalResultado = document.getElementById("modalResultado");
const contenidoModal = document.getElementById("contenidoModal");
const cerrarModal = document.getElementById("cerrarModal");


botonBuscarUsuario.addEventListener("click", () => {

    const valorIngresado = inputIdUsuario.value.trim();

    if (valorIngresado === "") {
        mostrarError("Debe ingresar un ID válido");
        return;
    }

    if (!/^\d+$/.test(valorIngresado)) {
        mostrarError("Solo se permiten números");
        return;
    }

    const idConvertido = parseInt(valorIngresado);

    
    contenedorEstado.innerHTML = '<div class="spinner"></div>';

    buscarUsuarioPorId(idConvertido)

        .then(usuario => {
            mostrarModal(usuario);
        })

        .catch(error => {
            mostrarError(error);
        })

        .finally(() => {
            contenedorEstado.innerHTML = "";
            inputIdUsuario.value = "";
        });

});

function mostrarModal(usuario) {

    contenidoModal.innerHTML = `
        <h3>Usuario Encontrado</h3>
        <p><strong>ID:</strong> ${usuario.id}</p>
        <p><strong>Nombre:</strong> ${usuario.name}</p>
        <p><strong>Email:</strong> ${usuario.email}</p>
    `;

    modalResultado.style.display = "flex";
}

function mostrarError(mensaje) {

    contenidoModal.innerHTML = `
        <h3 style="color:red;">Error</h3>
        <p>${mensaje}</p>
    `;

    modalResultado.style.display = "flex";
}

cerrarModal.addEventListener("click", () => {
    modalResultado.style.display = "none";
});
