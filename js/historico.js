function carregarHistorico() {
    fetch('http://localhost:3001/historico/dados')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar dados: ' + response.statusText);
        }
        return response.json();
      })
      .then(dados => {
        console.log(dados)
        const container = document.getElementById('historico');
        container.innerHTML = ''; 
  
        if (dados.length === 0) {
          container.innerHTML = '<p>Nenhum dado encontrado.</p>';
          return;
        }
  
        // Criando um bloco para cada data
        dados.forEach(item => {
          const div = document.createElement('div');
          div.classList.add('historico-container');
          
          div.innerHTML = `
            <h3>Data: ${new Date(item.data_operacao).toLocaleDateString('pt-BR')}</h3>
            <table>
              <thead>
                <tr>
                  <th>Aeronave</th>
                  <th>Horário</th>
                  <th>Resultado</th>
                </tr>
              </thead>
              <tbody>
                ${item.registros.map(reg => `
                  <tr>
                    <td>${reg.aeronave}</td>
                    <td>${reg.horario}</td>
                    <td>${reg.resultado}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `;
  
          container.appendChild(div);
        });
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }
  

  carregarHistorico();
  