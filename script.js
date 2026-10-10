/* =========================================================
   MUSTAQEEM FAREEDI
   PREMIUM EV ENGINEERING EXPERIENCE
   ========================================================= */

(() => {

  "use strict";

  /* =======================================================
     BASIC SETUP
  ======================================================= */

  const container = document.getElementById("ev-container");
  const loader = document.getElementById("loader");

  if (!container) {
    console.error("EV container not found.");
    return;
  }

  if (typeof THREE === "undefined") {
    console.error("Three.js was not loaded.");
    return;
  }


  /* =======================================================
     SCENE
  ======================================================= */

  const scene = new THREE.Scene();

  scene.background = new THREE.Color(0x050505);

  scene.fog = new THREE.FogExp2(
    0x050505,
    0.035
  );


  /* =======================================================
     CAMERA
  ======================================================= */

  const camera = new THREE.PerspectiveCamera(
    38,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );

  camera.position.set(
    7.8,
    4.1,
    8.8
  );


  /* =======================================================
     RENDERER
  ======================================================= */

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

  renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

  container.appendChild(renderer.domElement);


  /* =======================================================
     LIGHTING
  ======================================================= */

  const ambient = new THREE.AmbientLight(
    0xffffff,
    1.15
  );

  scene.add(ambient);


  const keyLight = new THREE.DirectionalLight(
    0xffffff,
    3.2
  );

  keyLight.position.set(
    5,
    8,
    6
  );

  keyLight.castShadow = true;

  scene.add(keyLight);


  const sideLight = new THREE.PointLight(
    0xd98743,
    2.5,
    15
  );

  sideLight.position.set(
    -5,
    2,
    4
  );

  scene.add(sideLight);


  const rimLight = new THREE.PointLight(
    0xffffff,
    2,
    18
  );

  rimLight.position.set(
    5,
    3,
    -6
  );

  scene.add(rimLight);


  /* =======================================================
     EV GROUP
  ======================================================= */

  const car = new THREE.Group();

  car.rotation.y = -0.55;

  scene.add(car);


  /* =======================================================
     MATERIALS
  ======================================================= */

  const bodyMaterial =
    new THREE.MeshPhysicalMaterial({

      color: 0x777a76,

      metalness: 0.9,

      roughness: 0.22,

      transparent: true,

      opacity: 0.20,

      side: THREE.DoubleSide,

      depthWrite: false

    });


  const bodyWireMaterial =
    new THREE.MeshBasicMaterial({

      color: 0xc5c5bd,

      wireframe: true,

      transparent: true,

      opacity: 0.34

    });


  const batteryMaterial =
    new THREE.MeshPhysicalMaterial({

      color: 0x181918,

      metalness: 0.88,

      roughness: 0.32

    });


  const batteryEdgeMaterial =
    new THREE.LineBasicMaterial({

      color: 0xa6a69e,

      transparent: true,

      opacity: 0.7

    });


  const metalMaterial =
    new THREE.MeshStandardMaterial({

      color: 0x858781,

      metalness: 0.95,

      roughness: 0.25

    });


  const darkMetal =
    new THREE.MeshStandardMaterial({

      color: 0x151615,

      metalness: 0.85,

      roughness: 0.32

    });


  const orangeMaterial =
    new THREE.MeshStandardMaterial({

      color: 0xd98743,

      metalness: 0.7,

      roughness: 0.28

    });


  const tireMaterial =
    new THREE.MeshStandardMaterial({

      color: 0x080808,

      metalness: 0.1,

      roughness: 0.88

    });


  const rimMaterial =
    new THREE.MeshStandardMaterial({

      color: 0x9a9b95,

      metalness: 0.95,

      roughness: 0.18

    });


  /* =======================================================
     BATTERY SKATEBOARD
  ======================================================= */

  const battery = new THREE.Mesh(
    new THREE.BoxGeometry(
      5.6,
      0.28,
      2.35
    ),
    batteryMaterial
  );

  battery.position.y = 0.42;

  car.add(battery);


  /* Battery modules */

  for (let x = -2.15; x <= 2.15; x += 0.72) {

    const module = new THREE.Mesh(
      new THREE.BoxGeometry(
        0.62,
        0.06,
        1.95
      ),
      darkMetal
    );

    module.position.set(
      x,
      0.59,
      0
    );

    car.add(module);
  }


  /* Battery outline */

  const batteryEdges =
    new THREE.EdgesGeometry(
      new THREE.BoxGeometry(
        5.6,
        0.28,
        2.35
      )
    );

  const batteryLines =
    new THREE.LineSegments(
      batteryEdges,
      batteryEdgeMaterial
    );

  batteryLines.position.copy(
    battery.position
  );

  car.add(batteryLines);


  /* =======================================================
     VEHICLE FLOOR
  ======================================================= */

  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(
      6.1,
      0.10,
      2.55
    ),
    darkMetal
  );

  floor.position.y = 0.76;

  car.add(floor);


  /* =======================================================
     EV MOTORS
  ======================================================= */

  function createMotor(x) {

    const motor = new THREE.Mesh(
      new THREE.CylinderGeometry(
        0.42,
        0.42,
        0.75,
        32
      ),
      metalMaterial
    );

    motor.rotation.z =
      Math.PI / 2;

    motor.position.set(
      x,
      0.95,
      0
    );

    car.add(motor);


    const motorCore =
      new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.22,
          0.22,
          0.79,
          24
        ),
        orangeMaterial
      );

    motorCore.rotation.z =
      Math.PI / 2;

    motorCore.position.copy(
      motor.position
    );

    car.add(motorCore);
  }


  createMotor(-2.3);
  createMotor(2.3);


  /* =======================================================
     POWER ELECTRONICS
  ======================================================= */

  const inverter =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        0.9,
        0.3,
        0.85
      ),
      darkMetal
    );

  inverter.position.set(
    0,
    1.08,
    0
  );

  car.add(inverter);


  const inverterTop =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        0.65,
        0.08,
        0.6
      ),
      orangeMaterial
    );

  inverterTop.position.set(
    0,
    1.27,
    0
  );

  car.add(inverterTop);


  /* =======================================================
     BODY SHAPE
  ======================================================= */

  const bodyShape =
    new THREE.Shape();

  bodyShape.moveTo(-3.2, 0);

  bodyShape.lineTo(-2.8, 0.42);

  bodyShape.lineTo(-1.75, 0.78);

  bodyShape.lineTo(-0.75, 1.08);

  bodyShape.lineTo(0.85, 1.08);

  bodyShape.lineTo(1.85, 0.76);

  bodyShape.lineTo(2.8, 0.42);

  bodyShape.lineTo(3.2, 0);

  bodyShape.lineTo(2.9, -0.12);

  bodyShape.lineTo(-2.9, -0.12);

  bodyShape.closePath();


  const bodyGeometry =
    new THREE.ExtrudeGeometry(
      bodyShape,
      {
        depth: 2.25,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: 0.10,
        bevelThickness: 0.08
      }
    );

  bodyGeometry.center();


  const body =
    new THREE.Mesh(
      bodyGeometry,
      bodyMaterial
    );

  body.scale.set(
    1,
    1,
    1
  );

  body.position.y = 1.25;

  car.add(body);


  /* =======================================================
     BODY WIREFRAME
  ======================================================= */

  const bodyEdges =
    new THREE.EdgesGeometry(
      bodyGeometry,
      18
    );

  const bodyWire =
    new THREE.LineSegments(
      bodyEdges,
      bodyWireMaterial
    );

  bodyWire.position.copy(
    body.position
  );

  car.add(bodyWire);


  /* =======================================================
     ROOF / GLASS
  ======================================================= */

  const roofMaterial =
    new THREE.MeshPhysicalMaterial({

      color: 0x101111,

      metalness: 0.5,

      roughness: 0.08,

      transparent: true,

      opacity: 0.42,

      side: THREE.DoubleSide

    });


  const roof =
    new THREE.Mesh(
      new THREE.BoxGeometry(
        2.8,
        0.08,
        1.8
      ),
      roofMaterial
    );

  roof.position.set(
    0,
    2.42,
    0
  );

  roof.rotation.z = 0.02;

  car.add(roof);


  /* =======================================================
     FRONT + REAR STRUCTURE
  ======================================================= */

  function createCrossBar(z) {

    const bar =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          5.7,
          0.13,
          0.10
        ),
        metalMaterial
      );

    bar.position.set(
      0,
      0.98,
      z
    );

    car.add(bar);
  }


  createCrossBar(-1.15);
  createCrossBar(1.15);


  /* =======================================================
     WHEELS
  ======================================================= */

  function createWheel(
    x,
    z
  ) {

    const wheelGroup =
      new THREE.Group();

    wheelGroup.position.set(
      x,
      0.55,
      z
    );

    car.add(wheelGroup);


    const tire =
      new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.55,
          0.55,
          0.30,
          32
        ),
        tireMaterial
      );

    tire.rotation.x =
      Math.PI / 2;

    wheelGroup.add(tire);


    const rim =
      new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.34,
          0.34,
          0.32,
          24
        ),
        rimMaterial
      );

    rim.rotation.x =
      Math.PI / 2;

    wheelGroup.add(rim);


    const brake =
      new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.23,
          0.23,
          0.34,
          20
        ),
        orangeMaterial
      );

    brake.rotation.x =
      Math.PI / 2;

    wheelGroup.add(brake);


    /* wheel hub */

    const hub =
      new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.08,
          0.08,
          0.37,
          16
        ),
        darkMetal
      );

    hub.rotation.x =
      Math.PI / 2;

    wheelGroup.add(hub);


    /* spokes */

    for (let i = 0; i < 8; i++) {

      const spoke =
        new THREE.Mesh(
          new THREE.BoxGeometry(
            0.045,
            0.45,
            0.04
          ),
          metalMaterial
        );

      spoke.position.z =
        0.17;

      spoke.rotation.z =
        i * Math.PI / 4;

      wheelGroup.add(spoke);
    }

    return wheelGroup;
  }


  createWheel(
    -2.45,
    -1.25
  );

  createWheel(
    2.45,
    -1.25
  );

  createWheel(
    -2.45,
    1.25
  );

  createWheel(
    2.45,
    1.25
  );


  /* =======================================================
     SUSPENSION
  ======================================================= */

  function createSuspension(
    x,
    z
  ) {

    const arm =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          1.0,
          0.07,
          0.07
        ),
        metalMaterial
      );

    arm.position.set(
      x * 0.82,
      0.82,
      z
    );

    arm.rotation.y =
      x > 0
        ? -0.18
        : 0.18;

    car.add(arm);


    const spring =
      new THREE.Mesh(
        new THREE.TorusGeometry(
          0.17,
          0.035,
          8,
          20
        ),
        orangeMaterial
      );

    spring.rotation.x =
      Math.PI / 2;

    spring.position.set(
      x * 0.82,
      0.78,
      z
    );

    car.add(spring);
  }


  createSuspension(
    -2.35,
    -1.25
  );

  createSuspension(
    2.35,
    -1.25
  );

  createSuspension(
    -2.35,
    1.25
  );

  createSuspension(
    2.35,
    1.25
  );


  /* =======================================================
     SIDE ENERGY LINES
  ======================================================= */

  function createEnergyLine(
    points
  ) {

    const geometry =
      new THREE.BufferGeometry()
        .setFromPoints(points);

    const material =
      new THREE.LineBasicMaterial({
        color: 0xd98743,
        transparent: true,
        opacity: .7
      });

    const line =
      new THREE.Line(
        geometry,
        material
      );

    car.add(line);
  }


  createEnergyLine([
    new THREE.Vector3(-2.7, .85, -1.31),
    new THREE.Vector3(-1.2, .86, -1.31),
    new THREE.Vector3(0, .88, -1.31),
    new THREE.Vector3(1.2, .86, -1.31),
    new THREE.Vector3(2.7, .85, -1.31)
  ]);


  /* =======================================================
     GROUND
  ======================================================= */

  const ground =
    new THREE.Mesh(
      new THREE.CircleGeometry(
        6.5,
        64
      ),
      new THREE.MeshBasicMaterial({
        color: 0x0c0c0c,
        transparent: true,
        opacity: .55
      })
    );

  ground.rotation.x =
    -Math.PI / 2;

  ground.position.y =
    -0.02;

  scene.add(ground);


  /* =======================================================
     GRID
  ======================================================= */

  const grid =
    new THREE.GridHelper(
      14,
      28,
      0x252522,
      0x111110
    );

  grid.position.y =
    -0.01;

  grid.material.transparent = true;

  grid.material.opacity = .18;

  scene.add(grid);


  /* =======================================================
     MOUSE INTERACTION
  ======================================================= */

  let mouseX = 0;
  let mouseY = 0;

  let targetX = 0;
  let targetY = 0;

  window.addEventListener(
    "mousemove",
    (event) => {

      mouseX =
        (event.clientX /
          window.innerWidth) * 2 - 1;

      mouseY =
        (event.clientY /
          window.innerHeight) * 2 - 1;

    }
  );


  /* =======================================================
     RESIZE
  ======================================================= */

  function resize() {

    const width =
      container.clientWidth;

    const height =
      container.clientHeight;

    if (!width || !height) {
      return;
    }

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

  resize();


  /* =======================================================
     LOADING
  ======================================================= */

  window.addEventListener(
    "load",
    () => {

      setTimeout(() => {

        if (loader) {
          loader.classList.add("hide");
        }

      }, 900);

    }
  );


  /* =======================================================
     ANIMATION
  ======================================================= */

  const clock =
    new THREE.Clock();


  function animate() {

    requestAnimationFrame(
      animate
    );

    const elapsed =
      clock.getElapsedTime();


    /* smooth mouse */

    targetX +=
      (mouseX - targetX) * 0.025;

    targetY +=
      (mouseY - targetY) * 0.025;


    /* vehicle movement */

    car.rotation.y =
      -0.55 +
      targetX * 0.28 +
      Math.sin(elapsed * 0.22) * 0.025;

    car.rotation.x =
      targetY * 0.055;

    car.position.y =
      Math.sin(elapsed * 0.8) * 0.035;


    /* subtle camera movement */

    camera.position.x =
      7.8 +
      targetX * 0.35;

    camera.position.y =
      4.1 -
      targetY * 0.18;

    camera.lookAt(
      0,
      1,
      0
    );


    renderer.render(
      scene,
      camera
    );
  }


  animate();

})();
