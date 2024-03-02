const express=require('express');
const router=express.Router();
const organiser_controller=require('../Controllers/OrganiserController');
// const Filesuploads=require('../Filesupload');





router.get('/',   organiser_controller.organiser_get_all_details);
router.post('/',organiser_controller.organiser_events_post_details);


router.get(process.env.organiser_event_details_route,organiser_controller.MapSubmissions_get_all_details)


// process.env.organiser_event_details_route


module.exports=router;