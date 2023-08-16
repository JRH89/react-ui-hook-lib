import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'

export default [
	{
		input: 'src/index.js', // Use the index.js as the entry point
		output: {
			file: 'dist/bundle.js', // Output path for the main bundle
			format: 'umd',
			name: 'ui-hook-react-lib',
			globals: {
				react: 'React',
			},
		},
		external: ['react'],
		plugins: [
			babel({
				exclude: 'node_modules/**',
				presets: ['@babel/preset-react'],
			}),
			postcss({
				plugins: [autoprefixer],
				inject: false,
				extract: true,
				minimize: true,
			}),
		],
	},
	// Add more configurations for other components/hooks if needed
]
