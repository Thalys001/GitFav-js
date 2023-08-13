// classe que vai conter a logica dos dados
// como os dados serão estruturados
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }
  load() {
    this.entries = [
      {
        login: 'Thalys001',
        name: "Thalys Leite",
        public_repos: '30',
        followers: '10'
      },
      {
        login: 'luizfelipebraga',
        name: "Luiz Felipe Braga",
        public_repos: '70',
        followers: '20'
      }
    ]
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