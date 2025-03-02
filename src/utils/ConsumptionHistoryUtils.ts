export const parseFecha = (fechaStr: string) => {
  try {
    const [fecha, hora] = fechaStr.split(", "); // Divide la fecha y la hora
    const [dia, mes, año] = fecha.split("/").map(Number); // Extrae día, mes y año
    let [horas, minutos, segundos] = hora.split(/:|\s/).map((val) => parseInt(val, 10));

    // Verifica si es "a. m." o "p. m."
    const esPM = hora.includes("p. m.");
    if (esPM && horas < 12) horas += 12;
    if (!esPM && horas === 12) horas = 0;

    return new Date(año, mes - 1, dia, horas, minutos, segundos);
  } catch (error) {
    console.error("Error al parsear la fecha:", fechaStr, error);
    return new Date("Invalid Date");
  }
};
