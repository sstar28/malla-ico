const ramos = [
  // SEMESTRE I
  { id: "mat1", nombre: "Matemáticas I", prereqs: [], semestre: 1 },
  { id: "prog1", nombre: "Programación I", prereqs: [], semestre: 1 },
  { id: "adm1", nombre: "Fundamentos Adm. I", prereqs: [], semestre: 1 },
  { id: "com1", nombre: "Taller Comunicación I", prereqs: [], semestre: 1 },
  { id: "ing1", nombre: "Inglés I", prereqs: [], semestre: 1 },

  // SEMESTRE II
  { id: "mat2", nombre: "Matemáticas II", prereqs: ["mat1"], semestre: 2 },
  { id: "micro1", nombre: "Microeconomía I", prereqs: [], semestre: 2 },
  { id: "adm2", nombre: "Fundamentos Adm. II", prereqs: ["adm1"], semestre: 2 },
  { id: "cont1", nombre: "Contabilidad I", prereqs: [], semestre: 2 },
  { id: "ing2", nombre: "Inglés II", prereqs: ["ing1"], semestre: 2 },

  // Puedes seguir agregando el resto con el mismo formato...
];

let aprobados = new Set();

function render() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  const porSemestre = {};
  ramos.forEach(r => {
    if (!porSemestre[r.semestre]) porSemestre[r.semestre] = [];
    porSemestre[r.semestre].push(r);
  });

  Object.keys(porSemestre).sort().forEach(sem => {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";
    semDiv.innerHTML = `<h2>Semestre ${sem}</h2>`;

    porSemestre[sem].forEach(r => {
      const requisitosCumplidos = r.prereqs.every(p => aprobados.has(p));
      const aprobado = aprobados.has(r.id);

      const ramo = document.createElement("div");
      ramo.className = "ramo";

      if (aprobado) {
        ramo.classList.add("morado");
      } else if (!requisitosCumplidos && r.prereqs.length > 0) {
        ramo.classList.add("bloqueado");
      } else {
        ramo.classList.add("rosado");
      }

      ramo.textContent = r.nombre;

      if (!aprobado && requisitosCumplidos) {
        ramo.onclick = () => {
          aprobados.add(r.id);
          render();
        };
      }

      semDiv.appendChild(ramo);
    });

    contenedor.appendChild(semDiv);
  });
}

render();
