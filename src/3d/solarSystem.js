import * as THREE from 'three';


function createPlanet(data) {

    const geometry = new THREE.SphereGeometry(
        data.radius,
        32,
        32
    );

    const material = new THREE.MeshStandardMaterial({
        color: data.color,
        roughness: 0.8,
        metalness: 0
    });

    return new THREE.Mesh(
        geometry,
        material
    );
}


function createOrbit(data) {

    const points = [];

    const segments = 128;

    const eccentricity = data.eccentricity;

    const inclination =
        THREE.MathUtils.degToRad(data.inclination);

    for (let i = 0; i <= segments; i++) {

        const angle =
            (i / segments) * Math.PI * 2;

        const radius =
            data.orbitDistance *
            (1 - eccentricity * eccentricity) /
            (1 + eccentricity * Math.cos(angle));

        const x =
            Math.cos(angle) * radius;

        const z =
            Math.sin(angle) * radius;

        points.push(
            new THREE.Vector3(
                x,
                0,
                z
            )
        );

    }


    const geometry =
        new THREE.BufferGeometry().setFromPoints(points);

    const material =
        new THREE.LineBasicMaterial({
            color: 0x444444
        });

    const orbit =
        new THREE.LineLoop(
            geometry,
            material
        );


    orbit.rotation.x = inclination;
    
    return orbit;
}


function createSolarSystem(scene, data) {

    const objects = {};

    const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.08
    );

    scene.add(ambientLight);

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

    const sunlight = new THREE.PointLight(
        0xffffff,
        2,
        100
    );

    objects.sun.add(sunlight);


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