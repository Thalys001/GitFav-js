export class GithubUser {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`
    return fetch(endpoint).then(data => data.json())
      .then(({ login, name, public_repos, followers, company }) => (
        {
          login,
          name,
          public_repos,
          followers,
          company,
        }))
  }
}

// classe que vai conter a logica dos dados
// como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();

    GithubUser.search('Thalys001').then(user => console.log(user));
  }
  load() {
  }

  delete(user) {
    const filteredEntries = this.entries
      .filter(entry => entry.login !== user.login)

    this.entries = filteredEntries
    this.update()
  }
}

// classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.tbody = this.root.querySelector('table tbody');

    this.update();
    this.onadd();
  }

  onadd() {
    const addButton = this.root.querySelector('.search button');
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input');

      this.add(value);
    }
  }

  update() {
    this.removeAllTr();

    this.entries.forEach(user => {
      const row = this.createRow()
      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `image of ${user.name}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Are you sure you want to remove?')
        if (isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td class="user">
      <img
        src="https://github.com/Thalys001.png"
        alt="image of Thalys001"
      />
      <a href="https://github.com/Thalys001" target="_blank">
        <p>Thalys Leite</p>
        <span>Thalys001</span>
      </a>
    </td>
    <td class="repositories">30</td>
    <td class="followers">2</td>
    <td>
      <button class="remove">&times;</button>
    </td>
    `
    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove()
    })
  }
}