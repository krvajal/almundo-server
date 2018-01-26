import resource from "resource-router-middleware";
import hotels from "../models/hotels";

export default ({ config, db }) =>
	resource({
		/** Property name to store preloaded entity on `request`. */
		id: "hotel",

		/** For requests with an `id`, you can auto-load the entity.
		 *  Errors terminate the request, success sets `req[id] = data`.
		 */
		load(req, id, callback) {
			let hotel = hotels.find(facet => facet.id === id),
				err = hotels ? null : "Not found";
			callback(err, hotel);
		},

		/** GET / - List all entities */
		index({ params }, res) {
			res.json(hotels);
		},

		/** POST / - Create a new entity */
		create({ body }, res) {
			body.id = hotels.length.toString(36);
			hotels.push(body);
			res.json(body);
		},

		/** GET /:id - Return a given entity */
		read({ hotel }, res) {
			res.json(hotel);
		},

		/** PUT /:id - Update a given entity */
		update({ hotel, body }, res) {
			for (let key in body) {
				if (key !== "id") {
					hotel[key] = body[key];
				}
			}
			res.sendStatus(204);
		},

		/** DELETE /:id - Delete a given entity */
		delete({ hotel }, res) {
			hotels.splice(hotels.indexOf(hotel), 1);
			res.sendStatus(204);
		}
	});
