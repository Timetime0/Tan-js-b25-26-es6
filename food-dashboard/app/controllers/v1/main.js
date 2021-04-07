import Food from '../../models/v1/Food.js'

document.getElementById('btnThemMon').addEventListener("click", themMon)


// Tính chất hoisting của arrow function ( nên hk sử dụng được)

function themMon () {
    const maMon = document.getElementById('foodID').value;
    const tenMon = document.getElementById('tenMon').value;
    const loaiMon = document.getElementById('loai').value;
    const giaMon = +document.getElementById('giaMon').value;
    const khuyenMai = +document.getElementById('khuyenMai').value;
    const tinhTrang = document.getElementById('tinhTrang').value;

    // thêm property "multiple" vào input để chọn nhiều files
    // biến hình ảnh thành chuỗi base64 (chuỗi string mã hóa từ file): lưu trữ được dạng file nhị phân => để hiển thị lên giao diện
    let hinhAnh = document.getElementById('hinhMon').files[0];
    const moTa = document.getElementById('moTa').value;
    
    if(!hinhAnh){
        return
    }

    // Chuyển đối tượng file thành string dạng base64: là tác vụ bất đồng bộ
    // Kỹ thuật sử lý file trong js
    const fileReader = new FileReader();
    fileReader.readAsDataURL(hinhAnh)
    fileReader.onload = function (e){
        hinhAnh = e.target.result;
        const food = new Food (maMon,tenMon,loaiMon,giaMon,khuyenMai,tinhTrang,hinhAnh,moTa) 
        hienThiMonAn(food);
    }
}

function hienThiMonAn (food){
    document.getElementById('imgMonAn').src = food.hinhAnh;
    document.getElementById('spMa').innerHTML = food.maMon;
    document.getElementById('spTenMon').innerHTML = food.tenMon;
    document.getElementById('spLoaiMon').innerHTML = food.loaiMon;
    document.getElementById('spGia').innerHTML = food.giaMon;
    document.getElementById('spKM').innerHTML = `${food.khuyenMai}%`;
    document.getElementById('spGiaKM').innerHTML = food.tinhGiaDaKhuyenMai();
    document.getElementById('spTT').innerHTML = food.tinhTrang;
    document.getElementById('pMoTa').innerHTML = food.moTa;
}

