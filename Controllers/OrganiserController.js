const mongoose=require('mongoose');
const OrganiserEventDetails=require('../Model/OrganiserEventDetailSchema');




const MapSubmissions_get_all_details=(req,res)=>{
    OrganiserEventDetails.find().sort({createdAt:-1})
        .exec()
        .then((organiserEventDetails)=>{

            const response={
                eventslength:organiserEventDetails.length,   
                Events:organiserEventDetails.map((doc)=>{
                   return { 
                        teamname:doc.teamname,
                        member1:doc.member1,
                        member2:doc.member2,
                        member3:doc.member3,
                        eventapi_info:{
                            method:'GET',
                            contentType:'json/applications',
                            url_individual_details:process.env.hostUrl+process.env.organiser_event_details_route+'/'+doc._id,
                       },
                       createdAt:doc.createdAt?doc.createdAt:null,
                       updatedAt:doc.updatedAt?doc.updatedAt:null

                    }
                         
                })

            };

            res.status(200).json(response);

        })   
        .catch((error)=>{
            console.log(error)
           res.status(500).json({
            message:'getting submissions info failed..',
            error:error
           })
        })
}






const organiser_get_all_details=(req,res)=>{
    res.status(200).json({
        Fest:"UVCE impetus24.0  MAP event",
        message1:"Congratulations for successfully getting source link of MAP event!",
        message2:"Now, proceed with posting, your teamname and members name Fassstttt!",
        message3:"ALL the Best, And Thankyou for participating in MAP event......",
        message4:"make sure u entered the teamname while posting data,the one which u guys submitted in the form while registering for MAP event",
        message5:"And all yours team members name should be posted"
    })
}







const organiser_events_post_details = (req, res) => {
    // console.log(req.file);
    // console.log(req.url);

    const organiserEvents_details = new OrganiserEventDetails({
        _id: new mongoose.Types.ObjectId(),
        teamname:req.body.teamname,
        member1:req.body.member1,
        member2:req.body.member2,
        member3:req.body.member3,
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
    organiser_events_post_details,
    MapSubmissions_get_all_details
}