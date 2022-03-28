const AdminNotification = require("../models/Fundraiser");

const pendingStatus = "Pending Admin Approval";

//Get Notification
exports.getNotification = async (request, response, next) => {
    const findPendingApproval = {
        status: pendingStatus
    };
    try {
        //get notification for Admin 
        AdminNotification.find(findPendingApproval)
        .then((notifications) => {
            if (!notifications) {
                const errorResponse = {
                    message: "No Notification yet",
                    success: false,
                };
                return response.status(204).send(errorResponse);
            }
    
            return response.status(200).send(notifications);
        })
        .catch((err) => {
            console.log("Unable to get notification");
            const errorMessage = {
                message: "Unable to get notification",
                errorDescription: err,
                success: false,
            };
            response.status(500).send(errorMessage);
        });        
    } catch (err) {
        console.log(err);
        const errorMessage = {
            message: err,
            success: false,
        };
        response.status(500).send(errorMessage);
    }
};