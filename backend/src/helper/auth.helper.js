import bcrypt from 'bcrypt'

export const hashPassword = async (password)=>{
    try {
        const hash = await bcrypt.hash(password,8)
        return hash;
    } catch (error) {
        console.log(error);
    }
}

export const comparePassword = async (password, hash)=>{
    const compare = await bcrypt.compare(password,hash)
    return compare;
}