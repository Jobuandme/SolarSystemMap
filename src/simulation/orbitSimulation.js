import * as THREE from 'three';


function updateOrbits(data, objects, angle) {

    data.planets.forEach((planetData) => {

        const planet = objects[planetData.id];

        const orbitAngle =
            angle * planetData.orbitSpeed / 0.005 +
            planetData.orbitOffset;

        const eccentricity =
            planetData.eccentricity;

        const radius =
            planetData.orbitDistance *
            (1 - eccentricity * eccentricity) /
            (1 + eccentricity * Math.cos(orbitAngle));


        // Position on the flat elliptical orbit

        const x =
            Math.cos(orbitAngle) * radius;

        const y = 0;

        const z =
            Math.sin(orbitAngle) * radius;


        // Apply the exact same inclination
        // used by the orbit line

        const inclination =
            THREE.MathUtils.degToRad(
                planetData.inclination
            );

        const inclinedY =
            y * Math.cos(inclination) -
            z * Math.sin(inclination);

        const inclinedZ =
            y * Math.sin(inclination) +
            z * Math.cos(inclination);


        planet.position.x = x;
        planet.position.y = inclinedY;
        planet.position.z = inclinedZ;


        planet.rotation.y += 0.01;


        // Moons

        if (planetData.moons) {

            planetData.moons.forEach((moonData) => {

                const moon = objects[moonData.id];

                const moonAngle =
                    angle * moonData.orbitSpeed / 0.005;

                moon.position.x =
                    Math.cos(moonAngle) *
                    moonData.orbitDistance;

                moon.position.z =
                    Math.sin(moonAngle) *
                    moonData.orbitDistance;

                moon.rotation.y += 0.01;

            });

        }

    });


    objects.sun.rotation.y += 0.005;
}


export { updateOrbits };