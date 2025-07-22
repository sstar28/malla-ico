const ramos = [
  // SEMESTRE I
  { id: "mat1", nombre: "Matemáticas I", prereqs: [], semestre: 1 },
  { id: "prog1", nombre: "Programación I", prereqs: [], semestre: 1 },
  { id: "adm1", nombre: "Fundamentos de Administración y Negocios I", prereqs: [], semestre: 1 },
  { id: "com1", nombre: "Taller de Comunicación I", prereqs: [], semestre: 1 },
  { id: "ing1", nombre: "Inglés I", prereqs: [], semestre: 1 },

  // SEMESTRE II
  { id: "mat2", nombre: "Matemáticas II", prereqs: ["mat1"], semestre: 2 },
  { id: "micro1", nombre: "Microeconomía I", prereqs: [], semestre: 2 },
  { id: "adm2", nombre: "Fundamentos de Administración y Negocios II", prereqs: ["adm1"], semestre: 2 },
  { id: "cont1", nombre: "Contabilidad I", prereqs: [], semestre: 2 },
  { id: "ing2", nombre: "Inglés II", prereqs: ["ing1"], semestre: 2 },

  // SEMESTRE III
  { id: "mat3", nombre: "Matemáticas III", prereqs: ["mat2"], semestre: 3 },
  { id: "est1", nombre: "Estadística I", prereqs: ["mat2", "prog1"], semestre: 3 },
  { id: "tecno", nombre: "Tecnología y Empresas", prereqs: ["prog1"], semestre: 3 },
  { id: "com2", nombre: "Taller de Comunicación II", prereqs: ["com1"], semestre: 3 },
  { id: "ing3", nombre: "Inglés III", prereqs: ["ing2"], semestre: 3 },
  { id: "macro1", nombre: "Macroeconomía", prereqs: ["mat2", "micro1"], semestre: 3 },

  // SEMESTRE IV
  { id: "est2", nombre: "Estadística II", prereqs: ["est1"], semestre: 4 },
  { id: "micro2", nombre: "Microeconomía II", prereqs: ["micro1", "mat2"], semestre: 4 },
  { id: "cont2", nombre: "Contabilidad II", prereqs: ["cont1", "tecno"], semestre: 4 },
  { id: "personas", nombre: "Personas y Equipos", prereqs: ["adm2"], semestre: 4 },
  { id: "liderazgo", nombre: "Taller de Liderazgo", prereqs: ["com2", "adm2"], semestre: 4 },
  { id: "ing4", nombre: "Inglés IV", prereqs: ["ing3"], semestre: 4 },

  // SEMESTRE V
  { id: "econo1", nombre: "Econometría I", prereqs: ["mat3", "est2"], semestre: 5 },
  { id: "macro2", nombre: "Macroeconomía II", prereqs: ["mat3", "macro1"], semestre: 5 },
  { id: "finanzas1", nombre: "Finanzas I", prereqs: ["cont2", "est2"], semestre: 5 },
  { id: "estrategia", nombre: "Estrategia", prereqs: ["personas", "tecno"], semestre: 5 },
  { id: "etica", nombre: "Taller de Ética", prereqs: ["personas", "liderazgo"], semestre: 5 },
  { id: "ing5", nombre: "Inglés V", prereqs: ["ing4"], semestre: 5 },

  // SEMESTRE VI
  { id: "datos", nombre: "Ciencia de Datos", prereqs: ["econo1", "tecno"], semestre: 6 },
  { id: "global", nombre: "Globalización y Sustentabilidad", prereqs: ["est2", "macro2", "estrategia"], semestre: 6 },
  { id: "operaciones", nombre: "Gestión Operaciones", prereqs: ["est2", "estrategia"], semestre: 6 },
  { id: "marketing", nombre: "Marketing", prereqs: ["est2", "estrategia"], semestre: 6 },
  { id: "cfg1", nombre: "CFG I", prereqs: [], semestre: 6 },
  { id: "ing6", nombre: "Inglés V", prereqs: ["ing4"], semestre: 6 },

  // SEMESTRE VII
  { id: "org", nombre: "Fundamento económico de la organización", prereqs: ["global", "micro2"], semestre: 7 },
  { id: "finanzas2", nombre: "Finanzas II", prereqs: ["finanzas1", "datos"], semestre: 7 },
  { id: "rrhh", nombre: "Recursos humanos", prereqs: ["personas", "estrategia"], semestre: 7 },
  { id: "emprende", nombre: "Taller emprendimiento", prereqs: ["marketing", "etica"], semestre: 7 },
  { id: "cfg2", nombre: "CFG II", prereqs: [], semestre: 7 },

  // SEMESTRE VIII
  { id: "datosneg", nombre: "Ciencia de datos para los negocios", prereqs: ["datos"], semestre: 8 },
  { id: "implementa", nombre: "Implementación estratégica", prereqs: ["global", "finanzas2", "estrategia"], semestre: 8 },
  { id: "derecho", nombre: "Derecho para los negocios", prereqs: ["rrhh"], semestre: 8 },
  { id: "juegos", nombre: "Taller de juegos de negocios", prereqs: ["finanzas1", "emprende"], semestre: 8 },
  { id: "cfg3", nombre: "CFG III", prereqs: [], semestre: 8 },

  // SEMESTRE IX
  { id: "opt1", nombre: "Optativo mención I", prereqs: [], semestre: 9 },
  { id: "opt2", nombre: "Optativo mención II", prereqs: [], semestre: 9 },
  { id: "opt3", nombre: "Optativo mención III", prereqs: [], semestre: 9 },
  { id: "opt4", nombre: "Optativo mención IV", prereqs: [], semestre: 9 },
  { id: "cfg4", nombre: "CFG IV", prereqs: [], semestre: 9 },

  // SEMESTRE X
  { id: "practica", nombre: "Práctica profesional", prereqs: [], semestre: 10 },
  { id: "portafolio", nombre: "Desarrollo carrera y portafolio", prereqs: [], semestre: 10 },
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
    semDiv.innerHTML = `<h2>${sem}° semestre</h2>`;

    porSemestre[sem].forEach(r => {
      const requisitosCumplidos = r.prereqs.every(p => aprobados.has(p));
      const aprobado = aprobados.has(r.id);

      const ramo = document.createElement("div");
      ramo.className = "ramo";

      if (aprobado) {
        ramo.classList.add("azul");
      } else if (!requisitosCumplidos && r.prereqs.length > 0) {
        ramo.classList.add("gris");
      } else {
        ramo.classList.add("celeste");
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
