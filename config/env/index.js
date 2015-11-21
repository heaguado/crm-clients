var env = process.env.NODE_ENV;

module.exports = (env == 'dev' ) ?  require('./development') :
				 (env == 'prod') ?  require('./production')  :
				 (env == 'test') ?  require('./test')  :
									require('./local');
