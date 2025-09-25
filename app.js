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



function mostrarLibros(){
    for(let i of myLibrary){
        document.write(`<h4>${i.id}</h4>`)
        document.write(`<h4>${i.title}</h4>`)
        document.write(`<h4>${i.autor}</h4>`)
        document.write(`<h4>${i.paginas}</h4>`)
        document.write(`<h4>${i.estado}</h4>`)
    }
    console.log(myLibrary);
    //Recorrer el array y mostrar datos
}

//mostrarLibros()