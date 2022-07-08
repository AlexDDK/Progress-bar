const container = document.querySelector('.mainContainer');
const infoContainer = document.querySelector('.infoContainer');
const ulContainer = document.querySelector('#ulContainer');
const buttonContainer = document.querySelector('.buttonContainer');

function dropButton() {
  return `

<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Статус
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><button data-role="admin" class="dropdown-item" type="button">Назначить администратором</button></li>
    <li><button data-role="user" class="dropdown-item" type="button">Назначить пользователем</button></li>
    <li><button data-role="del" class="dropdown-item" type="button">Удалить сотрудника</button></li>
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
    res += `<li ><a class="text-dark" href="${lists[i].link}">${lists[i].nameEmployee}</a></li>`;
  }
  return res;
}

function innerUsers(users) {
  let res = '';
  for (let i = 0; i < users.length; i++) {
    if (users[i].isAdmin === true) {
      res += `<li><span class="h">${users[i].email}</span> <span class="r">(Администратор)</span> ${dropButton()}<br></li>`;
    } else { res += `<li><span class="h">${users[i].email}</span> <span class="r">(Пользователь)</span> ${dropButton()}<br></li>`; }
  }
  return res;
}

function adduser(email) {
  return `
  <li><span class="h">${email}</span> (Пользователь) ${dropButton()}</li><br>
  `
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

function copyLink() {
  return `
    <button type="button" data-wh="copy" class="btn btn-success">Скопировать ссылку</button><br>
    `;
}

async function copyUrl(linkData) {
  try {
    await navigator.clipboard.writeText(linkData);
    console.log('URL страницы скопирован в буфер обмена');
  } catch (err) {
    console.error('Не удалось скопировать: ', err);
  }
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
  <button type="submit" class="btn btn-success">Создать!</button>
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
  <button type="submit" class="btn btn-success">Создать!</button>
</form>
`;
}

container.addEventListener('click', async (e) => {
  // -----------------все листки------------------------
  if (e.target.type === 'button' && e.target.dataset.wh === 'all') {
  
    const response = await fetch('/allforms');
    console.log('555777777777777777777777777777777777', response);
    const lists = await response.json();

    if (response.ok) {
      // lists = lists.lists;
      // infoContainer.insertAdjacentHTML('afterbegin', innerlist({lists}));

      infoContainer.innerHTML = '';
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
      infoContainer.innerHTML = '';
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
      infoContainer.innerHTML = '';
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

      if (response.ok) {
        infoContainer.innerHTML = '';
        buttonContainer.innerHTML = '';
        ulContainer.insertAdjacentHTML('beforeend', adduser(allInputs.email));
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
        // const resp = await fetch('/myforms');
        // const lists = await resp.json();
        infoContainer.innerHTML = '';
        ulContainer.innerHTML = '';
        buttonContainer.innerHTML = '';
        infoContainer.innerHTML = `<h5>Чек-лист ${allInputs.nameEmployee}</h5><a class="clink" href="${allInputs.link}">${allInputs.link}</a>`;
        buttonContainer.insertAdjacentHTML('afterbegin', copyLink());
      } else {
        alert('что-то пошло не так');
      }
    });
  }

  // -------------------------     Кнопка скопировать ссылку-------------------------
  if (e.target.type === 'button' && e.target.dataset.wh === 'copy') {
    const placeLink = infoContainer.querySelector('.clink');
    const link = placeLink.innerText;
    copyUrl(link);
    // window.location = '/main';
    // infoContainer.innerHTML = '<h5>Ссылка скопирована</h5>';
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
    const role = closestli.querySelector('.r');
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

      // const data = await response.json();
      // console.log('6666666666666666666666666666666666666666666', data);
      infoContainer.innerHTML = '';
      role.innerText = "(Пользователь)"
      // buttonContainer.innerHTML = '';
      // ulContainer.innerHTML = '';
      // ulContainer.insertAdjacentHTML('afterbegin', innerUsers(data));
      // buttonContainer.insertAdjacentHTML('afterbegin', newUser());
    } else {
      alert('что-то пошло не так');
    }
  }

  // -----------------Кнопка сделать админом---------------------

  if (e.target.type === 'button' && e.target.dataset.role === 'admin') {
    const closestdiv = e.target.closest('div');
    const closestli = closestdiv.closest('li');
    const email = closestli.querySelector('.h');
    const role = closestli.querySelector('.r');
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
      infoContainer.innerHTML = '';
      // buttonContainer.innerHTML = '';
      // ulContainer.innerHTML = '';
      role.innerText = "(Администратор)"
      // ulContainer.insertAdjacentHTML('afterbegin', innerUsers(data));
      // buttonContainer.insertAdjacentHTML('afterbegin', newUser());
    } else {
      alert('что-то пошло не так');
    }
  }

//---------------      Удалить сотрудника----------------------
  if (e.target.type === 'button' && e.target.dataset.role === 'del') {
    const closestdiv = e.target.closest('div');
    const closestli = closestdiv.closest('li');
    console.log('CLOSEST LIIIII', closestli);
    const email = closestli.querySelector('.h');
    const obj = { email: email.innerText };

    const response = await fetch('/delete', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    if (response.ok) {
      infoContainer.innerHTML = '';
      buttonContainer.innerHTML = '';
      // ulContainer.innerHTML = '';
      closestli.remove();
      buttonContainer.insertAdjacentHTML('afterbegin', newUser());
    } else {
      alert('что-то пошло не так');
    }
  }

});
