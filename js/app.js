const addEl = document.querySelector(".add");
const minusEl = document.querySelector(".minus");
const counterEl = document.querySelector(".counter");
const addToCartBtnEl = document.querySelector(".add-to-cart");
const badgeEl = document.querySelector(".badge");
const cartModalEl = document.querySelector(".cart-modal-wrapper");
const openCartModalEl = document.querySelector(".cart");
const itemWrapperEL = document.querySelector(".cart-item-content");
const imgThumbnailsEl = document.querySelector(".img-thumbnails");
const closeMenuEl = document.querySelector(".close-icon i");
const menuModalEl = document.querySelector(".menu-modal-wrapper");
const overlayEl = document.querySelector(".overlay ");
const hamburgerEl = document.querySelector(".hamburger");
const nextEl = document.querySelector(".next");
const prevEL = document.querySelector(".prev");
let isCartOpen = false;
let slideIndex = 0;

const increment = () => +counterEl.textContent++;
const decrement = () => {
  if (+counterEl.textContent === 0) return;
  +counterEl.textContent--;
};
const openAndCloseCartModal = () => {
  cartModalEl.classList.toggle("hidden");
  //  cartModalEl.classList.contains('hidden') ? true ;
  if (cartModalEl.classList.contains("hidden")) {
    isCartOpen = true;
  } else {
    isCartOpen = false;
  }
  console.log(isCartOpen);
};
// Checking the cart contains any item
const checkUi = () => {
  const items = itemWrapperEL.querySelectorAll(".cart-item-wrapper");
  const checkoutBtnEl = document.querySelector(".checkout-btn");
  const emptyCartText = itemWrapperEL.querySelector(".empty-cart");

  if (items.length === 0) {
    checkoutBtnEl.classList.add("hidden");
  } else {
    checkoutBtnEl.classList.remove("hidden");
    emptyCartText.classList.add("hidden");
  }
};
// Close the cart from the body if open
const closeCartModal = () => {
  if (isCartOpen === false) {
    cartModalEl.classList.add("hidden");
  } else {
    return;
  }
};

const displayImage = function (e) {
  const allThumbnailsImg = document.querySelectorAll(".img-card");
  const mainImg = document.querySelector(".main-img-lg");
  let imgSrc;
  if (e.target.parentElement.classList.contains("img-card")) {
    const imgClicked = e.target;

    // Checking if any of the image as the class active..
    allThumbnailsImg.forEach((img) => {
      if (img.classList.contains("active")) {
        img.classList.remove("active");
      }
    });
    // setting active class to the element clicked
    imgClicked.parentElement.classList.add("active");
    imgSrc = imgClicked.getAttribute("src");
    mainImg.querySelector("img").src = imgSrc;
  }
};
const addToCart = function () {
  let price = 125;
  let total = price * +counterEl.textContent;
  let html = ` <div class="cart-item-wrapper">
<div class="cart-img">
  <img src="./images/image-product-1-thumbnail.jpg" alt="" />
</div>
<div class="cart-item-detail">
  <p>Fall Limited Edition Sneakers</p>
  <p>$125.00 x${+counterEl.textContent} <span class="total-price">$${total}</span></p>
</div>
<div class="delete-icon">
  <i class="bi bi-trash"></i>
</div>
</div>`;
  if (+counterEl.textContent === 0) return;
  itemWrapperEL.innerHTML += html;
  badgeEl.textContent = counterEl.textContent;
  badgeEl.style.opacity = 1;
  counterEl.textContent = 0;
  checkUi();
};
const closeMenu = () => {
  menuModalEl.style.width = 0;
  overlayEl.style.width = 0;
  menuModalEl.querySelector(".container").classList.add("hidden");
};
const openMenu = () => {
  menuModalEl.style.width = "50%";
  menuModalEl.querySelector(".container").classList.remove("hidden");
  overlayEl.style.width = "100%";
};
const imgSlider = function () {
  let allImgSrc = [
    "./images/image-product-1.jpg",
    "./images/image-product-2.jpg",
    "./images/image-product-3.jpg",
    "./images/image-product-4.jpg",
  ];
  if (this === -1) {
    slideIndex--;
  } else {
    slideIndex++;
  }
  // console.log(slideIndex);
  if (slideIndex > allImgSrc.length - 1) {
    slideIndex = 0;
  }
  if (slideIndex < 0) {
    slideIndex = allImgSrc.length;
  }
  document.querySelector(".main-img-sm img").src = allImgSrc[slideIndex];
};

function init() {
  // Event Listeners
  nextEl.addEventListener("click", imgSlider.bind(1));
  prevEL.addEventListener("click", imgSlider.bind(-1));
  closeMenuEl.addEventListener("click", closeMenu);
  hamburgerEl.addEventListener("click", openMenu);
  addEl.addEventListener("click", increment);
  minusEl.addEventListener("click", decrement);
  openCartModalEl.addEventListener("click", openAndCloseCartModal);
  document.querySelector("main").addEventListener("click", closeCartModal);
  imgThumbnailsEl.addEventListener("click", displayImage);
  addToCartBtnEl.addEventListener("click", addToCart);

  checkUi();
}

init();
