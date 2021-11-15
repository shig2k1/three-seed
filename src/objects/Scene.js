import { Math as Mathf, Clock, Group, Vector2, Raycaster, MeshToonMaterial, DoubleSide, PlaneGeometry, MeshBasicMaterial, Mesh, Box3, BoxGeometry, AxesHelper, SphereGeometry, LoadingManager, MeshStandardMaterial, CatmullRomCurve3, Vector3, BufferGeometry, LineBasicMaterial, Line, Vector4, CubicBezierCurve3, SphereBufferGeometry } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const getRandomNum = (max = 0, min = 0) => Math.floor(Math.random() * (max + 1 - min)) + min

// make a space that's 100 x 100 x 100 - stick each fish at 3 x 3

export default class SeedScene extends Group {
  constructor(camera) {
    super()

    var geometry = new BoxGeometry( 1, 1, 1 );
    var material = new MeshBasicMaterial( { color: 0x00ff00 } );
    this.cube = new Mesh( geometry, material );
    this.add( this.cube );
  }

  update (timeStamp) {
    this.cube.rotation.x += 0.1;
    this.cube.rotation.y += 0.1;
  }
}