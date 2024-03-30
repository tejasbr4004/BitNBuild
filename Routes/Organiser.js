const express=require('express');
const router=express.Router();
const organiser_controller=require('../Controllers/OrganiserController');
// const Filesuploads=require('../Filesupload');





router.get('/',   organiser_controller.organiser_get_all_details);
router.post('/MAP_TEAM1',organiser_controller.organiser_events_post_details);
router.post('/MAP_TEAM2',organiser_controller.organiser_events_post_details);
router.post('/MAP_TEAM3',organiser_controller.organiser_events_post_details);
router.post('/MAP_TEAM4',organiser_controller.organiser_events_post_details);
router.post('/MAP_TEAM5',organiser_controller.organiser_events_post_details);
router.post('/MAP_TEAM6',organiser_controller.organiser_events_post_details);
router.post('/MAP_TEAM7',organiser_controller.organiser_events_post_details);
router.post('/MAP_TEAM8',organiser_controller.organiser_events_post_details);
router.post('/MAP_TEAM9',organiser_controller.organiser_events_post_details);
router.post('/MAP_TEAM10',organiser_controller.organiser_events_post_details);

router.post('/sample',organiser_controller.organiser_events_post_details);


router.get(process.env.organiser_event_details_route,organiser_controller.MapSubmissions_get_all_details)


// process.env.organiser_event_details_route


module.exports=router;