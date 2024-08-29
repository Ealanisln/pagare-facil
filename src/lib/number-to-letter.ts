export function numeroALetras(numero: number): string {
    const unidades: string[] = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const decenas: string[] = ['diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const especiales: string[] = ['once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const centenas: string[] = ['ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    if (numero === 0) return 'cero';
    if (numero < 0) return 'menos ' + numeroALetras(Math.abs(numero));

    let letras = '';

    if (numero >= 1000000) {
        const millones = Math.floor(numero / 1000000);
        letras += numeroALetras(millones) + (millones === 1 ? ' millón ' : ' millones ');
        numero %= 1000000;
    }

    if (numero >= 1000) {
        const miles = Math.floor(numero / 1000);
        letras += (miles === 1 ? 'mil ' : numeroALetras(miles) + ' mil ');
        numero %= 1000;
    }

    if (numero >= 100) {
        if (numero === 100) {
            letras += 'cien ';
        } else {
            letras += centenas[Math.floor(numero / 100) - 1] + ' ';
        }
        numero %= 100;
    }

    if (numero >= 20) {
        letras += decenas[Math.floor(numero / 10) - 1];
        if (numero % 10 !== 0) {
            letras += ' y ' + unidades[numero % 10];
        }
    } else if (numero >= 10) {
        letras += especiales[numero - 10];
    } else if (numero > 0) {
        letras += unidades[numero];
    }

    return letras.trim();
}

export function formatearCantidad(numero: number): string {
    const parteEntera = Math.floor(numero);
    const parteDecimal = Math.round((numero - parteEntera) * 100);
    
    let resultado = numeroALetras(parteEntera);
    resultado += ' pesos';
    
    // Format the decimal part as XX/100 MXN
    const centavos = parteDecimal.toString().padStart(2, '0');
    resultado += ` ${centavos}/100 MXN`;
    
    return resultado;
}