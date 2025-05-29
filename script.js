document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scroll para enlaces de navegación ---
    const scrollLinks = document.querySelectorAll('.scroll-link');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href') || this.dataset.target;
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // --- Acordeones ---
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            button.classList.toggle('active');
            const icon = button.querySelector('i'); // Obtener el ícono dentro del botón

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                if (icon) icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                if (icon) icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            }
        });
    });

    // --- Simulación Validación DCC ---
    const validateDccBtn = document.getElementById('validateDccBtn');
    if (validateDccBtn) {
        validateDccBtn.addEventListener('click', () => {
            const dccInput = document.getElementById('dccInput').value;
            const resultP = document.getElementById('dccValidationResult');
            if (dccInput.trim() === '') {
                resultP.textContent = 'Por favor, ingrese algún contenido XML.';
                resultP.style.color = 'orange';
            } else if (dccInput.includes('<dcc:') && dccInput.includes('</dcc:')) {
                resultP.textContent = 'Simulación: Estructura XML de DCC básica detectada. Para validación real, se requiere un esquema XSD.';
                resultP.style.color = 'green';
            } else {
                resultP.textContent = 'Simulación: No parece ser un fragmento de DCC válido (falta etiqueta <dcc:...>).';
                resultP.style.color = 'red';
            }
        });
    }

    // --- Simulación Firma de Software ---
    const simulateSignBtn = document.getElementById('simulateSignBtn');
    if (simulateSignBtn) {
        simulateSignBtn.addEventListener('click', () => {
            const keyType = document.getElementById('signingKeyType').value;
            const resultP = document.getElementById('signingResult');
            if (keyType === 'valid') {
                resultP.textContent = 'Simulación: Paquete firmado con éxito utilizando una clave válida. ';
                resultP.innerHTML += '<i class="fas fa-check-circle" style="color:green;"></i>'; // Asegurar que se añade el ícono
                resultP.style.color = 'green';
            } else {
                resultP.textContent = 'Simulación: ¡Error! La firma falló. La clave es inválida o ha expirado. ';
                resultP.innerHTML += '<i class="fas fa-times-circle" style="color:red;"></i>'; // Asegurar que se añade el ícono
                resultP.style.color = 'red';
            }
        });
    }
    
    // --- Simulación Visualización Propiedad de Código ---
    const visualizeOwnershipBtn = document.getElementById('visualizeOwnershipBtn');
    if (visualizeOwnershipBtn) {
        visualizeOwnershipBtn.addEventListener('click', () => {
            const metric = document.getElementById('ownershipMetric').value;
            const visualDiv = document.getElementById('ownershipVisual');
            let outputHtml = `<h4>Desarrolladores Principales (Simulado - ${metric === 'commits' ? 'por Commits' : 'por LOC'}):</h4><ul>`;
            if (metric === 'commits') {
                outputHtml += `<li>Ana Pérez (ModuloInterfaz.java): 150 commits</li>`;
                outputHtml += `<li>Carlos López (CoreEngine.cpp): 120 commits</li>`;
                outputHtml += `<li>Laura Rey (Utils.py): 95 commits</li>`;
            } else { // LOC
                outputHtml += `<li>Carlos López (CoreEngine.cpp): 25000 LOC</li>`;
                outputHtml += `<li>David Soler (DatabaseSchema.sql): 18000 LOC</li>`;
                outputHtml += `<li>Ana Pérez (ModuloInterfaz.java): 12000 LOC</li>`;
            }
            outputHtml += `</ul><p><em>Nota: Estos son datos simulados para ilustración.</em></p>`;
            visualDiv.innerHTML = outputHtml;
            visualDiv.style.color = 'var(--text-color)'; // Reset color
        });
    }

    // --- Contact Form (Simulación de envío) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formStatus = document.getElementById('formStatus');
            formStatus.textContent = 'Enviando mensaje... (simulación)';
            formStatus.style.color = 'blue';

            // Simular un pequeño retraso de red
            setTimeout(() => {
                // Aquí iría la lógica real de envío (AJAX, Fetch API)
                // Por ahora, solo simulamos éxito
                formStatus.textContent = '¡Mensaje enviado con éxito! (simulación)';
                formStatus.style.color = 'green';
                contactForm.reset(); // Limpiar el formulario
            }, 1500);
        });
    }

});

// --- Función Global para Quizzes Interactivos ---
// (La colocamos fuera del DOMContentLoaded para que sea accesible desde el HTML onclick)
function checkQuiz(quizId, correctAnswerValue, feedbackId) {
    const selectedValue = document.getElementById(quizId).value;
    const feedbackEl = document.getElementById(feedbackId);

    if (selectedValue === "") {
        feedbackEl.textContent = "Por favor, selecciona una opción.";
        feedbackEl.className = 'quiz-feedback'; // Reset classes
        feedbackEl.style.color = "orange";
        return;
    }

    if (selectedValue === correctAnswerValue) {
        feedbackEl.textContent = "¡Correcto! " + getExplanation(quizId, true);
        feedbackEl.className = 'quiz-feedback correct';
    } else {
        feedbackEl.textContent = "Incorrecto. " + getExplanation(quizId, false) + " La respuesta correcta era: " + getCorrectAnswerText(quizId) + ".";
        feedbackEl.className = 'quiz-feedback incorrect';
    }
}

function getExplanation(quizId, isCorrect) {
    // Podrías expandir esto con explicaciones más detalladas
    switch(quizId) {
        case 'dccQuiz':
            return isCorrect ? "Un identificador único es esencial para la trazabilidad global." : "Aunque otros campos son importantes,";
        case 'signatureQuiz':
            return isCorrect ? "Los certificados tienen una vida útil limitada." : "Si bien otros problemas ocurren,";
        case 'ownershipQuiz':
            return isCorrect ? "La apropiación gradual y el aprendizaje activo son claves para módulos complejos." : "Aunque útil,";
        default:
            return "";
    }
}

function getCorrectAnswerText(quizId) {
    // Esta función intenta obtener el texto de la opción correcta.
    // Sería más robusto si tuvieras un objeto mapeando valores a textos.
    const selectElement = document.getElementById(quizId);
    let correctAnswerText = "";
    
    // Encuentra la opción que tiene el correctAnswerValue
    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value === selectElement.querySelector(`option[value="${getCorrectValueForQuiz(quizId)}"]`).value) {
             // Necesitamos encontrar el valor correcto que corresponde al texto que queremos mostrar
             // Esto es un poco enrevesado porque estamos buscando el texto de la opción correcta basado en el valor.
             // Idealmente, tendríamos los textos correctos predefinidos.
            let correctOptionValue;
            switch(quizId) {
                case 'dccQuiz': correctOptionValue = 'uniqueId'; break;
                case 'signatureQuiz': correctOptionValue = 'expired'; break;
                case 'ownershipQuiz': correctOptionValue = 'assign'; break;
                default: return "";
            }
            const correctOption = selectElement.querySelector(`option[value="${correctOptionValue}"]`);
            if (correctOption) {
                correctAnswerText = correctOption.textContent;
            }
            break; // Salir del bucle una vez encontrado
        }
    }
    return `"${correctAnswerText}"`;
}

// Función auxiliar para getCorrectAnswerText, para obtener el valor correcto basado en quizId
function getCorrectValueForQuiz(quizId) {
    switch(quizId) {
        case 'dccQuiz': return 'uniqueId';
        case 'signatureQuiz': return 'expired';
        case 'ownershipQuiz': return 'assign';
        default: return '';
    }
}
