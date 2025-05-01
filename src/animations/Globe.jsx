import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Globe({
  color = "white",           // Globe color
  rotationSpeed = 0.001,     // Rotation speed
  wireframeOpacity = 0.3,    // Wireframe opacity
  showDots = true,           // Whether to show continent dots
  dotSize = 0.03,            // Size of continent dots
  className = ""             // Additional CSS classes
}) {
  const mountRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Update dimensions when container size changes
  useEffect(() => {
    const updateDimensions = () => {
      if (mountRef.current) {
        const { width, height } = mountRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    // Initial dimensions
    updateDimensions();
    
    // Set up resize observer
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (mountRef.current) {
      resizeObserver.observe(mountRef.current);
    }
    
    // Add window resize listener as backup
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Set up and animate the globe
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Use responsive aspect ratio
    const size = Math.min(dimensions.width, dimensions.height);
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    // Clear previous canvas if it exists
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    
    mountRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Convert color string to hex
    const colorToHex = (color) => {
      if (color.startsWith('#')) {
        return parseInt(color.replace('#', '0x'), 16);
      }
      // For named colors, create a temporary element to get computed color
      const tempElement = document.createElement("div");
      tempElement.style.color = color;
      document.body.appendChild(tempElement);
      const computedColor = getComputedStyle(tempElement).color;
      document.body.removeChild(tempElement);
      
      // Extract RGB values from computed color
      const rgb = computedColor.match(/\d+/g);
      if (rgb) {
        return (parseInt(rgb[0]) << 16) | (parseInt(rgb[1]) << 8) | parseInt(rgb[2]);
      }
      return 0xffffff; // Default to white if parsing fails
    };
    
    const globeHexColor = colorToHex(color);
    
    // Create globe
    const sphereGeometry = new THREE.SphereGeometry(2, 22, 22);
    
    // Create wireframe material
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: globeHexColor,
      wireframe: true,
      transparent: true,
      opacity: wireframeOpacity
    });
    
    const globe = new THREE.Mesh(sphereGeometry, wireframeMaterial);
    scene.add(globe);
    
    // Add meridians and parallels
    const latitudes = [-1.5, -1, -0.5, 0, 0.5, 1, 1.5];
    latitudes.forEach(lat => {
      const radius = Math.cos(lat) * 2;
      const height = Math.sin(lat) * 2;
      const points = [];
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(
          radius * Math.cos(angle),
          height,
          radius * Math.sin(angle)
        ));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: globeHexColor, 
        transparent: true, 
        opacity: wireframeOpacity - 0.1 
      });
      const circle = new THREE.Line(geometry, material);
      globe.add(circle);
    });
    
    // Add some longitude circles
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI;
      const points = [];
      for (let j = 0; j <= 64; j++) {
        const a = (j / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(
          2 * Math.cos(a) * Math.cos(angle),
          2 * Math.sin(a),
          2 * Math.cos(a) * Math.sin(angle)
        ));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: globeHexColor, 
        transparent: true, 
        opacity: wireframeOpacity - 0.1 
      });
      const circle = new THREE.Line(geometry, material);
      globe.add(circle);
    }
    
    if (showDots) {
      // Create simplified world map with dots
      const createDot = (lat, lng) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        
        const x = -2 * Math.sin(phi) * Math.cos(theta);
        const y = 2 * Math.cos(phi);
        const z = 2 * Math.sin(phi) * Math.sin(theta);
        
        const dotGeometry = new THREE.SphereGeometry(dotSize, 8, 8);
        const dotMaterial = new THREE.MeshBasicMaterial({ color: globeHexColor });
        const dot = new THREE.Mesh(dotGeometry, dotMaterial);
        
        dot.position.set(x, y, z);
        return dot;
      };
      
      // North America
      const northAmerica = [
        [40, -100], [50, -100], [60, -100], [40, -80], [50, -80],
        [30, -100], [30, -90], [30, -80], [40, -90], [50, -90],
        [45, -75], [55, -70], [35, -105], [45, -110], [35, -120]
      ];
      
      // South America
      const southAmerica = [
        [0, -60], [-10, -60], [-20, -60], [-30, -60], [-10, -70],
        [-20, -70], [-30, -70], [0, -70], [-10, -50], [-20, -50],
        [-30, -50], [-40, -70], [-10, -40], [-20, -40], [-30, -40]
      ];
      
      // Europe
      const europe = [
        [50, 10], [55, 10], [60, 10], [50, 15], [55, 15],
        [45, 10], [45, 15], [45, 20], [50, 20], [55, 20],
        [40, 0], [50, 0], [60, 0], [40, 20], [40, 10]
      ];
      
      // Africa
      const africa = [
        [0, 20], [10, 20], [20, 20], [0, 30], [10, 30],
        [-10, 20], [-20, 20], [-30, 20], [-10, 30], [-20, 30],
        [0, 10], [10, 10], [-10, 10], [-20, 10], [20, 30]
      ];
      
      // Asia
      const asia = [
        [30, 80], [40, 80], [50, 80], [60, 80], [30, 90],
        [40, 90], [50, 90], [60, 90], [30, 100], [40, 100],
        [50, 100], [60, 100], [30, 70], [40, 70], [50, 70],
        [70, 80], [20, 80], [10, 80], [70, 100], [70, 120]
      ];
      
      // Australia
      const australia = [
        [-20, 130], [-30, 130], [-20, 140], [-30, 140], [-20, 150],
        [-30, 150], [-25, 135], [-35, 145], [-25, 145], [-35, 135]
      ];
      
      // Add all continent dots
      [...northAmerica, ...southAmerica, ...europe, ...africa, ...asia, ...australia].forEach(([lat, lng]) => {
        globe.add(createDot(lat, lng));
      });
    }
    
    // Position camera
    camera.position.z = 5;
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    
    const handleMouseMove = (event) => {
      // Get container dimensions and position
      const rect = mountRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to container center
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Update target rotation based on mouse position
      targetRotationX = mouseY * 0.5;
      targetRotationY = mouseX * 0.5;
    };
    
    // Add event listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation
    let animationFrameId;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Auto-rotation
      globe.rotation.y += rotationSpeed;
      
      // Smooth transition to mouse-controlled rotation
      globe.rotation.x += (targetRotationX - globe.rotation.x) * 0.05;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [dimensions, color, rotationSpeed, wireframeOpacity, showDots, dotSize]);
  
  return (
    <div 
      ref={mountRef} 
      className={`w-full h-full ${className}`}
      style={{ aspectRatio: '1/1', maxWidth: '110%' }}
    />
  );
}