/* =========================================================
   MUSTAQEEM FAREEDI — 3D EV ENGINEERING EXPERIENCE
   Loads: assets/models/ev-car.glb
========================================================= */

const container = document.getElementById("three-container");

if (!container) {
    console.error("three-container not found");
} else {

    /* -----------------------------------------------------
       SCENE
    ----------------------------------------------------- */

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x020609);

    scene.fog = new THREE.FogExp2(0x020609, 0.018);


    /* -----------------------------------------------------
       CAMERA
    ----------------------------------------------------- */

    const camera = new THREE.PerspectiveCamera(
        42,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );

    camera.position.set(6.8, 3.4, 8.5);


    /* -----------------------------------------------------
       RENDERER
    ----------------------------------------------------- */

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

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);


    /* -----------------------------------------------------
       LIGHTING
    ----------------------------------------------------- */

    const ambient = new THREE.AmbientLight(
        0x9edfdc,
        1.8
    );

    scene.add(ambient);


    const cyanLight = new THREE.PointLight(
        0x4ffff0,
        7,
        20
    );

    cyanLight.position.set(3, 4, 4);

    scene.add(cyanLight);


    const blueLight = new THREE.PointLight(
        0x1677ff,
        5,
        18
    );

    blueLight.position.set(-5, 2, -3);

    scene.add(blueLight);


    const orangeLight = new THREE.PointLight(
        0xff7438,
        4,
        12
    );

    orangeLight.position.set(2, 1, -4);

    scene.add(orangeLight);


    /* -----------------------------------------------------
       FLOOR
    ----------------------------------------------------- */

    const floorGeometry =
        new THREE.CircleGeometry(9, 96);

    const floorMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x061318,
            transparent: true,
            opacity: 0.88
        });

    const floor =
        new THREE.Mesh(
            floorGeometry,
            floorMaterial
        );

    floor.rotation.x = -Math.PI / 2;

    floor.position.y = -1.15;

    scene.add(floor);


    /* -----------------------------------------------------
       ENGINEERING GRID
    ----------------------------------------------------- */

    const grid = new THREE.GridHelper(
        18,
        36,
        0x1b5960,
        0x123238
    );

    grid.position.y = -1.13;

    grid.material.transparent = true;

    grid.material.opacity = 0.35;

    scene.add(grid);


    /* -----------------------------------------------------
       GLOWING RINGS
    ----------------------------------------------------- */

    function createRing(radius, opacity) {

        const geometry =
            new THREE.RingGeometry(
                radius,
                radius + 0.012,
                128
            );

        const material =
            new THREE.MeshBasicMaterial({
                color: 0x53ffe9,
                transparent: true,
                opacity: opacity,
                side: THREE.DoubleSide
            });

        const ring =
            new THREE.Mesh(
                geometry,
                material
            );

        ring.rotation.x = -Math.PI / 2;

        ring.position.y = -1.08;

        scene.add(ring);

        return ring;
    }

    createRing(3.2, 0.22);
    createRing(4.8, 0.12);
    createRing(6.4, 0.07);


    /* -----------------------------------------------------
       CAR GROUP
    ----------------------------------------------------- */

    const carGroup = new THREE.Group();

    scene.add(carGroup);


    /* -----------------------------------------------------
       GLTF LOADER
    ----------------------------------------------------- */

    const loader = new THREE.GLTFLoader();


    loader.load(

        "assets/models/ev-car.glb",

        function (gltf) {

            const car = gltf.scene;

            carGroup.add(car);


            /* ---------------------------------------------
               SCALE / POSITION
            --------------------------------------------- */

            car.scale.set(
                3.4,
                3.4,
                3.4
            );

            car.position.set(
                0,
                -0.95,
                0
            );


            /* ---------------------------------------------
               MODEL MATERIAL ENHANCEMENT
            --------------------------------------------- */

            car.traverse(function (object) {

                if (!object.isMesh) return;


                object.castShadow = true;

                object.receiveShadow = true;


                if (object.material) {

                    const materials =
                        Array.isArray(object.material)
                            ? object.material
                            : [object.material];


                    materials.forEach(function (material) {

                        material.needsUpdate = true;


                        /* Make dark materials more
                           futuristic */

                        if (
                            material.color &&
                            material.color.r > 0.15 &&
                            material.color.g > 0.15 &&
                            material.color.b > 0.15
                        ) {

                            material.color.multiplyScalar(
                                0.72
                            );
                        }


                        /* Slight metallic effect */

                        if (
                            "metalness" in material
                        ) {

                            material.metalness =
                                Math.max(
                                    material.metalness,
                                    0.35
                                );
                        }


                        if (
                            "roughness" in material
                        ) {

                            material.roughness =
                                Math.min(
                                    material.roughness,
                                    0.42
                                );
                        }

                    });

                }

            });


            /* ---------------------------------------------
               CYAN TECHNICAL OUTLINE
            --------------------------------------------- */

            car.traverse(function (object) {

                if (!object.isMesh) return;

                if (!object.geometry) return;


                const edges =
                    new THREE.EdgesGeometry(
                        object.geometry,
                        28
                    );


                const lineMaterial =
                    new THREE.LineBasicMaterial({
                        color: 0x42ffe8,
                        transparent: true,
                        opacity: 0.08
                    });


                const outline =
                    new THREE.LineSegments(
                        edges,
                        lineMaterial
                    );


                outline.scale.setScalar(1.001);

                object.add(outline);

            });


            console.log(
                "EV MODEL LOADED SUCCESSFULLY"
            );

        },

        function (progress) {

            if (progress.total) {

                console.log(
                    "Loading EV:",
                    Math.round(
                        progress.loaded /
                        progress.total *
                        100
                    ) + "%"
                );

            }

        },

        function (error) {

            console.error(
                "EV MODEL FAILED TO LOAD:",
                error
            );

        }

    );


    /* -----------------------------------------------------
       ENERGY PARTICLES
    ----------------------------------------------------- */

    const particleGeometry =
        new THREE.BufferGeometry();

    const particleCount = 180;

    const particlePositions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particlePositions[i * 3] =
            (Math.random() - 0.5) * 15;

        particlePositions[i * 3 + 1] =
            Math.random() * 6 - 1;

        particlePositions[i * 3 + 2] =
            (Math.random() - 0.5) * 13;

    }


    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            particlePositions,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0x66fff0,

            size: 0.035,

            transparent: true,

            opacity: 0.7

        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );

    scene.add(particles);


    /* -----------------------------------------------------
       MOUSE INTERACTION
    ----------------------------------------------------- */

    let mouseX = 0;

    let mouseY = 0;

    let targetX = 0;

    let targetY = 0;


    container.addEventListener(
        "mousemove",
        function (event) {

            const rect =
                container.getBoundingClientRect();


            mouseX =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width -
                0.5;


            mouseY =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height -
                0.5;

        }
    );


    /* -----------------------------------------------------
       ORBIT CONTROLS
    ----------------------------------------------------- */

    const controls =
        new THREE.OrbitControls(
            camera,
            renderer.domElement
        );


    controls.enableDamping = true;

    controls.dampingFactor = 0.055;

    controls.enablePan = false;

    controls.minDistance = 6;

    controls.maxDistance = 13;

    controls.minPolarAngle = 0.8;

    controls.maxPolarAngle = 1.55;

    controls.target.set(
        0,
        0.25,
        0
    );


    /* -----------------------------------------------------
       ANIMATION
    ----------------------------------------------------- */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const time =
            clock.getElapsedTime();


        /* Smooth mouse movement */

        targetX +=
            (
                mouseX * 0.35 -
                targetX
            ) * 0.025;


        targetY +=
            (
                mouseY * 0.2 -
                targetY
            ) * 0.025;


        /* Very subtle car movement */

        carGroup.rotation.y =
            Math.sin(time * 0.18) * 0.055
            + targetX * 0.35;


        carGroup.position.y =
            Math.sin(time * 0.7) * 0.025;


        /* Particles */

        particles.rotation.y =
            time * 0.015;


        particles.position.y =
            Math.sin(time * 0.2) * 0.08;


        /* Lights */

        cyanLight.position.x =
            3 + Math.sin(time) * 1.5;

        cyanLight.position.z =
            4 + Math.cos(time) * 1.2;


        orangeLight.position.x =
            2 + Math.cos(time * 0.8) * 1.5;


        controls.update();


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* -----------------------------------------------------
       RESIZE
    ----------------------------------------------------- */

    function resize() {

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


    window.addEventListener(
        "resize",
        resize
    );


    /* -----------------------------------------------------
       LOADER SCREEN
    ----------------------------------------------------- */

    window.addEventListener(
        "load",
        function () {

            const loaderScreen =
                document.getElementById(
                    "loader"
                );


            if (loaderScreen) {

                setTimeout(
                    function () {

                        loaderScreen.classList.add(
                            "hidden"
                        );

                    },
                    900
                );

            }

        }
    );


    /* -----------------------------------------------------
       SMOOTH NAVIGATION
    ----------------------------------------------------- */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });

}
