'use server';
import { AdminSignin } from "@/app/model/admin/signin-model";
import { expireSession, encryptData } from "@/app/helper/helper";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SigninAction(data:object){
    let res = await AdminSignin(data);
    if(res.code != '1'){
        let data = res.data;
        let sessionData = {
            id: data.Id,
            name: data.Name,
            email: data.Email,
            token:data.Token
        };
        let expires = await expireSession(7);
        const encryptedData = await encryptData({sessionData, expires});
        cookies().set('admin_auth', encryptedData, {
            httpOnly: true,
            expires: expires // One week
          });
        redirect('/admin/dashboard');
    }else{
        return {
            message:res.message
        };
    }
}

export async function AdminSignOut(){
    cookies().delete('admin_auth');
    redirect('/admin/signin');
}