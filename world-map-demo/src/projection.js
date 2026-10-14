import proj4 from 'proj4'
import { register } from 'ol/proj/proj4.js'
import { get as getProjection } from 'ol/proj.js'

proj4.defs(
  'EPSG:8857',
  '+proj=eqearth +lon_0=0 +x_0=0 +y_0=0 +R=6371008.7714 +units=m +no_defs +type=crs'
)

register(proj4)

export const equalEarth = getProjection('EPSG:8857')

equalEarth.setGlobal(true)

equalEarth.setExtent([
  -17243959.06,
  -8392927.6,
  17243959.06,
  8392927.6,
])

equalEarth.setWorldExtent([
  -180, -90, 180, 90
])