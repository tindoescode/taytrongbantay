import bcrypt from 'bcrypt';
const saltRounds = 13; // random number

async function sign(password) {
    return await bcrypt.hash(password, saltRounds);
    
}

async function compare(password, hash) {
    return await bcrypt.compareSync(password, hash); 
}

export default { sign, compare };