// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault(); // Prevent default form submission

  // Validate form fields
  if (!validateForm()) {
    return;
  }

  // Serialize form data
  var formData = new FormData(document.getElementById('signupForm'));

  // Send form data using Fetch API
  fetch('/signup', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text(); // Assuming server responds with text
  })
  .then(data => {
    console.log('Form submitted successfully:', data);
    window.location.href = '/dashboard'; // Redirect to dashboard page
  })
  .catch(error => {
    console.error('Error submitting form:', error);
    alert('Error submitting form. Please try again.');
  });
}

// Function to validate form fields
function validateForm() {
  var firstname = document.getElementById('firstname').value.trim();
  var lastname = document.getElementById('lastname').value.trim();
  var email = document.getElementById('email').value.trim();
  var password = document.getElementById('password').value.trim();
  var day = document.getElementById('day').value;
  var month = document.getElementById('month').value;
  var year = document.getElementById('year').value;
  var agree = document.getElementById('agree').checked;

  if (!firstname || !lastname || !email || !password || !day || !month || !year || !agree) {
    alert('All fields are required.');
    return false;
  }

  return true;
}

// Add event listener to form submission
document.addEventListener('DOMContentLoaded', function() {
  var signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', handleFormSubmission);
  }
});
