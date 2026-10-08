import * as THREE from 'three';


function createPlanet(data) {

    const geometry = new THREE.SphereGeometry(
        data.radius,
        32,
        32
    );

    const material = new THREE.MeshBasicMaterial({
        color: data.color
    });

    return new THREE.Mesh(
        geometry,
        material
    );
}


function createOrbit(data) {

    const geometry = new THREE.RingGeometry(
        data.orbitDistance - 0.01,
        data.orbitDistance + 0.01,
        128
    );

    const material = new THREE.MeshBasicMaterial({
        color: 0x444444,
        side: THREE.DoubleSide
    });

    const orbit = new THREE.Mesh(
        geometry,
        material
    );

    orbit.rotation.x = Math.PI / 2;

    return orbit;
}


function createSolarSystem(scene, data) {

    const objects = {};


    // Sun

    const sunGeometry = new THREE.SphereGeometry(
        data.sun.radius,
        32,
        32
    );

    const sunMaterial = new THREE.MeshBasicMaterial({
        color: data.sun.color
    });

    objects.sun = new THREE.Mesh(
        sunGeometry,
        sunMaterial
    );

    scene.add(objects.sun);


    // Planets

    data.planets.forEach((planetData) => {

        const planet = createPlanet(planetData);

        const orbit = createOrbit(planetData);

        objects[planetData.id] = planet;

        objects[`${planetData.id}Orbit`] = orbit;

        scene.add(planet);
        scene.add(orbit);


        // Moons

        if (planetData.moons) {

            planetData.moons.forEach((moonData) => {

                const moon = createPlanet(moonData);

                const moonOrbit = createOrbit(moonData);

                objects[moonData.id] = moon;

                objects[`${moonData.id}Orbit`] = moonOrbit;

                planet.add(moon);
                planet.add(moonOrbit);

            });

        }

    });


    return objects;
}


export { createSolarSystem };