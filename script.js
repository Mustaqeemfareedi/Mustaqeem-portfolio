const THREE = window.THREE;

if (!THREE) {
  console.error("Three.js did not load.");
} else {

  // =========================================================
  // MAIN EV SCENE
  // =========================================================

  const container = document.getElementById("ev-container");

  if (container) {

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x05060a);

    const camera = new THREE.PerspectiveCamera(
      38,
      Math.max(container.clientWidth, 1) /
      Math.max(container.clientHeight, 1),
      0.1,
      1000
    );

    camera.position.set(7.5, 4.8, 10);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.setSize(
      Math.max(container.clientWidth, 1),
      Math.max(container.clientHeight, 1)
    );

    renderer.outputEncoding = THREE.sRGBEncoding;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // ---------------------------------------------------------
    // LIGHTING
    // ---------------------------------------------------------

    scene.add(new THREE.AmbientLight(0xffffff, 1.3));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 8);
    scene.add(keyLight);

    const purpleLight = new THREE.PointLight(
      0x8b5cff,
      25,
      20
    );
    purpleLight.position.set(-5, 3, 3);
    scene.add(purpleLight);

    const blueLight = new THREE.PointLight(
      0x43d9ff,
      22,
      20
    );
    blueLight.position.set(5, 2, -4);
    scene.add(blueLight);

    // ---------------------------------------------------------
    // EV GROUP
    // ---------------------------------------------------------

    const car = new THREE.Group();
    scene.add(car);

    // ---------------------------------------------------------
    // MATERIALS
    // ---------------------------------------------------------

    const darkMetal = new THREE.MeshStandardMaterial({
      color: 0x151923,
      metalness: 0.9,
      roughness: 0.25
    });

    const silverMetal = new THREE.MeshStandardMaterial({
      color: 0xbcc4d4,
      metalness: 0.95,
      roughness: 0.18
    });

    const batteryMaterial = new THREE.MeshStandardMaterial({
      color: 0x24194f,
      metalness: 0.65,
      roughness: 0.3,
      emissive: 0x29155c,
      emissiveIntensity: 0.7
    });

    const orangeMaterial = new THREE.MeshStandardMaterial({
      color: 0xff783d,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x451507,
      emissiveIntensity: 0.8
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x161b2c,
      metalness: 0.1,
      roughness: 0.08,
      transparent: true,
      opacity: 0.42,
      transmission: 0.25
    });

    // ---------------------------------------------------------
    // BATTERY SKATEBOARD
    // ---------------------------------------------------------

    const battery = new THREE.Mesh(
      new THREE.BoxGeometry(5.8, 0.42, 2.55),
      batteryMaterial
    );

    battery.position.y = 0.65;
    car.add(battery);

    // Battery modules

    for (let x = -2.4; x <= 2.4; x += 0.8) {

      const module = new THREE.Mesh(
        new THREE.BoxGeometry(0.68, 0.16, 2.15),
        new THREE.MeshStandardMaterial({
          color: 0x46318c,
          metalness: 0.5,
          roughness: 0.35,
          emissive: 0x39206d,
          emissiveIntensity: 0.55
        })
      );

      module.position.set(x, 0.89, 0);
      car.add(module);
    }

    // ---------------------------------------------------------
    // VEHICLE FLOOR / FRAME
    // ---------------------------------------------------------

    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(6.5, 0.18, 3.0),
      darkMetal
    );

    floor.position.y = 1.05;
    car.add(floor);

    // ---------------------------------------------------------
    // AERODYNAMIC BODY
    // ---------------------------------------------------------

    const bodyShape = new THREE.Shape();

    bodyShape.moveTo(-3.4, 0);
    bodyShape.lineTo(-2.7, 0.8);
    bodyShape.lineTo(-1.4, 1.2);
    bodyShape.lineTo(-0.8, 1.85);
    bodyShape.lineTo(0.9, 1.85);
    bodyShape.lineTo(1.8, 1.35);
    bodyShape.lineTo(3.0, 1.05);
    bodyShape.lineTo(3.55, 0.35);
    bodyShape.lineTo(3.2, 0);
    bodyShape.lineTo(-3.4, 0);

    const bodyGeometry = new THREE.ExtrudeGeometry(
      bodyShape,
      {
        depth: 2.65,
        bevelEnabled: true,
        bevelSegments: 4,
        bevelSize: 0.12,
        bevelThickness: 0.12
      }
    );

    bodyGeometry.center();

    const body = new THREE.Mesh(
      bodyGeometry,
      new THREE.MeshPhysicalMaterial({
        color: 0x6e7180,
        metalness: 0.65,
        roughness: 0.18,
        transparent: true,
        opacity: 0.16,
        side: THREE.DoubleSide
      })
    );

    body.rotation.x = Math.PI / 2;
    body.position.y = 1.35;

    car.add(body);

    // ---------------------------------------------------------
    // CABIN
    // ---------------------------------------------------------

    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 1.05, 2.25),
      glassMaterial
    );

    cabin.position.set(0.15, 2.15, 0);
    cabin.rotation.z = -0.04;

    car.add(cabin);

    // Roof frame

    const roofFrame = new THREE.Mesh(
      new THREE.BoxGeometry(3.45, 0.1, 2.4),
      silverMetal
    );

    roofFrame.position.set(0.15, 2.68, 0);

    car.add(roofFrame);

    // ---------------------------------------------------------
    // FRONT / REAR SUBFRAMES
    // ---------------------------------------------------------

    function createBeam(x, z, length, rotation = 0) {

      const beam = new THREE.Mesh(
        new THREE.BoxGeometry(length, 0.12, 0.14),
        silverMetal
      );

      beam.position.set(x, 1.05, z);
      beam.rotation.y = rotation;

      car.add(beam);
    }

    createBeam(-2.7, 1.15, 1.6, 0.1);
    createBeam(-2.7, -1.15, 1.6, -0.1);

    createBeam(2.7, 1.15, 1.6, -0.1);
    createBeam(2.7, -1.15, 1.6, 0.1);

    // ---------------------------------------------------------
    // MOTORS
    // ---------------------------------------------------------

    function createMotor(x) {

      const motor = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.48,
          0.48,
          0.75,
          32
        ),
        orangeMaterial
      );

      motor.rotation.z = Math.PI / 2;
      motor.position.set(x, 0.75, 0);

      car.add(motor);

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(
          0.49,
          0.045,
          12,
          32
        ),
        new THREE.MeshStandardMaterial({
          color: 0xffb078,
          emissive: 0xff5d24,
          emissiveIntensity: 1
        })
      );

      ring.rotation.z = Math.PI / 2;
      ring.position.set(x, 0.75, 0);

      car.add(ring);
    }

    createMotor(-2.5);
    createMotor(2.5);

    // ---------------------------------------------------------
    // WHEELS
    // ---------------------------------------------------------

    function createWheel(x, z) {

      const wheel = new THREE.Group();

      const tire = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.75,
          0.75,
          0.34,
          40
        ),
        new THREE.MeshStandardMaterial({
          color: 0x08090d,
          metalness: 0.3,
          roughness: 0.72
        })
      );

      tire.rotation.x = Math.PI / 2;

      wheel.add(tire);

      const rim = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.45,
          0.45,
          0.37,
          32
        ),
        silverMetal
      );

      rim.rotation.x = Math.PI / 2;

      wheel.add(rim);

      const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.14,
          0.14,
          0.42,
          24
        ),
        orangeMaterial
      );

      hub.rotation.x = Math.PI / 2;

      wheel.add(hub);

      wheel.position.set(x, 0.72, z);

      car.add(wheel);
    }

    createWheel(-2.35, 1.48);
    createWheel(-2.35, -1.48);
    createWheel(2.35, 1.48);
    createWheel(2.35, -1.48);

    // ---------------------------------------------------------
    // SUSPENSION
    // ---------------------------------------------------------

    function createSuspension(x, z) {

      const arm = new THREE.Mesh(
        new THREE.BoxGeometry(0.95, 0.08, 0.08),
        silverMetal
      );

      arm.position.set(x, 0.88, z);
      arm.rotation.y = z > 0 ? -0.25 : 0.25;

      car.add(arm);

      const strut = new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.055,
          0.055,
          0.75,
          12
        ),
        silverMetal
      );

      strut.position.set(x, 1.25, z);

      car.add(strut);
    }

    [-1,1].forEach(side => {

      createSuspension(-2.35, side * 1.15);
      createSuspension(2.35, side * 1.15);

    });

    // ---------------------------------------------------------
    // INVERTER / POWER ELECTRONICS
    // ---------------------------------------------------------

    const inverter = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.32, 1.35),
      orangeMaterial
    );

    inverter.position.set(-0.8, 1.45, 0);

    car.add(inverter);

    // inverter fins

    for (let i = -0.5; i <= 0.5; i += 0.2) {

      const fin = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.1, 1.15),
        silverMetal
      );

      fin.position.set(
        -0.8 + i,
        1.65,
        0
      );

      car.add(fin);
    }

    // ---------------------------------------------------------
    // HIGH VOLTAGE CABLES
    // ---------------------------------------------------------

    function createCable(points, color) {

      const curve = new THREE.CatmullRomCurve3(points);

      const geometry = new THREE.TubeGeometry(
        curve,
        30,
        0.035,
        8,
        false
      );

      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.95
      });

      car.add(new THREE.Mesh(geometry, material));
    }

    createCable([
      new THREE.Vector3(-0.7,1.48,0.4),
      new THREE.Vector3(-1.5,1.25,0.5),
      new THREE.Vector3(-2.5,1.05,0)
    ],0x8b5cff);

    createCable([
      new THREE.Vector3(0.0,1.48,0),
      new THREE.Vector3(1.3,1.25,0),
      new THREE.Vector3(2.5,1.05,0)
    ],0x54eaff);

    // ---------------------------------------------------------
    // LABELS
    // ---------------------------------------------------------

    function makeLabel(text, position, color) {

      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 128;

      const ctx = canvas.getContext("2d");

      ctx.clearRect(0,0,512,128);

      ctx.font = "500 30px monospace";
      ctx.fillStyle = color;
      ctx.fillText(text,20,55);

      ctx.fillStyle = "rgba(255,255,255,.4)";
      ctx.fillRect(20,75,280,2);

      const texture = new THREE.CanvasTexture(canvas);

      const material = new THREE.SpriteMaterial({
        map:texture,
        transparent:true
      });

      const sprite = new THREE.Sprite(material);

      sprite.scale.set(2.5,0.62,1);
      sprite.position.copy(position);

      scene.add(sprite);

      return sprite;
    }

    makeLabel(
      "BATTERY // HV PACK",
      new THREE.Vector3(-3.6,0.7,0),
      "#9b7cff"
    );

    makeLabel(
      "INVERTER // SiC",
      new THREE.Vector3(-1.4,2.1,0),
      "#ff9b62"
    );

    makeLabel(
      "DUAL E-MOTOR",
      new THREE.Vector3(2.9,1.8,0),
      "#54eaff"
    );

    // ---------------------------------------------------------
    // GROUND
    // ---------------------------------------------------------

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(6.8,64),
      new THREE.MeshBasicMaterial({
        color:0x111426,
        transparent:true,
        opacity:.45
      })
    );

    ground.rotation.x = -Math.PI/2;
    ground.position.y = -0.05;

    scene.add(ground);

    // ---------------------------------------------------------
    // POSITION
    // ---------------------------------------------------------

    car.rotation.y = -0.42;
    car.rotation.x = 0.02;

    car.scale.setScalar(1.08);

    // ---------------------------------------------------------
    // RESIZE
    // ---------------------------------------------------------

    function resize() {

      const w = Math.max(container.clientWidth, 320);
      const h = Math.max(container.clientHeight, 400);

      camera.aspect = w / h;

      camera.updateProjectionMatrix();

      renderer.setSize(w,h,false);
    }

    resize();

    window.addEventListener(
      "resize",
      resize,
      {passive:true}
    );

    // ---------------------------------------------------------
    // MOUSE
    // ---------------------------------------------------------

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener(
      "mousemove",
      event => {

        mouseX =
          (event.clientX / window.innerWidth - 0.5);

        mouseY =
          (event.clientY / window.innerHeight - 0.5);

      },
      {passive:true}
    );

    // ---------------------------------------------------------
    // ANIMATION
    // ---------------------------------------------------------

    const clock = new THREE.Clock();

    function animate() {

      requestAnimationFrame(animate);

      const t = clock.getElapsedTime();

      car.rotation.y +=
        (-0.42 + mouseX * 0.18 - car.rotation.y) * 0.025;

      car.rotation.x +=
        (mouseY * -0.06 - car.rotation.x) * 0.025;

      car.position.y =
        Math.sin(t * 0.8) * 0.045;

      renderer.render(scene,camera);
    }

    animate();

  } else {

    console.warn(
      "EV container not found: #ev-container"
    );

  }
}
