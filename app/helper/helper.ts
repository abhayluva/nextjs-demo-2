import { SignJWT, jwtVerify } from 'jose';
import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

/* Expire session in days */
export async function expireSession(day:number){
    return new Date(Date.now() + (day*24*60*60*1000));
}

export async function encryptData(payload: any){
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime(payload.expires)
        .sign(key)
}

export async function decryptData(input: string): Promise<any>{
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256']
    });
    return payload;
}


/* Start:: Admin Data */
export async function getAdminSession(request: NextRequest){
    const session = request.cookies.get('admin_auth')?.value;
    if(!session){
        return null;
    }else{
        return await decryptData(session);
    }
}

export async function adminSessionData(){
    const session = cookies().get('admin_auth')?.value;
    return await decryptData(session ? session : '');
}

export async function getAdminToken(){
    let data = await adminSessionData();
    return data.sessionData.token;
}
/* End:: Admin Data */