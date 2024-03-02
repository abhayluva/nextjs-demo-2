import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "./app/helper/helper";
export async function middleware(request: NextRequest){
    if(request.nextUrl.pathname.startsWith('/admin')){
        let session = await getAdminSession(request);
        if(session != null && session != undefined && (request.nextUrl.pathname == '/admin/signin' || request.nextUrl.pathname == '/admin')){
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }else if((session == null || session == 'undefined') && request.nextUrl.pathname != '/admin/signin'){
            return NextResponse.redirect(new URL('/admin/signin', request.url));
        }
    }else{
        //console.log('FrontEnd');
    }
}