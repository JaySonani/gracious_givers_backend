const Fundraiser = require('../models/Fundraiser')
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid')

exports.createFundraiser = async (request, response, next) => {

    let endDate = "";
    const initStatus = "Pending Admin Approval";

    const newFundraiser = new Fundraiser({
        _id: uuidv4(),
        title: request.body.title,
        description: request.body.description,
        createdBy: request.body.createdBy,
        image: request.file.filename,
        goalAmount: request.body.goalAmount,
        amountRaised: 0,
        currency: request.body.currency,
        donors: 0,
        cause: request.body.cause,
        status: initStatus,
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