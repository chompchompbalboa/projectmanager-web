//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import _ from 'lodash'
import moment from 'moment'
import faker from 'faker'

import categories from './categories'
import employees from './employees'

//-----------------------------------------------------------------------------
// Export
//-----------------------------------------------------------------------------
export default {
	structure: {
		date: { defaultSortOrder: 'desc', header: 'Date', width: 0.1 },
		element: { defaultSortOrder: 'asc', header: 'Element', width: 0.1 },
		category: { defaultSortOrder: 'asc', header: 'Category', width: 0.175 },
		name: { defaultSortOrder: 'asc', header: 'Name', width: 0.1525 },
		hours: { defaultSortOrder: 'desc', header: 'Hours', width: 0.1 },
		description: { defaultSortOrder: 'asc', header: 'Description', width: 0.45 }
	},
	data: _.times(50, () => {
		const end = moment()
		const start = moment(end).subtract(100, 'd')
		return {
			date: moment(faker.date.between(start, end)).format('YYYY-MM-DD'),
			element: '17-236-0' + _.random(1, 9),
			name: _.sample(employees),
			category: _.sample(categories),
			hours: _.sample([
				1,
				1.5,
				2,
				2.5,
				3,
				3.5,
				4,
				4.5,
				5,
				5.5,
				6,
				6.5,
				7,
				7.5,
				8
			]),
			description: faker.lorem.sentence()
		}
	})
}
