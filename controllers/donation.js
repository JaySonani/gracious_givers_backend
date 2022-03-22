const Donation = require('../models/Donation')
const { v4: uuidv4 } = require('uuid')

exports.addDonation = async (request, response, next) => {

    const newDonation = new Donation({
        _id: uuidv4(),
        donation_event_id: request.body.donation_event_id,
        donation_amount: request.body.donation_amount,
        donor_firstname: request.body.donor_firstname,
        donor_lasttname: request.body.donor_lastname,
        donor_email: request.body.donor_email
    })

    try {
        await newDonation.save();
        const successResponse = {
            message: 'Donation added successfully',
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