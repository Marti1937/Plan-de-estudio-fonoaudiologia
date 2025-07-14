<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Malla Fonoaudiología</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }

    .titulo {
      text-align: center;
      color: #314B6E;
      margin-bottom: 30px;
    }

    .malla {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .anio {
      flex: 1;
      min-width: 220px;
    }

    .anio h2 {
      background-color: #314B6E;
      color: white;
      padding: 10px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }

    .materia {
      background-color: #607EA2;
      color: white;
      padding: 10px;
      margin: 5px 0;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
      user-select: none;
    }

    .materia.aprobada {
      background-color: #8197AC;
    }

    .materia.bloqueada {
      opacity: 0.4;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <h1 class="titulo">Malla Interactiva - Fonoaudiología</h1>
  <div id="malla" class="malla"></div>

  <script>
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
      { nombre: "7. Expresión y Fonoaudiología", anio: 2, correlativas: ["1. Introducción a la Fonoaudiología"] },
      { nombre: "8. Psicología del Desarrollo", anio: 2, correlativas: ["3. Psicología General"] },
      { nombre: "9. Sistema del Cuerpo Humano II", anio: 2, correlativas: ["5. Sistema del Cuerpo Humano I"] },
      { nombre: "10. Neurofisiología", anio: 2, correlativas: ["5. Sistema del Cuerpo Humano I"] },
      { nombre: "11. Adquisición del Lenguaje", anio: 3, correlativas: ["6. Lenguaje y Comunicación", "8. Psicología del Desarrollo"] },
      { nombre: "12. Semiología Fonoaudiológica", anio: 3, correlativas: ["5. Sistema del Cuerpo Humano I", "8. Psicología del Desarrollo"] },
      { nombre: "13. Audiología y Audiometría", anio: 3, correlativas: ["9. Sistema del Cuerpo Humano II", "10. Neurofisiología"] },
      { nombre: "14. Voz", anio: 3, correlativas: ["9. Sistema del Cuerpo Humano II"] },
      { nombre: "15. Neurología y Fonoaudiología", anio: 3, correlativas: ["9. Sistema del Cuerpo Humano II", "10. Neurofisiología"] },
      { nombre: "16. Fonoaudiología Preventiva", anio: 4, correlativas: ["12. Semiología Fonoaudiológica"] },
      { nombre: "17. Diagnóstico Audiológico y Otoneurológico", anio: 4, correlativas: ["13. Audiología y Audiometría"] },
      { nombre: "18. Fonoestomatología", anio: 4, correlativas: ["14. Voz"] },
      { nombre: "19. Alteraciones del Lenguaje I", anio: 4, correlativas: ["15. Neurología y Fonoaudiología"] },
      { nombre: "20. Alteraciones de la Voz", anio: 4, correlativas: ["14. Voz"] },
      { nombre: "21. Investigación en Fonoaudiología I", anio: 4, correlativas: ["16. Fonoaudiología Preventiva"] },
      { nombre: "22. Alteraciones de la Audición y del Equilibrio", anio: 4, correlativas: ["17. Diagnóstico Audiológico y Otoneurológico"] },
      { nombre: "23. Alteraciones del Lenguaje II", anio: 4, correlativas: ["19. Alteraciones del Lenguaje I"] },
      { nombre: "24. Alteraciones Fonoestomatognáticas", anio: 4, correlativas: ["18. Fonoestomatología"] },
      { nombre: "25. Voz Estética y Profesional", anio: 4, correlativas: ["20. Alteraciones de la Voz"] },
      { nombre: "26. Terapéutica Fonoestomatognáticas", anio: 5, correlativas: ["24. Alteraciones Fonoestomatognáticas"] },
      { nombre: "27. Terapéutica de la Audición", anio: 5, correlativas: ["22. Alteraciones de la Audición y del Equilibrio"] },
      { nombre: "28. Psicolingüística", anio: 5, correlativas: ["19. Alteraciones del Lenguaje I"] },
      { nombre: "29. Audiología Infantil", anio: 5, correlativas: ["17. Diagnóstico Audiológico y Otoneurológico"] },
      { nombre: "30. Terapéutica del Lenguaje", anio: 5, correlativas: ["23. Alteraciones del Lenguaje II"] },
      { nombre: "31. Terapéutica de la Voz", anio: 5, correlativas: ["25. Voz Estética y Profesional"] },
      { nombre: "32. Ejercicio Profesional", anio: 5, correlativas: ["16. Fonoaudiología Preventiva"] },
      { nombre: "33. Investigación en Fonoaudiología II", anio: 5, correlativas: ["21. Investigación en Fonoaudiología I"] },
      { nombre: "34. Epistemología y Bioética", anio: 5, correlativas: ["32. Ejercicio Profesional"] },
      { nombre: "35. Taller de Trabajo Final I", anio: 5, correlativas: ["33. Investigación en Fonoaudiología II"] },
      { nombre: "36. Electivo I", anio: 5, correlativas: [] },
      { nombre: "37. Taller de Trabajo Final II", anio: 5, correlativas: ["35. Taller de Trabajo Final I"] },
      { nombre: "38. Electivo II", anio: 5, correlativas: [] },
      { nombre: "39. Optativo - Lenguas Extranjeras", anio: 5, correlativas: ["33. Investigación en Fonoaudiología II"] },
      { nombre: "40. Fonoaudiología Clínica", anio: 5, correlativas: ["26. Terapéutica Fonoestomatognáticas", "27. Terapéutica de la Audición", "30. Terapéutica del Lenguaje", "31. Terapéutica de la Voz"] },
      { nombre: "41. Práctica Profesional Supervisada", anio: 5, correlativas: ["26. Terapéutica Fonoestomatognáticas", "27. Terapéutica de la Audición", "30. Terapéutica del Lenguaje", "31. Terapéutica de la Voz"] }
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
  </script>
</body>
</html>
