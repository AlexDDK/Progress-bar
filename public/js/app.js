// console.log('KJBFKSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS');

const container = document.querySelector('.mainContainer');
const infoContainer = document.querySelector('.infoContainer');
const ulContainer = document.querySelector('#ulContainer');
const buttonContainer = document.querySelector('.buttonContainer');
// const randomstring = require('randomstring');

function dropButton() {
  return `

<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Статус
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><button data-role="admin" class="dropdown-item" type="button">Назначить администратором</button></li>
    <li><button data-role="user" class="dropdown-item" type="button">Назначить пользователем</button></li>
  </ul>
</div>
`;
}

function generateLink() {
  const result = [];
  const eng = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  for (let i = 0; i < 25; i += 1) {
    const random = Math.round(Math.random() * eng.length - 0.5);
    result.push(eng[random]);
  }
  return result.join('');
}

function innerlist(lists) {
  let res = '';
  for (let i = 0; i < lists.length; i++) {
    res += `<li >${lists[i].nameEmployee}</li>`;
  }
  return res;
}

function innerUsers(users) {
  let res = '';
  for (let i = 0; i < users.length; i++) {
    if (users[i].isAdmin === true) {
      res += `<li><span class="h">${users[i].email}</span> (Администратор) ${dropButton()}</li><br>`;
    } else { res += `<li><span class="h">${users[i].email}</span> (Пользователь) ${dropButton()}</li><br>`; }
  }
  // console.log('RRRRRRREEEEEESSSS', res);
  return res;
}

function newUser() {
  return `
    <button type="button" data-wh="new" class="btn btn-success">Добавить нового пользователя</button><br>
    `;
}

function newList() {
  return `
    <button type="button" data-wh="newform" class="btn btn-success">Добавить новую форму</button><br>
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
  <button type="submit" class="btn btn-primary">Создать!</button>
</form>
`;
}

function addFormForm() {
  return `
  <br>
<form id="newForm">
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Имя сотрудника</label>
    <input name="nameEmployee" type="text" class="form-control" id="examplename" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Имя наставника</label>
    <input name="nameMentor" type="text" class="form-control" id="exampleInputPassword1">
  </div>
  <button type="submit" class="btn btn-primary">Создать!</button>
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

  // -----------------мои листки------------------------

  if (e.target.type === 'button' && e.target.dataset.wh === 'my') {
    const response = await fetch('/myforms');
    const lists = await response.json();

    if (response.ok) {
      buttonContainer.innerHTML = '';
      ulContainer.innerHTML = '';
      ulContainer.insertAdjacentHTML('afterbegin', innerlist(lists));
      buttonContainer.insertAdjacentHTML('afterbegin', newList());
    } else {
      alert('что-то пошло не так');
    }
  }

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

  // -----------------Добавить новую форму------------------------

  if (e.target.type === 'button' && e.target.dataset.wh === 'newform') {
    buttonContainer.innerHTML = '';
    buttonContainer.insertAdjacentHTML('afterbegin', addFormForm());

    const form = document.getElementById('newForm');
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const allInputs = Object.fromEntries(new FormData(form));
      const link = generateLink();
      allInputs.link = `http://localhost:3000/form/${link}`;
      console.log('LLLIIIIINNNKKK', allInputs.link);

      const response = await fetch('/newform', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(allInputs),
      });

      if (response.ok) {
        // console.log('8855565425');
        const resp = await fetch('/myforms');
        const lists = await resp.json();
        // console.log('rrrreeeeesssspppp', data);

        ulContainer.innerHTML = '';
        buttonContainer.innerHTML = '';
        ulContainer.insertAdjacentHTML('afterbegin', innerlist(lists));
        buttonContainer.insertAdjacentHTML('afterbegin', newList());
      } else {
        alert('что-то пошло не так');
      }
    });
  }

  // -------------------выйти из сеанса-----------------------------
  if (e.target.type === 'button' && e.target.dataset.wh === 'out') {
    const response = await fetch('/logout');
    if (response.ok) {
      infoContainer.innerHTML = '';
      window.location = '/';
    }
  }

  // -----------------Кнопка сделать пользователем---------------------

  if (e.target.type === 'button' && e.target.dataset.role === 'user') {
    const closestdiv = e.target.closest('div');
    const closestli = closestdiv.closest('li');
    const email = closestli.querySelector('.h');
    const obj = { email: email.innerText, role: 'user' };

    //  console.log('11111111122222222222333333333333333', email.innerText);

    const response = await fetch('/update', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    if (response.ok) {
      // console.log('.........................................');
      const data = await response.json();
      // console.log('6666666666666666666666666666666666666666666', data);
      buttonContainer.innerHTML = '';
      ulContainer.innerHTML = '';
      ulContainer.insertAdjacentHTML('afterbegin', innerUsers(data));
      buttonContainer.insertAdjacentHTML('afterbegin', newUser());
    } else {
      alert('что-то пошло не так');
    }
  }

  // -----------------Кнопка сделать админом---------------------

  if (e.target.type === 'button' && e.target.dataset.role === 'admin') {
    const closestdiv = e.target.closest('div');
    const closestli = closestdiv.closest('li');
    const email = closestli.querySelector('.h');
    const obj = { email: email.innerText, role: 'admin' };

    const response = await fetch('/update', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

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
});
