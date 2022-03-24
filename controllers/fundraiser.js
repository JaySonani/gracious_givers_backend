const Fundraiser = require('../models/Fundraiser')
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid')

const fundraiserStatus = {
    draft:'Draft', 
    active: 'Active', 
    deactivated: 'Deactivated', 
    completed: 'Completed', 
    pendingApproval: 'Pending Admin Approval'
}

exports.createFundraiser = async (request, response, next) => {

    let endDate = "";
    const initStatus = "Pending Admin Approval";
    const createdBy = "Hardcoded Smile Foundation";

    // Add bad request here if mandatory inputs are not sent from the UI
    const newFundraiser = new Fundraiser({
        _id: uuidv4(),
        title: request.body.title,
        description: request.body.description,
        ngoId: request.body.ngoId,
        createdBy: createdBy,
        image: request.file.filename,
        goalAmount: request.body.goalAmount,
        amountRaised: 0,
        currency: request.body.currency,
        donors: 0,
        cause: request.body.cause,
        status: initStatus,
        activeDays: request.body.activeDays,
        endDate: endDate
    })

    console.log("The id is " + newFundraiser.id);

    try {
        await newFundraiser.save();
        const successResponse = {
            message: 'Fundraiser added successfully',
            success: true,
            data: newFundraiser
        }
        response.status(201).json(successResponse);
    } catch (err) {
        const errorResponse = {
            message: err,
            success: false,
        }
        console.log("Error in creating fundraiser :" + err)
        response.status(500).json(errorResponse);
    }
}

exports.getFundraiser = async (request, response, next) => {

    const fundraiserId = request.params.id;
    Fundraiser.findById(fundraiserId)
        .then(fundraiser => {
            if (!fundraiser) {
                const errorResponse = {
                    message: "Fundraiser with id " + id + " not found",
                    success: false,
                }
                response.status(404).send(errorResponse);
            }
            else { 
                response.status(200).send(fundraiser); 
            };
        })
        .catch(error => {
            console.log("Error while retrieving fundraiser with ID :" + fundraiserId);
            console.log(error);
            const errorResponse = {
                message: "Internal error occured at the server",
                success: false,
            }
            response.status(500).send(errorResponse);
        });

}

exports.getFundraiserByPeriod = async (request, response, next) => {

    const period = request.params.period;
    const ngoId = request.params.ngoId;
    let condition = {
        ngoId : ngoId
    }
    if (period === 'past') {
        condition.status = {$in:["Completed", "Deactivated"]}
    }
    else if (period === 'ongoing') {
        condition.status = 'Active'
    }
    else if (period === 'future') {
        condition.status = 'Pending Admin Approval'
    }
    else if ( !period || period === '' || !ngoId || ngoId === '' ) {
        const errorResponse = {
            message: "Required params period or ngoId missing",
            success: false,
        }
        response.status(400).send(errorResponse);
    }

    Fundraiser.find(condition)
        .then(fundraiser => {
            if (!fundraiser) {
                const errorResponse = {
                    message: "Fundraiser with period " + period + " not found",
                    success: false,
                }
                response.status(404).send(errorResponse);
            }
            else { 
                response.status(200).send(fundraiser); 
            };
        })
        .catch(error => {
            console.log("Error while retrieving fundraiser with period :" + period);
            console.log(error);
            const errorResponse = {
                message: "Internal error occured at the server",
                success: false,
            }
            response.status(500).send(errorResponse);
        });

}

exports.updateFundraiser = async (request, response, next) => {

    const ngoId = request.params.ngoId;
    const fundraiserId = request.params.id;
    const fundraiser = new Fundraiser({
        title: request.body.title,
        description: request.body.description,
        ngoId: request.body.ngoId,
        image: request.body.image,
        goalAmount: request.body.goalAmount,
        cause: request.body.cause,
        activeDays: request.body.activeDays,
    })

    Fundraiser.findOneAndUpdate(
        {_id:fundraiserId, ngoId:ngoId}, fundraiser, (error, fundraiser) => {
            if (error) {
                console.log("Fundraiser : "+fundraiser);
                const errorResponse = {
                    message: "Internal error occured at the server",
                    success: false,
                }
                response.status(500).send(errorResponse);
            } 
            else 
            {
                if (!fundraiser) {
                    const errorResponse = {
                        message: "Fundraiser not found",
                        success: false,
                    }
                    response.status(404).send(errorResponse);
                }
                else
                {
                    const successResponse = {
                        message: "Fundraiser updated successfully",
                        success: true,
                        data: fundraiser
                    }
                    response.status(200).send(successResponse);
                }
            }
        })
}

exports.deleteFundraiser = async (request, response, next) => {

    const ngoId = request.params.ngoId;
    const fundraiserId = request.params.id;

    Fundraiser.findOneAndDelete(
        {_id:fundraiserId, ngoId:ngoId}, (error, fundraiser) => {
            if (error) {
                const errorResponse = {
                    message: "Internal error occured at the server",
                    success: false,
                }
                response.status(500).send(errorResponse);
            } 
            else 
            {
                if (!fundraiser) {
                    const errorResponse = {
                        message: "Fundraiser not found",
                        success: false,
                    }
                    response.status(404).send(errorResponse);
                }
                else
                {
                    const successResponse = {
                        message: "Fundraiser deleted successfully",
                        success: true
                    }
                    response.status(200).send(successResponse);
                }
            }
        })
}

exports.updateImage = async (request, response, next) => {

    if (!request.file) {
        response.status(400).send("No image provided for update request");
    }
    const fileName = request.file.filename;
    const fundraiser = new Fundraiser({
        image: fileName
    })

    const fundraiserId = request.params.id;

    Fundraiser.findOneAndUpdate(
        {_id:fundraiserId}, fundraiser, (error, fundraiser) => {
            if (error) {
                const errorResponse = {
                    message: "Internal error occured at the server",
                    success: false,
                }
                response.status(500).send(errorResponse);
            } 
            else 
            {
                if (!fundraiser) {
                    const errorResponse = {
                        message: "Fundraiser not found",
                        success: false,
                    }
                    response.status(404).send(errorResponse);
                }
                else
                {
                    const successResponse = {
                        message: "Fundraiser image updated successfully",
                        success: true
                    }
                    response.status(200).send(successResponse);
                }
            }
        })
}

exports.updateStatus = async (request, response, next) => {
    const fundraiserId = request.params.id;
    const newStatusValue = request.params.status;
    const date = require('date-and-time');
    const invalidStatusChange = {
        message: "Cannot update the fundrasier with status " + newStatusValue,
        success: false,
    }

    if (fundraiserStatus.active === newStatusValue) {
        Fundraiser.findById(fundraiserId)
        .then(fundraiser => {
            if (!fundraiser) {
                const errorResponse = {
                    message: "Fundraiser with id " + fundraiserId + " not found",
                    success: false,
                }
                response.status(404).send(errorResponse);
            }
            else if (fundraiser.status !== fundraiserStatus.pendingApproval) {
                
                response.status(400).send(invalidStatusChange);
            }
            else {
                const now = new Date();
                console.log("Active days is :" + fundraiser.activeDays)
                const endDate = new Date(date.addDays(now, fundraiser.activeDays));
                const endDateString = date.format(endDate,'YYYY-MM-DD');
                console.log(endDateString)
                const updatedFundraiser = new Fundraiser({
                    status: newStatusValue,
                    endDate: endDateString
                })
                Fundraiser.findByIdAndUpdate(
                    fundraiserId, updatedFundraiser, (error, fundraiser) => {
                        if (error) {
                            console.log("Fundraiser : "+fundraiser);
                            const errorResponse = {
                                message: "Internal error occured at the server",
                                success: false,
                            }
                            response.status(500).send(errorResponse);
                        } 
                        else 
                        {                            
                            const successResponse = {
                                message: "Fundraiser status updated successfully",
                                success: true
                            }
                            response.status(200).send(successResponse);                            
                        }
                    }
                )   
            };
        })
        .catch(error => {
            console.log("Error while retrieving fundraiser with ID :" + fundraiserId);
            const errorResponse = {
                message: "Internal error occured at the server",
                success: false,
            }
            response.status(500).send(errorResponse);
        });  
    }
    else 
    {
        response.status(400).send(invalidStatusChange);
    }
    
}
