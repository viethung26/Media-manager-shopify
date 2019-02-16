exports.get = () => {
    let token = localStorage.getItem('token')
    return token
}
exports.set = (token) => {
    localStorage.setItem('token', token)
}
exports.remove = ()=> {
    localStorage.removeItem('token')
}