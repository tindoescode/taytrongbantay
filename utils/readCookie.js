function readCookie(cookies, n) {
    var c = cookies.split('; '),
        i = c.length - 1,
        C;
  
    for(; i>=0; i--) {
       C = c[i].split('=');
       if(C[0] == n) return C[1];
    }
}

export default readCookie;