import mongoose,{Schema,Document} from "mongoose"

interface Faculty extends Document{
    userId:Schema.Types.ObjectId;
    
}