//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import _ from 'lodash'
import faker from 'faker'
import moment from 'moment'

//-----------------------------------------------------------------------------
// Data
//-----------------------------------------------------------------------------

const projectNames = ['Amazon Spheres', 'Ft. McDowell']

const departments = ['Design', 'Fabrication', 'Metal']

const status = ['Not Started', 'WIP', 'Completed']

const startDate = moment()
const endDate = moment(startDate).add(100, 'd')

const tables = [
	{
		name: 'Elements',
		structure: [
			//prettier-ignore
			{ id: 1, header: 'Job Code', width: 0.15, defaultSortOrder: 'ASC', value: (pN, pI, tI, rI, cI) => { return '19-' + ('000' + (pI + 1)).slice(- 3) + '-' + ('00' + (rI + 1)).slice(- 2)} },
			//prettier-ignore
			{ id: 2, header: 'Name', width: 0.2, defaultSortOrder: 'ASC', value: (pN, pI, tI, rI, cI) => { return pN + ' ' + ('00' + (rI + 1)).slice(-2) }  },
			//prettier-ignore
			{ id: 3, header: 'Description', width: 0.2, defaultSortOrder: 'ASC', value: (pN, pI, tI, rI, cI) => { return faker.lorem.words(3) }},
			//prettier-ignore
			{ id: 4, header: 'Department', width: 0.15, defaultSortOrder: 'ASC', value: (pN, pI, tI, rI, cI) => { return _.sample(departments) } },
			//prettier-ignore
			{ id: 5, header: 'Status', width: 0.15, defaultSortOrder: 'ASC', value: (pN, pI, tI, rI, cI) => { return _.sample(status) } },
			//prettier-ignore
			{ id: 6, header: 'Due Date', width: 0.15, defaultSortOrder: 'ASC', value: (pN, pI, tI, rI, cI) => { return moment(faker.date.between(startDate, endDate)).format('YYYY-MM-DD') } }
		]
	}
]

//-----------------------------------------------------------------------------
// Export
//-----------------------------------------------------------------------------
export default projectNames.map((projectName, projectIndex) => {
	return {
		id: projectIndex,
		name: projectName,
		unique_id: '19-00' + projectIndex,
		tables: tables.map((table, tableIndex) => {
			return {
				id: projectIndex + '' + tableIndex,
				name: table.name,
				structure: table.structure,
				rows: _.times(25, rowIndex => {
					return {
						id: projectIndex + '' + tableIndex + '' + rowIndex,
						cells: table.structure.map((field, cellIndex) => {
							return {
								//prettier-ignore
								id: projectIndex + '' + tableIndex + '' + rowIndex + '' + cellIndex,
								structure: field,
								//prettier-ignore
								value: field.value(projectName, projectIndex, tableIndex, rowIndex, cellIndex)
							}
						})
					}
				})
			}
		})
	}
})
