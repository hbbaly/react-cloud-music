import developConfig  from './development'
import prodConfig from './production'
import defaultConfig from './default'

const configEnv = process.env.NODE_ENV === 'development' ? developConfig : prodConfig
const config = Object.assign(defaultConfig, configEnv)
export default config