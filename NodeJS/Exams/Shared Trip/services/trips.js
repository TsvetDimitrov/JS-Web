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

    trip.startPoint = tripData.startPoint;
    trip.endPoint = tripData.endPoint;
    trip.date = tripData.date;
    trip.time = tripData.time;
    trip.imageUrl = tripData.imageUrl;
    trip.brand = tripData.brand;
    trip.seats = tripData.seats;
    trip.price = tripData.price;
    trip.description = tripData.description;

    return trip.save();
}

async function deleteTrip(id) {
    return Trip.findByIdAndDelete(id);
}

async function reserveTrip(tripId, userId) {
    const trip = await Trip.findById(tripId);
    const user = await User.findById(userId);

    if (user._id == trip.owner) {
        throw new Error('You cannot book your own trip!');
    }

    user.tripHistory.push(tripId);
    trip.buddies.push(user);

    return Promise.all([user.save(), trip.save()]);
}

module.exports = {
    createTrip,
    getAllTrips,
    getTripById,
    editTrip,
    deleteTrip,
    reserveTrip
}