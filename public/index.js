const btnAdd = document.getElementById('add');
const title = document.getElementById('title');
const price = document.getElementById('price');
const stock = document.getElementById('stock');
const description = document.getElementById('description');
const btnChange = document.getElementById('change');
const titleNew = document.getElementById('titleNew');
const priceNew = document.getElementById('priceNew');
const descriptionNew = document.getElementById('descriptionNew');
const stockNew = document.getElementById('stockNew');
const idChange = document.getElementById('idChange');
const innerProducts = document.getElementById('innerProducts');
let products = [];
let cart = [];
let user = [];

//Render products cards in UI
const renderProducts = (data) => {
    if (data.length > 0) {
        let fragment = data.map(product => {
            return (`
                <div class="card" style="width: 18rem; margin: 15px;">
                        <img src="https://dummyimage.com/245x245.png/cc0000/ffffff" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${product.nombre}</h5>
                        <h5 class="card-title">$${product.precio}</h5>
                        <button type="button" class="btn btn-primary" onclick=edit('${product._id}')>Editar</button>
                        <button type="button" class="btn btn-danger" onclick=deleteProduct('${product._id}')>Eliminar</button>
                        <button type="button" class="btn btn-danger" onclick=addProductCart('${product._id}')>Agregar al carrito</button>
                        </div>
                    </div>
            `)
        }).join(' ');

        innerProducts.innerHTML = fragment;
    } else {
        innerProducts.innerHTML = "<p>No hay prductos cargados</p>";
    }

}


//Get products
function fetchProducts() {
    fetch('/productos')
        .then(data => data.json())
        .then(datos => {
            products = datos;
            renderProducts(products)
        });
};

fetchProducts();
//Get products


//Send products to the server
btnAdd.addEventListener('click', () => {
    fetch('/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre: title.value, precio: price.value, stock: stock.value, categoria: description.value})
    }).then(alert('Producto enviado'))
        .then(fetchProducts());
    price.value = '';
    title.value = '';
    stock.value = '';
    description.value = '';
});



//Edit Products in the server
btnChange.addEventListener('click', () => {
    fetch(`/productos/${idChange.value}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre: titleNew.value, precio: priceNew.value, stock: stockNew.value, categoria: descriptionNew.value})
    }).then(alert('Producto Modificado'))
        .then(fetchProducts());
        titleNew.value = '';
        priceNew.value = '';
        descriptionNew.value = '';
        stockNew.value = '';
        idChange.value = '';
});
//Edit products easiest UI
const innerEdit = (data) => {
    titleNew.value = data[0].nombre;
    priceNew.value = data[0].precio;
    descriptionNew.value = data[0].categoria;
    stockNew.value = data[0].stock;
    idChange.value = data[0]._id;
}

const edit = (id) => {
    fetch(`/productos/${id}`)
        .then(data => data.json())
        .then(datos => innerEdit(datos));
}
//Edit products


//Delete the products of the server
const deleteProduct = (id) => {
    fetch(`/productos/${id}`, {
        method: 'DELETE',
    }).then(alert('Producto eliminado'))
        .then(fetchProducts());
}

///Login
const logoutDiv = document.getElementById('Logout-div');
const links = document.getElementById('links');
const LogoutBtn = document.getElementById('Logout');
const welcome = document.getElementById('welcome-user');
const userPhoto = document.getElementById('user-photo');
const userEmail = document.getElementById('user-email');

const welcomeUser = () => {
    links.classList.add('hide-div');
    logoutDiv.classList.remove('hide-div');
    fetch('/info-user').then(datos => datos.json())
        .then(data => {
            user.push(data);
            userEmail.innerHTML = data.email;
            userPhoto.innerHTML = data.avatar;
        })
};

const initialize = () => {
    const loginTrue = (trues) => {
        if (trues === true) {
            welcomeUser();
        } else return;
    }
    fetch('/log')
        .then(data => data.json())
        .then(datos => {
            loginTrue(datos.log)
        });
}
initialize();



LogoutBtn.addEventListener('click', () => {
    fetch('/logout').then(location.href('/pages/logout.html'));
});



//////////////
const addProductCart = (id)=>{
    let productAdd = products.filter(prod => prod._id == id);
    cart.push(productAdd[0]);
    renderCart();
}

const renderCart = ()=>{
    let fragmentCart = '';

    for(let i of cart){
        fragmentCart += `<li>${i.nombre}</li>`
    }

    document.getElementById('dropCart').innerHTML = fragmentCart;
}

const sendCart = ()=>{
    fetch(`/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({items: cart, author: user})
    }).then(alert('Carrito enviado'))
        .then(fetchProducts());
}