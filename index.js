const _ = require('lodash');

module.exports = (function map (object, prefix = '') {
	return _.mapValues(object, (value, key) => {
		if (_.isObject(value)) {
			return map(value, (prefix ? `${prefix}_` : '') + _.snakeCase(key).toUpperCase());
		}

		return (prefix ? `${prefix}_` : '') + _.snakeCase(key).toUpperCase();
	});
});
