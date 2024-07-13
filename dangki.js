var Acc = [];
if(document.querySelector(".accept-dk")){
    let accept = document.querySelector(".accept-dk");
    function dangki () {
        let KT = true;
        let username = document.querySelector("#user-dk").value;
        let pass1 = document.querySelector("#pass1").value;
        let pass2 = document.querySelector('#pass2').value;
        if (username === ""){
            alert("Chưa Nhập Username");
            return;
        }
        else {
            let TG = JSON.parse(localStorage.getItem('acc')) || [];
            TG.forEach(element => {
                if (element.username == username){
                    alert("Đã Có Tài Khoản Này Rồi!!!");
                    KT = false;
                    return;
                }
            });
            if (KT == false){
                return;
            }
            if (pass1 === "" || pass2 === ""){
                alert("Chưa Nhập Password!!!");
                return;
            }
            if (pass1 !== pass2){
                alert("Mật Khẩu Xác Thực Chưa Chính Xác!!!");
                return;
            }
            else{
                alert("Đăng Ký Thành Công!!!");
                Acc = JSON.parse(localStorage.getItem('acc')) || [];
                let TG = {
                    username: username,
                    pass: pass2
                };
                Acc.push(TG);
                localStorage.setItem('acc', JSON.stringify(Acc));
                window.location.href = "login.html";
            }
        }
    }

    accept.onclick = () => {
        
        
        dangki();
    }
}

if (document.querySelector(".form-login")){
    let accept = document.querySelector(".accept");
    
    let KT = false;

    function login () {
        
        let username = document.querySelector("#user-lg").value;
        let pass = document.querySelector("#pass-lg").value;
        if (username === ""){
            alert("Chưa Nhập Vào Username!!!");
            return;
        }
        else {
            if (pass === ""){
                alert("Chưa Nhập Vào Ô Password!!!");
                return;
            }
            let TG = JSON.parse(localStorage.getItem('acc')) || [];
            TG.forEach(item => {
                if (item.username === username && item.pass === pass){
                    
                    alert("Đăng Nhập Thành Công");
                    let TDN = item.username;
                    localStorage.setItem('user', JSON.stringify(TDN));
                    KT=true;
                    window.location.href = "index.html";
                    return;

                }
            });
        }
        if (KT === false) {
            alert("Sai Tài Khoản Mật Khẩu!!!");
            return;
        }
    }
    accept.onclick = () => {
        login();
    }
}

if(document.querySelector(".form-fg")){
    
    let accept = document.querySelector(".accept-fg");

    function find () {
        let KT = false;
        let username = document.querySelector("#user-fg").value;
        let TG = JSON.parse(localStorage.getItem('acc')) || [];
        if (username === ""){
            alert("Chưa Nhập Username!!!");
            return;
        }
        else{
            TG.forEach(item => {
                if (item.username === username){
                    alert("Mật Khẩu Của Bạn Là: " + item.pass);
                    KT = true;
                    window.location.href = "login.html";
                    return;
                }
            })
        }
        if (KT==false){
            alert("Không Tìm Thấy Tài Khoản Này!!!");
            return;
        }
    }

    accept.onclick = () => {
        find();
    }
}

if(document.querySelector(".dangnhap")){
    let DN = document.querySelector(".dangnhap");
    if (localStorage.getItem('user') !== null){
        DN.innerHTML = JSON.parse(localStorage.getItem('user'));
    }
    else {
        DN.innerHTML = "Login";
    }

    function Out () {
        localStorage.removeItem('user');
    }

    DN.onclick = () => {
        Out();
    }
}
