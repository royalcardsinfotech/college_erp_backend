import mongoose, { Schema, Document } from "mongoose";

export interface QualifyingExam extends Document {
  qualifyingExam: String;
  percent?: String;
  examlvl: String;
  active: Boolean;
}

export interface Stream extends Document {
  name: String;
  active: Boolean;
}

export interface QualifyingSubject extends Document {
  basicCourse: String;
  qualifyingExam: String;
  subject: String;
  category?: String;
  percent?: String;
  active: Boolean;
  mandatory: Boolean;
  includeInAggregate: Boolean;
}
export interface QualifyingSemester extends Document {
  basicCourse: String;
  qualifyingExam: String;
  semester: String;
  active: Boolean;
  mandatory: Boolean;
  includeInAggregate: Boolean;
}

export interface ExamMapping extends Document {
  session: String;
  basicCourse: String;
  course: String;
  qualifyingExam: String;
  stream?: String;
  percent?: String;
  active: Boolean;
}

const QualifyingExamSchema: Schema<QualifyingExam> = new Schema({
  qualifyingExam: { type: String, required: true },
  percent: { type: String },
  examlvl: { type: String, required: true },
  active: { type: Boolean, required: true },
});

const StreamSchema: Schema<Stream> = new Schema({
  name: { type: String, required: true },
  active: { type: Boolean, required: true },
});

const QualifyingSubjectSchema: Schema<QualifyingSubject> = new Schema({
  basicCourse: { type: String, required: true },
  qualifyingExam: { type: String, required: true },
  subject: { type: String, required: true },
  category: { type: String },
  percent: { type: String },
  active: { type: Boolean, required: true },
  mandatory: { type: Boolean, required: true },
  includeInAggregate: { type: Boolean, required: true },
});

const QualifyingSemesterSchema: Schema<QualifyingSemester> = new Schema({
  basicCourse: { type: String, required: true },
  qualifyingExam: { type: String, required: true },
  semester: { type: String, required: true },
  active: { type: Boolean, required: true },
  mandatory: { type: Boolean, required: true },
  includeInAggregate: { type: Boolean, required: true },
});

const ExamMappingSchema: Schema<ExamMapping> = new Schema({
  session: { type: String, required: true },
  basicCourse: { type: String, required: true },
  course: { type: String, required: true },
  qualifyingExam: { type: String, required: true },
  stream: { type: String },
  percent: { type: String },
  active: { type: Boolean, required: true },
});

export {
  QualifyingExamSchema,
  StreamSchema,
  QualifyingSubjectSchema,
  QualifyingSemesterSchema,
  ExamMappingSchema,
};
