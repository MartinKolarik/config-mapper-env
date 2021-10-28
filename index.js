const _ = require('lodash');

module.exports = function map (object, types = true, prefix = '') {
	return _.mapValues(object, (value, key) => {
		key = (prefix ? `${prefix}_` : '') + _.snakeCase(key).toUpperCase();

		// nested object
		if (_.isObject(value)) {
			return map(value, types, key);
		}

		// typed primitive
		if (types && [ 'boolean', 'number' ].includes(typeof value)) {
			return {
				__name: key,
				__format: typeof value,
			};
		}

		// simple string
		return key;
	});
};
