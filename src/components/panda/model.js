import model from './model-no-images.json'

import eyeFront from './eye-front.jpg'
import eyeBack from './eye-back.jpg'
import headDiffuse from './head-diffuse.jpg'
import headAmbient from './head-ambient.jpg'
import headSpecroughlw from './head-specroughlw.jpg'

model.images = [
  { uuid: 'A66B957A-38FB-43DA-A262-7CD170C58EB3', url: eyeFront },
  { uuid: 'AF445E35-856F-4D44-A729-0AA542C92D40', url: eyeBack },
  { uuid: 'F634E69E-DBF0-49B3-9593-C3E6FC7ACC2B', url: headDiffuse },
  { uuid: '6C4B567B-B473-4D99-B928-7F8961E4E320', url: headAmbient },
  { uuid: '345832B3-D8ED-4C7F-AEBB-E55B6F70B013', url: headSpecroughlw },
]

export default model
