const Hotel = require('../../BookingUni/models/Hotel');
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


module.exports = {
    createHouse,
    getAllHouses,
    getHouseById,
    editHouse,
    deleteHouse,
}