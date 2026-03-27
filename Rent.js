document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.bookBtn');
  const formWrapper = document.getElementById('bookingForm'); // modal wrapper
  const form = document.getElementById('multiStepForm');       // multi-step form
  const steps = document.querySelectorAll('.step');
  const stepCircles = document.querySelectorAll('.step-circle');
  const progressFill = document.querySelector('.progress-line-fill');
  const successMessage = document.getElementById('successMessage');
  const serviceSelect = document.getElementById('service');

  let currentStep = 0;
  const totalSteps = steps.length;

  // Show form when Book Now is clicked
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const serviceName = button.closest('.card').querySelector('h3').textContent;
      serviceSelect.value = serviceName; 
      formWrapper.style.display = 'flex'; // show modal
      currentStep = 0; // reset to step 1
      showStep(currentStep);
      successMessage.classList.remove('active');
      form.style.display = 'block';
      form.style.opacity = '1';
    });
  });

  const showStep = (stepIndex) => {
    steps.forEach((step, index) => {
      step.classList.remove('active');
      if (index < stepIndex) {
        stepCircles[index].classList.add('completed');
      } else {
        stepCircles[index].classList.remove('completed');
      }
    });

    steps[stepIndex].classList.add('active');
    stepCircles.forEach(circle => circle.classList.remove('active'));
    stepCircles[stepIndex].classList.add('active');

    const progressWidth = (stepIndex / (totalSteps - 1)) * 100;
    progressFill.style.width = `${progressWidth}%`;
  };

  const validateStep = (stepIndex) => {
    const currentStepElement = steps[stepIndex];
    const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        isValid = false;
        input.classList.add('is-invalid');
      } else {
        input.classList.remove('is-invalid');
      }
    });

    if (!isValid) {
      alert("⚠️ Please fill in all required fields before continuing.");
    }

    return isValid;
  };

  // Navigation buttons
  document.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', (e) => {
      const action = e.target.getAttribute('data-action');

      if (action === 'next') {
        if (validateStep(currentStep)) {
          if (currentStep === 1) {
            document.getElementById('confirmName').textContent = document.getElementById('name').value;
            document.getElementById('confirmEmail').textContent = document.getElementById('email').value;
            document.getElementById('confirmPhone').textContent = document.getElementById('phone').value;
            document.getElementById('confirmService').textContent = document.getElementById('service').value;
            document.getElementById('confirmDate').textContent = document.getElementById('date').value;
            document.getElementById('confirmTime').textContent = document.getElementById('time').value;
          }
          currentStep++;
          if (currentStep < totalSteps) {
            showStep(currentStep);
          }
        }
      } else if (action === 'prev') {
        if (currentStep > 0) {
          currentStep--;
          showStep(currentStep);
        }
      } else if (action === 'submit') {
        if (validateStep(currentStep)) {
          // ✅ EmailJS link untouched
          emailjs.sendForm('service_jx98p0m', 'template_o94kvap', form)
            .then(() => {
              steps.forEach(s => s.classList.remove('active'));
              successMessage.classList.add('active');
              form.reset();
            }, (error) => {
              alert("Failed to send email: " + JSON.stringify(error));
            });
        }
      }
    });
  });

  // Close form if user clicks outside
  formWrapper.addEventListener('click', (e) => {
    if (e.target === formWrapper) {
      formWrapper.style.display = 'none';
    }
  });

  // Initial state
  showStep(currentStep);
});
