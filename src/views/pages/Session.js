import React from 'react';
import * as THREE from '../../three.module'
import { TubePainter } from '../../TubePainter';
import { ARButton } from '../../ARButton';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    position: 'relative',
    zIndex: 10000000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  anchorOptions: {
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8px',
    padding: '8px',
    background: '#3f51b5',
    borderRadius: '8px',
    color: 'white',
    gap: '32px'
  },
  anchor: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    borderRadius: '50px',
    padding: '8px',
    cursor: 'pointer',
    '&:hover': {
      background: 'white',
      color: 'black'
    }
  },
}));

const Session = () => {
  const classes = useStyles();

  let sessionID = 460853 /* Math.floor(Math.random() * 999999) + 100000 */;

  let container;
  let camera,
    scene,
    renderer;
  let controller,
    painter;
  const cursor = new THREE.Vector3();
  init();
  animate();

  function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
    //
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);
    //
    document.body.appendChild(ARButton.createButton(renderer));
    // model
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0, 1, 0);
    scene.add(light);
    // 
    painter = new TubePainter();
    painter.setSize(0.4);
    painter
      .mesh
      .material
      .side = THREE.DoubleSide;
    scene.add(painter.mesh);
    //
    function onSelectStart() {
      this.userData.isSelecting = true;
      this.userData.skipFrames = 2;
    }
    function onSelectEnd() {
      this.userData.isSelecting = false;
    }
    controller = renderer.xr.getController(0);
    controller.addEventListener('selectstart', onSelectStart);
    controller.addEventListener('selectend', onSelectEnd);
    controller.userData.skipFrames = 0;
    scene.add(controller);
    //
    window.addEventListener('resize', onWindowResize);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  //
  function handleController(controller) {
    const userData = controller.userData;
    cursor.set(0, 0, -0.1).applyMatrix4(controller.matrixWorld);
    if (userData.isSelecting === true) {
      if (userData.skipFrames >= 0) {
        userData.skipFrames--;
        painter.moveTo(cursor);
      } else {
        painter.lineTo(cursor);
        painter.update();
      }
    }
  }
  function animate() {
    renderer.setAnimationLoop(render);
  }
  function render() {
    handleController(controller);
    renderer.render(scene, camera);
  }

  return (
    <div className={classes.container}>
      {/* <p>{sessionID}</p> */}
      <div className={classes.anchorOptions}>
        <div className={classes.anchor}>
          {/* <svg
            style={{
              width: "24px",
              height: "24px",
              marginRight: '8px',
            }}
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M9.75 20.85C11.53 20.15 11.14 18.22 10.24 17C9.35 15.75 8.12 14.89 6.88 14.06C6 13.5 5.19 12.8 4.54 12C4.26 11.67 3.69 11.06 4.27 10.94C4.86 10.82 5.88 11.4 6.4 11.62C7.31 12 8.21 12.44 9.05 12.96L10.06 11.26C8.5 10.23 6.5 9.32 4.64 9.05C3.58 8.89 2.46 9.11 2.1 10.26C1.78 11.25 2.29 12.25 2.87 13.03C4.24 14.86 6.37 15.74 7.96 17.32C8.3 17.65 8.71 18.04 8.91 18.5C9.12 18.94 9.07 18.97 8.6 18.97C7.36 18.97 5.81 18 4.8 17.36L3.79 19.06C5.32 20 7.88 21.47 9.75 20.85M20.84 5.25C21.06 5.03 21.06 4.67 20.84 4.46L19.54 3.16C19.33 2.95 18.97 2.95 18.76 3.16L17.74 4.18L19.82 6.26M11 10.92V13H13.08L19.23 6.85L17.15 4.77L11 10.92Z" />
          </svg> */}

          <Typography>ID da sessão: {sessionID}</Typography>
        </div>

        {/* <div className={classes.anchor} onClick={handleFreeDrawingClick}>
          <svg
            style={{
              width: "24px",
              height: "24px",
              marginRight: '8px',
            }}
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M19.92,12.08L12,20L4.08,12.08L5.5,10.67L11,16.17V2H13V16.17L18.5,10.66L19.92,12.08M12,20H2V22H22V20H12Z" />
          </svg>

          <Typography>Indicador</Typography>
        </div> */}
      </div>
    </div>
  );
}

export default Session;