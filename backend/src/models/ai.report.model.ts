import mongoose from 'mongoose';
const technicalQuestionsSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, 'Technical question is required']
        },
        intention: {
            type: String,
            required: [true, 'Intention is required']
        },
        answer: {
            type: String,
            required: [true, 'Techanical answer is required']
        },
    },
    { _id: false }
);
const behavioralQuestionsSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, 'Behavioral question is required']
        },
        intention: {
            type: String,
            required: [true, 'Intention is required']
        },
        answer: {
            type: String,
            required: [true, 'Behavioral answer is required']
        },
    },
    { _id: false }

);
const skillGapSchema = new mongoose.Schema(
    {
        skill: {
            type: String,
            required: [true, 'Skill is required']
        },
        severity: {
            type: String,
            enum: ['low', 'medium', 'high'],
            required: [true, "Severity is reuired"]
        },
        description: String,
    },
    { _id: false }
);
const preparationPlanSchema = new mongoose.Schema(
    {
        day: {
            type: Number,
            required: [true, 'Day is required']
        },
        focus: {
            type: String,
            required: [true, 'Focus is required']
        },
        tasks: {
            type: String,
            required: [true, 'Task is required']
        },
        resources: [String]
    },
    { _id: false }
);
const interviewReportSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        jobDescription: {
            type: String,
            required: [true, 'Job Description is required']
        },
        resume: {
            type: String
        },
        selfDescription: {
            type: String
        },
        matchScore: {
            type: Number,
            min: 0,
            max: 100,
        },
        technicalQuestions: [technicalQuestionsSchema],
        behavioralQuestions: [behavioralQuestionsSchema],
        skillGap: [skillGapSchema],
        preparationPlan: [preparationPlanSchema],
        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
        rawResponse: String,
        modelUsed: String,
        version: {
            type: Number,
            default: 1,
        }
    },
    { timestamps: true }
);
interviewReportSchema.index({ user: 1 });
export default mongoose.model('reports', interviewReportSchema);