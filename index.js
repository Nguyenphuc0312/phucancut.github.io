
// -------------header--------------
window.onscroll = function() {
    let header = document.querySelector("header");
    let rect = header.getBoundingClientRect();
    let margin = rect.height;
    if (window.scrollY > 10) { 
        header.classList.add("header-fixed");
    } else {
        header.classList.remove("header-fixed");
    }
};

// ---------------------------------


    document.getElementById('next').onclick = function () {
        let item = document.querySelectorAll ('.item');
        let info = document.querySelectorAll('.slide-info');
    
        document.getElementById('slide-info-full').appendChild(info[0]);
    
        document.getElementById('slide').appendChild(item[0]);
        item[3].querySelector('img').id = 'slide-img-active';
        item[0].querySelector('img').removeAttribute('id');
    
        item[3].querySelector('span').id = 'detail-active';
        item[0].querySelector('span').removeAttribute('id')
    }


document.getElementById('prev').onclick = function () {
    let item = document.querySelectorAll ('.item');
    let info = document.querySelectorAll('.slide-info');

    document.getElementById('slide-info-full').prepend(info[item.length-1]);
    document.getElementById('slide').prepend(item[item.length-1]);
    item[1].querySelector('img').id = 'slide-img-active';
    item[2].querySelector('img').removeAttribute('id');

    item[1].querySelector('span').id = 'detail-active';
    item[2].querySelector('span').removeAttribute('id')
}
// ---------------------------
document.getElementById('nodenext').onclick = function () {
    let item = document.querySelectorAll('.slideshop');
  
    document.querySelector('.box-slide').appendChild(item[0]);
}
document.querySelector('#nodeprev').onclick = function () {
    let item = document.querySelectorAll('.slideshop');

    document.querySelector('.box-slide').prepend(item[item.length-1]);
}

// -----scroll to view-----
document.addEventListener ('DOMContentLoaded', () => {
    let target = document.querySelectorAll('.scrolltoview');

    let view = new IntersectionObserver ((entry) => {
        entry.forEach(TG => {
            if (TG.isIntersecting){
                TG.target.classList.add('scrolltoshow');
                
            }
        });
    }, {
        threshold: 0
    });
    for (let i = 0; i < target.length; i++){
        view.observe(target[i]);
    }
});
// scrollleft -------------
// shopsale ----------
let shopsalebutton = document.querySelectorAll('.shosale-button');
let buttonactive = document.querySelector('#button-all');

shopsalebutton.forEach(button => {
    button.addEventListener('click', () => {
        if(buttonactive){
            buttonactive.classList.remove('buttonactive');
            buttonactive.classList.add('trongsuot');
        }
        button.classList.remove('trongsuot');
        button.classList.add('buttonactive');
        buttonactive = button;
    });

});

const listshop = document.querySelectorAll('.listshopcard');

shopsalebutton.forEach(button => {
    
    button.addEventListener('click', () => {
        if (button.id == "button-all"){
            listshop.forEach(card => {
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
                card.classList.add('listshop-show');
                card.classList.remove('listshop-hidden');
            })
            return;
        }
        let id = button.id
        let Tach = id.split('-');
        let TG = Tach[1];
        let KT = "chose-"+ TG;
        listshop.forEach(card => {
            if (card.classList.contains(KT)){
                card.style.transform = 'translateY(0)';
                card.style.opacity = '1';
                card.classList.add('listshop-show');
                card.classList.remove('listshop-hidding');
            }
            else{
                card.style.transform = 'translateY(-50%)';
                
                card.style.transition = 'all 0.3s linear';
                card.style.opacity = '0.1';
                setTimeout(function(){
                    card.classList.add('listshop-hidden');
                    card.classList.remove('listshop-show');
                }, 300);
               
            }
        });
        
    })
})
// -------------conten4--------------
let imgconten3left = document.querySelectorAll('.img-conten3left');

imgconten3left.forEach(img => {
    let rect = img.getBoundingClientRect();
    let height = rect.width * 1.07;
    img.style.height = height + "px";
})

let conten4cardimg = document.querySelectorAll('.conten4-card-img');

conten4cardimg.forEach(img => {
    let rect = img.getBoundingClientRect();
    let height = rect.width ;
    img.style.height = height + "px";
})

const ct4wrapper = document.querySelector('.conten4-wrapper');
let ct4carousei = document.querySelector('.conten4-carousei')
let KTScroll = false, StartX, StartScrollLeft;
const ct4firstCardWitdh = ct4carousei.querySelectorAll('.conten4-card').offsetWith;
const ct4carouseiChildren = [...ct4carousei.children];
const ct4slidecuoiwidth = document.querySelector('#ct4-cardcuoi').clientWidth;

let cardPerView = Math.round(ct4carousei.offsetWith / ct4firstCardWitdh);

ct4carouseiChildren.slice(-cardPerView).reverse().forEach(card => {
    ct4carousei.insertAdjacentHTML("afterbegin", card.outerHTML);
});

ct4carouseiChildren.slice(0, -cardPerView).forEach(card => {
    ct4carousei.insertAdjacentHTML("beforeend", card.outerHTML);
});

const dragstart = (e) => {
    KTScroll = true;
    ct4carousei.classList.add('dragging');
    StartX = e.pageX;
    StartScrollLeft = ct4carousei.scrollLeft
}

const dragend = () => {
    KTScroll = false;
    ct4carousei.classList.remove('dragging');
}

let timeoutId;
const autoPlay = () => {
    timeoutId = setTimeout(() => ct4carousei.scrollLeft += ct4slidecuoiwidth, 3000);
}
autoPlay();
const dragging = (e) => {
    if (!KTScroll) return;
    ct4carousei.scrollLeft = StartScrollLeft - (e.pageX - StartX);
}

const infiniteScroll = () => {
    if (ct4carousei.scrollLeft === 0){
        ct4carousei.classList.add("ct4-no-transtion");
        ct4carousei.scrollLeft = ct4carousei.scrollWidth / 2;
        ct4carousei.classList.remove("ct4-no-transtion");
    }
    else if (Math.ceil(ct4carousei.scrollLeft) + ct4slidecuoiwidth*5.82 >= ct4carousei.scrollWidth ){
        console.log("kaka")
        ct4carousei.classList.add("ct4-no-transtion");
        ct4carousei.scrollLeft = ct4slidecuoiwidth;
        ct4carousei.classList.remove("ct4-no-transtion");
    }
    clearTimeout(timeoutId);
    if(!ct4wrapper.matches(":hover")) autoPlay();
}

ct4carousei.addEventListener('mousedown', dragstart);
ct4carousei.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragend);
ct4carousei.addEventListener('scroll', infiniteScroll);
ct4wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId));
ct4wrapper.addEventListener('mouseleave', autoPlay);
// -------------------conten5-------------
const ct5wrapper = document.querySelector('.conten5-wrapper');
let ct5carousei = document.querySelector('.conten5-carousei')
let CT5KTScroll = false, CT5StartX, CT5StartScrollLeft;
const ct5firstCardWitdh = ct5carousei.querySelectorAll('.conten5-card').offsetWith;
const ct5carouseiChildren = [...ct5carousei.children];
const ct5slidecuoiwidth = document.querySelector('#ct5-cardcuoi').clientWidth;

let CT5cardPerView = Math.round(ct5carousei.offsetWith / ct5firstCardWitdh);

ct5carouseiChildren.slice(-CT5cardPerView).reverse().forEach(card => {
    ct5carousei.insertAdjacentHTML("afterbegin", card.outerHTML);
});

ct5carouseiChildren.slice(0, -CT5cardPerView).forEach(card => {
    ct5carousei.insertAdjacentHTML("beforeend", card.outerHTML);
});

const CT5dragstart = (e) => {
    CT5KTScroll = true;
    ct5carousei.classList.add('dragging');
    CT5StartX = e.pageX;
    CT5StartScrollLeft = ct5carousei.scrollLeft
}

const CT5dragend = () => {
    CT5KTScroll = false;
    ct5carousei.classList.remove('dragging');
}

let CT5timeoutId;

function CT5autoPlay () {
    ct5carousei.scrollLeft += ct5slidecuoiwidth;
}

const CT5dragging = (e) => {
    if (!CT5KTScroll) return;
    ct5carousei.scrollLeft = CT5StartScrollLeft - (e.pageX - CT5StartX);
}

const CT5infiniteScroll = () => {
    if (ct5carousei.scrollLeft === 0){
        ct5carousei.classList.add("ct4-no-transtion");
        ct5carousei.scrollLeft = ct5carousei.scrollWidth / 2;
        ct5carousei.classList.remove("ct4-no-transtion");
    }
    else if (Math.ceil(ct5carousei.scrollLeft) + ct5slidecuoiwidth*4.38 >= ct5carousei.scrollWidth ){
        console.log("kaka");
        ct5carousei.classList.add("ct4-no-transtion");
        ct5carousei.scrollLeft = ct5slidecuoiwidth;
        ct5carousei.classList.remove("ct4-no-transtion");
    }
    
}

ct5carousei.addEventListener('mousedown', CT5dragstart);
ct5carousei.addEventListener('mousemove', CT5dragging);
document.addEventListener('mouseup', CT5dragend);
ct5carousei.addEventListener('scroll', CT5infiniteScroll);

let intervalId;
function startInterval() {
    intervalId = setInterval(CT5autoPlay, 3000);
}

function stopInterval() {
    clearInterval(intervalId);
}

ct5carousei.addEventListener('mouseenter', stopInterval);
ct5carousei.addEventListener('mouseleave', startInterval);

startInterval();

// ----------conten6--------------
let ct6card = document.querySelectorAll('.conten6-card');
ct6card.forEach(card => {
    let rect = card.getBoundingClientRect();
    let height = rect.width * 1.0765;
    card.style.height = height + "px";
})

const ct6wrapper = document.querySelector('.conten6-wrapper');
let ct6carousei = document.querySelector('.conten6-carousei')
let CT6KTScroll = false, CT6StartX, CT6StartScrollLeft;
const ct6firstCardWitdh = ct6carousei.querySelectorAll('.conten6-card').offsetWith;
const ct6carouseiChildren = [...ct6carousei.children];
const ct6slidecuoiwidth = document.querySelector('#ct6-cardcuoi').clientWidth;

let CT6cardPerView = Math.round(ct6carousei.offsetWith / ct6firstCardWitdh);

ct6carouseiChildren.slice(-CT6cardPerView).reverse().forEach(card => {
    ct6carousei.insertAdjacentHTML("afterbegin", card.outerHTML);
});

ct6carouseiChildren.slice(0, -CT6cardPerView).forEach(card => {
    ct6carousei.insertAdjacentHTML("beforeend", card.outerHTML);
});

const CT6dragstart = (e) => {
    CT6KTScroll = true;
    ct6carousei.classList.add('dragging');
    CT6StartX = e.pageX;
    CT6StartScrollLeft = ct6carousei.scrollLeft
}

const CT6dragend = () => {
    CT6KTScroll = false;
    ct6carousei.classList.remove('dragging');
}

let CT6timeoutId;

function CT6autoPlay () {
    ct6carousei.scrollLeft += ct6slidecuoiwidth;
}

const CT6dragging = (e) => {
    if (!CT6KTScroll) return;
    ct6carousei.scrollLeft = CT6StartScrollLeft - (e.pageX - CT6StartX);
}

const CT6infiniteScroll = () => {
    if (ct6carousei.scrollLeft  === 0){
        console.log("hihi");
        ct6carousei.classList.add("ct4-no-transtion");
        ct6carousei.scrollLeft = ct6carousei.scrollWidth / 2;
        ct6carousei.classList.remove("ct4-no-transtion");
    }
    else if (Math.ceil(ct6carousei.scrollLeft) + ct6slidecuoiwidth*2.49815 >= ct6carousei.scrollWidth ){
        console.log("kaka");
        ct6carousei.classList.add("ct4-no-transtion");
        ct6carousei.scrollLeft = ct6slidecuoiwidth;
        ct6carousei.classList.remove("ct4-no-transtion");
    }
    
}

ct6carousei.addEventListener('mousedown', CT6dragstart);
ct6carousei.addEventListener('mousemove', CT6dragging);
document.addEventListener('mouseup', CT6dragend);
ct6carousei.addEventListener('scroll', CT6infiniteScroll);

// --------------footer------------
// -------------fotter-top----------
let fttop2img = document.querySelectorAll('.ft-top2-img');
fttop2img.forEach(img => {
    let rect = img.getBoundingClientRect();
    let height = rect.width * 1.0765;
    img.style.height = height + "px";
});
// -------------------------------------


// ---------------------------------------
var CG = [
    "/images/shopcard1.png",
    "/images/cg2.jpg",
    "/images/cg3.jpg"
]
var SS = [
    "/images/shopcard2.png",
    "/images/ss2.jpg",
    "/images/ss3.jpg"
]
var DS = [
    "/images/shopcard3.png",
    "/images/ds2.jpg",
    "/images/ds3.jpg"
]
var SL = [
    "/images/shopcard4.png",
    "/images/sl2.jpg",
    "/images/sl3.jpg"
]
var OS = [
    "/images/shopcard5.png",
    "/images/os2.jpg",
    "/images/os3.jpg"
]
var PB = [
    "/images/shopcard6.png",
    "/images/pb1.jpg",
    "/images/pb2.jpg"
]
var WC = [
    "/images/shopcard7.png",
    "/images/wc1.jpg",
    "/images/wc2.jpg"
]
var WJ = [
    "/images/shopcard8.png",
    "/images/wj1.jpg",
    "/images/wj2.jpg"
]
// -----------------------------------
let quickview = document.querySelectorAll(".card-main-button");
let overlay = document.querySelector(".overlay");
let shopview = document.querySelector(".shopview");
var svexit = document.querySelector("#sv-exit");
let shopviewitem = document.querySelectorAll(".shopview-item");
let shopviewleft = document.querySelector(".shopview-left");
let shopviewdk = document.querySelectorAll(".shopview-dk-button");
var Widthsvitem 
document.addEventListener("DOMContentLoaded", () => {
    Widthsvitem = shopviewleft.getBoundingClientRect().width;
});

function ShowBang (e, a){
    let svimg1, svimg2, svimg3, svimgdk1, svimgdk2,svimgdk3;
    svimg1 = document.createElement("img");
        svimg2 = document.createElement("img");
        svimg3 = document.createElement("img");
        svimg1.src = a[0];
        svimg2.src = a[1];
        svimg3.src = a[2];
        svimgdk1 = svimg1.cloneNode();
        svimgdk2 = svimg2.cloneNode();
        svimgdk3 = svimg3.cloneNode();
        shopviewdk[0].appendChild(svimgdk1);
        shopviewdk[1].appendChild(svimgdk2);
        shopviewdk[2].appendChild(svimgdk3);
        shopviewitem[0].appendChild(svimg1);
        shopviewitem[1].appendChild(svimg2);
        shopviewitem[2].appendChild(svimg3);
}

function dk1 () {
    document.querySelector(".shopview-slide").style.left = 0;
}
function dk2 () {
    document.querySelector(".shopview-slide").style.left = -535 + "px";
}

function dk3 () {
    document.querySelector(".shopview-slide").style.left = -535*2 + "px";
}

function TimKiem (e){
    
    if (e.innerHTML == "Cozy Knit Cardigan Sweater"){
        ShowBang(e, CG);
    }
    if (e.innerHTML == "Sophisticated Swagger Suit"){
        ShowBang(e, SS);
    }
    if (e.innerHTML == "Classic Denim Skinny Jeans"){
        ShowBang(e, DS);
    }
    if (e.innerHTML == "Athletic Mesh Sports Leggings"){
        ShowBang(e, SL);
    }
    if (e.innerHTML == "Vintage Denim Overalls Shorts"){
        ShowBang(e, OS);
    }
    if (e.innerHTML == "Satin Wrap Party Blouse"){
        ShowBang(e, PB);
    }
    if (e.innerHTML == "Plaid Wool Winter Coat"){
        ShowBang(e, WC)
    }
    if (e.innerHTML == "Water-Resistant Windbreaker Jacket"){
        ShowBang(e, WJ);
    }
}
shopviewdk[0].addEventListener("click", () => {
    dk1 ();
});
shopviewdk[1].addEventListener("click", () => {
    dk2 ();
});
shopviewdk[2].addEventListener("click", () => {
    dk3 ();
});
function ClicktoShow (e){
    let cha = e.parentNode;
    let ong = cha.parentNode;
    let p = ong.querySelector("p");
    let span = ong.querySelector(".card-info").querySelector("span");
    document.querySelector(".sv-gia-number").innerHTML = span.innerHTML;
    document.querySelector(".sv-name").innerHTML = p.innerHTML;
    TimKiem(p);
    overlay.style.display = "flex";
    shopview.style.display = "flex";
    document.querySelector("body").style.overflow = "hidden";

    shopviewitem.forEach(item => {
    let rect = shopviewleft.getBoundingClientRect();
    item.style.height = rect.height +"px";
    item.style.width = rect.width + "px";
})
}

function ClicktoHidden () {
    overlay.style.display = "none";
    shopview.style.display = "none";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".thanhtoan").style.display = "none";
    
    shopviewitem.forEach(img => {
        img.innerHTML = "";
    })
    shopviewdk.forEach (img => {
        img.innerHTML = "";
    })
    document.querySelector(".shopview-slide").style.left = 0;
    document.querySelector("#sv-input").value = 1;
    // ---------------cart---------
}

document.addEventListener('DOMContentLoaded', function() {
    quickview.forEach(item => {
        item.addEventListener("click", () => {
            ClicktoShow(item);
        });
    })
});

svexit.onclick = () => {
    ClicktoHidden();
}

document.querySelector(".sv-down").onclick = () =>{
    let input = document.querySelector("#sv-input");
    let number = parseInt(input.value);
    if (number>1){
        input.value = number-1;
    }

}
document.querySelector(".sv-up").onclick = () =>{
    let input = document.querySelector("#sv-input");
    let number = parseInt(input.value);
    input.value = number+1;

}
// -----------------cart-------------------
let cart = document.querySelector(".cart");
let cartexit = document.querySelector(".cart-exit");
let person = [];

function LuuLocal (e, kt) {
    let KT = false;
    let bo = e.parentNode;
    let ong = bo.parentNode;
    let cu = ong.parentNode;
    let anh;
    let name;
    let soluong;
    let gia;
    
    person = JSON.parse(localStorage.getItem('cart')) || [];
    if(kt == 1){
        name = cu.querySelector("p").innerHTML;
        anh = cu.querySelector("img").src;
        gia = parseInt((cu.querySelector(".card-info").querySelector("span").innerHTML).replace('$', ''));
        person.forEach(item => {
            if (item.name == name){
                item.soluong ++; 
                KT = true;
                return;
            } 
        })
        soluong = 1;
    }
    if (kt == 2){
        let ky = cu.parentNode;
        let bodoituong = ky.querySelector(".shopview-item-main");
        let doituong = bodoituong.querySelector("img");
        name = ong.querySelector(".sv-name").innerHTML;
        anh = doituong.src;
        
        let giadoituong = ong.querySelector(".sv-gia-number").innerHTML;
        let sldoituong = ong.querySelector("#sv-input").value;
        gia = parseInt(giadoituong.replace('$', ''));
        soluong = sldoituong;
        person.forEach(item => {
            if (item.name == name){
                item.soluong = parseInt(item.soluong) + parseInt(soluong); 
                KT = true;
                return;
            } 
        })
    }
    var TG = {
        name: name,
        img: anh,
        gia: "$" + gia,
        soluong: soluong
    };
    if (!KT){

        person.push(TG);
        localStorage.setItem('cart', JSON.stringify(person));
    }
    else{
        localStorage.setItem('cart', JSON.stringify(person));
    }
    alert("Thêm Vào Giỏ Hàng Thành Công!!!");
}


let addcart1 = document.querySelectorAll(".add-cart");

addcart1.forEach(cart => {
    cart.onclick = () => {
        LuuLocal(cart, 1);
    }
});

function downslcart (e) {
    let bo = e.parentNode;
    let ong = bo.parentNode;
    let sl = bo.querySelector(".cart-sl-number").value;
    
    let name = ong.querySelector(".cart-info-name").innerHTML;
    let TG = JSON.parse(localStorage.getItem('cart')) || [];
    if (TG.length > 0){
       
        TG.forEach(item => {
            if (item.name === name){
                if (sl > 1){
                    item.soluong = sl-1;
                }
                else{
                    TG = TG.filter(product => product.name !== name);
                }
            }
        })
    }
    localStorage.setItem("cart", JSON.stringify(TG));
    document.querySelector(".cart-inner").innerHTML = " ";
    CartShow();
}

function upslcart (e) {
    let bo = e.parentNode;
    let ong = bo.parentNode;
    let sl = bo.querySelector(".cart-sl-number").value;
    
    let name = ong.querySelector(".cart-info-name").innerHTML;
    let TG = JSON.parse(localStorage.getItem('cart')) || [];
    if (TG.length > 0){
       
        TG.forEach(item => {
            if (item.name === name){
                item.soluong = parseInt(sl) + 1;
            }
        })
    }
    localStorage.setItem("cart", JSON.stringify(TG));
    document.querySelector(".cart-inner").innerHTML = " ";
    CartShow();
}

function deleteitem (e){
    document.querySelector(".cart-inner").innerHTML = " ";
    let bo = e.parentNode;
    let ong = bo.parentNode;
    let cu = ong.parentNode;
    let target = cu.querySelector(".cart-info-name").innerHTML;

    person = JSON.parse(localStorage.getItem('cart')) || [];

    // let index = 0;

    // person.forEach(item => {
    //     if (item.name == target){
    //         alert(index + "index");
    //         return;
    //     }
    //     index++;
    // });
    // person.splice(index, 1);
    person = person.filter(product => product.name !== target);
    localStorage.setItem('cart', JSON.stringify(person));

    CartShow();
}

function XoaALL () {
    localStorage.removeItem('cart');
    CartShow();
}

function ThanhToan () {
    overlay.style.display = "flex";
    document.querySelector(".thanhtoan").style.display = "block";
}

function CartShow (){
    document.querySelector(".cart-exit").style.display = "flex";
    cart.innerHTML = " ";
    let Cartinner = document.createElement("div");
    Cartinner.classList = "cart-inner";

    let TG = localStorage.getItem('cart');
    let Cart = JSON.parse(TG);
    // let cartexit = document.createElement("div");
    // cartexit.classList = "cart-exit";
    // cartexit.innerHTML = `
    //         <i  class="fa-solid fa-xmark"></i>
    // `
    // cart.appendChild(cartexit);
    if(Cart == null){
        let div = document.createElement("div");
        div.innerHTML = `
            <p class="Cart-null">
            Giỏ hàng trống
            </p>
            <hr>
        `
        document.querySelector(".cart").appendChild(div);
        cart.style.display = "block";
        document.querySelector("body").style.overflow = "hidden";
        overlay.style.display = "flex";
        return;
    }
    else if(Cart.length == 0){
        let div = document.createElement("div");
        div.innerHTML = `
            <p class="Cart-null">
            Giỏ hàng trống
            </p>
            <hr>
        `
        document.querySelector(".cart").appendChild(div);
        cart.style.display = "block";
        document.querySelector("body").style.overflow = "hidden";
        overlay.style.display = "flex";
    }
    else{
        cart.style.display = "block";
        document.querySelector("body").style.overflow = "hidden";
        overlay.style.display = "flex";
        // ------------------
        
        
        Cart.forEach(item => {
            let div = document.createElement("div");
            div.classList = "cart-inner-full";
            div.innerHTML = `
                        <div class="cart-inner-card row">
                            <div class="col-4 cart-inner-img">
                                <img src="${item.img}" alt="">
                            </div>
                            <div class="col-7 cart-inner-info">
                                <div class="cart-info-name">${item.name}</div>
                                <div class="cart-info-sl mt-2">
                                    <button class="cart-tron cart-sl-down">
                                        <i class="fa-solid fa-minus"></i>
                                    </button>
                                    <input class="cart-tron cart-sl-number ms-2" value="${item.soluong}" type="number" >
                                    <button class="cart-tron cart-sl-up ms-2">
                                        <i class="fa-solid fa-plus"></i>
                                    </button>
                                    <div class="ms-3 cart-gia">
                                        ${"$" + parseInt((item.gia).replace('$','')) * parseInt(item.soluong)}
                                    </div>
                                </div>
                            </div>
                            <div class="col-1 cart-inner-delete">
                                <button id="cart-delete">
                                    <i  class="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                        </div>
                        <hr>
                    `
                Cartinner.appendChild(div);
        })
        cart.appendChild(Cartinner);

        let Total = 0;
        let TG = JSON.parse(localStorage.getItem('cart')) || [];
        TG.forEach (item => {
            Total += parseInt((item.gia).replace('$','')) * parseInt(item.soluong);
        })

        let divcartbuy = document.createElement("div");
        divcartbuy.class = "cart-buy";
        divcartbuy.innerHTML = `
            <div class="cart-buy-total">
                    <div class="cart-total-text">
                        Subtotal:
                    </div>
                    <div class="cart-total-const">
                        ${"$" + Total}
                    </div>
                </div>
                <div class="cart-buy-ship mt-4">
                    <div class="cart-ship-icon">
                        <i class="fa-solid fa-ship"></i>
                    </div>
                    <div class="cart-ship-text">
                        Congratulations , you've got free shipping!
                    </div>
                </div>
                <button class="cart-but-accept buttonbeauty">
                    Buy
                </button>
        `
        
        cart.appendChild(divcartbuy);

        let cartdelete = document.querySelectorAll("#cart-delete");
        cartdelete.forEach(item => {
            item.onclick = () => {
            deleteitem (item);
        }
        });
        let cartsldown = document.querySelectorAll(".cart-sl-down");
        let cartslup = document.querySelectorAll(".cart-sl-up");
        
        cartsldown.forEach(item => {
            item.onclick = () => {
                downslcart(item);
            }
        })
        cartslup.forEach (item => {
            item.onclick = () => {
                upslcart(item);
            }
        })
        
        let cartaccept = document.querySelector(".cart-but-accept");
        cartaccept.onclick = () => {
            XoaALL();
            ThanhToan ();
        }
    }
    let cartnumber = document.querySelectorAll(".cart-sl-number");

    cartnumber.forEach (item => {
        item.addEventListener("input", () => {
            let bo = item.parentNode;
            let ong = bo.parentNode;
            let TG = JSON.parse(localStorage.getItem('cart'));
            TG.forEach(a => {
                if (TG.name === ong.querySelector(".cart-info-name").innerHTML){
                    TG.soluong = item.value;
                }
            })
            document.querySelector(".cart-inner") = " ";
            CartShow();
        })
    })

    
}
function CartHidden() {
    cart.scrollTop = 0;
    document.querySelector(".cart-exit").style.display = "none";
    cart.style.display = "none";
    overlay.style.display = "none";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".cart").innerHTML = " ";
    
}
document.querySelector(".head-cart").onclick = () =>{
    CartShow();
}
overlay.onclick = () =>{
    CartHidden();
    ClicktoHidden();
}
cartexit.onclick = () => {
    CartHidden();
}


let addcart2 = document.querySelectorAll(".addcart");
addcart2.forEach(item => {
    item.onclick = () => {
        LuuLocal(item, 2);
    }
})

function ThanhToanXong () {
    overlay.style.display = "none";
    document.querySelector(".thanhtoan").style.display = "none";
    alert("Cảm Ơn Quý Khách!!!");
}

document.querySelector(".dathanhtoan").onclick = () => {
    ThanhToanXong();
}

function uptotop () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}
document.querySelector(".uptotop").onclick = () => {
    uptotop ();
}





