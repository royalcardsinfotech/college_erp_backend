import mongoose,{Schema,Document} from "mongoose";
import { CourseQuota, MlistQuota, MlistQuotaSeq, SubQuota, courseQuotaSch, mlistquotaSch, mlistquotaSeqSch, subQuotaSch } from "../utils/meritlist-interfaces";



export interface MeritlistSet extends Document{
    schoolId:mongoose.Schema.Types.ObjectId
    mlistQuota:MlistQuota[]
    mlistQuotaSeq:MlistQuotaSeq[]
    courseQuota:CourseQuota[]
    subQuota:SubQuota[]
}

const meritlistSetSchema: Schema = new Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    mlistQuota: {
        type: [mlistquotaSch],
        default:[]
    },
    mlistQuotaSeq: {
        type: [mlistquotaSeqSch],
        default:[]
    },
    courseQuota: {
        type: [courseQuotaSch],
        default:[]
    },
    subQuota: {
        type: [subQuotaSch],
        default:[]
    }
});

const MeritlistSetModel = mongoose.model<MeritlistSet>('meritlistSet', meritlistSetSchema);

export default MeritlistSetModel;