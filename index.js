// Seleciona o botão "Enviar" pelo seu id apenas uma vez
const submitButton = document.getElementById('submit-feedback');

// Adiciona um evento de clique no botão
submitButton.addEventListener('click', function() {
    // Pega os valores dos campos
    const nome = document.getElementById('Nome').value;
    const feedback = document.getElementById('Feedback').value;
    const rating = document.querySelector('input[name="rating"]:checked') ? document.querySelector('input[name="rating"]:checked').value : null;

    // Cria um objeto para armazenar o feedback
    const feedbackData = {
        nome: nome,
        feedback: feedback,
        rating: rating,
        data: new Date().toLocaleString()
    };

    // Recupera os feedbacks já armazenados
    let allFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

    // Adiciona o novo feedback ao array
    allFeedbacks.push(feedbackData);

    // Armazena os feedbacks no localStorage
    localStorage.setItem('feedbacks', JSON.stringify(allFeedbacks));

    // Exibe um alerta
    alert('Feedback enviado com sucesso!');

    // Limpa os campos de texto
    document.getElementById('Feedback').value = '';
    document.getElementById('Nome').value = '';
    
    // Limpa a seleção das estrelas
    const radios = document.getElementsByName('rating');
    for (let i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }

    // Redireciona para a página de visualização dos feedbacks

});

function saveFeedback(name, feedback) {
    db.collection("feedbacks").add({
      name: name,
      feedback: feedback,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log("Feedback enviado com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao enviar feedback: ", error);
    });
  }
  