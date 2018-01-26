// our example model is just an Array
const hotels = require("../data/data.json");

// filter functions
export const withRatings = ratings => {
	if (ratings.length === 0) return hotels;
	return hotels.filter(hotel => ratings.includes(hotel.stars));
};
export default hotels;
