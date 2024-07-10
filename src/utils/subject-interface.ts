import { Document, Schema } from "mongoose";

interface Medium extends Document {
    name: String;
    active: Boolean;
}

interface SubjectType extends Document {
    name: String;
    type: String;
    active: Boolean;
}

interface SubjectDef extends Document {
    basicCourse: String;
    course: String;
    medium: String;
    name: String;
    shortName: String;
    subjectCode: String;
    subjectType: String;
    optional: Boolean;
    active: Boolean;
}

interface SubjectGrp extends Document {
    course: String;
    medium: String;
    grpName: String;
    maxSub: Number;
    selectedSub: Number;
    totalSub: Number;
    maxGrpPref: Number;
    active: Boolean;
}

interface OptionalSubGrp extends Document {
    course: String;
    medium: String;
    grpName: String;
    maxSub: Number;
    selectedSub: Number;
    totalSub: Number;
    maxGrpPref: Number;
    active: Boolean;
    minSub?: Number;
}

// Schemas
const MediumSchema: Schema<Medium> = new Schema({
    name: { type: String, required: true },
    active: { type: Boolean, required: true }
});

const SubjectTypeSchema: Schema<SubjectType> = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    active: { type: Boolean, required: true }
});

const SubjectDefSchema: Schema<SubjectDef> = new Schema({
    basicCourse: { type: String, required: true },
    course: { type: String, required: true },
    medium: { type: String, required: true },
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    subjectCode: { type: String, required: true },
    subjectType: { type: String, required: true },
    optional: { type: Boolean, required: true },
    active: { type: Boolean, required: true }
});

const SubjectGrpSchema: Schema<SubjectGrp> = new Schema({
    course: { type: String, required: true },
    medium: { type: String, required: true },
    grpName: { type: String, required: true },
    maxSub: { type: Number, required: true },
    selectedSub: { type: Number, required: true },
    totalSub: { type: Number, required: true },
    maxGrpPref: { type: Number, required: true },
    active: { type: Boolean, required: true }
});

const OptionalSubGrpSchema: Schema<OptionalSubGrp> = new Schema({
    course: { type: String, required: true },
    medium: { type: String, required: true },
    grpName: { type: String, required: true },
    maxSub: { type: Number, required: true },
    selectedSub: { type: Number, required: true },
    totalSub: { type: Number, required: true },
    maxGrpPref: { type: Number, required: true },
    active: { type: Boolean, required: true },
    minSub: { type: Number }
});

export {
    MediumSchema,
    SubjectTypeSchema,
    SubjectDefSchema,
    SubjectGrpSchema,
    OptionalSubGrpSchema,
    Medium,
    SubjectDef,SubjectGrp,SubjectType,OptionalSubGrp
};