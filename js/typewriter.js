// Typewriter effect
/* Base function */
function type({
  callback,
  paragraphs,
  pIndex = 0,
  speed = 50,
  textIndex = 0,
  typeBreak = 2400,
  isErasing = false,
  isWaiting = false,
  shouldErase = false,
  shouldRepeat = false,
}) {
  if (pIndex < paragraphs.length) {
    setTimeout(() => {
      const p = paragraphs[pIndex];
      const text = p.slice(0, (!isErasing ? textIndex++ : textIndex--));

      if (callback) {
        callback(text);
      }

      if (shouldErase && textIndex < 0) {
        isErasing = false;
        textIndex = 0;
        pIndex++;
      }

      if (textIndex > p.length) {
        isWaiting = true;
        if (shouldErase && !isErasing) {
          isErasing = true;
        } else {
          textIndex = 0;
          pIndex++;
        }
      } else if (isWaiting) {
        isWaiting = false;
      }

      if (shouldRepeat && pIndex === paragraphs.length) {
        textIndex = 0;
        pIndex = 0;
      }

      type({
        speed,
        pIndex,
        callback,
        textIndex,
        typeBreak,
        isErasing,
        isWaiting,
        paragraphs,
        shouldErase,
        shouldRepeat,
      });
    }, isWaiting ? typeBreak : speed);
  }
}

/* Using function */
const elements = [...document.getElementsByClassName('typewriter')];
elements.forEach(el => {
  const { steps, erase, repeat } = el.dataset;
  const paragraphs = steps.split('|') ?? [];
  type({
    paragraphs,
    shouldErase: Boolean(erase),
    shouldRepeat: Boolean(repeat),
    callback: text => {
      el.innerText = text;
    },
  });
});