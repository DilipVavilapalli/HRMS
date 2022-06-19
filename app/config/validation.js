const checkCharacter = char => {
    const charArr = char.toString().split('')
    const empt = 0
    charArr.forEach(el=>{
        if(el === '' | el === ' '){
            empt = empt + 1
        }
    })
    if(empt === charArr.length){
        return {status: false, message: 'Empty characters are not allowed'}
    }else{
        let res = charArr.length - empt
        if(res > 2){
            return {status: true}
        }else{
            return {status: false, message: 'Character length must exceed 2 characters'}
        }
    }
}

const validateSignUp = ({fullname, dob, phoneNumber}) => {
    if(fullname){
        if(checkCharacter(fullname).status){
            if(phoneNumber){
                if(checkCharacter(phoneNumber).status){
                    if(dob){
                        if(dob.month !== '' && dob.date !== '' && dob.year !== ''){
                            if(Number(dob.year)){
                                if(Number(dob.date)){
                                    if(Number(dob.month)){
                                        return {status: true}
                                    }else{
                                        return {status: false, message: 'Month must be a number'}
                                    }
                                }else{
                                    return {status: false, message: 'Date must be a number'}
                                }
                            }else{
                                return {status: false, message: 'Year must be a number'}
                            }
                        }else{
                            return {status: false, message: 'Enter valid date of birth'}
                        }
                    }else{
                        return {status: false, message: 'DOB is required'}
                    }
                }else{
                    return {status: false, message: checkCharacter(phoneNumber).message}
                }
            }else{
                return {status: false, message: 'Phone number is required'}
            }
        }else{
            return {status: false, message: checkCharacter(fullname).message}
        }
    }else{
        return {status: false, message: 'Fullname is required'}
    }
}

export default {
    validateSignUp
}