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
  function loginCitizen() {
  const idNumber = document.getElementById('citizenId').value;
  const password = document.getElementById('citizenMobile').value; // Use password field instead of mobile number
  fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idNumber, password }),
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('token', data.accessToken);
      document.getElementById('loginScreen').classList.add('hidden');
      document.getElementById('citizenPortal').classList.remove('hidden');
    })
    .catch(error => console.error('Error logging in:', error));
}

function logout() {
  localStorage.removeItem('token');
  document.getElementById('citizenPortal').classList.add('hidden');
  document.getElementById('backOfficePortal').classList.add('hidden');
  document.getElementById('loginScreen').classList.remove('hidden');
}

function showSection(sectionId) {
  document.querySelectorAll('.container > div').forEach(section => section.classList.add('hidden'));
  document.getElementById(sectionId).classList.remove('hidden');
}

function startApplication(type) {
  document.getElementById('applicationTitle').innerText = `Start ${type.charAt(0).toUpperCase() + type.slice(1)} Application`;
  document.getElementById('applicationForm').classList.remove('hidden');
  document.getElementById('step1').classList.add('active');
  document.getElementById('step2').classList.remove('active');
  document.getElementById('step3').classList.remove('active');
  document.getElementById('step4').classList.remove('active');
}

function nextStep() {
  const currentStep = document.querySelector('.form-step.active');
  const nextStep = currentStep.nextElementSibling;
  if (nextStep) {
    currentStep.classList.remove('active');
    nextStep.classList.add('active');
  }
}

function prevStep() {
  const currentStep = document.querySelector('.form-step.active');
  const prevStep = currentStep.previousElementSibling;
  if (prevStep) {
    currentStep.classList.remove('active');
    prevStep.classList.add('active');
  }
}

function captureBiometrics() {
  document.getElementById('biometricStatus').innerText = 'Biometrics captured successfully';
}

function submitApplication() {
  const token = localStorage.getItem('token');
  const type = document.getElementById('applicationTitle').innerText.split(' ')[2].toLowerCase();
  const citizenId = document.getElementById('idNumber').value;

  fetch(`http://localhost:3000/api/${type === 'smart' ? 'certificates' : 'permits'}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ type, citizenId }),
  })
    .then(response => response.json())
    .then(data => {
      alert('Application submitted successfully!');
      document.getElementById('applicationForm').classList.add('hidden');
    })
    .catch(error => console.error('Error submitting application:', error));
}

function startCertificate(type) {
  alert(`Starting ${type} certificate application`);
}

function startPermit(type) {
  alert(`Starting ${type} permit application`);
}

function trackApplication() {
  const reference = document.getElementById('trackingInput').value;
  alert(`Tracking application with reference: ${reference}`);
}

function showBackOfficeSection(sectionId) {
  document.querySelectorAll('#backOfficePortal > div').forEach(section => section.classList.add('hidden'));
  document.getElementById(sectionId).classList.remove('hidden');
}

function fetchCertificates() {
  const token = localStorage.getItem('token');
  fetch('http://localhost:3000/api/certificates', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      const certificatesList = document.getElementById('certificatesList');
      certificatesList.innerHTML = ''; // Clear existing content

      data.forEach(certificate => {
        const certificateDiv = document.createElement('div');
        certificateDiv.classList.add('p-5', 'border', 'rounded', 'hover:shadow', 'cursor-pointer');
        certificateDiv.innerHTML = `
          <p>Type: ${certificate.type}</p>
          <p>Status: ${certificate.status}</p>
          <p>Citizen ID: ${certificate.citizenId}</p>
          <button onclick="downloadCertificate('${certificate.type}')" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Download</button>
        `;
        certificatesList.appendChild(certificateDiv);
      });
    })
    .catch(error => console.error('Error fetching certificates:', error));
}

function fetchPermits() {
  const token = localStorage.getItem('token');
  fetch('http://localhost:3000/api/permits', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      const permitsList = document.getElementById('permitsList');
      permitsList.innerHTML = ''; // Clear existing content

      data.forEach(permit => {
        const permitDiv = document.createElement('div');
        permitDiv.classList.add('p-5', 'border', 'rounded', 'hover:shadow', 'cursor-pointer');
        permitDiv.innerHTML = `
          <p>Type: ${permit.type}</p>
          <p>Status: ${permit.status}</p>
          <p>Citizen ID: ${permit.citizenId}</p>
          <button onclick="downloadPermit('${permit.type}')" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Download</button>
        `;
        permitsList.appendChild(permitDiv);
      });
    })
    .catch(error => console.error('Error fetching permits:', error));
}

function downloadCertificate(type) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setProperties({
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Certificate`,
    subject: 'Department of Home Affairs Certificate',
    author: 'Department of Home Affairs',
  });

  doc.text(`Republic of South Africa`, 14, 22);
  doc.text(`Department of Home Affairs`, 14, 30);
  doc.text(`${type.charAt(0).toUpperCase() + type.slice(1)} Certificate`, 14, 40);
  doc.text(`Issued to: [Citizen's Name]`, 14, 50);
  doc.text(`ID Number: [Citizen's ID Number]`, 14, 60);
  doc.text(`Date of Issue: [Current Date]`, 14, 70);

  doc.save(`${type}-certificate.pdf`);
}

function downloadPermit(type) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setProperties({
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Permit`,
    subject: 'Department of Home Affairs Permit',
    author: 'Department of Home Affairs',
  });

  doc.text(`Republic of South Africa`, 14, 22);
  doc.text(`Department of Home Affairs`, 14, 30);
  doc.text(`${type.charAt(0).toUpperCase() + type.slice(1)} Permit`, 14, 40);
  doc.text(`Issued to: [Citizen's Name]`, 14, 50);
  doc.text(`ID Number: [Citizen's ID Number]`, 14, 60);
  doc.text(`Date of Issue: [Current Date]`, 14, 70);

  doc.save(`${type}-permit.pdf`);
}

function performBackgroundCheck(idNumber) {
  const token = localStorage.getItem('token');
  fetch(`http://localhost:3000/api/background-check/${idNumber}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Update UI with background check results
    })
    .catch(error => console.error('Error performing background check:', error));
}

window.onload = () => {
  fetchCertificates();
  fetchPermits();
};
  // Main JavaScript file to handle initial setup and routing
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the application
  initApp();
});

function initApp() {
  // Show the login screen by default
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('citizenPortal').classList.add('hidden');
  document.getElementById('backOfficePortal').classList.add('hidden');
}

function loginCitizen() {
  // Implement login logic here
  const citizenId = document.getElementById('citizenId').value;
  const citizenMobile = document.getElementById('citizenMobile').value;

  // Example API call to authenticate user
  fetch(`${process.env.REACT_APP_AUTH_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: citizenId, mobile: citizenMobile })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Redirect to citizen portal
      document.getElementById('loginScreen').classList.add('hidden');
      document.getElementById('citizenPortal').classList.remove('hidden');
    } else {
      alert('Login failed. Please check your credentials.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function logout() {
  // Implement logout logic here
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('citizenPortal').classList.add('hidden');
  document.getElementById('backOfficePortal').classList.add('hidden');
}
// Citizen Portal-related functions
export function showSection(sectionId) {
  const sections = ['servicesSection', 'certificatesSection', 'permitsSection', 'trackSection'];
  sections.forEach(section => {
    document.getElementById(section).classList.add('hidden');
  });
  document.getElementById(sectionId).classList.remove('hidden');
}

export function startApplication(type) {
  // Implement application start logic here
  document.getElementById('applicationForm').classList.remove('hidden');
  document.getElementById('applicationTitle').innerText = `Start ${type.charAt(0).toUpperCase() + type.slice(1)} Application`;
}

export function nextStep() {
  const steps = document.querySelectorAll('.form-step');
  let currentStep = Array.from(steps).findIndex(step => step.classList.contains('active'));
  if (currentStep < steps.length - 1) {
    steps[currentStep].classList.remove('active');
    steps[currentStep].classList.add('hidden');
    steps[currentStep + 1].classList.add('active');
    steps[currentStep + 1].classList.remove('hidden');
  }
}

export function prevStep() {
  const steps = document.querySelectorAll('.form-step');
  let currentStep = Array.from(steps).findIndex(step => step.classList.contains('active'));
  if (currentStep > 0) {
    steps[currentStep].classList.remove('active');
    steps[currentStep].classList.add('hidden');
    steps[currentStep - 1].classList.add('active');
    steps[currentStep - 1].classList.remove('hidden');
  }
}

export function captureBiometrics() {
  // Implement biometric capture logic here
  document.getElementById('biometricStatus').innerText = 'Capturing biometrics...';
  setTimeout(() => {
    document.getElementById('biometricStatus').innerText = 'Biometrics captured successfully';
  }, 2000);
}

export function submitApplication() {
  // Implement application submission logic here
  const applicationSummary = document.getElementById('applicationSummary');
  applicationSummary.innerHTML = `
    <p><strong>Full Names:</strong> ${document.getElementById('fullNames').value}</p>
    <p><strong>Surname:</strong> ${document.getElementById('surname').value}</p>
    <p><strong>ID Number:</strong> ${document.getElementById('idNumber').value}</p>
    <p><strong>Date of Birth:</strong> ${document.getElementById('dateOfBirth').value}</p>
    <p><strong>Gender:</strong> ${document.getElementById('gender').value}</p>
    <p><strong>Mobile Number:</strong> ${document.getElementById('mobileNumber').value}</p>
  `;
  document.getElementById('termsAccepted').checked = true;
  alert('Application submitted successfully!');
}
