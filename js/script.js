// --- Theme & Layout Management ---
        const html = document.documentElement;
        const themeToggle = document.getElementById('theme-toggle');
        
        // Initialize theme based on checkbox (defaults to checked/dark)
        themeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }
        });

        // Toggle Login Menu
        function toggleLogin() {
            const menu = document.getElementById('login-menu');
            menu.classList.toggle('hidden');
        }

        function loginSuccess() {
            toggleLogin();
            showMsg("Login", "Simulación de inicio de sesión exitosa.");
        }

        // Section Navigation
        function showSection(id) {
            // Hide all sections
            document.querySelectorAll('.exercise-section').forEach(el => el.classList.add('hidden'));
            // Remove active styles from nav buttons
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('bg-purple-100', 'dark:bg-discord-darker', 'dark:text-purple-400', 'dark:border-purple-500', 'active-nav');
                btn.classList.add('dark:border-transparent');
            });
            // Show selected
            document.getElementById(id).classList.remove('hidden');
            // Highlight clicked button
            event.currentTarget.classList.add('bg-purple-100', 'dark:bg-discord-darker', 'dark:text-purple-400', 'dark:border-purple-500', 'active-nav');
            event.currentTarget.classList.remove('dark:border-transparent');
        }

        // Custom Modal Function (Replacement for alert)
        function showMsg(title, content) {
            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-body').innerHTML = content;
            document.getElementById('modal-overlay').classList.remove('hidden');
        }

        function closeModal() {
            document.getElementById('modal-overlay').classList.add('hidden');
        }


        // --- Exercise 1: Votaciones ---
        function castVote() {
            const section = document.getElementById('vote-section').value;
            let msg = "";
            switch (section) {
                case 'norte':
                    msg = "Has registrado exitosamente tu voto por la sección <strong class='text-purple-500 dark:text-purple-400'>Norte</strong>.";
                    break;
                case 'sur':
                    msg = "Has registrado exitosamente tu voto por la sección <strong class='text-purple-500 dark:text-purple-400'>Sur</strong>.";
                    break;
                case 'centro':
                    msg = "Has registrado exitosamente tu voto por la sección <strong class='text-purple-500 dark:text-purple-400'>Centro</strong>.";
                    break;
                default:
                    msg = "Por favor, selecciona una sección válida antes de votar.";
                    break;
            }
            showMsg("Registro de Voto", msg);
        }


        // --- Exercise 2: Suma de Positivos ---
        let currentTotal = 0;
        function addNumber() {
            const inputEl = document.getElementById('num-input');
            const val = parseFloat(inputEl.value);
            
            if (isNaN(val)) {
                showMsg("Error", "Por favor ingresa un número válido.");
                return;
            }

            if (val <= 0) {
                // End program
                showMsg("Suma Finalizada", `Ingresaste un número negativo o cero.\nLa suma total de los positivos es:\n\n<div class="text-center text-4xl font-bold text-purple-600 dark:text-purple-400 my-4">${currentTotal}</div>`);
                resetSum();
            } else {
                // Add to sum
                currentTotal += val;
                document.getElementById('current-sum').innerText = currentTotal;
                inputEl.value = '';
                inputEl.focus();
            }
        }
        function resetSum() {
            currentTotal = 0;
            document.getElementById('current-sum').innerText = currentTotal;
            document.getElementById('num-input').value = '';
        }


        // --- Exercise 3: If-else y Case ---
        function sortNumbers() {
            const n1 = parseFloat(document.getElementById('n1').value);
            const n2 = parseFloat(document.getElementById('n2').value);
            const n3 = parseFloat(document.getElementById('n3').value);
            
            if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
                showMsg("Error", "Debes ingresar los 3 números.");
                return;
            }

            const arr = [n1, n2, n3];
            arr.sort((a, b) => b - a); // Sort descending
            
            showMsg("Números Ordenados", `De mayor a menor: <br><br><div class="text-2xl font-bold text-center text-purple-600 dark:text-purple-400 bg-gray-100 dark:bg-discord-main p-4 rounded border dark:border-purple-500">${arr.join(' > ')}</div>`);
        }

        function calcNeto() {
            const bruto = parseFloat(document.getElementById('importe-bruto').value);
            if (isNaN(bruto) || bruto < 0) {
                showMsg("Error", "Ingresa un importe válido.");
                return;
            }

            let impuesto = 0;
            if (bruto > 15000) {
                impuesto = 0.16;
            } else {
                impuesto = 0.10;
            }

            const neto = bruto + (bruto * impuesto);
            showMsg("Cálculo de Importe Neto", `
<div class="space-y-2 text-base">
    <div class="flex justify-between"><span>Importe Bruto:</span> <span class="font-bold">€${bruto.toFixed(2)}</span></div>
    <div class="flex justify-between"><span>Tasa de Impuesto:</span> <span class="font-bold text-purple-600 dark:text-purple-400">${impuesto * 100}%</span></div>
    <div class="border-t border-gray-400 my-2 pt-2 flex justify-between text-lg"><span>Importe Neto Final:</span> <strong class="text-green-600 dark:text-green-400">€${neto.toFixed(2)}</strong></div>
</div>`);
        }

        function calcSueldo() {
            const anios = parseFloat(document.getElementById('anios-empresa').value);
            if (isNaN(anios) || anios < 0) {
                showMsg("Error", "Ingresa una cantidad de años válida.");
                return;
            }

            const sueldoBase = 40000;
            let aumentoPct = 0;

            if (anios > 10) {
                aumentoPct = 0.10;
            } else if (anios > 5 && anios <= 10) {
                aumentoPct = 0.07;
            } else if (anios > 3 && anios <= 5) {
                aumentoPct = 0.05;
            } else {
                aumentoPct = 0.03;
            }

            const aumento = sueldoBase * aumentoPct;
            const sueldoFinal = sueldoBase + aumento;

            showMsg("Sueldo Anual", `
<div class="space-y-2 text-base">
    <div class="flex justify-between"><span>Sueldo Base:</span> <span class="font-bold">€40,000.00</span></div>
    <div class="flex justify-between"><span>Antigüedad:</span> <span class="font-bold">${anios} años</span></div>
    <div class="flex justify-between text-purple-600 dark:text-purple-400"><span>Aumento (${aumentoPct * 100}%):</span> <span class="font-bold">+€${aumento.toFixed(2)}</span></div>
    <div class="border-t border-gray-400 my-2 pt-2 flex justify-between text-lg"><span>Sueldo Final:</span> <strong class="text-green-600 dark:text-green-400">€${sueldoFinal.toFixed(2)}</strong></div>
</div>`);
        }


        // --- Exercise 4: While y For ---
        function sumImpares() {
            let sum = 0;
            let i = 1;
            while (i <= 100) {
                if (i % 2 !== 0) {
                    sum += i;
                }
                i++;
            }
            showMsg("Suma de Impares", `La suma de todos los números impares del 1 al 100 es:<br><br><div class="text-center text-4xl font-bold text-purple-600 dark:text-purple-400">${sum}</div>`);
        }

        function printAsterisks() {
            const n = parseInt(document.getElementById('num-asteriscos').value);
            if (isNaN(n) || n <= 0) {
                showMsg("Error", "Ingresa un número entero positivo.");
                return;
            }
            
            let output = "";
            for (let i = 0; i < n; i++) {
                output += "* ";
            }
            showMsg(`Asteriscos (${n})`, `<div class="text-3xl text-center break-words text-purple-600 dark:text-purple-400 leading-tight">${output}</div>`);
        }

        function generateTables() {
            let output = "<div class='grid grid-cols-2 sm:grid-cols-5 gap-3'>";
            for (let i = 1; i <= 10; i++) {
                output += "<div class='bg-purple-100 dark:bg-discord-main p-2 rounded border dark:border-purple-600 shadow-sm'>";
                output += `<strong class="block text-center border-b border-purple-300 dark:border-purple-600 mb-2 pb-1 text-purple-700 dark:text-purple-400">Tabla del ${i}</strong>`;
                for (let j = 1; j <= 10; j++) {
                    output += `<div class="text-xs text-center flex justify-between px-1"><span>${i} x ${j}</span> <span>= ${i * j}</span></div>`;
                }
                output += "</div>";
            }
            output += "</div>";
            showMsg("Tablas de Multiplicar", output);
        }


        // --- Exercise 5: Arreglos ---
        const initialCountries = ['México', 'Canadá', 'España', 'Japón', 'Brasil', 'Italia', 'Alemania', 'Francia', 'China', 'Perú'];
        let countries = [...initialCountries];

        function renderArray() {
            const container = document.getElementById('array-display');
            container.innerHTML = '';
            document.getElementById('arr-length').innerText = countries.length;

            if(countries.length === 0) {
                container.innerHTML = '<span class="text-gray-400 italic">Arreglo vacío</span>';
                return;
            }

            countries.forEach((country, index) => {
                const el = document.createElement('span');
                // Handle holes in array (due to 'delete' operator)
                if (country === undefined) {
                    el.className = "bg-gray-200 dark:bg-discord-main text-gray-500 px-2 py-1 rounded shadow-sm border border-dashed border-gray-400";
                    el.innerText = `[${index}]: undefined`;
                } else {
                    el.className = "bg-white dark:bg-discord-main px-2 py-1 rounded shadow-sm border border-purple-300 dark:border-purple-500 font-semibold dark:text-purple-300";
                    el.innerText = `[${index}]: ${country}`;
                }
                container.appendChild(el);
            });
        }

        function arrMethod(method) {
            const valInput = document.getElementById('arr-val').value;
            const idxInput = parseInt(document.getElementById('arr-idx').value);
            let prevArr = JSON.stringify(countries);
            let resMsg = "";

            try {
                switch(method) {
                    case 'pop':
                        resMsg = `Elemento extraído: <strong class="text-purple-600 dark:text-purple-400">${countries.pop()}</strong>`;
                        break;
                    case 'shift':
                        resMsg = `Elemento extraído: <strong class="text-purple-600 dark:text-purple-400">${countries.shift()}</strong>`;
                        break;
                    case 'push':
                        if(!valInput) throw "Ingresa un valor para Push";
                        countries.push(valInput);
                        resMsg = `Agregado al final. Nueva longitud: <strong class="text-purple-600 dark:text-purple-400">${countries.length}</strong>`;
                        break;
                    case 'unshift':
                        if(!valInput) throw "Ingresa un valor para Unshift";
                        countries.unshift(valInput);
                        resMsg = `Agregado al inicio. Nueva longitud: <strong class="text-purple-600 dark:text-purple-400">${countries.length}</strong>`;
                        break;
                    case 'reverse':
                        countries.reverse();
                        resMsg = "Arreglo invertido exitosamente.";
                        break;
                    case 'sort':
                        countries.sort();
                        resMsg = "Arreglo ordenado alfabéticamente.";
                        break;
                    case 'length':
                        resMsg = `La longitud actual del arreglo es: <strong class="text-purple-600 dark:text-purple-400 text-lg">${countries.length}</strong>`;
                        // Doesn't modify, just show msg early
                        showMsg("Propiedad Length", resMsg);
                        return;
                    case 'join':
                        resMsg = `Cadena generada con join(' - '):\n\n<div class="bg-gray-100 dark:bg-discord-main p-3 rounded border dark:border-purple-500 text-purple-700 dark:text-purple-300 mt-2">${countries.join(' - ')}</div>`;
                        showMsg("Método Join", resMsg);
                        return;
                    case 'concat':
                        const newArr = countries.concat(['Chile', 'Cuba']);
                        resMsg = `Arreglo resultante (nota: <em>concat no modifica el original</em>):\n\n<div class="bg-gray-100 dark:bg-discord-main p-3 rounded border dark:border-purple-500 text-purple-700 dark:text-purple-300 mt-2 break-words">${JSON.stringify(newArr)}</div>`;
                        showMsg("Método Concat", resMsg);
                        return;
                    case 'delete':
                        if(isNaN(idxInput) || idxInput < 0 || idxInput >= countries.length) throw "Índice inválido para Delete";
                        delete countries[idxInput];
                        resMsg = `Se usó delete en el índice <strong>${idxInput}</strong>. Queda un elemento 'undefined'.`;
                        break;
                    case 'splice':
                        if(isNaN(idxInput)) throw "Ingresa un índice válido para Splice";
                        const toInsert = valInput ? valInput : 'Nuevo País';
                        const removed = countries.splice(idxInput, 1, toInsert);
                        resMsg = `Eliminado: <strong class="text-red-500">${removed}</strong>. Insertado: <strong class="text-green-500">${toInsert}</strong> en índice ${idxInput}`;
                        break;
                }

                // Update visual
                renderArray();
                
                // Construct feedback msg
                const feedback = `
<div class="mb-3 text-base"><span class="font-bold text-gray-500 dark:text-gray-400">Acción:</span> <span class="text-purple-600 dark:text-purple-400 font-bold uppercase">${method}()</span></div>
<div class="mb-4 text-base"><span class="font-bold text-gray-500 dark:text-gray-400">Resultado:</span> ${resMsg}</div>
<div class="grid grid-cols-1 gap-3 mt-4 text-xs">
    <div class="bg-gray-100 dark:bg-discord-main p-3 rounded border dark:border-gray-600">
        <strong class="text-gray-600 dark:text-gray-300 mb-1 block">Antes:</strong><span class="opacity-75 break-words">${prevArr}</span>
    </div>
    <div class="bg-purple-50 dark:bg-discord-main p-3 rounded border dark:border-purple-500">
        <strong class="text-purple-600 dark:text-purple-400 mb-1 block">Después:</strong><span class="opacity-100 break-words dark:text-purple-200">${JSON.stringify(countries)}</span>
    </div>
</div>`;
                showMsg(`Método ejecutado`, feedback);

            } catch (err) {
                showMsg("Error de Arreglo", `<span class="text-red-500 font-bold">${err}</span>`);
            }
        }

        function resetArray() {
            countries = [...initialCountries];
            renderArray();
            document.getElementById('arr-val').value = '';
            document.getElementById('arr-idx').value = '';
        }

        // Initialize Array View on load
        window.onload = function() {
            renderArray();
        };
