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
const myLibrary = [];

function Book(title, autor, paginas, estado) {
  this.id = `${crypto.randomUUID()}`;
  this.title = title;
  this.autor = autor;
  this.paginas = paginas;
  this.estado = estado;
}

function addBookToLibrary(title, autor, paginas, estado) {
  myLibrary.push(new Book(title, autor, paginas, estado));
}

addBookToLibrary("11 JG", "SSC", 100, true);
addBookToLibrary("gp 11", "css", 500, false);
addBookToLibrary("Cita en la Cima", "Raimon Samso", 250, false);

function mostrarLibros() {
  /*
  for (let i of myLibrary) {
    document.write(`<h4>${i.id}</h4>`);
    document.write(`<h4>${i.title}</h4>`);
    document.write(`<h4>${i.autor}</h4>`);
    document.write(`<h4>${i.paginas}</h4>`);
    document.write(`<h4>${i.estado}</h4>`);
  }
    */
  console.log(myLibrary);
  //Recorrer el array y mostrar datos
}

mostrarLibros();

const submit = (e) => {
  e.preventDefault();
  addBookToLibrary(
    e.target.nombre.value,
    e.target.autor.value,
    e.target.paginas.value,
    e.target.estado.checked
  );
  mostrarLibros()
  $form.reset()
  dialog.close();
};

$form.addEventListener("submit", submit);
