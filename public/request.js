const requestService = (url, method, params) => {
    console.log("URL", url)
    console.log("METHOD", method)
    console.log("PARAMS", params)

    console.log(JSON.stringify(params))

    let req = new XMLHttpRequest()
    
    req.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200)
            console.log('success!')
        else if(this.readyState==4) {
            console.log("ERROR")
            console.log("STATUS:", this.status)
            console.log("MSG:", this.statusText)
        }
    }

    req.open(method,`https://shoebox513.firebaseapp.com${url}`,true)
    req.setRequestHeader("Content-Type", "application/json")
    req.setRequestHeader('Access-Control-Allow-Headers', '*')
    req.setRequestHeader('Access-Control-Allow-Origin', 'https://shoebox513.firebaseapp.com/')
    req.send(JSON.stringify(params))
}