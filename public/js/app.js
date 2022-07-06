const infoContainer = document.getElementById('infoContainer');
const container = document.querySelector('.container');

function innerlist(arr) {
  return `
    <ul id="ulid">
    {{#each lists}}
    <li>
        {{this.fullName}} progress!
    </li>
    {{/each}}
</ul>`;
}

function newUser() {
  return;
  `
    <button type="button" data-new class="btn btn-success">Добавить нового пользователя</button>
    `;
}

function addForm() {
  return `
<form id="newUser">
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
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
  if (e.target.type === 'button' && e.target.dataset.all) {
    // const closestli = e.target.closest('li');

    const response = await fetch('/alllist');
    const data = await response.json();

    if (response.ok) {
      infoContainer.insertAdjacentHTML('afterbegin', innerlist(data));
    } else {
      alert('что-то пошло не так');
    }
  }
  // -----------------конец все листки------------------------

  // -----------------мои листки------------------------

  if (e.target.type === 'button' && e.target.dataset.my) {
    // const closestli = e.target.closest('li');

    const response = await fetch(`/mylist/${userIdFromSession}`);
    const data = await response.json();

    if (response.ok) {
      infoContainer.innerHTML = '';
      infoContainer.insertAdjacentHTML('afterbegin', innerlist(data));
    } else {
      alert('что-то пошло не так');
    }
  }
  // -----------------конец мои листки------------------------

  // -----------------все hr-ы (пользователи)-----------------------

  if (e.target.type === 'button' && e.target.dataset.user) {
    const response = await fetch('/users');
    const data = await response.json();

    if (response.ok) {
      infoContainer.innerHTML = '';
      infoContainer.insertAdjacentHTML('afterbegin', innerlist(data));
      infoContainer.insertAdjacentHTML('beforeend ', newUser());
    } else {
      alert('что-то пошло не так');
    }
  }
  // -----------------конец все hr-ы (пользователи)------------------------

  // -----------------Добавить нового пользователя-----------------------

  if (e.target.type === 'button' && e.target.dataset.new) {
    infoContainer.insertAdjacentHTML('beforeend ', addForm());
    const form = document.getElementById('newUser');
    form.addEventListener('submit', async (ev) => {  // Возможно листенер на сабмит нужно вынести из листенера на клик
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
        const resp = await fetch('/users');
        const data = await resp.json();
        infoContainer.innerHTML = '';
        infoContainer.insertAdjacentHTML('afterbegin', innerlist(data));
        infoContainer.insertAdjacentHTML('beforeend ', newUser());
      } else {
        alert('что-то пошло не так');
      }
    });
  }
  // -----------------конец добавить нового пользователя-------------------------


  if (e.target.type === 'button' && e.target.dataset.exit) {
    
        
  }


});
