const menuBtn = document.querySelector(".menu-label");
const barsMenu = document.querySelector(".navbar-list");
const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart");
const productsCard = document.querySelector(".cart-container");
const productsContainer = document.querySelector(".products-container");

//logica del carrito y su respectivo menu hamburguesa!

const toggleCart = () => {
  cartMenu.classList.toggle("open-cart");
  if (barsMenu.classList.contains("open-menu")) {
    barsMenu.classList.remove("open-menu");
    return;
  }
};

const toggleMenu = () => {
  barsMenu.classList.toggle("open-menu");
  if (cartMenu.classList.contains("open-cart")) {
    cartMenu.classList.remove("open-cart");
    return;
  }
};

// Logica de guardar el carrito

let carrito = [];

// logica de renderizar el carrito

const agregarCurso = (e) => {
  if (e.target.classList.contains("boton-compra2")) {
    const productoSeleccionado = e.target.parentElement.parentElement;
    leerInfo(productoSeleccionado);
  }
};

function leerInfo(producto) {
  const infoProducto = {
    imagen: producto.querySelector("img").src,
    titulo: producto.querySelector("h2").textContent,
    precio: producto.querySelector(".precio2").textContent,
    id: producto.querySelector("button").getAttribute("data-id"),
    cantidad: 1,
  };
  carrito = [...carrito, infoProducto];
  carritoHTML();
}

function carritoHTML() {
  carrito.forEach((producto) => {
    const fila = document.createElement("div");
    fila.innerHTML = `<img src="${producto.imagen}"></img>
  <h2>${producto.titulo}</h2>
  <p>${producto.precio}</p>
  <img src="${producto.imagen}"></img>
  

 
  `;

    productsCard.appendChild(fila);
  });
}

// hacemos el Total del Carrito

// Funcion inicializadora
const init = () => {
  //logica del carrito y su respectivo menu hamburguesa!
  menuBtn.addEventListener("click", toggleMenu);
  cartBtn.addEventListener("click", toggleCart);

  // logica de renderizar el carrito
  productsContainer.addEventListener("click", agregarCurso);
};
init();
