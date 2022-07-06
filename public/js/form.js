/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
const input = document.querySelector('#names');
const main = document.querySelector('#main');
const checkboxes = document.querySelectorAll('.form-check-input');
const formOutput = {
};

// requesting data from DB

try {
  fetch('/form').then((res) => {
    for (const el in res) {
      if (el === input.id) {
        input.value = res[el];
        formOutput.names = input.value;
      }
      for (let i = 0; i < checkboxes.length; i += 1) {
        if (el === checkboxes[i].id) {
          checkboxes[i].checked = res[el];
          formOutput[el] = res[el];
        }
      }
    }
  });
} catch (error) {
  alert('Something went wrong. Please, try to reload the page');
}

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
  // console.log(formOutput);

  const response = await fetch('/form', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formOutput),
  });
});
