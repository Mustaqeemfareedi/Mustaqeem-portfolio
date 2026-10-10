const THREE = window.THREE;

const container = document.getElementById("three-container");

if (!container || !THREE) {
    console.error("Three.js could not be loaded.");
} else {

    /* =====================================================
       SCENE
    ===================================================== */

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x020406);

    scene.fog = new THREE.FogExp2(
        0x020406,
        0.045
    );


    /* =====================================================
       CAMERA
    ===================================================== */

    const camera = new THREE.PerspectiveCamera(
        38,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    camera.position.set(
        8.5,
        4.8,
        11
    );


    /* =====================================================
       RENDERER
    ===================================================== */

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    renderer.outputEncoding = THREE.sRGBEncoding;

    container.appendChild(renderer.domElement);


    /* =====================================================
       LIGHTING
    ===================================================== */

    scene.add(
        new THREE.AmbientLight(
            0x9bb8b7,
            0.32
        )
    );

    const cyanLight =
        new THREE.PointLight(
            0x52ffe7,
            7,
            30
        );

    cyanLight.position.set(
        3,
        5,
        5
    );

    scene.add(cyanLight);


    const blueLight =
        new THREE.PointLight(
            0x246cff,
            3,
            25
        );

    blueLight.position.set(
        -7,
        2,
        -4
    );

    scene.add(blueLight);


    const orangeLight =
        new THREE.PointLight(
            0xff6b32,
            1.5,
            18
        );

    orangeLight.position.set(
        2,
        1,
        3
    );

    scene.add(orangeLight);


    /* =====================================================
       MAIN CAR GROUP
    ===================================================== */

    const car =
        new THREE.Group();

    car.rotation.y = -0.32;

    scene.add(car);


    /* =====================================================
       MATERIALS
    ===================================================== */

    const bodyMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x0a1519,
            metalness: 0.9,
            roughness: 0.22
        });


    const darkMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x03080b,
            metalness: 0.8,
            roughness: 0.3
        });


    const glassMaterial =
        new THREE.MeshPhysicalMaterial({
            color: 0x061a20,
            metalness: 0.25,
            roughness: 0.08,
            transparent: true,
            opacity: 0.72
        });


    const cyanMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x52ffe7
        });


    const orangeMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xff7138
        });


    /* =====================================================
       CAR FLOOR / CHASSIS
    ===================================================== */

    const chassis =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                7.5,
                0.34,
                3.05
            ),
            darkMaterial
        );

    chassis.position.y = 0;

    car.add(chassis);


    /* chassis outline */

    const chassisEdges =
        new THREE.LineSegments(
            new THREE.EdgesGeometry(
                chassis.geometry
            ),
            new THREE.LineBasicMaterial({
                color: 0x52ffe7,
                transparent: true,
                opacity: 0.48
            })
        );

    car.add(chassisEdges);


    /* =====================================================
       BATTERY PACK
    ===================================================== */

    const batteryPack =
        new THREE.Group();

    batteryPack.position.set(
        -0.2,
        0.42,
        0
    );

    car.add(batteryPack);


    const batteryBody =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                4.9,
                0.48,
                2.15
            ),
            new THREE.MeshStandardMaterial({
                color: 0x071317,
                metalness: 0.75,
                roughness: 0.25
            })
        );

    batteryPack.add(batteryBody);


    const batteryOutline =
        new THREE.LineSegments(
            new THREE.EdgesGeometry(
                batteryBody.geometry
            ),
            new THREE.LineBasicMaterial({
                color: 0x52ffe7,
                transparent: true,
                opacity: 0.5
            })
        );

    batteryPack.add(batteryOutline);


    /* battery modules */

    for (let x = 0; x < 9; x++) {

        for (let z = 0; z < 3; z++) {

            const cell =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        0.42,
                        0.08,
                        0.46
                    ),
                    new THREE.MeshBasicMaterial({
                        color:
                            (x + z) % 4 === 0
                                ? 0xff7138
                                : 0x52ffe7
                    })
                );

            cell.position.x =
                -1.65 + x * 0.42;

            cell.position.y =
                0.29;

            cell.position.z =
                -0.55 + z * 0.55;

            batteryPack.add(cell);
        }
    }


    /* =====================================================
       CAR CABIN
    ===================================================== */

    const cabin =
        new THREE.Group();

    cabin.position.y = 1.05;

    car.add(cabin);


    const cabinShape =
        new THREE.BufferGeometry();


    const vertices = new Float32Array([

        -2.7, 0, -1.35,
         2.0, 0, -1.35,
         2.55, 0,  1.35,
        -2.25, 0,  1.35,

        -1.65, 1.55, -0.95,
         1.15, 1.55, -0.95,
         1.55, 1.55,  0.95,
        -1.25, 1.55,  0.95

    ]);


    const indices = [

        0,1,5,
        0,5,4,

        1,2,6,
        1,6,5,

        2,3,7,
        2,7,6,

        3,0,4,
        3,4,7,

        4,5,6,
        4,6,7

    ];


    cabinShape.setAttribute(
        "position",
        new THREE.BufferAttribute(
            vertices,
            3
        )
    );

    cabinShape.setIndex(indices);

    cabinShape.computeVertexNormals();


    const cabinMesh =
        new THREE.Mesh(
            cabinShape,
            glassMaterial
        );

    cabin.add(cabinMesh);


    /* cabin outline */

    const cabinEdges =
        new THREE.LineSegments(
            new THREE.EdgesGeometry(
                cabinShape
            ),
            new THREE.LineBasicMaterial({
                color: 0x52ffe7,
                transparent: true,
                opacity: 0.55
            })
        );

    cabin.add(cabinEdges);


    /* =====================================================
       FRONT / REAR AERODYNAMIC STRUCTURE
    ===================================================== */

    function createBodyBlock(
        x,
        y,
        z,
        sx,
        sy,
        sz
    ) {

        const mesh =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    sx,
                    sy,
                    sz
                ),
                bodyMaterial
            );

        mesh.position.set(
            x,
            y,
            z
        );

        car.add(mesh);

        const edge =
            new THREE.LineSegments(
                new THREE.EdgesGeometry(
                    mesh.geometry
                ),
                new THREE.LineBasicMaterial({
                    color: 0x245d5b,
                    transparent: true,
                    opacity: 0.5
                })
            );

        mesh.add(edge);

        return mesh;
    }


    createBodyBlock(
        3.35,
        0.55,
        0,
        1.15,
        0.65,
        2.8
    );


    createBodyBlock(
        -3.35,
        0.55,
        0,
        1.15,
        0.65,
        2.8
    );


    /* =====================================================
       WHEELS
    ===================================================== */

    function createWheel(
        x,
        z
    ) {

        const wheelGroup =
            new THREE.Group();

        wheelGroup.position.set(
            x,
            -0.15,
            z
        );

        car.add(wheelGroup);


        const tire =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.82,
                    0.82,
                    0.42,
                    48
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x020304,
                    metalness: 0.35,
                    roughness: 0.8
                })
            );

        tire.rotation.x =
            Math.PI / 2;

        wheelGroup.add(tire);


        const rim =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.47,
                    0.47,
                    0.44,
                    32
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x15272b,
                    metalness: 0.95,
                    roughness: 0.15
                })
            );

        rim.rotation.x =
            Math.PI / 2;

        wheelGroup.add(rim);


        const hub =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.17,
                    0.17,
                    0.46,
                    24
                ),
                cyanMaterial
            );

        hub.rotation.x =
            Math.PI / 2;

        wheelGroup.add(hub);


        const brake =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.08,
                    0.4,
                    0.5
                ),
                orangeMaterial
            );

        brake.position.x = 0.25;

        wheelGroup.add(brake);


        return wheelGroup;
    }


    const wheelFL =
        createWheel(
            2.25,
            -1.58
        );

    const wheelFR =
        createWheel(
            2.25,
            1.58
        );

    const wheelRL =
        createWheel(
            -2.25,
            -1.58
        );

    const wheelRR =
        createWheel(
            -2.25,
            1.58
        );


    /* =====================================================
       ELECTRIC MOTORS
    ===================================================== */

    function createMotor(
        x,
        z
    ) {

        const group =
            new THREE.Group();

        group.position.set(
            x,
            0.75,
            z
        );

        car.add(group);


        const motor =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.55,
                    0.55,
                    1.15,
                    32
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x10272b,
                    metalness: 0.9,
                    roughness: 0.2
                })
            );

        motor.rotation.z =
            Math.PI / 2;

        group.add(motor);


        const motorGlow =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    0.61,
                    0.61,
                    1.18,
                    32,
                    1,
                    true
                ),
                new THREE.MeshBasicMaterial({
                    color: 0x52ffe7,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.32
                })
            );

        motorGlow.rotation.z =
            Math.PI / 2;

        group.add(motorGlow);


        return group;
    }


    const motorFront =
        createMotor(
            2.45,
            0
        );


    const motorRear =
        createMotor(
            -2.45,
            0
        );


    /* =====================================================
       INVERTER
    ===================================================== */

    const inverter =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.55,
                0.55,
                1.15
            ),
            new THREE.MeshStandardMaterial({
                color: 0x081418,
                metalness: 0.9,
                roughness: 0.2
            })
        );

    inverter.position.set(
        0.8,
        1.15,
        0
    );

    car.add(inverter);


    const inverterEdges =
        new THREE.LineSegments(
            new THREE.EdgesGeometry(
                inverter.geometry
            ),
            new THREE.LineBasicMaterial({
                color: 0xff7138,
                transparent: true,
                opacity: 0.6
            })
        );

    inverter.add(inverterEdges);


    /* =====================================================
       POWER CABLES
    ===================================================== */

    function cable(
        start,
        end,
        color
    ) {

        const curve =
            new THREE.LineCurve3(
                new THREE.Vector3(
                    start.x,
                    start.y,
                    start.z
                ),
                new THREE.Vector3(
                    end.x,
                    end.y,
                    end.z
                )
            );


        const geometry =
            new THREE.TubeGeometry(
                curve,
                20,
                0.035,
                8,
                false
            );


        const material =
            new THREE.MeshBasicMaterial({
                color: color
            });


        const mesh =
            new THREE.Mesh(
                geometry,
                material
            );

        car.add(mesh);

        return mesh;
    }


    cable(
        new THREE.Vector3(
            -1.8,
            0.65,
            -1
        ),
        new THREE.Vector3(
            0.8,
            1.15,
            -0.4
        ),
        0x52ffe7
    );


    cable(
        new THREE.Vector3(
            0.8,
            1.15,
            0.4
        ),
        new THREE.Vector3(
            2.45,
            0.75,
            0
        ),
        0xff7138
    );


    cable(
        new THREE.Vector3(
            0.8,
            1.15,
            -0.4
        ),
        new THREE.Vector3(
            -2.45,
            0.75,
            0
        ),
        0x52ffe7
    );


    /* =====================================================
       TECHNICAL ENERGY PARTICLES
    ===================================================== */

    const particles =
        new THREE.Group();

    scene.add(particles);


    for (let i = 0; i < 120; i++) {

        const particle =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.025,
                    6,
                    6
                ),
                new THREE.MeshBasicMaterial({
                    color:
                        i % 5 === 0
                            ? 0xff7138
                            : 0x52ffe7
                })
            );


        particle.position.set(
            (Math.random() - 0.5) * 14,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 12
        );


        particle.userData.speed =
            0.001 +
            Math.random() * 0.006;


        particles.add(
            particle
        );
    }


    /* =====================================================
       FLOOR
    ===================================================== */

    const floor =
        new THREE.Mesh(
            new THREE.CircleGeometry(
                7,
                96
            ),
            new THREE.MeshBasicMaterial({
                color: 0x061014,
                transparent: true,
                opacity: 0.65
            })
        );

    floor.rotation.x =
        -Math.PI / 2;

    floor.position.y =
        -1.05;

    scene.add(floor);


    /* Floor rings */

    for (let i = 1; i <= 4; i++) {

        const ring =
            new THREE.Mesh(
                new THREE.RingGeometry(
                    i * 1.4 - 0.012,
                    i * 1.4,
                    96
                ),
                new THREE.MeshBasicMaterial({
                    color: 0x52ffe7,
                    transparent: true,
                    opacity: 0.12
                })
            );

        ring.rotation.x =
            -Math.PI / 2;

        ring.position.y =
            -1.035;

        scene.add(ring);

        ring.userData.rotationSpeed =
            i % 2 === 0
                ? -0.002
                : 0.002;

        ring.userData.ring = true;
    }


    /* =====================================================
       GRID
    ===================================================== */

    const grid =
        new THREE.GridHelper(
            30,
            30,
            0x17423f,
            0x0a2020
        );

    grid.position.y =
        -1.04;

    grid.material.transparent = true;
    grid.material.opacity = 0.18;

    scene.add(grid);


    /* =====================================================
       ORBIT CONTROLS
    ===================================================== */

    const controls =
        new THREE.OrbitControls(
            camera,
            renderer.domElement
        );

    controls.enableDamping = true;
    controls.dampingFactor = 0.045;

    controls.enablePan = false;

    controls.minDistance = 7;
    controls.maxDistance = 17;

    controls.minPolarAngle =
        Math.PI * 0.28;

    controls.maxPolarAngle =
        Math.PI * 0.67;

    controls.target.set(
        0,
        0.4,
        0
    );


    /* =====================================================
       MOUSE
    ===================================================== */

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                (event.clientX /
                    window.innerWidth) -
                0.5;

            mouseY =
                (event.clientY /
                    window.innerHeight) -
                0.5;
        }
    );


    /* =====================================================
       ANIMATION
    ===================================================== */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );

        const time =
            clock.getElapsedTime();


        /* Car floating effect */

        car.position.y =
            Math.sin(time * 1.1) *
            0.06;


        /* Slow chassis rotation */

        car.rotation.y +=
            0.0012;


        /* Motor rotation */

        motorFront.rotation.x =
            time * 2.8;

        motorRear.rotation.x =
            time * 2.8;


        /* Wheels */

        [
            wheelFL,
            wheelFR,
            wheelRL,
            wheelRR
        ].forEach(
            wheel => {
                wheel.rotation.z =
                    time * 0.15;
            }
        );


        /* Technical rings */

        scene.children.forEach(
            object => {

                if (
                    object.userData &&
                    object.userData.ring
                ) {

                    object.rotation.z +=
                        object.userData.rotationSpeed;
                }
            }
        );


        /* Energy particles */

        particles.children.forEach(
            particle => {

                particle.position.y +=
                    particle.userData.speed;

                if (
                    particle.position.y > 4
                ) {
                    particle.position.y = -4;
                }
            }
        );


        /* Gentle mouse response */

        camera.position.x +=
            (
                8.5 +
                mouseX * 1.4 -
                camera.position.x
            ) * 0.015;

        camera.position.y +=
            (
                4.8 -
                mouseY * 0.7 -
                camera.position.y
            ) * 0.015;


        controls.update();

        renderer.render(
            scene,
            camera
        );
    }


    animate();


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            const width =
                container.clientWidth;

            const height =
                container.clientHeight;


            camera.aspect =
                width / height;

            camera.updateProjectionMatrix();


            renderer.setSize(
                width,
                height
            );
        }
    );
}


/* =========================================================
   LOADER
========================================================= */

window.addEventListener(
    "load",
    () => {

        const loader =
            document.getElementById(
                "loader"
            );

        if (!loader) return;

        setTimeout(
            () => {
                loader.classList.add(
                    "hidden"
                );
            },
            900
        );
    }
);


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const target =
                        document.querySelector(
                            link.getAttribute(
                                "href"
                            )
                        );

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth"
                        });
                    }
                }
            );
        }
    );
