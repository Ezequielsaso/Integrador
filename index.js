const menuBtn = document.querySelector(".menu-label");
const barsMenu = document.querySelector(".navbar-list");
const cartBtn = document.querySelector(".cart-label");
const cartMenu = document.querySelector(".cart");
const productsCard = document.querySelector(".cart-container");
const productsContainer = document.querySelector(".products-container");
const mensaje2 = document.querySelector(".mensaje2");
const renderBubble = document.querySelector(".cart-bubble");
const totalCart = document.querySelector(".total1");
const succesModel = document.querySelector(".add-modal");
const succesBuy = document.querySelector(".add-modal2")
const productoDestacado = document.querySelector("#hero");

//logica del carrito y su respectivo menu hamburguesa!

const showSucessModel = (msg) => {
  succesModel.classList.add("active-modal");
  succesModel.textContent = msg;
  setTimeout(() => {
    succesModel.classList.remove("active-modal");
  }, 2000);
};




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

// Logica de guardar el carrito & localStorage

let carrito = [];

// producto destacado

const agregarCurso2 = (e) => {
  if (e.target.classList.contains("boton-compra")) {
    const productoSeleccionado = e.target.parentElement;
    leerInfo(productoSeleccionado);
  }
  console.log(e.target);
};

// logica de renderizar el carrito

const agregarCurso = (e) => {
  if (e.target.classList.contains("boton-compra2")) {
    const productoSeleccionado = e.target.parentElement.parentElement;
    leerInfo(productoSeleccionado);
  }
};

function leerInfo(productoSeleccionado) {
  const infoProducto = {
    imagen: productoSeleccionado.querySelector("img").src,
    titulo: productoSeleccionado.querySelector("h2").textContent,
    precio: productoSeleccionado.querySelector(".precio2").textContent,
    id: productoSeleccionado.querySelector("button").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisar si el elemento ya existe

  const existe = carrito.some((prod) => prod.id === infoProducto.id);
  if (existe) {
    //actualizo la cantidad
    const productos = carrito.map((producto) => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;

        return producto;
      } else {
        return producto;
      }
    });
    [...carrito, infoProducto];
  } else {
    carrito = [...carrito, infoProducto];
  }
  carritoHTML();
  showSucessModel("Se ha agregado un producto al carrito!");
 

}

function carritoHTML() {
  productsCard.innerHTML = "";

  let totalCarrito = 0;
  let totalOfProducts = 0;

  carrito.forEach((producto) => {
    const fila = document.createElement("div");
    fila.innerHTML = `<div class="cart-item">
          <img
            src="${producto.imagen}"
            alt="Imagen de la compra"
          />
          <div class="item-info">
            <h3 class="item-title">${producto.titulo}</h3>
            <p class="item-price">${producto.precio}</p>
           </div>
           <div class="item-handler">
           <span
              class="borrarx"
              data-id="">X</span>
            <span
              class="quantity-handler down"
              data-id="">Cantidad</span>
            <span class="item-quantity">${parseInt(producto.cantidad)}</span>
            <span
              class="quantity-handler up"
              data-id="ID"></span>
          </div>
        </div>

 
  `;

    // eliminar producots del carrito
    const btnEliminar = fila.querySelector(".borrarx");
    btnEliminar.addEventListener("click", () => eliminarProducto(producto.id));

    productsCard.appendChild(fila);

    productsCard.appendChild(fila);

    let precio = parseInt(producto.precio.split("$")[1]);

    totalCarrito += parseInt(producto.cantidad * precio);
    totalOfProducts = totalOfProducts + producto.cantidad;
  });
  sincronizarStorage();
  totalCart.innerText = `$${totalCarrito}`;
  renderBubble.innerText = totalOfProducts;
}

function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// eliminar productos del carrito

function eliminarProducto(id) {
  carrito = carrito.filter((producto) => producto.id !== id);
  carritoHTML();
}



const vaciarProducto = (e) => {
  if (e.target.classList.contains("btn-void")) {
     productsCard.innerHTML = "";
     carrito = []
     carritoHTML();

     sincronizarStorage();

  }
console.log(e)
}


const comprarProducto = (e) => {
  if (e.target.classList.contains("btn-buy")) {
    productsCard.innerHTML = "";
    carrito = []
    carritoHTML();

    sincronizarStorage();

 }
console.log(e)
}


// Funcion inicializadora
const init = () => {
  //logica del carrito y su respectivo menu hamburguesa!
  menuBtn.addEventListener("click", toggleMenu);
  cartBtn.addEventListener("click", toggleCart);
  cartMenu.addEventListener("click", vaciarProducto)
  cartMenu.addEventListener("click", comprarProducto)


  // logica de renderizar el carrito
  productsContainer.addEventListener("click", agregarCurso);
  productsContainer.addEventListener("click", agregarCurso);
  productoDestacado.addEventListener("click", agregarCurso2);
 
  // Guardar localStorage
  const carritoStorage = localStorage.getItem("carrito");
  if (carritoStorage) {
    carrito = JSON.parse(carritoStorage);
  }
  carritoHTML();
};
init();
