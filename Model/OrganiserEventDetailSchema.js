const mongoose=require('mongoose');

const OrganiserEventSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    teamname:{
        type:String,
        required:[true,'please Enter the TeamName'],
        unique:true
    },
    member1:{
        type:String,
        required:[true,'please Enter the team member1']
    },
    member2:{
        type:String,
        required:[true,'please Enter the team member2']
    },
    member3:{
        type:String,
        required:[true,'please Enter the team member3']
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        
    }
});




OrganiserEventSchema.pre('findOneAndUpdate', function (next) {
    this._update.updatedAt = new Date();
    next();
});

OrganiserEventSchema.pre('save', function (next) {
    const currentDate = new Date().toLocaleString();

    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    next();
});

module.exports=mongoose.model('OrganiserEventDetails',OrganiserEventSchema);