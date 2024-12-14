const banner = document.getElementById('banner');
const registro = document.getElementById('registro');
const dashboard = document.getElementById('dashboard');
const dashboard__link = document.getElementById('dashboard__link');
const estudiantes = document.getElementById('estudiantes');
const estudiantes__data = document.getElementById('estudiantes__data');
const urlParams = new URLSearchParams(window.location.search);
let userid = urlParams.get('userid');
if (!userid) {
    userid = "apiKey1";
}
function displayData(data) {
    // Obtener el contenedor donde se insertará la tabla
    const container = document.getElementById('estudiantes__data');

    // Crear la tabla
    const table = document.createElement('table');
    table.id = 'estdiante__data-table';
    table.className = 'table';

    // Crear la fila de encabezados
    const headerRow = document.createElement('tr');
    const headers = ['ID', 'Nombre', 'Apellido', 'Email', 'Rol', 'API Key'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Llenar la tabla con los datos
    data.forEach(item => {
        const row = document.createElement('tr');

        // Crear celdas para cada dato
        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nombreCell = document.createElement('td');
        nombreCell.textContent = item.nombre;
        row.appendChild(nombreCell);

        const apellidoCell = document.createElement('td');
        apellidoCell.textContent = item.apellido;
        row.appendChild(apellidoCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = item.email;
        row.appendChild(emailCell);

        const rolCell = document.createElement('td');
        rolCell.textContent = item.rol;
        row.appendChild(rolCell);

        const apiKeyCell = document.createElement('td');
        apiKeyCell.innerHTML = `<a href="/?userid=${item.apiKey}">Referidos</a>`; // Insertar el enlace
        row.appendChild(apiKeyCell);

        table.appendChild(row);
    });

    // Insertar la tabla en el contenedor
    container.appendChild(table);
}

async function fetchData() {
    try {
        // Hacer la petición GET
        const apiUrl = "http://localhost:3000/usuarios"
        const response = await fetch(apiUrl);
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Convertir la respuesta a JSON
        const data = await response.json();
        // Mostrar los datos en la página
        console.log(data);
        displayData(data);
    } catch (error) {
        console.error('Hubo un problema con la petición fetch:', error);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario por defecto
        
        // Obtener los valores de los campos del formulario
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const program = document.getElementById('program').value;

        const data = {
            name: name,
            phone: phone,
            email: email,
            program: program,
            userid: userid
        };
        banner.style.display = 'none';
        registro.style.display = 'block';
        // fetch('http://localhost:3000/referidos', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Success:', data);
        //     banner.style.display = 'none';
        //     registro.style.display = 'block';
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // });
    });
});

dashboard__link.addEventListener('click', function(event) {
    event.preventDefault();
    banner.style.display = 'none';
    registro.style.display = 'none';
    estudiantes__data.style.display = 'none';
    dashboard.style.display = 'block';
});

estudiantes.addEventListener('click', function(event) {
    event.preventDefault();
    banner.style.display = 'none';
    registro.style.display = 'none';
    dashboard.style.display = 'none';
    estudiantes__data.style.display = 'flex';
    
    if(document.getElementById("estdiante__data-table")){
        
    }else{
        fetchData()
    }
    
});
