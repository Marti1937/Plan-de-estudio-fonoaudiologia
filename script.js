const niveles = {
  0: "Ingreso",
  1: "Primer Año",
  2: "Segundo Año",
  3: "Tercer Año",
  4: "Cuarto Año",
  5: "Quinto Año"
};

const materias = [
  { nombre: "A. Salud Como Derecho Social", anio: 0, correlativas: [] },
  { nombre: "B. Introducción a la Física y Matemáticas", anio: 0, correlativas: [] },
  { nombre: "C. Introducción a la Biología", anio: 0, correlativas: [] },

  { nombre: "Introducción a la Fonoaudiología", anio: 1, correlativas: [] },
  { nombre: "Biología Humana", anio: 1, correlativas: ["C. Introducción a la Biología"] },
  { nombre: "Psicología General", anio: 1, correlativas: ["A. Salud Como Derecho Social"] },
  { nombre: "Psicoacústica", anio: 1, correlativas: ["B. Introducción a la Física y Matemáticas"] },
  { nombre: "Sistema del Cuerpo Humano I", anio: 1, correlativas: ["Biología Humana"] },
  { nombre: "Lenguaje y Comunicación", anio: 1, correlativas: ["Introducción a la Fonoaudiología"] },
  { nombre: "Expresión y Fonoaudiología", anio: 1, correlativas: ["Introducción a la Fonoaudiología"] },
  { nombre: "Psicología del Desarrollo", anio: 1, correlativas: ["Psicología General"] },

  { nombre: "Sistema del Cuerpo Humano II", anio: 2, correlativas: ["Sistema del Cuerpo Humano I"] },
  { nombre: "Neurofisiología", anio: 2, correlativas: ["Sistema del Cuerpo Humano I"] },
  { nombre: "Adquisición del Lenguaje", anio: 2, correlativas: ["Lenguaje y Comunicación", "Psicología del Desarrollo"] },
  { nombre: "Semiología Fonoaudiológica", anio: 2, correlativas: ["Sistema del Cuerpo Humano I", "Psicología del Desarrollo"] },
  { nombre: "Audiología y Audiometría", anio: 2, correlativas: ["Sistema del Cuerpo Humano II", "Neurofisiología"] },
  { nombre: "Voz", anio: 2, correlativas: ["Sistema del Cuerpo Humano II"] },
  { nombre: "Neurología y Fonoaudiología", anio: 2, correlativas: ["Sistema del Cuerpo Humano II", "Neurofisiología"] },
  { nombre: "Fonoaudiología Preventiva", anio: 2, correlativas: ["Semiología Fonoaudiológica"] },

  { nombre: "Diagnóstico Audiológico y Otoneurológico", anio: 3, correlativas: ["Audiología y Audiometría"] },
  { nombre: "Fonoestomatología", anio: 3, correlativas: ["Voz"] },
  { nombre: "Alteraciones del Lenguaje I", anio: 3, correlativas: ["Neurología y Fonoaudiología"] },
  { nombre: "Alteraciones de la Voz", anio: 3, correlativas: ["Voz"] },
  { nombre: "Investigación en Fonoaudiología I", anio: 3, correlativas: ["Fonoaudiología Preventiva"] },
  { nombre: "Alteraciones de la Audición y del Equilibrio", anio: 3, correlativas: ["Diagnóstico Audiológico y Otoneurológico"] },
  { nombre: "Alteraciones del Lenguaje II", anio: 3, correlativas: ["Alteraciones del Lenguaje I"] },
  { nombre: "Alteraciones Fonoestomatognáticas", anio: 3, correlativas: ["Fonoestomatología"] },

  { nombre: "Voz Estética y Profesional", anio: 4, correlativas: ["Alteraciones de la Voz"] },
  { nombre: "Terapéutica Fonoestomatognáticas", anio: 4, correlativas: ["Alteraciones Fonoestomatognáticas"] },
  { nombre: "Terapéutica de la Audición", anio: 4, correlativas: ["Alteraciones de la Audición y del Equilibrio"] },
  { nombre: "Psicolingüística", anio: 4, correlativas: ["Alteraciones del Lenguaje I"] },
  { nombre: "Audiología Infantil", anio: 4, correlativas: ["Diagnóstico Audiológico y Otoneurológico"] },
  { nombre: "Terapéutica del Lenguaje", anio: 4, correlativas: ["Alteraciones del Lenguaje II"] },
  { nombre: "Terapéutica de la Voz", anio: 4, correlativas: ["Voz Estética y Profesional"] },
  { nombre: "Ejercicio Profesional", anio: 4, correlativas: ["Fonoaudiología Preventiva"] },
  { nombre: "Investigación en Fonoaudiología II", anio: 4, correlativas: ["Investigación en Fonoaudiología I"] },

  { nombre: "Epistemología y Bioética", anio: 5, correlativas: ["Ejercicio Profesional"] },
  { nombre: "Taller de Trabajo Final I", anio: 5, correlativas: ["Investigación en Fonoaudiología II"] },
  { nombre: "Electivo I", anio: 5, correlativas: [] },
  { nombre: "Taller de Trabajo Final II", anio: 5, correlativas: ["Taller de Trabajo Final I"] },
  { nombre: "Electivo II", anio: 5, correlativas: [] },
  { nombre: "Optativo - Lenguas Extranjeras", anio: 5, correlativas: ["Investigación en Fonoaudiología II"] },
  { nombre: "Fonoaudiología Clínica", anio: 5, correlativas: ["Terapéutica Fonoestomatognáticas", "Terapéutica de la Audición", "Terapéutica del Lenguaje", "Terapéutica de la Voz"] },
  { nombre: "Práctica Profesional Supervisada", anio: 5, correlativas: ["Terapéutica Fonoestomatognáticas", "Terapéutica de la Audición", "Terapéutica del Lenguaje", "Terapéutica de la Voz"] }
];

const malla = document.getElementById("malla");

function cargarMaterias() {
  const estado = JSON.parse(localStorage.getItem("estadoMaterias") || "{}");
  const porAnio = {};
  materias.forEach(m => {
    if (!porAnio[m.anio]) porAnio[m.anio] = [];
    porAnio[m.anio].push(m);
  });

  for (const anio of Object.keys(porAnio).sort()) {
    const col = document.createElement("div");
    col.className = "anio";
    col.innerHTML = `<h2>${niveles[anio]}</h2>`;

    porAnio[anio].forEach(materia => {
      const div = document.createElement("div");
      div.className = "materia";
      div.textContent = materia.nombre;

      const aprobada = estado[materia.nombre];
      if (aprobada) {
        div.classList.add("aprobada");
      } else if (!materia.correlativas.every(c => estado[c])) {
        div.classList.add("bloqueada");
      }

      div.addEventListener("click", () => {
        div.classList.toggle("aprobada");
        estado[materia.nombre] = div.classList.contains("aprobada");
        localStorage.setItem("estadoMaterias", JSON.stringify(estado));
        location.reload();
      });

      col.appendChild(div);
    });

    malla.appendChild(col);
  }
}

cargarMaterias();
