const mongoose=require('mongoose');

const OrganiserEventSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    organisername:{
        type:String,
        required:[true,'please Enter the originalName']
    },
    themeofevent:{
        type:String,
        required:[true,'please Enter the themeofevent']
    },
    eventdetail:{
        type:String,
        required:[true,'Please Enter the detailed information of the event']
    },
    eventposter:{
        type:String
    },
    eventtype:{
        type:String,
        required:[true,'please Enter the event-type']
    },
    dateofevent:{
        type:String,
        required:[true,'Please Enter the date of the event'],
    },
    organiseremail:{
        type:String,
        required:[true,'Email address is required'],
        unique:true, 
        match:[/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,'Please Enter the valid email address']
},
    timeofevent:{
        type:String,
        required:[true,'Please Enter the time of the event']
    },
    venueofevent:{
        type:String,
        required:[true,'Please Enter the venue']
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
    const currentDate = new Date();

    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    next();
});

module.exports=mongoose.model('OrganiserEventDetails',OrganiserEventSchema);