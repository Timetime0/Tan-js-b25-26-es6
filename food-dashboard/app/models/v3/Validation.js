class Validation{
    constructor(){
        this.giaTri = {
            errors : {
                maMon: '',
                tenMon: '',
                loaiMon: '',
                giaMon: '',
                khuyenMai: '',
                tinhTrang: '',
                moTa:'',
            },
            valid : false,
        }
    }

    kiemTraRong = (value, nameValue) => {   
        if(value ===""){
            return this.giaTri.errors[nameValue] = `${nameValue} không được để trống`
        }else{
            return this.giaTri.errors[nameValue] = ``
        }
    }

    kiemTraSeclected = (value, nameValue) => {
        if(!value){
            return this.giaTri.errors[nameValue] = `${nameValue} chựa chọn`
        }else{
            return this.giaTri.errors[nameValue] = ``
        }
    }

    kiemTraSo = (value, nameValue) => {
        let test = /^[1-9]\d*$/.test(value)

        if(!test){
            return this.giaTri.errors[nameValue] = `${nameValue} chựa chọn`
        }else{
            return this.giaTri.errors[nameValue] = ``
        }
    }

    kiemTraValid = () => {
        let object = this.giaTri.errors
        for (let key in object){
            if(object[key] !== ""){
                return this.giaTri.valid = false
            }
            else{
                this.giaTri.valid = true
            }
        }
        return this.giaTri.valid = true
    }
}

export default Validation