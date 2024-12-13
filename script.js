const banner = document.getElementById('banner');
const urlParams = new URLSearchParams(window.location.search);
        let userid = urlParams.get('userid');

        if (!userid) {
            userid = "apiKey1";
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

        fetch('http://localhost:3000/referidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            banner.style.display = 'none';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});