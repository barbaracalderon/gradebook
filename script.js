document.addEventListener('DOMContentLoaded', () => {
    const registrationSection = document.getElementById('registration-section');
    const homeSection = document.getElementById('home-section');
    const subjectsSection = document.getElementById('subjects-section');
    const studentsSection = document.getElementById('students-section');

    document.getElementById('nav-register').addEventListener('click', () => showSection('registration-section'));
    document.getElementById('nav-home').addEventListener('click', () => showSection('home-section'));
    document.getElementById('nav-subjects').addEventListener('click', () => showSection('subjects-section'));
    document.getElementById('nav-students').addEventListener('click', () => showSection('students-section'));

    if (localStorage.getItem('studentData')) {
        showSection('home-section');
        displayStudentData();
    } else {
        showSection('registration-section');
    }

    document.getElementById('registration-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = {
            name: document.getElementById('name').value.trim(),
            age: parseInt(document.getElementById('age').value.trim()),
            grade: parseInt(document.getElementById('grade').value.trim()),
            school: document.getElementById('school').value.trim(),
            favoriteSubject: document.getElementById('favorite-subject').value.trim(),
            cep: document.getElementById('cep').value.trim()
        };

        const isValid = validateFormData(formData);

        if (isValid) {
            fetch(`https://viacep.com.br/ws/${formData.cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('street').value = data.logradouro;
                        document.getElementById('city').value = data.localidade;
                        document.getElementById('state').value = data.uf;
                    } else {
                        alert('CEP not found. Please enter a valid CEP.');
                    }
                })
                .catch(error => console.error('Error fetching address:', error));

            localStorage.setItem('studentData', JSON.stringify(formData));
            showSection('home-section');
            displayStudentData();
        }
    });

    document.getElementById('cep-search').addEventListener('click', () => {
        const cep = document.getElementById('cep').value.trim();
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('street').value = data.logradouro;
                        document.getElementById('city').value = data.localidade;
                        document.getElementById('state').value = data.uf;
                    } else {
                        alert('CEP not found. Please enter a valid CEP.');
                    }
                })
                .catch(error => console.error('Error fetching address:', error));
        } else {
            alert('Please enter a valid CEP (8 digits).');
        }
    });

    function displayStudentData() {
        const studentData = JSON.parse(localStorage.getItem('studentData'));
        document.getElementById('student-name').textContent = studentData.name;
        document.getElementById('student-age').textContent = studentData.age;
        document.getElementById('student-grade').textContent = studentData.grade;
        document.getElementById('student-school').textContent = studentData.school;
        document.getElementById('student-favorite-subject').textContent = studentData.favoriteSubject;
        document.getElementById('student-street').textContent = studentData.street || '';
        document.getElementById('student-city').textContent = studentData.city || '';
        document.getElementById('student-state').textContent = studentData.state || '';
    }

    function validateFormData(formData) {
        let isValid = true;

        if (formData.name === '') {
            isValid = false;
            document.getElementById('name-error').textContent = 'Please enter a name.';
            document.getElementById('name').classList.add('is-invalid');
        } else {
            document.getElementById('name-error').textContent = '';
            document.getElementById('name').classList.remove('is-invalid');
        }

        if (isNaN(formData.age) || formData.age <= 0) {
            isValid = false;
            document.getElementById('age-error').textContent = 'Please enter a valid age.';
            document.getElementById('age').classList.add('is-invalid');
        } else {
            document.getElementById('age-error').textContent = '';
            document.getElementById('age').classList.remove('is-invalid');
        }

        if (isNaN(formData.grade) || formData.grade < 1 || formData.grade > 12) {
            isValid = false;
            document.getElementById('grade-error').textContent = 'Please enter a grade between 1 and 12.';
            document.getElementById('grade').classList.add('is-invalid');
        } else {
            document.getElementById('grade-error').textContent = '';
            document.getElementById('grade').classList.remove('is-invalid');
        }

        if (formData.school === '') {
            isValid = false;
            document.getElementById('school-error').textContent = 'Please enter a school name.';
            document.getElementById('school').classList.add('is-invalid');
        } else {
            document.getElementById('school-error').textContent = '';
            document.getElementById('school').classList.remove('is-invalid');
        }

        if (formData.favoriteSubject === '') {
            isValid = false;
            document.getElementById('favorite-subject-error').textContent = 'Please enter a favorite subject.';
            document.getElementById('favorite-subject').classList.add('is-invalid');
        } else {
            document.getElementById('favorite-subject-error').textContent = '';
            document.getElementById('favorite-subject').classList.remove('is-invalid');
        }


        return isValid;
    }

    function showSection(sectionId) {
        registrationSection.classList.add('hidden');
        homeSection.classList.add('hidden');
        subjectsSection.classList.add('hidden');
        studentsSection.classList.add('hidden');

        document.getElementById(sectionId).classList.remove('hidden');
    }
});
