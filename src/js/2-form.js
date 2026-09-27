const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const formEl = document.querySelector('.feedback-form');

populateForm();

formEl.addEventListener('input', onFormInput);
formEl.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  const { name, value } = event.target;

  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  formEl.reset();
}

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) {
    return;
  }

  try {
    const parsedData = JSON.parse(savedData);

    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';

    formEl.elements.email.value = formData.email;
    formEl.elements.message.value = formData.message;
  } catch (error) {
    console.log(error.message);
  }
}
