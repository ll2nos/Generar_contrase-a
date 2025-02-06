document.getElementById("generate").addEventListener("click", function() {
    // Definición de caracteres
    let caracteres = {
        numeros: "0123456789",
        minusculas: "abcdefghijklmnopqrstuvwxyz",
        mayusculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        simbolos: "!@#$%^&*()-_+=<>?~"
    };

    // Obtener la longitud deseada de la contraseña
    const lengthInput = document.getElementById("length");
    const longitud = parseInt(lengthInput.value);

    // Array para almacenar los caracteres seleccionados
    let seleccionCaracteres = [];

    // Calcular el porcentaje por categoría
    const porcentajePorCategoria = 100 / Object.keys(caracteres).length;

    // Función para garantizar que una categoría contribuya con al menos el porcentaje especificado
    const garantizarPorcentaje = function(categoria, porcentaje) {
        const caracteresCategoria = caracteres[categoria].split('');
        const cantidadMinima = Math.ceil(porcentaje * longitud / 100);
        for (let i = 0; i < cantidadMinima; i++) {
            const caracterAleatorio = caracteresCategoria[Math.floor(Math.random() * caracteresCategoria.length)];
            seleccionCaracteres.push(caracterAleatorio);
        }
    };

    // Obtener las categorías seleccionadas por el usuario
    const categoriasSeleccionadas = Object.keys(caracteres).filter(categoria => document.getElementById("incluir" + categoria.charAt(0).toUpperCase() + categoria.slice(1)).checked);

    // Garantizar que cada categoría contribuya con al menos el porcentaje adecuado
    categoriasSeleccionadas.forEach(categoria => {
        const porcentaje = categoriasSeleccionadas.length === 3 ? 33.33 : porcentajePorCategoria;
        garantizarPorcentaje(categoria, porcentaje);
    });

    // Completar el array con caracteres aleatorios para alcanzar la longitud deseada
    while (seleccionCaracteres.length < longitud) {
        const categoriaAleatoria = categoriasSeleccionadas[Math.floor(Math.random() * categoriasSeleccionadas.length)];
        const porcentaje = categoriasSeleccionadas.length === 3 ? 33.33 : porcentajePorCategoria;
        garantizarPorcentaje(categoriaAleatoria, porcentaje);
    }

    // Mezclar el array de caracteres
    seleccionCaracteres = shuffleArray(seleccionCaracteres);

    // Construir la contraseña final
    let contraseñaGenerada = seleccionCaracteres.join('');

    // Establecer la contraseña generada en el campo de entrada
    const passwordInputElement = document.getElementById("passwordInput");
    passwordInputElement.value = contraseñaGenerada;
});

// Manejar el evento de copiar al portapapeles
document.getElementById("copiar").addEventListener("click", function() {
    const passwordInputElement = document.getElementById("passwordInput");
    passwordInputElement.select();
    document.execCommand("copy");
});

// Función para mezclar un array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
