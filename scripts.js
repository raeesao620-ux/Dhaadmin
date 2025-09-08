function loginCitizen() {
  // Implement login logic here
  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('citizenPortal').classList.remove('hidden');
}

function logout() {
  // Implement logout logic here
  document.getElementById('citizenPortal').classList.add('hidden');
  document.getElementById('backOfficePortal').classList.add('hidden');
  document.getElementById('loginScreen').classList.remove('hidden');
}

function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('.container > div').forEach(section => section.classList.add('hidden'));
  // Show the selected section
  document.getElementById(sectionId).classList.remove('hidden');
}

function startApplication(type) {
  document.getElementById('applicationTitle').innerText = `Start ${type.charAt(0).toUpperCase() + type.slice(1)} Application`;
  document.getElementById('applicationForm').classList.remove('hidden');
  document.getElementById('step1').classList.add('active');
  document.getElementById('step2').classList.remove('active');
  document.getElement
