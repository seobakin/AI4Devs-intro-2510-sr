/**
 * =============================================================================
 * SCRIPT PRINCIPAL - INVERTIDOR DE CADENAS
 * =============================================================================
 * Este script maneja toda la funcionalidad de inversión de texto en tiempo real.
 * 
 * Características principales:
 * - Inversión de texto en tiempo real mientras el usuario escribe
 * - Botón que aparece/desaparece según la longitud del texto (>3 caracteres)
 * - Función de copiar al portapapeles con feedback visual
 * - Ejemplos predefinidos clickeables
 * - Contador de caracteres en tiempo real
 * =============================================================================
 */

// =============================================================================
// INICIALIZACIÓN Y REFERENCIAS A ELEMENTOS DEL DOM
// =============================================================================

// Esperamos a que el DOM esté completamente cargado antes de ejecutar nuestro código
document.addEventListener('DOMContentLoaded', () => {
    
    // Obtenemos referencias a todos los elementos que vamos a manipular
    const textInput = document.getElementById('textInput');
    const reversedText = document.getElementById('reversedText');
    const reverseBtn = document.getElementById('reverseBtn');
    const copyBtn = document.getElementById('copyBtn');
    const outputBox = document.getElementById('outputBox');
    const statusMessage = document.getElementById('statusMessage');
    const charCounter = document.getElementById('charCounter');
    const exampleChips = document.querySelectorAll('.example-chip');
    
    // Variable para almacenar el timeout del mensaje de estado
    let statusTimeout;
    
    // =============================================================================
    // FUNCIÓN PRINCIPAL: INVERTIR CADENA
    // =============================================================================
    
    /**
     * Invierte una cadena de texto manteniendo la correcta codificación Unicode
     * Esta función maneja correctamente emojis y caracteres especiales
     * 
     * @param {string} str - La cadena a invertir
     * @returns {string} - La cadena invertida
     * 
     * Explicación del algoritmo:
     * 1. Convertimos la cadena en un array usando spread operator [...str]
     *    Esto es importante porque split('') no maneja bien los emojis
     * 2. Invertimos el array con reverse()
     * 3. Unimos el array de vuelta en una cadena con join('')
     */
    function reverseString(str) {
        // Método moderno que maneja correctamente Unicode y emojis
        return [...str].reverse().join('');
        
        // Método alternativo tradicional (no maneja bien emojis):
        // return str.split('').reverse().join('');
    }
    
    // =============================================================================
    // FUNCIÓN: ACTUALIZAR TEXTO INVERTIDO
    // =============================================================================
    
    /**
     * Actualiza el texto invertido en la interfaz y maneja los estados visuales
     * Esta función se ejecuta cada vez que el usuario escribe algo
     */
    function updateReversedText() {
        const inputValue = textInput.value;
        const charCount = inputValue.length;
        
        // Actualizamos el contador de caracteres
        charCounter.textContent = `${charCount} ${charCount === 1 ? 'caracter' : 'caracteres'}`;
        
        // Verificamos si hay texto para invertir
        if (inputValue.trim() === '') {
            // Si no hay texto, mostramos el placeholder
            reversedText.textContent = 'El resultado aparecerá aquí...';
            reversedText.classList.add('placeholder');
            outputBox.classList.remove('active');
            copyBtn.classList.add('hidden');
        } else {
            // Si hay texto, lo invertimos y lo mostramos
            const reversed = reverseString(inputValue);
            reversedText.textContent = reversed;
            reversedText.classList.remove('placeholder');
            outputBox.classList.add('active');
            copyBtn.classList.remove('hidden');
        }
        
        // Mostramos/ocultamos el botón según la longitud del texto
        // El botón aparece solo cuando hay más de 3 caracteres
        if (charCount > 3) {
            reverseBtn.classList.remove('hidden');
            // Añadimos una pequeña animación de entrada
            setTimeout(() => {
                reverseBtn.style.transform = 'translateY(0)';
            }, 10);
        } else {
            reverseBtn.classList.add('hidden');
        }
    }
    
    // =============================================================================
    // FUNCIÓN: COPIAR AL PORTAPAPELES
    // =============================================================================
    
    /**
     * Copia el texto invertido al portapapeles del usuario
     * Usa la API moderna del portapapeles con fallback para navegadores antiguos
     */
    async function copyToClipboard() {
        const textToCopy = reversedText.textContent;
        
        // No copiamos si es el texto placeholder
        if (textToCopy === 'El resultado aparecerá aquí...') {
            return;
        }
        
        try {
            // Intentamos usar la API moderna del portapapeles
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy);
            } else {
                // Fallback para navegadores antiguos o contextos no seguros
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                textArea.remove();
            }
            
            // Mostramos mensaje de éxito
            showStatusMessage('¡Texto copiado al portapapeles!', 'success');
            
            // Animación visual del botón
            copyBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                copyBtn.style.transform = 'scale(1)';
            }, 200);
            
        } catch (error) {
            console.error('Error al copiar:', error);
            showStatusMessage('Error al copiar el texto', 'error');
        }
    }
    
    // =============================================================================
    // FUNCIÓN: MOSTRAR MENSAJE DE ESTADO
    // =============================================================================
    
    /**
     * Muestra un mensaje temporal de estado con animación
     * 
     * @param {string} message - El mensaje a mostrar
     * @param {string} type - Tipo de mensaje ('success' o 'error')
     */
    function showStatusMessage(message, type = 'success') {
        // Limpiamos cualquier timeout anterior
        if (statusTimeout) {
            clearTimeout(statusTimeout);
        }
        
        // Actualizamos el contenido del mensaje
        const statusText = statusMessage.querySelector('.status-text');
        const statusIcon = statusMessage.querySelector('.status-icon');
        
        statusText.textContent = message;
        statusIcon.textContent = type === 'success' ? '✅' : '❌';
        
        // Mostramos el mensaje con animación
        statusMessage.classList.remove('hidden');
        
        // Ocultamos el mensaje después de 3 segundos
        statusTimeout = setTimeout(() => {
            statusMessage.classList.add('hidden');
        }, 3000);
    }
    
    // =============================================================================
    // FUNCIÓN: APLICAR TEXTO DE EJEMPLO
    // =============================================================================
    
    /**
     * Aplica un texto de ejemplo cuando el usuario hace clic en un chip
     * 
     * @param {string} exampleText - El texto de ejemplo a aplicar
     */
    function applyExampleText(exampleText) {
        // Establecemos el texto en el input
        textInput.value = exampleText;
        
        // Disparamos el evento de input para actualizar la inversión
        updateReversedText();
        
        // Enfocamos el input para que el usuario pueda seguir editando
        textInput.focus();
        
        // Seleccionamos todo el texto para facilitar su edición
        textInput.select();
        
        // Añadimos un efecto visual al input
        textInput.style.transform = 'scale(1.02)';
        setTimeout(() => {
            textInput.style.transform = 'scale(1)';
        }, 200);
    }
    
    // =============================================================================
    // EVENT LISTENERS - MANEJADORES DE EVENTOS
    // =============================================================================
    
    /**
     * Evento INPUT: Se dispara cada vez que el usuario escribe
     * Esto permite la actualización en tiempo real
     */
    textInput.addEventListener('input', updateReversedText);
    
    /**
     * Evento CLICK en el botón de invertir
     * Aunque la inversión es en tiempo real, el botón puede servir para
     * dar feedback visual o realizar acciones adicionales
     */
    reverseBtn.addEventListener('click', () => {
        // Actualizamos el texto (aunque ya debería estar actualizado)
        updateReversedText();
        
        // Añadimos una animación al botón para feedback visual
        reverseBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            reverseBtn.style.transform = 'scale(1)';
        }, 200);
        
        // Mostramos un mensaje de confirmación
        showStatusMessage('¡Texto invertido correctamente!', 'success');
        
        // Opcional: Seleccionamos el texto invertido para facilitar su copia
        if (window.getSelection) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(reversedText);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });
    
    /**
     * Evento CLICK en el botón de copiar
     */
    copyBtn.addEventListener('click', copyToClipboard);
    
    /**
     * Eventos CLICK en los chips de ejemplo
     * Cada chip aplica su texto predefinido al input
     */
    exampleChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const exampleText = chip.dataset.text;
            applyExampleText(exampleText);
            
            // Añadimos efecto visual al chip clickeado
            chip.style.transform = 'scale(0.95)';
            setTimeout(() => {
                chip.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    /**
     * Evento KEYDOWN para atajos de teclado
     * Ctrl+Enter o Cmd+Enter para copiar el texto invertido
     */
    textInput.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (!copyBtn.classList.contains('hidden')) {
                copyToClipboard();
            }
        }
    });
    
    /**
     * Evento para limpiar el input con Escape
     */
    textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            textInput.value = '';
            updateReversedText();
            textInput.blur(); // Quita el foco del input
        }
    });
    
    // =============================================================================
    // INICIALIZACIÓN
    // =============================================================================
    
    // Ejecutamos una actualización inicial por si hay texto predefinido
    updateReversedText();
    
    // Enfocamos el input al cargar la página para mejor UX
    textInput.focus();
    
    // =============================================================================
    // FUNCIONALIDAD ADICIONAL: PERSISTENCIA LOCAL (OPCIONAL)
    // =============================================================================
    
    /**
     * Guardamos el último texto ingresado en localStorage
     * para recuperarlo cuando el usuario vuelva a la página
     */
    
    // Recuperar texto guardado al cargar
    const savedText = localStorage.getItem('lastReversedText');
    if (savedText) {
        textInput.value = savedText;
        updateReversedText();
    }
    
    // Guardar texto cuando el usuario escribe
    textInput.addEventListener('input', () => {
        localStorage.setItem('lastReversedText', textInput.value);
    });
    
    // =============================================================================
    // INFORMACIÓN DE DEPURACIÓN (Solo en desarrollo)
    // =============================================================================
    
    console.log('%c🔄 Invertidor de Cadenas Cargado', 'color: #6366f1; font-size: 16px; font-weight: bold;');
    console.log('%cDesarrollado con JavaScript ES6+', 'color: #8b5cf6; font-size: 12px;');
    console.log('Atajos de teclado disponibles:');
    console.log('- Ctrl/Cmd + Enter: Copiar texto invertido');
    console.log('- Escape: Limpiar campo de texto');
});

// =============================================================================
// FIN DEL SCRIPT
// =============================================================================
