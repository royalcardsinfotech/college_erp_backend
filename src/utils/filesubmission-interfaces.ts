import exp from "constants";
import mongoose,{Schema,Document} from "mongoose";

interface PersonalInfo extends Document{
    title?: String;
    firstName?: String;
    middleName?: String;
    lastName?: String;
    nameAsPerAadhar?: String;
    gender?: String;
    dob?: String;
    mobileNo?: String;
    email?: String;
    phone?: String;
    nationality?: String;
    birthPlace?: String;
    maritalStatus?: String;
    bloodGroup?: String;
    religion?: String;
    casteCategory?: String;
    minority?: Boolean;
    identificationMark?: String;
    identificationMark2?: String;
    motherTongue?: String;
    birthStateOrDomicileState?: String;
    prevFirstName?: String;
    prevMiddleName?: String;
    prevLastName?: String;
    totalFamilyMember?: number;
    firstNameUnicode?: String;
    middleNameUnicode?: String;
    lastNameUnicode?: String;
    fatherName?: String;
    motherName?: String;
    fatherFname?: String;
    fatherMname?: String;
    fatherLname?: String;
    fatherMobileNo?: String;
    fatherEmailID?: String;
    motherMobileNo?: String;
    motherEmailID?: String;
    motherAadhaarNo?: String;
    fatherAadhaarNo?: String;
    guardianName?: String;
    grandFatherName?: String;
    guardianContact?: String;
    relationWithApplicant?: String;
    guardianOccupationDetails?: String;
    guardianDesignation?: String;
    parentMobile?: String;
    motherOrganization?: String;
    motherOrganizationAddress?: String;
    motherOrganizationPhoneNo?: String;
    fatherOccupation?: String;
    fatherOrganization?: String;
    fatherOrganizationAddress?: String;
    fatherOrganizationPhoneNo?: String;
    fatherNameUnicode?: String;
    motherNameUnicode?: String;
    guardianNameUnicode?: String;
    aadhardCardNo?: String;
    panCardNo?: String;
    drivingLicenceNo?: String;
    voterIdNO?: String;
    learningDisabilityNo?: String;
    casteCertificateNo?: String;
    bankName?: String;
    bankAccountNo?: String;
    branch?: String;
    IFSC_Code?: String;
    bankAccountType?: String;
    aadhaarLinkedWithBankAccount?: Boolean;
    UDISE_No?: String;
    childNo?: String;
    meritNumber?: String;
    serialNumber?: String;
    formNumber?: String;
    prnNumber?: String;
    eidNumber?: String;
    visaNumber?: String;
    idProofNo?: String;
    occupation?: String;
    isOrganDonor?: Boolean;
    familyAnnualIncome?: String;
    isNCCOrNSS?: Boolean;
    isHostel?: Boolean;
    isEmployee?: Boolean;
    nameChangeReason?: String;
    fnameAs10Std?: String;
    lnameAs10Std?: String;
    nativePlace?: String;
    hobbies?: String;
    inHouse?: Boolean;
    categoryType?: String;
    isDrama?: Boolean;
    isSports?: Boolean;
    noOfAttempt?: number;
    isBus?: Boolean;
    exServiceMen?: Boolean;
    isFirstLearnerInFamily?: Boolean;
    sportsAchievement?: String;
    differentlyAbled?: Boolean;
    extraCurricularActivities?: String;
    beneficiaryName?: String;
    nomineeName?: String;
    grNo?: String;
    eligibilityNo?: String;
    studentSaralId?: String;
    enrollmentNo?: String;
    nomineeRelation?: String;
    nomineeDateOfBirth?: String;
    prospectusNo?: String;
    birthCountry?: String;
    birthDistrict?: String;
    birthTahsil?: String;
    nomineeAge?: number;
    beneficiaryFields?: String;
    foreignOrigin?: Boolean;
    foreignPassportNo?: String;
    universityPreAdmRegNo?: String;
    isBifocal?: Boolean;
    passportIssuePlace?: String;
    passportIssueDate?: String;
    passportExpiryDate?: String;
    visaIssuePlace?: String;
    visaIssueDate?: String;
    visaExpiryDate?: String;
    workExperience?: String;
    entranceExamType?: String;
    entranceExamMarks?: number;
    nomineeAadharCardNo?: String;
    nomineeMobileNo?: String;
    subCaste?: String;
    transactionId?: String;
    socialReservation?: String;
    mediumOfInstruction?: String;
    antiRaggingUndertakingReferenceNo?: String;
    emis?: String;
    tenthOrTwelfthRegisterNumber?: String;
    studiedInGovernment?: Boolean;
    graduateOrNot?: Boolean;
    academicBankofCredits?: String;
    culturalActivity?: String;
    orphan?: Boolean;
    nomineeGender?: String;
    heightInCms?: number;
    weightInKgs?: number;
}

const perSchema:Schema<PersonalInfo>=new Schema({
    title: { type: String },
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    nameAsPerAadhar: { type: String },
    gender: { type: String },
    dob: { type: String },
    mobileNo: { type: String },
    email: { type: String },
    phone: { type: String },
    nationality: { type: String },
    birthPlace: { type: String },
    maritalStatus: { type: String },
    bloodGroup: { type: String },
    religion: { type: String },
    casteCategory: { type: String },
    minority: { type: Boolean },
    identificationMark: { type: String },
    identificationMark2: { type: String },
    motherTongue: { type: String },
    birthStateOrDomicileState: { type: String },
    prevFirstName: { type: String },
    prevMiddleName: { type: String },
    prevLastName: { type: String },
    totalFamilyMember: { type: Number },
    firstNameUnicode: { type: String },
    middleNameUnicode: { type: String },
    lastNameUnicode: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    fatherFname: { type: String },
    fatherMname: { type: String },
    fatherLname: { type: String },
    fatherMobileNo: { type: String },
    fatherEmailID: { type: String },
    motherMobileNo: { type: String },
    motherEmailID: { type: String },
    motherAadhaarNo: { type: String },
    fatherAadhaarNo: { type: String },
    guardianName: { type: String },
    grandFatherName: { type: String },
    guardianContact: { type: String },
    relationWithApplicant: { type: String },
    guardianOccupationDetails: { type: String },
    guardianDesignation: { type: String },
    parentMobile: { type: String },
    motherOrganization: { type: String },
    motherOrganizationAddress: { type: String },
    motherOrganizationPhoneNo: { type: String },
    fatherOccupation: { type: String },
    fatherOrganization: { type: String },
    fatherOrganizationAddress: { type: String },
    fatherOrganizationPhoneNo: { type: String },
    fatherNameUnicode: { type: String },
    motherNameUnicode: { type: String },
    guardianNameUnicode: { type: String },
    aadhardCardNo: { type: String },
    panCardNo: { type: String },
    drivingLicenceNo: { type: String },
    voterIdNO: { type: String },
    learningDisabilityNo: { type: String },
    casteCertificateNo: { type: String },
    bankName: { type: String },
    bankAccountNo: { type: String },
    branch: { type: String },
    IFSC_Code: { type: String },
    bankAccountType: { type: String },
    aadhaarLinkedWithBankAccount: { type: Boolean },
    UDISE_No: { type: String },
    childNo: { type: String },
    meritNumber: { type: String },
    serialNumber: { type: String },
    formNumber: { type: String },
    prnNumber: { type: String },
    eidNumber: { type: String },
    visaNumber: { type: String },
    idProofNo: { type: String },
    occupation: { type: String },
    isOrganDonor: { type: Boolean },
    familyAnnualIncome: { type: String },
    isNCCOrNSS: { type: Boolean },
    isHostel: { type: Boolean },
    isEmployee: { type: Boolean },
    nameChangeReason: { type: String },
    fnameAs10Std: { type: String },
    lnameAs10Std: { type: String },
    nativePlace: { type: String },
    hobbies: { type: String },
    inHouse: { type: Boolean },
    categoryType: { type: String },
    isDrama: { type: Boolean },
    isSports: { type: Boolean },
    noOfAttempt: { type: Number },
    isBus: { type: Boolean },
    exServiceMen: { type: Boolean },
    isFirstLearnerInFamily: { type: Boolean },
    sportsAchievement: { type: String },
    differentlyAbled: { type: Boolean },
    extraCurricularActivities: { type: String },
    beneficiaryName: { type: String },
    nomineeName: { type: String },
    grNo: { type: String },
    eligibilityNo: { type: String },
    studentSaralId: { type: String },
    enrollmentNo: { type: String },
    nomineeRelation: { type: String },
    nomineeDateOfBirth: { type: String },
    prospectusNo: { type: String },
    birthCountry: { type: String },
    birthDistrict: { type: String },
    birthTahsil: { type: String },
    nomineeAge: { type: Number },
    beneficiaryFields: { type: String },
    foreignOrigin: { type: Boolean },
    foreignPassportNo: { type: String },
    universityPreAdmRegNo: { type: String },
    isBifocal: { type: Boolean },
    passportIssuePlace: { type: String },
    passportIssueDate: { type: String },
    passportExpiryDate: { type: String },
    visaIssuePlace: { type: String },
    visaIssueDate: { type: String },
    visaExpiryDate: { type: String },
    workExperience: { type: String },
    entranceExamType: { type: String },
    entranceExamMarks: { type: Number },
    nomineeAadharCardNo: { type: String },
    nomineeMobileNo: { type: String },
    subCaste: { type: String },
    transactionId: { type: String },
    socialReservation: { type: String },
    mediumOfInstruction: { type: String },
    antiRaggingUndertakingReferenceNo: { type: String },
    emis: { type: String },
    tenthOrTwelfthRegisterNumber: { type: String },
    studiedInGovernment: { type: Boolean },
    graduateOrNot: { type: Boolean },
    academicBankofCredits: { type: String },
    culturalActivity: { type: String },
    orphan: { type: Boolean },
    nomineeGender: { type: String },
    heightInCms: { type: Number },
    weightInKgs: { type: Number }
})

interface AddPart extends Document{
    block?:String;
    country:String;
    state:String;
    district:String;
    city?:String;
    tahsil?:String;
    pin?:String;
    address?:String;
    houseNo?:String;
    gramPanchayat?:String;

}
const addpartsch:Schema<AddPart>=new Schema({

})
interface Address extends Document{
    paddress:AddPart;      //add country state district city/vill pin
    caddress?:AddPart;
    same:Boolean
}

 

const addSch:Schema<Address> =new Schema({
    paddress:{
        type:addpartsch,
        required:true
    },
    caddress:addpartsch,
    same:{
        type:Boolean,
        default:false
    }
})

interface Upload extends Document{
    name:String;
    url:String;
}
const uploadSch:Schema<Upload> =new Schema({
    name:String,
    url:String
})

interface Education extends Document{
    examlvl:String;
    examName:String;
    board:String;
    institute:String;
    result:String;
    yearOfPassing:String;
    obtainedMarks:Number;
    totalMarks:Number;
    percentage:String;
    cgpa?:String;
    grade?:String;
    yearOfAdm?:String;
    passingCertiNo?:String;
    passingMonth?:String;
    examSeatNo?:String;
    dateOfPassing?:String;
    creditsEarned?:String;
    hscWithMaths?:Boolean;
}

const eduSch:Schema<Education> =new Schema({

})



 
export {PersonalInfo,perSchema,Address,Upload,uploadSch,addSch,Education,addpartsch,eduSch}