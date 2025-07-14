const materias = [
  { nombre: "A. Salud Como Derecho Social", anio: 1, correlativas: [] },
  { nombre: "B. Introducción a la Física y Matemáticas", anio: 1, correlativas: [] },
  { nombre: "C. Introducción a la Biología", anio: 1, correlativas: [] },
  { nombre: "1. Introducción a la Fonoaudiología", anio: 1, correlativas: [] },
  { nombre: "2. Biología Humana", anio: 1, correlativas: [] },
  { nombre: "3. Psicología General", anio: 1, correlativas: [] },
  { nombre: "4. Psicoacústica", anio: 2, correlativas: [] },
  { nombre: "5. Sistema del Cuerpo Humano I", anio: 2, correlativas: ["2. Biología Humana"] },
  { nombre: "6. Lenguaje y Comunicación", anio: 2, correlativas: ["1. Introducción a la Fonoaudiología"] },
  ...
  { nombre: "41. Práctica Profesional Supervisada", anio: 5, correlativas: [
    "26. Terapéutica Fonoestomatognáticas",
    "27. Terapéutica de la Audición",
    "30. Terapéutica del Lenguaje",
    "31. Terapéutica de la Voz"
  ] }
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
    col.innerHTML = `<h2>Año ${anio}</h2>`;

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
