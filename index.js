const _ = require('lodash');

module.exports = function map (object, types = true, prefix = '') {
	return _.mapValues(object, (value, key) => {
		key = (prefix ? `${prefix}_` : '') + _.snakeCase(key).toUpperCase();

		// array get converted to objects when mapped, which may lead to hard-to-discover bugs
		if (Array.isArray(value)) {
			if (value.some(item => _.isObject(item))) {
				console.warn(`Warning: Mapping individual array items to environment variables is not supported. You may override the whole array via ${key} or use an object with numeric keys instead.`);
			}

			return {
				__name: key,
				__format: 'json',
			};
		}

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
