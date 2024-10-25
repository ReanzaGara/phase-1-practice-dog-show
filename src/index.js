document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(dogs => {
      const tableBody = document.querySelector('tbody');
      dogs.forEach(dog => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${dog.name}</td>
          <td>${dog.breed}</td>
          <td>${dog.sex}</td>
          <td><button class="edit" data-id="${dog.id}">Edit</button></td>
        `;
        tableBody.appendChild(row);
      });
    });
  
  document.addEventListener('click', event => {
    if (event.target.classList.contains('edit')) {
      const id = event.target.dataset.id;
      fetch(`http://localhost:3000/dogs/${id}`)
        .then(response => response.json())
        .then(dog => {
          const form = document.querySelector('form');
          form.name.value = dog.name;
          form.breed.value = dog.breed;
          form.sex.value = dog.sex;
          form.dataset.id = dog.id;
        });
    }
  });
  
  document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.target;
    const id = form.dataset.id;
    const data = {
      name: form.name.value,
      breed: form.breed.value,
      sex: form.sex.value
    };
    fetch(`http://localhost:3000/dogs/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(() => {
        fetch('http://localhost:3000/dogs')
          .then(response => response.json())
          .then(dogs => {
            const tableBody = document.querySelector('tbody');
            tableBody.innerHTML = '';
            dogs.forEach(dog => {
              const row = document.createElement('tr');
              row.innerHTML = `
                <td>${dog.name}</td>
                <td>${dog.breed}</td>
                <td>${dog.sex}</td>
                <td><button class="edit" data-id="${dog.id}">Edit</button></td>
              `;
              tableBody.appendChild(row);
            });
          });
      });
  });
      
  })