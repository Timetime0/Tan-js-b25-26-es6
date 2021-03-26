class DanhSachMonAn {
    constructor(){
       this.ds =[];
    }

    xoaMonAn = (id) => {
        let index = this.ds.findIndex(monAn=>monAn.id === id)
        if(index !== -1){
            this.ds.splice(index, 1)
        }
        return  this.ds
    } 

    capNhatMonAn = (id, object) =>{
        let index = this.ds.findIndex(monAn=>monAn.id === id)
        if(index !== -1){
            this.ds[index] = object
        }
        return  this.ds
    }

    sapXep = (loai) => {
        if (loai === "Mặn" || loai === "Chay"){
            return this.ds.filter((sp,index)=>{
                return sp.loaiMon === loai
            })
        } else {
            return this.ds
        }
    }

    kiemTraID = (id) => {
        let index = this.ds.findIndex(item=>item.id === id)
        console.log(index)
        if(index !==-1){
            return true
        }
        return false
    }

}

export default DanhSachMonAn