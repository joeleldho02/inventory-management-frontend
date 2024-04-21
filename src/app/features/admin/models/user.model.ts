import { ROLES } from "../../../shared/enums/roles.enum";

export interface UserModel{
    _id?: string,
    name : string, 
    email : string,
    mobile : string, 
    roles : Array<ROLES>,
    outlet : string,
    password? : string,
    isActive?: boolean,
    userPic? : string,
    createdDate? : Date,
    modifiedDate? : Date,
    createdBy? : string,
    modifiedBy? : string,
    lastLogin? : Date
}