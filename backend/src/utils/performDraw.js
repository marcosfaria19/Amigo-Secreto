function performDraw(participants) {
    const shuffled = [...participants];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  
    const results = [];
    for (let i = 0; i < shuffled.length; i++) {
      const from = shuffled[i];
      const to = shuffled[(i + 1) % shuffled.length];
      results.push({ from: from.name, to: to.name });
    }
    return results;
  }
  