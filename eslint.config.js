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
							"sourceTag": "scope:shared",
							"onlyDependOnLibsWithTags": ["scope:shared"]
						},
						{
							"sourceTag": "scope:application",
							"onlyDependOnLibsWithTags": [
								"scope:application",
								"scope:infrastructure",
								"scope:shared"
							]
						},
						{
							"sourceTag": "scope:domain",
							"onlyDependOnLibsWithTags": [
								"scope:domain",
								"scope:shared"
							]
						},
						{
							"sourceTag": "scope:infrastructure",
							"onlyDependOnLibsWithTags": [
								"scope:infrastructure",
								"scope:domain",
								"scope:shared"
							]
						},
						{
							"sourceTag": "scope:ui",
							"onlyDependOnLibsWithTags": [
								"scope:ui",
								"scope:shared"
							]
						}
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
