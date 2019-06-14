
let icons = new SVGMorpheus('#svg');

const ids = ['woman', 'man'];
let counter = 0;

setInterval(() => {
  icons.to(ids[counter++ % 2], {duration:600, rotation: 'none', easing: 'cubic-in-out' });
}, 1500);