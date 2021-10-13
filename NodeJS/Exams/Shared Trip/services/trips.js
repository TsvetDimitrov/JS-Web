const Trip = require('../models/Trip');
const User = require('../models/User');

async function createTrip(tripData) {
    const trip = new Trip(tripData);
    await trip.save();
    return trip;
}

async function getAllTrips() {
    const trips = await Trip.find({}).lean();

    return trips;
}

async function getTripById(id) {
    const trip = await Trip.findById(id).lean();

    return trip;
}

async function editTrip(id, tripData) {
    const trip = await Trip.findById(id);


    return trip.save();
}

async function deleteTrip(id) {
    return Trip.findByIdAndDelete(id);
}

module.exports = {
    createTrip,
    getAllTrips,
    getTripById,
    editTrip,
    deleteTrip,
}