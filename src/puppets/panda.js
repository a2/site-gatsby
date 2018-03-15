import eyeFront from './eye_uvs_REFLECTIVE_front.jpg'
import eyeBack from './eye_uvs_REFLECTIVE_back.jpg'
import headDiffuse from './panda_head_DIFFUSE.jpg'
import headAmbient from './panda_head_AMBIENT.jpg'
import headSpecRough from './panda_head_SPECROUGHLW.jpg'
import pandaJson from './panda.json'

const panda = Object.assign(
  {
    images: [
      { uuid: '40461AE2-D3E4-43E2-893D-B5C95AD6594B', url: eyeFront },
      { uuid: '62893D1C-8A08-4505-99B4-0FFC95205690', url: eyeBack },
      { uuid: 'A60C7E3E-EFDC-4F4D-8AFF-1843AB5C4AAD', url: headDiffuse },
      { uuid: '71AD5F10-EEAB-4DE8-B1C3-8BC3690752B1', url: headAmbient },
      { uuid: '41E75687-E986-4BD7-8A7D-D52B5C4D6708', url: headSpecRough },
    ],
  },
  pandaJson
)

export default panda
