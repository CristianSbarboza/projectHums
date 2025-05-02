// public/js/form.js
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();  
    
    const horario = document.getElementById('horario').value;
    const aeronave = document.getElementById('aeronave').value;
    const resultado = document.getElementById('result').value;
    const aquisicao = document.getElementById('aquisicao').value;
    const acelerometro = document.getElementById('acelerometro').value;
    const healthIndices = document.getElementById('health-indices').value;

  
    // Cria um objeto com os dados do formulário
    const data = {
        horario,
        aeronave,
        resultado,
        aquisicao,
        acelerometro,
        healthIndices
    };
  
    // Envia os dados como JSON usando a fetch API
    fetch('http://localhost:3001/salvar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);

        const modalConfirmed = document.querySelector('.modal-confirmed')

        modalConfirmed.classList.remove('display-modal-confirmed')

        setTimeout(() => {modalConfirmed.classList.add('display-modal-confirmed')}, 2000)
    })

    
    .catch(error => {
        console.error('Erro:', error);
    });


  });
  
