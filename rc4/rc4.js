
// --------------- Funciones principales ----------------- \\

function encriptar (){
        var datos = get_datos(1);
	var mensaje = datos.mensaje;
	var semilla = datos.semilla;
        var S = KSA (semilla);
        var secuencia = PRGA(S,mensaje);
        var resultado = cifrar (mensaje,secuencia);
        var candado = document.getElementById("padlock-cerrado");
        if (candado.style.display === "none") {
                candado.style.display = "block";
        } else {
                candado.style.display = "none";
        }
        prompt("Este es su mensaje encriptado:",resultado);
}

function desencriptar (){
        var datos = get_datos(2);
	var mensaje_encriptado = datos.mensaje;
	var semilla = datos.semilla;
        var S = KSA (semilla);
        var secuencia = PRGA(S,mensaje_encriptado);
        var resultado = descifrar (mensaje_encriptado,secuencia);
        var candado = document.getElementById("padlock-abierto");
        if (candado.style.display === "none") {
                candado.style.display = "block";
        } else {
                candado.style.display = "none";
        }
        prompt("Este es su mensaje desencriptado:",resultado);
}

// --------------------------------------------------------- \\


function get_datos (opt){
	var semilla = prompt("Inserte la semilla de clave que desea usar", "SEMILLA");
	if (opt == 1) {
		var mensaje = prompt("Inserte el mensaje a encriptar (en decimal)", "MENSAJE A ENCRIPTAR");
	}
	else {
		var mensaje = prompt("Inserte el mensaje a desencriptar (en binario)", "MENSAJE A DESENCRIPTAR");
	}

	semilla = semilla.split(',');
	mensaje = mensaje.split(',');

        for (var i = 0; i < semilla.length; i++){
                semilla[i] = parseInt(semilla[i]);
        }
        for (var i = 0; i < mensaje.length; i++){
                mensaje[i] = parseInt(mensaje[i]);
        }

	var datos = {
		mensaje: mensaje,
		semilla: semilla
	};
	return datos;
}

function KSA (semilla){
        console.log("semilla: ", semilla);
        var S = [];
        var K = [];
	for(var i = 0; i < 256; i++){
        S[i] = i;
        K[i] = semilla[i%semilla.length];
        j = 0;
    }
    console.log("S: ", S);
    for(var i = 0; i < 256; i++){
            j = (j + S[i] + K[i]) % 256;
            var tmp = S[j];
            S[j] = S[i];
            S[i] = tmp;
    }
    
    console.log("S: ", S);
    return S;
}

function PRGA (S, mensaje){
        var mensaje_sz = mensaje.length;
        var secuencia = [];
        secuencia.length = mensaje.length;
        var i = 0; var j = 0; var k = 0;
        while (k < mensaje_sz){
                console.log("i, j, k : ", i, j, k);
                i = (i+1) % 256;
                console.log("i, j, k : ", i, j, k);
                j = (j+S[i]) % 256;
                var tmp = S[j];
                S[j] = S[i];
                S[i] = tmp;
                var t = (S[i]+S[j]) % 256;
                secuencia[k] = S[t];
                /*
                console.log("S[i] :", S[i])
                console.log("S[j] :", S[j])
                console.log("t: ", t)
                console.log("secuencia[k]: ", secuencia[k])
                */
                k++;
        }
        return secuencia;
}

function cifrar (mensaje,secuencia) {
        console.log("mensaje: ", mensaje, "secuencia: ", secuencia)
        var mensaje_cifrado = [];
        var mensaje_cifrado_bin = [];
        for (var i = 0; i < mensaje.length; i++){
               console.log("mensaje: ", mensaje[i], "secuencia: ", secuencia[i])
               mensaje_cifrado[i] = (mensaje[i]^=secuencia[i]);
               mensaje_cifrado_bin[i] = mensaje_cifrado[i].toString(2);
               console.log("cifrado: ", mensaje_cifrado[i])
        }
        return mensaje_cifrado_bin;
}

function descifrar (mensaje_cifrado,secuencia) {
        console.log("mensaje_cifrado: ", mensaje_cifrado, "secuencia: ", secuencia)
        var mensaje_descifrado = [];
        //var mensaje_descifrado_dec = [];
        for (var i = 0; i < mensaje_cifrado.length; i++){
               //console.log("mensaje: ", mensaje[i], "secuencia: ", secuencia[i])
               var decimal = parseInt(mensaje_cifrado[i],2);
               console.log("decimal: ", decimal, "secuencia: ", secuencia[i])
               mensaje_descifrado[i] = (secuencia[i]^=decimal);
               //mensaje_descifrado_dec[i] = mensaje_descifrado[i].toString(10);
               console.log("descifrado: ", mensaje_descifrado[i])
        }
        return mensaje_descifrado;
}