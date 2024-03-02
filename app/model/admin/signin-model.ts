const Admin_API_URL = process.env.NEXT_PUBLIC_Admin_API_URL;
export async function AdminSignin(rowData:object){
    let url = Admin_API_URL+'authaccount/login';

    let res = await fetch(url, {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rowData)
    })
    let data = await res.json()
    return data
}