const d = document;

//Prueba MODAL
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".header button");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

const $form = d.getElementById("form");

const $containerCards = d.querySelector(".cards");
const $template = d.getElementById("template-card").content;
const $fragment = d.createDocumentFragment();

const myLibrary = [];

class Libro {
  constructor(title, autor, paginas, estado) {
    this.id = `${crypto.randomUUID()}`;
    this.title = title;
    this.autor = autor;
    this.paginas = paginas;
    this.estado = estado;
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
}

function addBookToLibrary(title, autor, paginas, estado = false) {
  myLibrary.push(new Libro(title, autor, paginas, estado));
}

function mostrarLibros() {
  //Recorrer el array y mostrar datos
  myLibrary.forEach((el) => {
    $template.querySelector(".card").dataset.id = el.id;
    $template.querySelector("h3").textContent = el.title;
    $template.querySelector("em").textContent = el.autor;
    $template.querySelector(".card-paginas").textContent = el.paginas;
    $template.querySelector(".card-estado").textContent = `${
      el.estado ? "Leido" : "No Leido"
    }`;
    $template.querySelector("#switch").checked = el.estado;
    let $clone = d.importNode($template, true);
    $fragment.appendChild($clone);
  });
  $containerCards.appendChild($fragment);
}

const click = (e) => {
  if (myLibrary.length != 0) {
    if (e.target.classList.contains("fa-trash-can")) {
      eliminarLibro(e.target.closest("article").dataset.id);
      recargarLibros();
    }
    if (e.target.classList.contains("toggle")) {
      let libro = myLibrary.find(
        (libro) => libro.id === e.target.closest("article").dataset.id
      );
      libro.cambiarEstado(e.target.checked);
      recargarLibros();
    }
  }
};

function eliminarLibro(idEliminar) {
  myLibrary.forEach((item, index, arr) => {
    if (item.id == idEliminar) {
      arr.splice(index, 1);
    }
  });
}

function recargarLibros() {
  $containerCards.innerHTML = "";
  mostrarLibros();
}

function validarInputText(input) {
  const patron = /^[A-Za-z\s]*$/;
  console.log(input.validity);

  if (input.value.length === 0) {
    input.setCustomValidity("El Campo no puede ir Vacio");
    input.reportValidity();
  } else if (!patron.test(input.value)) {
    input.setCustomValidity("Solo se permiten letras");
    input.reportValidity();
  } else {
    input.setCustomValidity("");
  }
}
function validarInputTel(input) {
  const patron = /^\d+$/;
  console.log(input.validity);

  if (input.value.length === 0) {
    input.setCustomValidity("El Campo no puede ir Vacio");
    input.reportValidity();
  } else if (!patron.test(input.value)) {
    input.setCustomValidity("Solo se permiten numeros");
    input.reportValidity();
  } else {
    input.setCustomValidity("");
  }
}

const submit = (e) => {
  e.preventDefault();

  if (
    e.target.nombre.checkValidity() &&
    e.target.autor.checkValidity() &&
    e.target.paginas.checkValidity()
  ) {
    addBookToLibrary(
      e.target.nombre.value,
      e.target.autor.value,
      e.target.paginas.value,
      e.target.estado.checked
    );
    recargarLibros();
    $form.reset();
    dialog.close();
  } else {
    validarInputTel(e.target.paginas);
    validarInputText(e.target.autor);
    validarInputText(e.target.nombre);
  }
};

const input = (e) => {
  if (e.target.type === "text") {
    validarInputText(e.target);
  }

  if (e.target.type === "tel") {
    validarInputTel(e.target);
  }
};

$form.nombre.addEventListener("input", input);
$form.autor.addEventListener("input", input);
$form.paginas.addEventListener("input", input);
$form.addEventListener("submit", submit);
d.addEventListener("click", click);
