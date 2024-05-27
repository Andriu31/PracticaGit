document.addEventListener('DOMContentLoaded', function () {
    // Espera a que el DOM esté completamente cargado antes de ejecutar el código dentro de esta función.
    const form = document.getElementById('myForm');
    const searchForm = document.getElementById('searchForm');
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const searchResult = document.getElementById('searchResult');

    // Inicializa un array vacío para almacenar los datos de las personas.
    let people = [];

    // Función para calcular la edad a partir de la fecha de nacimiento.
    function calculateAge(birthdate) {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // Event listener para el envío del formulario principal.
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Previene el envío del formulario.

        // Obtén los valores de los campos del formulario.
        const name = document.getElementById('name').value;
        const birthdate = document.getElementById('birthdate').value;
        const sex = document.getElementById('sex').value;
        const age = calculateAge(birthdate); // Calcula la edad usando la fecha de nacimiento.

        // Crea un objeto para la persona.
        const person = {
            name: name,
            birthdate: birthdate,
            age: age,
            sex: sex
        };

        // Añadir el objeto al array de personas.
        people.push(person);

        // Añadir los datos a la tabla.
        const newRow = table.insertRow();
        newRow.insertCell(0).textContent = name;
        newRow.insertCell(1).textContent = birthdate;
        newRow.insertCell(2).textContent = age;
        newRow.insertCell(3).textContent = sex;

        // Limpiar el formulario después de añadir los datos a la tabla.
        form.reset();
    });

    // Event listener para el envío del formulario de búsqueda.
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Previene el envío del formulario de búsqueda.

        // Obtén el valor del campo de búsqueda.
        const searchName = document.getElementById('searchName').value;
        // Busca la persona en el array de personas.
        const person = people.find(p => p.name.toLowerCase() === searchName.toLowerCase());

        // Si la persona existe, muestra sus datos.
        if (person) {
            alert(`Nombre: ${person.name}, Fecha de Nacimiento: ${person.birthdate}, Edad: ${person.age}, Sexo: ${person.sex}`)
            searchResult.textContent = `Nombre: ${person.name}, Fecha de Nacimiento: ${person.birthdate}, Edad: ${person.age}, Sexo: ${person.sex}`;
        } else {
            // Si la persona no existe, muestra un mensaje de error.
            alert("Persona No encontrada");
            searchResult.textContent = 'Persona no encontrada';
        }
    });
});