/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
const input = document.querySelector('#names');
const main = document.querySelector('#main');
const checkboxes = document.querySelectorAll('.form-check-input');
const formId = main.dataset.formid;

const formOutput = {
};

// requesting data from DB

window.addEventListener('load', async (event) => {
  console.log(`\n\n${formId}\n\n`);

  try {
    const res = await fetch(`/db/form/${formId}`); // change here
    if (res.ok) {
      const data = await res.json();
      for (const el in data) {
        if (el === 'q8_Str') {
          input.value = data[el];
          formOutput.names = input.value;
        }
        for (let i = 0; i < checkboxes.length; i += 1) {
          if (el === checkboxes[i].id) {
            checkboxes[i].checked = data[el];
            formOutput[el] = data[el];
          }
        }
      }
    }
  } catch {
    alert("Couldn't get data from DB. Please reload the page.");
  }
});

// checkboxes logic

main.addEventListener('click', (event) => {
  if (event.target.type === 'checkbox') {
    if (event.target.checked) {
      formOutput[event.target.id] = true;
    } else {
      formOutput[event.target.id] = false;
    }
  }
});

// sending data to DB

window.addEventListener('beforeunload', async () => {
  formOutput.names = input.value;
  try {
    const response = await fetch('/db/form', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ formOutput, formId }),
    });
  } catch (error) {
    alert("Couldn't send data to DB.");
  }
});
