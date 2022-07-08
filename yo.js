function generateLink() {
  const result = [];
  const eng = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  for (let i = 0; i < 25; i += 1) {
    const random = Math.round(Math.random() * eng.length - 0.5);
    result.push(eng[random]);
  }
  return result.join('');
}
