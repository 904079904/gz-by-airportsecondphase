import axios from "axios";
export default function axiosToken(params) {
    return new Promise((resolve,reject)=>{
        let token = localStorage.getItem('token');
        if(!token){
            console.log('未获取到本地token');
            return
        }
        let data = Object.assign(params,{
            // headers: { 'Authorization': token },
            headers: { 'X-Access-Token': token },
        })
        axios(data)
            .then(response => {
                resolve(response);
            },err => {
                reject(err);
            })
            .catch(error => {
                reject(error);
            })
    })
    
}