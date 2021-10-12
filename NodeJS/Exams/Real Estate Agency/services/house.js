const House = require('../models/House');
const User = require('../models/User');

async function createHouse() {

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

    //...//


    return house;
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