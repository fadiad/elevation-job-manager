const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = new Schema({
    CompanyName: String,
    JobTitle: String,
    Location: String,
    isActive: {
        type: Boolean,
        default: true
    },
    interviews: [{ type: Schema.Types.ObjectId, ref: 'interview' }]
})

const Job = mongoose.model("job", jobSchema)
module.exports = Job