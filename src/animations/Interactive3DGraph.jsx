import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Interactive3DGraph({ 
  nodeCount = 30,
  edgeCount = 50,
  width = "100%",
  height = "100%",
  nodeColor = "#ffffff",
  edgeColor = "#4299e1",
  highlightColor = "#f56565",
  rotationSpeed = 0.001,
  interactive = true,
  className = ""
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const graphRef = useRef(null);
  const frameIdRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1, 
      1000
    );
    camera.position.z = 6;
    cameraRef.current = camera;

    // Setup renderer with transparency
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    rendererRef.current = renderer;

    // Add renderer to DOM
    containerRef.current.appendChild(renderer.domElement);

    // Create graph
    createGraph();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      // Update camera aspect ratio
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      // Update renderer size
      renderer.setSize(width, height);
    };

    // Set initial size and add event listener
    handleResize();
    
    // Use ResizeObserver for more reliable size detection
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);
    
    // Also listen to window resize for fallback
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (graphRef.current) {
        // Auto rotation
        graphRef.current.rotation.x += rotationSpeed;
        graphRef.current.rotation.y += rotationSpeed * 1.3;
        
        // Interactive rotation based on mouse position if hovering
        if (isHovering && interactive) {
          const targetX = mousePosition.current.y * 0.01;
          const targetY = mousePosition.current.x * 0.01;
          
          // Apply smoother transitions for rotation
          graphRef.current.rotation.x += (targetX - graphRef.current.rotation.x) * 0.05;
          graphRef.current.rotation.y += (targetY - graphRef.current.rotation.y) * 0.05;
        }
      }
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      cancelAnimationFrame(frameIdRef.current);
      
      if (containerRef.current && renderer.domElement) {
        try {
          containerRef.current.removeChild(renderer.domElement);
        } catch (e) {
          console.error("Error removing renderer:", e);
        }
      }
      
      // Dispose resources
      scene.clear();
      renderer.dispose();
    };
  }, [rotationSpeed, interactive]);

  // Create 3D graph structure
  const createGraph = () => {
    // Create graph container
    const graph = new THREE.Group();
    sceneRef.current.add(graph);
    graphRef.current = graph;

    // Generate random nodes
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      const geometry = new THREE.SphereGeometry(0.15, 16, 16);
      const material = new THREE.MeshBasicMaterial({ color: nodeColor });
      const node = new THREE.Mesh(geometry, material);
      
      // Random position within a sphere
      const radius = 3;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      node.position.x = radius * Math.sin(phi) * Math.cos(theta);
      node.position.y = radius * Math.sin(phi) * Math.sin(theta);
      node.position.z = radius * Math.cos(phi);
      
      graph.add(node);
      nodes.push(node);
    }

    // Generate random edges between nodes
    for (let i = 0; i < edgeCount; i++) {
      const sourceIndex = Math.floor(Math.random() * nodes.length);
      const targetIndex = Math.floor(Math.random() * nodes.length);
      
      if (sourceIndex !== targetIndex) {
        const source = nodes[sourceIndex];
        const target = nodes[targetIndex];
        
        const material = new THREE.LineBasicMaterial({ color: edgeColor });
        const points = [source.position, target.position];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        
        graph.add(line);
      }
    }
  };

  // Enhanced mouse movement handling
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    // Get container dimensions and position
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to container center
    mousePosition.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mousePosition.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };

  // Touch handling for mobile devices
  const handleTouchMove = (e) => {
    if (!containerRef.current || e.touches.length === 0) return;
    
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    
    mousePosition.current.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    mousePosition.current.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Prevent scrolling when interacting with the graph
    e.preventDefault();
  };

  return (
    <div 
      ref={containerRef}
      className={`w-full h-full relative ${className}`}
      style={{ 
        width, 
        height,
        minHeight: "400px", // Ensure minimum height for visibility
      }} 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsHovering(true)}
      onTouchEnd={() => setIsHovering(false)}
      onTouchMove={handleTouchMove}
    />
  );
}