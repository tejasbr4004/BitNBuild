const mongoose=require('mongoose');
const OrganiserTeamDetails=require('../Model/OrganiserEventDetailSchema');




const MapSubmissions_get_all_details=(req,res)=>{
    OrganiserTeamDetails.find().sort({createdAt:1})
        .exec()
        .then((organiserTeamDetails)=>{

            const response={
                eventslength:organiserTeamDetails.length,   
                Events:organiserTeamDetails.map((doc)=>{
                   return { 
                        team_code:doc.team_code,
                        answer:doc.answer_code,
                        eventapi_info:{
                            method:'GET',
                            contentType:'json/applications',
                            url_individual_details:process.env.hostUrl+process.env.organiser_event_details_route+'/'+doc._id,
                       },
                       createdAt: doc.createdAt ? new Date(doc.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : null,
                       updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : null

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
        message2:"Now, proceed with posting, your Answer Code Fassstttt!",
        message4:"make sure u entered the /team_code endpoint while posting answer,the one which u guys got in the docs through whatsApp",
        message5:"ALL the Best, And Thankyou for participating in MAP event......"
    })
}







const organiser_events_post_details = (req, res) => {
    // console.log(req.file);
    // console.log(req.url);

    // const organiserEvents_details = new OrganiserEventDetails({
    //     _id: new mongoose.Types.ObjectId(),
    //     teamname:req.body.teamname,
    //     member1:req.body.member1,
    //     member2:req.body.member2,
    //     member3:req.body.member3,
    // });
    const organiserTeams_details = new OrganiserTeamDetails({
        _id: new mongoose.Types.ObjectId(),
        answer_code:req.body.answer_code,
        team_code:req.url,
    });

    if(req.body.answer_code===process.env.secondpart || (req.body.answer_code===process.env.team1 && req.url=='/MAP_TEAM1') || (req.body.answer_code===process.env.team2 && req.url=='/MAP_TEAM2') || (req.body.answer_code===process.env.team3 && req.url=='/MAP_TEAM3') ||(req.body.answer_code===process.env.team4 && req.url=='/MAP_TEAM4') || (req.body.answer_code===process.env.team5 && req.url=='/MAP_TEAM5')|| (req.body.answer_code===process.env.team6 && req.url=='/MAP_TEAM6') || (req.body.answer_code===process.env.team7 && req.url=='/MAP_TEAM7')|| (req.body.answer_code===process.env.team8 && req.url=='/MAP_TEAM8') || (req.body.answer_code===process.env.team9 && req.url=='/MAP_TEAM9') || (req.body.answer_code===process.env.team10 && req.url=='/MAP_TEAM10') || (req.body.answer_code==="abcdef" && req.url=='/sample')){
    organiserTeams_details.save()
        .then(() => {
            res.status(200).json({
                Message:'Successfull...answer is correct Congralutions!..hurray!',
                Details:organiserTeams_details
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: 'Posting data failed..',
                error: err
            });
        });
    }else{
        res.status(201).json({
            Message:'Answer code is invalid....check again'
        })
    }
    
};






module.exports={
    organiser_get_all_details,
    organiser_events_post_details,
    MapSubmissions_get_all_details
}