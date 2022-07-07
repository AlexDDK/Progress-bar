// console.log('KJBFKSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');

const container = document.querySelector('.mainContainer');
const infoContainer = document.querySelector('.infoContainer');
const ulContainer = document.querySelector('#ulContainer');
const buttonContainer = document.querySelector('.buttonContainer');
// console.log('++++++++++++++++++++++', infoContainer);
// console.log('++++++++++++++++++++++', container);

function innerlist(lists) {
  let res = '';
  for (let i = 0; i < lists.length; i++) {
    res += `<li >${lists[i].nameEmployee}</li>`;
  }
  return res;
}

function innerUsers(users) {
  // console.log('LLLLIIIISSTTTSSS INNN FFFFUUUNNNCC', users);
  let res = '';
  for (let i = 0; i < users.length; i++) {
    res += `<li>${users[i].email}</li>`;
  }
  // console.log('RRRRRRREEEEEESSSS', res);
  return res;
}

function newUser() {
  return `
    <button type="button" data-wh="new" class="btn btn-success">Добавить нового пользователя</button><br>
    `;
}

function addForm() {
  return `
  <br>
<form id="newUser">
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input name="pass" type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
`;
}

container.addEventListener('click', async (e) => {
  // -----------------все листки------------------------
  if (e.target.type === 'button' && e.target.dataset.wh === 'all') {
    // const closestli = e.target.closest('li');

    const response = await fetch('/allforms');
    console.log('555777777777777777777777777777777777', response);
    const lists = await response.json();

    if (response.ok) {
      // lists = lists.lists;
      // infoContainer.insertAdjacentHTML('afterbegin', innerlist({lists}));

      buttonContainer.innerHTML = '';
      ulContainer.innerHTML = '';
      ulContainer.insertAdjacentHTML('afterbegin', innerlist(lists));
    } else {
      alert('что-то пошло не так');
    }
  }
  // -----------------конец все листки------------------------

  // -----------------мои листки------------------------

  if (e.target.type === 'button' && e.target.dataset.wh === 'my') {
    const response = await fetch('/myforms');
    const lists = await response.json();

    if (response.ok) {
      buttonContainer.innerHTML = '';
      ulContainer.innerHTML = '';
      ulContainer.insertAdjacentHTML('afterbegin', innerlist(lists));
    } else {
      alert('что-то пошло не так');
    }
  }
  // -----------------конец мои листки------------------------

  // -----------------все hr-ы (пользователи)-----------------------

  if (e.target.type === 'button' && e.target.dataset.wh === 'user') {
    const response = await fetch('/allusers');
    const data = await response.json();

    if (response.ok) {
      buttonContainer.innerHTML = '';
      ulContainer.innerHTML = '';
      ulContainer.insertAdjacentHTML('afterbegin', innerUsers(data));
      buttonContainer.insertAdjacentHTML('afterbegin', newUser());
    } else {
      alert('что-то пошло не так');
    }
  }
  // -----------------конец все hr-ы (пользователи)------------------------

  // -----------------Добавить нового пользователя-----------------------

  if (e.target.type === 'button' && e.target.dataset.wh === 'new') {
    buttonContainer.innerHTML = '';
    buttonContainer.insertAdjacentHTML('afterbegin', addForm());

    const form = document.getElementById('newUser');
    form.addEventListener('submit', async (ev) => { 
      ev.preventDefault();
      const allInputs = Object.fromEntries(new FormData(form));

      const response = await fetch('/newuser', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(allInputs),
      });
      console.log('RRRREEEEEESSSSSPPPP', response);
      if (response.ok) {
        console.log('8855565425');
        const resp = await fetch('/allusers');
        const data = await resp.json();
        console.log('rrrreeeeesssspppp', data);

        ulContainer.innerHTML = '';
        buttonContainer.innerHTML = '';
        ulContainer.insertAdjacentHTML('afterbegin', innerUsers(data));
        buttonContainer.insertAdjacentHTML('afterbegin', newUser());
      } else {
        alert('что-то пошло не так');
      }
    });
  }
  // -----------------конец добавить нового пользователя-------------------------

  if (e.target.type === 'button' && e.target.dataset.wh === 'out') {
    const response = await fetch('/logout');
    if (response.ok) {
      infoContainer.innerHTML = '';
      window.location = '/';
    }
  }
});
