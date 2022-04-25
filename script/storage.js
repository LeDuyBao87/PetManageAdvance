'use strict';

var breeds = [
	{
		breed: 'Tabby',
		type: 'Cat'
	},

	{
		breed: 'Mixed Breed',
		type: 'Cat'
	},

	{

		breed: 'Mixed Breed',
		type: 'Dog'
	},

	{
		breed: 'Husky',
		type: 'Dog'
	},

	{
		breed: 'Doberman Pinscher',
		type: 'Dog'
	},

	{
		breed: 'Domestic Short Hair',
		type: 'Cat'
	},


];

localStorage.setItem('breeds', JSON.stringify(breeds));