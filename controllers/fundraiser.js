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

    try {
        await newFundraiser.save();
        const successResponse = {
            message: 'Fundraiser added successfully',
            success: true,
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