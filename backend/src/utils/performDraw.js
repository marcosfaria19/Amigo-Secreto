function performDraw(participants) {
  const shuffled = [...participants];
  let results = [];
  let availableParticipants = [...shuffled]; // Copiar os participantes restantes

  // Em cada iteração, o participante sorteado não pode tirar a si mesmo
  for (let i = 0; i < shuffled.length; i++) {
    let from = shuffled[i];
    let toIndex;

    // Encontrar um participante disponível que não seja o próprio
    do {
      toIndex = Math.floor(Math.random() * availableParticipants.length);
    } while (availableParticipants[toIndex].email === from.email);

    const to = availableParticipants[toIndex];

    // Adiciona o par (de quem tirou para quem)
    results.push({ from: from.name, to: to.name });

    // Remove o participante que foi sorteado da lista de disponíveis
    availableParticipants.splice(toIndex, 1);
  }

  return results;
}


module.exports = { performDraw };
