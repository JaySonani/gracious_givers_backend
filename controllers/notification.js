const EventsNotification = require("../models/Fundraiser");
const DonationNotification = require("../models/Donation");

const pendingStatus = "Pending Admin Approval";

//Get Notification - Admin
exports.getAdminNotification = async (request, response, next) => {
    const findPendingApproval = {
        status: pendingStatus
    };
    try {
        //get notification for Admin 
        EventsNotification.find(findPendingApproval)
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
            .catch((error) => {
                console.log("Unable to get notification");
                const errorMessage = {
                    message: "Unable to get notification",
                    errorDescription: error,
                    success: false,
                };
                response.status(500).send(errorMessage);
            });
    } catch (err) {
        //console.log(err);
        const errorMessage = {
            message: err,
            success: false,
        };
        response.status(500).send(errorMessage);
    }
};

const updatedStatus = "[]";

//Get Notification - NGO
exports.getNgoNotification = async (request, response, next) => {
    const ngoEvents = {
        status: updatedStatus
    };
    try {
        EventsNotification.aggregate([
            {
                $lookup: {
                    from: "donations",
                    localField: "title",
                    foreignField: "donation_event_name",
                    as: "event_donations"
                }
            }
        ]).exec((error, result) => {
            if (error) {
                const errorMessage = {
                    message: "Unable to get notification",
                    errorDescription: error,
                    success: false,
                };
                response.status(500).send(errorMessage);
            }
            if (result) {
                const newResult = result.filter((events) => {
                    if (events.event_donations.length > 0) {
                        return events;
                    }
                })
                //console.log(newResult.length+" "+result.length);
                response.status(200).send(newResult);
            }
        });

    } catch (error) {
        const errorMessage = {
            message: err,
            success: false,
        };
        response.status(500).send(errorMessage);
    }
}