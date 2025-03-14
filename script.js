let usuarios = {};
let saldo = 1000;
let historial = [];

function registrarUsuario() {
    const usuario = document.getElementById('nuevoUsuario').value;
    const pin = document.getElementById('nuevoPin').value;
    const registroMensaje = document.getElementById('registroMensaje');

    if (!usuario || pin.length !== 4) {
        registroMensaje.textContent = '⚠️ Usuario o PIN inválido. El PIN debe ser de 4 dígitos.';
        return;
    }

    if (usuarios[usuario]) {
        registroMensaje.textContent = '❌ Usuario ya registrado.';
    } else {
        usuarios[usuario] = pin;
        registroMensaje.textContent = '✅ Registro exitoso. Ahora puedes iniciar sesión.';
    }
}

function iniciarSesion() {
    const usuario = document.getElementById('usuarioLogin').value;
    const pin = document.getElementById('pinLogin').value;
    const loginMensaje = document.getElementById('loginMensaje');

    if (usuarios[usuario] && usuarios[usuario] === pin) {
        loginMensaje.textContent = '✅ Inicio de sesión exitoso.';
        document.getElementById('registro').style.display = 'none';
        document.getElementById('cajero').style.display = 'block';
    } else {
        loginMensaje.textContent = '❌ Usuario o PIN incorrecto.';
    }
}

function retirarDinero() {
    const cantidadInput = document.getElementById('cantidad');
    const cantidad = parseInt(cantidadInput.value);
    const mensaje = document.getElementById('mensaje');

    if (isNaN(cantidad) || cantidad <= 0) {
        mensaje.textContent = '⚠️ Ingresa un monto válido.';
        return;
    }

    if (cantidad > saldo) {
        mensaje.textContent = '❌ Saldo insuficiente.';
    } else {
        saldo -= cantidad;
        mensaje.textContent = `✅ Retiro exitoso. Saldo restante: ${saldo} dólares.`;
        historial.push(`Retiro: -${cantidad} dólares. Saldo restante: ${saldo} dólares.`);
        actualizarHistorial();
    }

    cantidadInput.value = '';
}

function depositarDinero() {
    const cantidadDepositoInput = document.getElementById('cantidadDeposito');
    const cantidad = parseInt(cantidadDepositoInput.value);

    if (isNaN(cantidad) || cantidad <= 0) {
        mensaje.textContent = '⚠️ Ingresa un monto válido para depositar.';
        return;
    }

    saldo += cantidad;
    mensaje.textContent = `✅ Depósito exitoso. Saldo actual: ${saldo} dólares.`;
    historial.push(`Depósito: +${cantidad} dólares. Saldo actual: ${saldo} dólares.`);
    actualizarHistorial();

    cantidadDepositoInput.value = '';
}

function actualizarHistorial() {
    const historialElemento = document.getElementById('historial');
    historialElemento.innerHTML = '';

    historial.forEach(transaccion => {
        const li = document.createElement('li');
        li.textContent = transaccion;
        historialElemento.appendChild(li);
    });
}
