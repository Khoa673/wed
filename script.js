// Dữ liệu sản phẩm
const products = [
    { id: "hoado", name: "Hoa Hồng Đỏ", category: "Hoa Hồng", price: 15000, img: "../assets/hoado.jfif", desc: "Biểu tượng của tình yêu nồng cháy.", stock: 120, origin: "Đà Lạt" },
    { id: "hoaduong", name: "Hoa Hướng Dương", category: "Hoa Hướng Dương", price: 25000, img: "../assets/hoaduong.jfif", desc: "Niềm hy vọng và năng lượng tích cực.", stock: 85, origin: "Việt Nam" },
    { id: "tulip", name: "Hoa Tulip Đỏ", category: "Hoa Tulip", price: 40000, img: "../assets/tulip.jfif", desc: "Tình yêu hoàn hảo.", stock: 60, origin: "Hà Lan" },
    { id: "tucau", name: "Hoa Cẩm Tú Cầu", category: "Hoa Cẩm Tú Cầu", price: 60000, img: "../assets/tucau.jfif", desc: "Lòng biết ơn chân thành.", stock: 45, origin: "Nhật Bản" },
    { id: "hoami", name: "Hoa Cúc Họa Mi", category: "Hoa Cúc", price: 30000, img: "../assets/hoami.jfif", desc: "Vẻ đẹp thuần khiết.", stock: 95, origin: "Đà Lạt" },
    { id: "diep", name: "Hoa Lan Hồ Điệp", category: "Hoa Lan", price: 250000, img: "../assets/diep.jfif", desc: "Nữ hoàng hoa lan.", stock: 30, origin: "Đài Loan" },
    { id: "hongvang", name: "Hoa Hồng Vàng", category: "Hoa Hồng", price: 18000, img: "../assets/hoado.jfif", desc: "Tình bạn và niềm vui.", stock: 70, origin: "Đà Lạt" },
    { id: "hongtrang", name: "Hoa Hồng Trắng", category: "Hoa Hồng", price: 16000, img: "../assets/hoado.jfif", desc: "Tình yêu thuần khiết.", stock: 55, origin: "Đà Lạt" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render sản phẩm
function renderProducts() {
    const container = document.getElementById('flower-grid');
    if (!container) return;
    
    container.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'flower-card';
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="flower-info">
                <h3>${product.name}</h3>
                <p class="flower-price">${product.price.toLocaleString('vi-VN')} VNĐ</p>
                <p><small>${product.category}</small></p>
                <a href="chi-tiet.html?id=${product.id}" class="btn btn-primary" style="display:block; margin:10px 0;">Xem Chi Tiết</a>
                <button onclick="addToCart('${product.id}')" class="btn btn-primary" style="width:100%">Thêm vào giỏ</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Thêm vào giỏ hàng
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) existing.quantity += 1;
    else cart.push({...product, quantity: 1});

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
}

function updateCartCount() {
    const countEl = document.getElementById('cart-count');
    if (countEl) {
        const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        countEl.textContent = total;
    }
}

// Chi tiết sản phẩm
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id && document.getElementById('detail-title')) {
        const product = products.find(p => p.id === id);
        if (product) {
            document.getElementById('detail-title').textContent = product.name;
            document.getElementById('detail-price').textContent = product.price.toLocaleString('vi-VN') + " VNĐ";
            document.getElementById('detail-description').textContent = product.desc;
            document.getElementById('detail-img').src = product.img;
            document.getElementById('detail-category').textContent = product.category;
            document.getElementById('detail-stock').textContent = product.stock;
            document.getElementById('detail-origin').textContent = product.origin;
        }
    }

    if (document.getElementById('flower-grid')) {
        renderProducts();
    }
});

function handleLogin(e) {
    e.preventDefault();
    alert("Đăng nhập thành công!");
    window.location.href = "../index.html";
}

function handleRegister(e) {
    e.preventDefault();
    alert("Đăng ký thành công!");
    window.location.href = "dang-nhap.html";
}