import Joi from "joi";

export const FilterQuery = Joi.object().keys({
	ratings: Joi.array()
		.items(Joi.number())
		.max(5)
		.default([]),
	searchTerm: Joi.string().lowercase()
});
