const express=require('express');
const router=express.Router();
const organiser_controller=require('../Controllers/OrganiserController');
const Filesuploads=require('../Filesupload');





router.get(process.env.organiser_event_details_route,   organiser_controller.organiser_get_all_details);


router.post(process.env.organiser_event_details_route, Filesuploads ,organiser_controller.organiser_events_post_details);





module.exports=router;