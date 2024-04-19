let numeros = {};

for (let i = 0; i < 10000; i++) {
  const numero = Math.floor(Math.random() * 20) + 1;

  if (numeros[numero]) {
    numeros[numero]++;
  } else {
    numeros[numero] = 1;
  }
}

console.log(numeros);
