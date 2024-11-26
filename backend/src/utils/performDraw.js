function performDraw(participants) {
  const shuffled = [...participants];
  let results = [];
  let availableParticipants = [...shuffled];

  for (let i = 0; i < shuffled.length; i++) {
    let from = shuffled[i];
    let toIndex;

    do {
      toIndex = Math.floor(Math.random() * availableParticipants.length);
    } while (availableParticipants[toIndex].link === from.link); // Checa pelo link

    const to = availableParticipants[toIndex];

    results.push({ from: from.name, to: to.name });

    availableParticipants.splice(toIndex, 1);
  }

  return results;
}



module.exports = { performDraw };
