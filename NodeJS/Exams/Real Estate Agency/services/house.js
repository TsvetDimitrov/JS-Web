const House = require('../models/House');
const User = require('../models/User');

async function createHouse(houseData) {
    const house = new House(houseData);
    await house.save();

    return house;
}

async function getAllHouses() {
    const houses = await House.find({}).lean();

    return houses;
}

async function getHouseById(id) {
    const house = await House.findById(id).lean();

    return house;
}

async function editHouse(id, houseData) {
    const house = await House.findById(id);

    house.name = houseData.name;
    house.type = houseData.type;
    house.year = houseData.year;
    house.city = houseData.city;
    house.imageUrl = houseData.imageUrl;
    house.description = houseData.description;
    house.pieces = houseData.pieces;


    return house.save();
}

async function deleteHouse(id) {
    return House.findByIdAndDelete(id);
}

async function bookHouse(houseId, userId) {
    const house = await House.findById(houseId);
    const user = await User.findById(userId);

    if (house.owner == user._id) {
        throw new Error('Cannot book your own house!');
    }

    user.bookedHouses.push(houseId);
    house.rentedBy.push(user);
    return Promise.all([user.save(), house.save()]);
}

async function getLast3Houses() {
    const top3houses = await House.find().sort({ createdAt: -1 }).limit(3).lean();
    return top3houses;
}

async function search(text) {
    return House.find({ type: { $regex: text, $options: 'i' } }).lean();
}

module.exports = {
    createHouse,
    getAllHouses,
    getHouseById,
    editHouse,
    deleteHouse,
    bookHouse,
    getLast3Houses,
    search
}