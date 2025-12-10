/* elementos + estado dos filtros*/
const cardGrid = document.getElementById('cardGrid');
const resultsTotal = document.getElementById('resultsTotal');
const searchInput = document.getElementById('searchInput');
const chips = document.querySelectorAll('.chip[data-type]');
let currentSpecies = '';
let searchTerm = '';

//dados para os cards de adoção
const pets = [
    {
        id: 1,
        name: 'Luna',
        species: 'dog',
        size: 'Médio',
        age: '2 anos',
        sex: 'Fêmea',
        breed: 'Vira-lata',
        city: 'São Paulo, SP',
        tags: ['Dócil', 'Brincalhona'],
        img: '../img/cachorro.jpg'
    },
    {
        id: 2,
        name: 'Mel',
        species: 'cat',
        size: 'Pequeno',
        age: '1 ano',
        sex: 'Fêmea',
        breed: 'Siamês',
        city: 'São Paulo, SP',
        tags: ['Carinhosa', 'Calma'],
        img: '../img/gato.jpg'
    },
    {
        id: 3,
        name: 'Thor',
        species: 'dog',
        size: 'Grande',
        age: '3 anos',
        sex: 'Macho',
        breed: 'Labrador',
        city: 'Campinas, SP',
        tags: ['Protetor', 'Leal'],
        img: '../img/cachorro2.jpg'
    },
    {
        id: 4,
        name: 'Nina',
        species: 'dog',
        size: 'Pequeno',
        age: '6 meses',
        sex: 'Fêmea',
        breed: 'Poodle',
        city: 'Guarulhos, SP',
        tags: ['Brincalhona'],
        img: '../img/cachorro3.jpg'
    },
    {
        id: 5,
        name: 'Fred',
        species: 'cat',
        size: 'Médio',
        age: '4 anos',
        sex: 'Macho',
        breed: 'SRD',
        city: 'Santos, SP',
        tags: ['Calmo'],
        img: '../img/gato2.jpg'
    },
    {
        id: 6,
        name: 'Zeca',
        species: 'dog',
        size: 'Médio',
        age: '5 anos',
        sex: 'Macho',
        breed: 'Beagle',
        city: 'Sorocaba, SP',
        tags: ['Dócil'],
        img: '../img/cachorro4.jpg'
    }
];

function renderCards(list) {
    cardGrid.innerHTML = list.map(createCardHTML).join('');
    resultsTotal.textContent = list.length;
    attachFavListeners();            // para corações funcionarem
}

function createCardHTML(p) {
  return `
  <article class="pet-card" data-id="${p.id}">
    <div class="pet-img">
      <img src="${p.img}" alt="Foto de ${p.name}">

      <span class="badge badge-species ${p.species === 'cat' ? 'badge-cat' : ''}">
        ${p.species === 'dog' ? 'Cachorro' : 'Gato'}
      </span>

      <span class="badge badge-size">${p.size}</span>

      <!-- Favorito -->
      <button class="btn-fav" aria-label="Adicionar aos favoritos">
        <img src="icons/heart.svg" alt="" class="icon-heart">
      </button>
    </div>

    <div class="pet-body">
      <h3 class="pet-name">${p.name}</h3>
      <p class="pet-breed">${p.breed}</p>

      <ul class="pet-info">
        <li><strong>Idade:</strong> ${p.age}</li>
        <li><strong>Sexo:</strong> ${p.sex}</li>
        <li class="location">
          <img src="assets/icons/location.svg" alt="" class="icon-location">
          ${p.city}
        </li>
      </ul>

      <div class="pet-tags">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>

    <div class="pet-footer">
      <button class="btn-adopt">
        Quero Adotar ${p.name}
      </button>
    </div>
  </article>`;
}

/* filtragem */
function applyFilters() {
    let filtered = pets.filter(p => {
        // species
        const matchSpecies = currentSpecies ? p.species === currentSpecies : true;
        // search
        const text = (p.name + ' ' + p.breed + ' ' + p.tags.join(' ')).toLowerCase();
        const matchSearch = text.includes(searchTerm.toLowerCase());
        return matchSpecies && matchSearch;
    });
    renderCards(filtered);
}

searchInput.addEventListener('input', e => {
    searchTerm = e.target.value.trim();
    applyFilters();
});

/* Clique nos chips */
chips.forEach(chip => {
    chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        // Se clicou no mesmo que já estava ativo -> zera filtro
        if (currentSpecies === chip.dataset.type) {
            currentSpecies = '';
        } else {
            currentSpecies = chip.dataset.type;
            chip.classList.add('active');
        }
        applyFilters();
    });
});

/* favoritagem */
function attachFavListeners() {
    const favBtns = cardGrid.querySelectorAll('.btn-fav');
    favBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const icon = btn.querySelector('i');
            icon.classList.toggle('fa-regular');
            icon.classList.toggle('fa-solid');
            btn.classList.toggle('active');
        });
    });
}

renderCards(pets);