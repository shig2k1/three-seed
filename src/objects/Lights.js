import { Group, SpotLight, PointLight, AmbientLight, HemisphereLight, Color, RectAreaLight } from 'three';

export default class BasicLights extends Group {
  constructor(...args) {
    super(...args);

    const point = new PointLight(0xFFFFFF, 7, 7, 7);
    const spot1 = new SpotLight(0xFFFFFF, 1, 5, 10, 1, 1);
    const spot2 = new SpotLight(0xFFFFFF, 1, 5, 10, 1, 1);


    const ambi = new AmbientLight( '#FFFFFF', .6);
    const hemi = new HemisphereLight( 0xFFFFFF, 0x000000, .5 )
    const rect = new RectAreaLight( 0xFFFFFF, 5, 5, 5)

    ambi.position.set(0, .1, 0);

    point.intensity = 10;
    point.lookAt(0, 0, 0)

    rect.position.set(0, 10, 0)
    rect.lookAt(0, 0, 0)

    this.add( ambi, hemi );
  }

  update(timeStamp) {
    this.position.y = timeStamp / 10000;
  }
}
