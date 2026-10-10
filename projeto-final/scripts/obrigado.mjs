document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const display = document.getElementById('formDataDisplay');

    if (display) {
        const nome = params.get('nome') || 'Não informado';
        const sobrenome = params.get('sobrenome') || 'Não informado';
        const email = params.get('email') || 'Não informado';
        const telefone = params.get('telefone') || 'Não informado';
        const nivel = params.get('nivel') || 'Não informado';
        const motivacao = params.get('motivacao') || 'Nenhuma informada';
        const rawTimestamp = params.get('timestamp');

        const niveis = {
            entusiasta: 'Entusiasta 🌱',
            cultivador: 'Cultivador 🌻',
            mestre: 'Mestre das plantas 🍀'
        };

        let dataFormatada = 'Não registrada';
        if (rawTimestamp) {
            const dataObj = new Date(rawTimestamp);
            dataFormatada = dataObj.toLocaleString('pt-BR', {
                dateStyle: 'full',
                timeStyle: 'medium'
            });
        }

        display.innerHTML = `
      <p><strong>Nome Completo:</strong> ${nome} ${sobrenome}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Celular:</strong> ${telefone}</p>
      <p><strong>Nível de Membro:</strong> ${niveis[nivel] || nivel}</p>
      <p><strong>Interesses / Motivação:</strong> ${motivacao}</p>
      <p><strong>Data de Envio:</strong> ${dataFormatada}</p>
    `;
    }
});