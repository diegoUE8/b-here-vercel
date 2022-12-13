// import * as THREE from 'three';
import { environment } from '../../environment';
import { Geometry } from '../geometry/geometry';
import { Host } from '../host/host';
import Interactive from '../interactive/interactive';

export default class PointerElement {

	constructor(color = '#ffffff') {
		const position = this.position = new THREE.Vector3();
		// const targetPosition = this.targetPosition = new THREE.Vector3();
		const geometry = Geometry.planeGeometry; // new THREE.PlaneBufferGeometry(1.2, 1.2, 2, 2);
		const loader = new THREE.TextureLoader();
		const texture = loader.load(environment.getPath('textures/ui/nav-point.png'));
		const material = new THREE.MeshBasicMaterial({
			color: new THREE.Color(color),
			depthTest: false,
			depthWrite: false,
			map: texture,
			transparent: true,
			opacity: 0.9,
		});
		const mesh = this.mesh = new THREE.Mesh(geometry, material);
		mesh.renderOrder = environment.renderOrder.pointer;
		mesh.position.set(-100000, -100000, -100000);
	}

	update(camera) {
		if (Interactive.lastIntersectedObject) {
			const position = this.position;
			position.copy(Interactive.lastIntersectedObject.intersection.point);
			position.multiplyScalar(0.99);
			const mesh = this.mesh;
			mesh.position.set(position.x, position.y, position.z);
			position.sub(camera.position);
			const s = position.length() / 80;
			mesh.scale.set(s, s, s);
			/*
			const targetPosition = this.targetPosition;
			targetPosition.set(0, 0, 0);
			camera.localToWorld(targetPosition);
			*/
			mesh.lookAt(Host.origin);
		}
	}

	setPosition(x, y, z, camera) {
		const position = this.position;
		position.set(x, y, z).multiplyScalar(80);
		const mesh = this.mesh;
		mesh.position.copy(position);
		position.sub(camera.position);
		const s = position.length() / 80;
		mesh.scale.set(s, s, s);
		/*
		const targetPosition = this.targetPosition;
		targetPosition.set(0, 0, 0);
		camera.localToWorld(targetPosition);
		*/
		mesh.lookAt(Host.origin);
	}
}
