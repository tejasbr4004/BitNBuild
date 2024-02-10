const mongoose=require('mongoose');
const OrganiserEventDetails=require('../Model/OrganiserEventDetailSchema');




const organiser_get_all_details=(req,res)=>{
    OrganiserEventDetails.find().sort({createdAt:-1})
        .exec()
        .then((organiserEventDetails)=>{

            const response={
                eventslength:organiserEventDetails.length,   
                Events:organiserEventDetails.map((doc)=>{
                   return { 
                        organisername:doc.organisername,
                        themeofevent:doc.themeofevent,
                        eventdetail:doc.eventdetail,
                        eventposter:doc.eventposter,
                        dateofevent:doc.dateofevent,
                        eventtype:doc.eventtype,
                        organiseremail:doc.organiseremail,
                        timeofevent:doc.timeofevent,
                        venueofevent:doc.venueofevent,
                        eventposter:doc.eventposter?process.env.hostUrl+'/uploads/'+doc.eventposter:"image or file has not been uploaded to this event",
                        eventapi_info:{
                            method:'GET',
                            contentType:'multipart/form-data',
                            url_individual_details:process.env.hostUrl+process.env.organiser_event_details_route+'/'+doc._id,
                            description:'This will display the individual details of event from the database'
                       },
                       createdAt:doc.createdAt?doc.createdAt.toLocaleString():null,
                       updatedAt:doc.updatedAt?doc.updatedAt.toLocaleString():null

                    }
                         
                })

            };

            res.status(200).json(response);

        })   
        .catch((error)=>{
            console.log(error)
           res.status(500).json({
            message:'getting events info failed..',
            error:error
           })
        })
}



const organiser_events_post_details = (req, res) => {
    console.log(req.file);
    console.log(req.url);

    const organiserEvents_details = new OrganiserEventDetails({
        _id: new mongoose.Types.ObjectId(),
        organisername:req.body.organisername,
        themeofevent:req.body.themeofevent,
        eventdetail:req.body.eventdetail,
        dateofevent:req.body.dateofevent,
        eventtype:req.body.eventtype,
        organiseremail:req.body.organiseremail,
        timeofevent:req.body.timeofevent,
        venueofevent:req.body.venueofevent,
        eventposter: req.file ? req.file.filename : undefined
    });

    organiserEvents_details.save()
        .then(() => {
            res.status(200).json(organiserEvents_details);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Posting data failed..',
                error: err
            });
        });

};






module.exports={
    organiser_get_all_details,
    organiser_events_post_details
}