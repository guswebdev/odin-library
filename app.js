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

const submit = (e) => {
  e.preventDefault();
  addBookToLibrary(
    e.target.nombre.value,
    e.target.autor.value,
    e.target.paginas.value,
    e.target.estado.checked
  );
  recargarLibros();
  $form.reset();
  dialog.close();
};

$form.addEventListener("submit", submit);
d.addEventListener("click", click);
