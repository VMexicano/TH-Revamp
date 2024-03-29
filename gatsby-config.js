require('dotenv').config({
	path: `.env`
});
let contentfulConfig;
try {
	// Load the Contentful config from the .contentful.json
	contentfulConfig = require('./.contentful');
} catch (_) {}

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
	spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
	accessToken:
		process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken
};

const { spaceId, accessToken } = contentfulConfig;

if (!spaceId || !accessToken) {
	throw new Error(
		'Contentful spaceId and the delivery token need to be provided.'
	);
}

module.exports = {
	pathPrefix: '/gatsby-contentful-starter',
	plugins: [
		'gatsby-transformer-remark',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-source-contentful',
			options: contentfulConfig
		},
		{
			resolve: `gatsby-plugin-sass`,
			options: {
				cssLoaderOptions: {
					camelCase: true
				}
			}
		},
		{
			resolve: 'gatsby-plugin-zopfli',
			options: {
				extensions: ['css', 'html', 'js', 'jsx', 'svg']
			}
		}
	]
};
