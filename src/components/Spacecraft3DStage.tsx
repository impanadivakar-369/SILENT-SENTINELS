import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { SentinelMission } from '../data/sentinelsData';
import { buildSpacecraft3DModel } from '../utils/spacecraftModels3D';
import { getLunarTextures, getMarsTextures, isSoftwareGl } from '../utils/spaceTextures3D';

interface Spacecraft3DStageProps {
  mission: SentinelMission;
  yawDeg: number;
  pitchDeg: number;
  zoom: number;
  onProjectedHotspotsChange?: (coords: Record<string, { x: number; y: number }>) => void;
}

const _tempVec3 = new THREE.Vector3();

export const Spacecraft3DStage: React.FC<Spacecraft3DStageProps> = ({
  mission,
  yawDeg,
  pitchDeg,
  zoom,
  onProjectedHotspotsChange
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const requestRenderRef = useRef<(() => void) | null>(null);
  const targetStateRef = useRef({ yawDeg, pitchDeg, zoom });
  const callbackRef = useRef(onProjectedHotspotsChange);

  useEffect(() => {
    callbackRef.current = onProjectedHotspotsChange;
  }, [onProjectedHotspotsChange]);

  useEffect(() => {
    targetStateRef.current = { yawDeg, pitchDeg, zoom };
    requestRenderRef.current?.();
  }, [yawDeg, pitchDeg, zoom]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = Math.max(320, container.clientWidth || 640);
    const height = Math.max(240, container.clientHeight || 400);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#060911');
    scene.fog = new THREE.FogExp2('#060911', 0.045);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 120);
    camera.position.set(0, 1.15, 5.4);
    camera.lookAt(0, -0.15, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Environment Reflection (RoomEnvironment + PMREMGenerator)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // 3-Point Warm/Cool Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight('#93C5FD', '#1E293B', 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight('#FFFBEB', 2.6);
    keyLight.position.set(5.5, 7.5, 5.0);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#38BDF8', 1.35);
    rimLight.position.set(-5.0, 2.5, -4.5);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight('#FDE047', 0.65);
    fillLight.position.set(-3.5, -2.0, 4.0);
    scene.add(fillLight);

    // 3D Starfield Background
    const starCount = 320;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 18 + Math.random() * 28;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = -Math.abs(r * Math.cos(phi)) - 6;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: new THREE.Color('#E2E8F0'),
      size: 0.12,
      transparent: true,
      opacity: 0.85
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Distant 3D Planet / Moon Backdrop Sphere in Deep Space
    const backdropGroup = new THREE.Group();
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    if (mission.region === 'moon') {
      // Distant blue Earth rising over the Lunar horizon
      const earthSphere = new THREE.Mesh(
        new THREE.SphereGeometry(1.35, 32, 32),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color('#2563EB'),
          emissive: new THREE.Color('#1D4ED8'),
          emissiveIntensity: 0.25,
          roughness: 0.45
        })
      );
      earthSphere.position.set(5.2, 3.2, -11.5);
      backdropGroup.add(earthSphere);
    } else if (mission.region === 'mars') {
      // Rusty Martian horizon glow + Phobos moonlet
      const phobos = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.65, 2),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color('#A8A29E'),
          roughness: 0.9
        })
      );
      phobos.scale.set(1.35, 0.95, 1.0);
      phobos.position.set(-4.8, 3.1, -10.5);
      backdropGroup.add(phobos);
    } else {
      // Deep Space backdrop: Jupiter, Saturn with rings, or Ceres
      if (mission.illustrationType === 'pioneer-11') {
        const saturn = new THREE.Mesh(
          new THREE.SphereGeometry(2.6, 36, 36),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color('#EAB308'),
            roughness: 0.65
          })
        );
        saturn.position.set(5.5, 1.8, -11.5);
        const rings = new THREE.Mesh(
          new THREE.RingGeometry(3.2, 5.2, 64),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color('#FDE68A'),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.72,
            roughness: 0.5
          })
        );
        rings.position.copy(saturn.position);
        rings.rotation.set(1.15, 0.35, 0.2);
        backdropGroup.add(saturn);
        backdropGroup.add(rings);
      } else if (mission.illustrationType === 'pioneer-10') {
        const { colorMap } = getMarsTextures(maxAniso);
        const jupiter = new THREE.Mesh(
          new THREE.SphereGeometry(3.4, 36, 36),
          new THREE.MeshStandardMaterial({
            map: colorMap,
            color: new THREE.Color('#F59E0B'),
            roughness: 0.6
          })
        );
        jupiter.position.set(5.8, 1.5, -12.0);
        backdropGroup.add(jupiter);
      } else if (mission.illustrationType === 'voyager-1') {
        // Distant "Pale Blue Dot" Earth in a sunbeam + Heliopause interstellar bow glow
        const paleBlueDot = new THREE.Mesh(
          new THREE.SphereGeometry(0.22, 24, 24),
          new THREE.MeshBasicMaterial({
            color: new THREE.Color('#60A5FA')
          })
        );
        paleBlueDot.position.set(4.6, 1.8, -11.0);
        backdropGroup.add(paleBlueDot);

        const heliopauseArc = new THREE.Mesh(
          new THREE.RingGeometry(4.2, 4.45, 64),
          new THREE.MeshBasicMaterial({
            color: new THREE.Color('#38BDF8'),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.32
          })
        );
        heliopauseArc.position.set(3.2, 1.2, -12.5);
        heliopauseArc.rotation.set(0.3, -0.4, 0.2);
        backdropGroup.add(heliopauseArc);
      } else {
        const { colorMap, bumpMap } = getLunarTextures(maxAniso);
        const body = new THREE.Mesh(
          new THREE.SphereGeometry(2.4, 32, 32),
          new THREE.MeshStandardMaterial({
            map: colorMap,
            bumpMap,
            bumpScale: 0.05,
            roughness: 0.85
          })
        );
        body.position.set(4.8, 1.6, -10.5);
        backdropGroup.add(body);
      }
    }
    scene.add(backdropGroup);

    // Build Multi-Part 3D Spacecraft Model + Environment + 3D Hotspot Anchors
    const { craftGroup, environmentGroup, hotspotAnchors } = buildSpacecraft3DModel(
      mission,
      maxAniso
    );
    const rootTurntable = new THREE.Group();
    rootTurntable.add(craftGroup);
    rootTurntable.add(environmentGroup);
    scene.add(rootTurntable);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let currentYaw = (targetStateRef.current.yawDeg * Math.PI) / 180;
    let currentPitch = (targetStateRef.current.pitchDeg * Math.PI) / 180;
    let currentZoom = targetStateRef.current.zoom;

    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let unmounted = false;
    let isVisible = true;

    function updateHotspotProjections() {
      if (!callbackRef.current) return;
      const projected: Record<string, { x: number; y: number }> = {};
      rootTurntable.updateMatrixWorld(true);

      for (const [id, localAnchor] of Object.entries(hotspotAnchors)) {
        _tempVec3.copy(localAnchor);
        craftGroup.localToWorld(_tempVec3);
        _tempVec3.project(camera);

        const screenX = Math.max(10, Math.min(90, ((_tempVec3.x + 1) / 2) * 100));
        const screenY = Math.max(14, Math.min(86, ((-_tempVec3.y + 1) / 2) * 100));
        projected[id] = {
          x: Number(screenX.toFixed(1)),
          y: Number(screenY.toFixed(1))
        };
      }
      callbackRef.current(projected);
    }

    function requestRender() {
      if (unmounted || !isVisible) return;
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame(() => {
        if (unmounted) return;
        renderDirty = false;

        const targetYaw = (targetStateRef.current.yawDeg * Math.PI) / 180;
        const targetPitch = (targetStateRef.current.pitchDeg * Math.PI) / 180;
        const targetZoom = targetStateRef.current.zoom;

        currentYaw = THREE.MathUtils.lerp(currentYaw, targetYaw, 0.25);
        currentPitch = THREE.MathUtils.lerp(currentPitch, targetPitch, 0.25);
        currentZoom = THREE.MathUtils.lerp(currentZoom, targetZoom, 0.25);
        if (
          Math.abs(currentYaw - targetYaw) > 0.001 ||
          Math.abs(currentPitch - targetPitch) > 0.001 ||
          Math.abs(currentZoom - targetZoom) > 0.001
        ) {
          renderDirty = true;
        }

        rootTurntable.rotation.y = currentYaw;
        rootTurntable.rotation.x = currentPitch;

        const distance = 5.1 / Math.max(0.75, Math.min(3.0, currentZoom));
        camera.position.set(0, 0.68 * (distance / 5.1), distance);
        camera.lookAt(0, -0.34, 0);

        renderer.render(scene, camera);
        updateHotspotProjections();

        renderBusy = false;
        if (renderDirty && !unmounted && isVisible) {
          requestRender();
        }
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry ? entry.isIntersecting : true;
        if (isVisible && !unmounted) {
          requestRender();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    requestRenderRef.current = requestRender;
    requestRender();

    const handleResize = () => {
      if (!container || unmounted) return;
      const w = Math.max(300, container.clientWidth);
      const h = Math.max(220, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      requestRender();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      unmounted = true;
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      envTexture.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, [mission]);

  return <div ref={mountRef} className="w-full h-full" />;
};
