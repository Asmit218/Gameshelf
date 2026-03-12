export const generatePlayerId = () => {
  const timePart = Date.now().toString().slice(-6);
  const randomPart = Math.floor(100 + Math.random() * 900)
  return timePart+randomPart;
}