import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

connect()

export async function getDataFromToken(request: NextRequest){
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);

        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}