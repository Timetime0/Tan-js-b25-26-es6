import Food from '../../models/v3/Food.js'
import DanhSachMonAn from '../../models/v3/DanhSachMonAn.js';
import Validation from '../../models/v3/Validation.js'

const danhSachMonAn = new DanhSachMonAn ()
const validation = new Validation ()

document.getElementById('btnThem').addEventListener("click", function(){
    document.getElementById("btnThemMon").removeAttribute("disabled")
})

document.getElementById("btnClose").addEventListener("click", function(){
    resetMonAn()
    document.getElementById("invalidID").style.display="none"
    document.getElementById('invalidTen').style.display="none"
    document.getElementById('invalidGia').style.display="none"
    document.getElementById('invalidMoTa').style.display="none"
    document.getElementById('invalidLoai').style.display="none"
    document.getElementById('invalidKM').style.display="none"
    document.getElementById('invalidTT').style.display="none"
    document.getElementById('invalidHinhAnh').style.display="none"
})

document.getElementById("closex").addEventListener("click", function(){
    resetMonAn()
    document.getElementById("invalidID").style.display="none"
    document.getElementById('invalidTen').style.display="none"
    document.getElementById('invalidGia').style.display="none"
    document.getElementById('invalidMoTa').style.display="none"
    document.getElementById('invalidLoai').style.display="none"
    document.getElementById('invalidKM').style.display="none"
    document.getElementById('invalidTT').style.display="none"
    document.getElementById('invalidHinhAnh').style.display="none"
})

// Click vào thêm món để add món
    document.getElementById('btnThemMon').addEventListener("click", themMon)
    function themMon(){
        const maMon = document.getElementById('foodID').value;
        const tenMon = document.getElementById('tenMon').value;
        const loaiMon = document.getElementById('loai').value;
        const giaMon = document.getElementById('giaMon').value;
        const khuyenMai = document.getElementById('khuyenMai').value;
        const tinhTrang = document.getElementById('tinhTrang').value;

        // thêm property "multiple" vào input để chọn nhiều files
        // biến hình ảnh thành chuỗi base64 (chuỗi string mã hóa từ file): lưu trữ được dạng file nhị phân => để hiển thị lên giao diện
        let hinhAnh = document.getElementById('hinhMon').files[0];
        const moTa = document.getElementById('moTa').value;

        //Validation
        let requiredMaMon = validation.kiemTraRong(maMon.trim(),"maMon")
        validator(requiredMaMon,'invalidID')
   
        let requiredTenMon = validation.kiemTraRong(tenMon.trim(),"tenMon")
        validator(requiredTenMon,'invalidTen')

        let requiredGiaMon = validation.kiemTraRong(giaMon.trim(),"giaMon")
        validator(requiredGiaMon,'invalidGia')

        let requiredMoTa = validation.kiemTraRong(moTa.trim(),"moTa")
        validator(requiredMoTa,'invalidMoTa')

        let requiredLoaiMon = validation.kiemTraSeclected(loaiMon,"loaiMon")
        validator(requiredLoaiMon,'invalidLoai')

        let requiredKhuyenMai = validation.kiemTraSeclected(khuyenMai,"khuyenMai")
        validator(requiredKhuyenMai,'invalidKM')
       
        let requiredTinhTrang = validation.kiemTraSeclected(tinhTrang,"tinhTrang")
        validator(requiredTinhTrang,'invalidTT')

        let requiredHinhAnh = validation.kiemTraSeclected(hinhAnh,"hinhAnh")
        validator(requiredHinhAnh,'invalidHinhAnh')

        let a = danhSachMonAn.kiemTraID(maMon)
        let kiemTra = validation.kiemTraValid()
      
        if(a === true){
            document.getElementById("invalidID").innerHTML="ID đã tồn tại"
            document.getElementById("invalidID").style.display="block"
            kiemTra = false
        }
        if(kiemTra === false){
            return false
        }

        // Chuyển đối tượng file thành string dạng base64: là tác vụ bất đồng bộ
        // Kỹ thuật sử lý file trong js
            const fileReader = new FileReader()
            fileReader.readAsDataURL(hinhAnh)
            fileReader.onload = function (e){
                hinhAnh = e.target.result;
                const food = new Food (maMon,tenMon,loaiMon,giaMon,khuyenMai,tinhTrang,hinhAnh,moTa) 
                const dsMonAn = danhSachMonAn.ds
                dsMonAn.push(food);
                hienThiMonAn(dsMonAn)
                resetMonAn()
            }
    }


// Hiện thị danh sách món ăn
function hienThiMonAn (dsMonAn){ //  nhap []
    let html =""
    for (let key in dsMonAn){
        html +=
        `
            <tr>
                <td>${dsMonAn[key].id}</td>
                <td>${dsMonAn[key].tenMon}</td>
                <td>${dsMonAn[key].loaiMon}</td>
                <td>${dsMonAn[key].giaMon}</td>
                <td>${dsMonAn[key].khuyenMai}%</td>
                <td>${dsMonAn[key].tinhGiaDaKhuyenMai()}</td> 
                <td>${dsMonAn[key].tinhTrang}</td>
                <td>
                    <button data-toggle="modal"  data-target="#exampleModal" action-target="fix" action-data="${dsMonAn[key].id}" class="btn btn-success" >Fix</button>
                    <button action-target="delete" action-data="${dsMonAn[key].id}" class="btn btn-danger" >Delete</button>
                </td>        
            </tr>
        `
    }
    document.getElementById('tbodyFood').innerHTML = html
}


document.getElementById('tbodyFood').addEventListener("click", langNgheSuKien)
// Tính chất hoisting của arrow function (nên hk sử dụng được) => Cần xem lại

//Xóa món ăn và cập nhật món ăn
function langNgheSuKien(e){
    const id = e.target.getAttribute("action-data")
    const action = e.target.getAttribute("action-target")

    if(action==="delete"){
        danhSachMonAn.xoaMonAn(id)
        hienThiMonAn(danhSachMonAn.ds)
    }

    if(action==="fix"){
        document.getElementById("btnThemMon").setAttribute("disabled",true)
        chinhSuaMonAn(id)
    }
}

//Reset khi thêm món ăn thành công
function resetMonAn(){
    document.getElementById('foodID').value = "";
    document.getElementById('tenMon').value = "";
    document.getElementById('loai').value = "";
    document.getElementById('giaMon').value = "";
    document.getElementById('khuyenMai').value = "";
    document.getElementById('tinhTrang').value = "";
    document.getElementById('moTa').value = "";
    document.getElementById('hinhMon').value = "";
    document.getElementById('foodID').removeAttribute("disabled")
}

//Chỉnh sửa món ăn
 
function chinhSuaMonAn (id){
    let danhSach = danhSachMonAn.ds
    let index = danhSach.findIndex(monAn=>monAn.id===id)
    if(index !== -1){
        document.getElementById('foodID').value = danhSach[index].id;
        document.getElementById('tenMon').value = danhSach[index].tenMon;
        document.getElementById('loai').value = danhSach[index].loaiMon;
        document.getElementById('giaMon').value = danhSach[index].giaMon;
        document.getElementById('khuyenMai').value = danhSach[index].khuyenMai;
        document.getElementById('tinhTrang').value = danhSach[index].tinhTrang;
        document.getElementById('moTa').value = danhSach[index].moTa;
        document.getElementById('foodID').setAttribute("disabled", true)
    
        // từ đó lôi nút btn Cập nhật ra 
        document.getElementById("btnCapNhat").addEventListener("click", btnCapNhat)

        function btnCapNhat(){
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
    
            // validation 
            let requiredMaMon = validation.kiemTraRong(maMon.trim(),"maMon")
            validator(requiredMaMon,'invalidID')

            let requiredTenMon = validation.kiemTraRong(tenMon.trim(),"tenMon")
            validator(requiredTenMon,'invalidTen')

            let requiredGiaMon = validation.kiemTraRong(giaMon.trim(),"giaMon")
            validator(requiredGiaMon,'invalidGia')

            let requiredMoTa = validation.kiemTraRong(moTa.trim(),"moTa")
            validator(requiredMoTa,'invalidMoTa')

            let requiredLoaiMon = validation.kiemTraSeclected(loaiMon,"loaiMon")
            validator(requiredLoaiMon,'invalidLoai')

            let requiredKhuyenMai = validation.kiemTraSeclected(khuyenMai,"khuyenMai")
            validator(requiredKhuyenMai,'invalidKM')
            
            let requiredTinhTrang = validation.kiemTraSeclected(tinhTrang,"tinhTrang")
            validator(requiredTinhTrang,'invalidTT')

            let requiredHinhAnh = validation.kiemTraSeclected(hinhAnh,"hinhAnh")
            validator(requiredHinhAnh,'invalidHinhAnh')

            let kiemTra = validation.kiemTraValid()

            if(kiemTra === false){
                return false
            }

            // Chuyển đối tượng file thành string dạng base64: là tác vụ bất đồng bộ
            // Kỹ thuật sử lý file trong js
            const fileReader = new FileReader();
                // console.log(fileReader);
                fileReader.readAsDataURL(hinhAnh)
                fileReader.onload = function (e){
                    hinhAnh = e.target.result;
                    const food = new Food (maMon,tenMon,loaiMon,giaMon,khuyenMai,tinhTrang,hinhAnh,moTa) 
                    const dsCapNhat = danhSachMonAn.capNhatMonAn(id,food)
                    hienThiMonAn(dsCapNhat)
                    resetMonAn()
                }
        }
    }
}

//Show món ăn theo yêu cầu
document.getElementById("selLoai").addEventListener("click", filter)
function filter(e){
    let id = document.getElementById("selLoai")
    let values = id.options[id.selectedIndex].value
    hienThiMonAn(danhSachMonAn.sapXep(values))
}



function validator(name, id){
    if(name !== ""){
        document.getElementById(id).style.display="block"
        document.getElementById(id).innerHTML = name
    }else{
        document.getElementById(id).style.display="none"
    }
}