document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registration-form');
    const navHome = document.getElementById('nav-home');
    const navRegister = document.getElementById('nav-register');
    const navSubjects = document.getElementById('nav-subjects');
    const navStudents = document.getElementById('nav-students');
    const homeSection = document.getElementById('home-section');
    const registrationSection = document.getElementById('registration-section');
    const subjectsSection = document.getElementById('subjects-section');
    const studentsSection = document.getElementById('students-section');
    const studentNameH2 = document.getElementById('student-name-h2');
    const studentNameList = document.getElementById('student-name-list');
    const studentAge = document.getElementById('student-age');
    const studentGrade = document.getElementById('student-grade');
    const studentSchool = document.getElementById('student-school');
    const studentFavoriteSubject = document.getElementById('student-favorite-subject');
    const studentStreet = document.getElementById('student-street');
    const studentCity = document.getElementById('student-city');
    const studentState = document.getElementById('student-state');
    const startPrompt = document.getElementById('start-prompt');
    const resetInfo = document.getElementById('reset-info');
    const cepSearch = document.getElementById('cep-search');

    function showSection(section) {
        homeSection.classList.add('hidden');
        registrationSection.classList.add('hidden');
        subjectsSection.classList.add('hidden');
        studentsSection.classList.add('hidden');
        section.classList.remove('hidden');
    }

    function displayStudentInfo() {
        studentNameH2.textContent = localStorage.getItem('name');
        studentNameList.textContent = localStorage.getItem('name');
        studentAge.textContent = localStorage.getItem('age');
        studentGrade.textContent = localStorage.getItem('grade');
        studentSchool.textContent = localStorage.getItem('school');
        studentFavoriteSubject.textContent = localStorage.getItem('favoriteSubject');
        studentStreet.textContent = localStorage.getItem('street');
        studentCity.textContent = localStorage.getItem('city');
        studentState.textContent = localStorage.getItem('state');
    }

    function resetInfoStorage() {
        localStorage.removeItem('name');
        localStorage.removeItem('age');
        localStorage.removeItem('grade');
        localStorage.removeItem('school');
        localStorage.removeItem('favoriteSubject');
    }

    function startUserPrompt() {
        const name = prompt("What's your name?", localStorage.getItem('name') || "");
        if (name !== null) localStorage.setItem('name', name);

        const age = prompt("How old are you?", localStorage.getItem('age') || "");
        if (age !== null) localStorage.setItem('age', age);

        const grade = prompt("What grade are you in?", localStorage.getItem('grade') || "");
        if (grade !== null) localStorage.setItem('grade', grade);

        const school = prompt("What's the name of your school?", localStorage.getItem('school') || "");
        if (school !== null) localStorage.setItem('school', school);

        const favoriteSubject = prompt("What's your favorite subject?", localStorage.getItem('favoriteSubject') || "");
        if (favoriteSubject !== null) localStorage.setItem('favoriteSubject', favoriteSubject);

        displayStudentInfo();
    }

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const grade = document.getElementById('grade').value;
        const school = document.getElementById('school').value;
        const favoriteSubject = document.getElementById('favorite-subject').value;
        const street = document.getElementById('street').value;
        const city = document.getElementById('city').value;
        const state = document.getElementById('state').value;

        localStorage.setItem('name', name);
        localStorage.setItem('age', age);
        localStorage.setItem('grade', grade);
        localStorage.setItem('school', school);
        localStorage.setItem('favoriteSubject', favoriteSubject);
        localStorage.setItem('street', street);
        localStorage.setItem('city', city);
        localStorage.setItem('state', state);

        displayStudentInfo();
        showSection(homeSection);
    });

    navHome.addEventListener('click', function() {
        showSection(homeSection);
        displayStudentInfo();
    });

    navRegister.addEventListener('click', function() {
        showSection(registrationSection);
    });

    navSubjects.addEventListener('click', function() {
        showSection(subjectsSection);
    });

    navStudents.addEventListener('click', function() {
        showSection(studentsSection);
    });

    startPrompt.addEventListener('click', function() {
        startUserPrompt();
    });

    resetInfo.addEventListener('click', function() {
        resetInfoStorage();
        alert("Information Reset!");
        showSection(registrationSection);
    });

    cepSearch.addEventListener('click', function() {
        const cep = document.getElementById('cep').value;
        if (cep) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('street').value = data.logradouro;
                        document.getElementById('city').value = data.localidade;
                        document.getElementById('state').value = data.uf;
                    } else {
                        alert('CEP not found.');
                    }
                })
                .catch(error => console.error('Error:', error));
        } else {
            alert('Please enter a valid CEP.');
        }
    });

    if (localStorage.getItem('name')) {
        displayStudentInfo();
        showSection(homeSection);
    } else {
        showSection(registrationSection);
    }
});
