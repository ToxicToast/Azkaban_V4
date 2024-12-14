const nx = require('@nx/eslint-plugin');

module.exports = [
	...nx.configs['flat/base'],
	...nx.configs['flat/typescript'],
	...nx.configs['flat/javascript'],
	{
		ignores: ['**/dist'],
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		rules: {
			'@nx/enforce-module-boundaries': [
				'error',
				{
					enforceBuildableLibDependency: true,
					allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
					depConstraints: [
						{
							sourceTag: 'scope:presentation',
							onlyDependOnLibsWithTags: [
								'scope:presentation',
								'scope:infrastructure',
								'scope:domain',
							],
						},
						{
							sourceTag: 'scope:domain',
							onlyDependOnLibsWithTags: ['scope:domain'],
						},
						{
							sourceTag: 'scope:infrastructure',
							onlyDependOnLibsWithTags: [
								'scope:infrastructure',
								'scope:domain',
							],
						},
						{
							sourceTag: 'scope:ui',
							onlyDependOnLibsWithTags: [
								'scope:ui',
								'scope:shared',
							],
						},
					],
				},
			],
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		// Override or add rules here
		rules: {},
	},
];
