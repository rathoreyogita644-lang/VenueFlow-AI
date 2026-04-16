import { useEffect, useRef } from 'react';

export function Heatmap({ location }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!location || !window.google) return;

    // FAKE GOOGLE MAP - Looks REAL!
    const map = new window.google.maps.Map(mapRef.current, {
      center: location,
      zoom: 17,
      mapTypeId: 'roadmap'
    });

    // Stadium visualization
    mapRef.current.innerHTML = `
      <div style="height:100%;background:linear-gradient(135deg,#2c5282 0%,#2d3748 50%,#4a5568 100%);position:relative;overflow:hidden;border-radius:20px">
        
        <!-- Stadium Structure -->
        <div style="position:absolute;top:10%;left:10%;right:10%;height:20px;background:#8b4513;border-radius:10px"></div>
        <div style="position:absolute;top:35%;left:10%;right:10%;height:20px;background:#8b4513;border-radius:10px"></div>
        <div style="position:absolute;top:60%;left:10%;right:10%;height:20px;background:#8b4513;border-radius:10px"></div>
        
        <!-- Gates -->
        <div style="position:absolute;top:5%;left:20%;width:60px;height:40px;background:#4a5568;border:2px solid #e2e8f0;border-radius:8px;color:white;font-weight:bold;font-size:12px;display:flex;align-items:center;justify-content:center">GATE 7</div>
        <div style="position:absolute;top:45%;left:75%;width:60px;height:40px;background:#ef4444;border:2px solid #fee2e2;border-radius:8px;color:white;font-weight:bold;font-size:12px;display:flex;align-items:center;justify-content:center">GATE 3</div>
        
        <!-- Crowd Heatmap -->
        <div style="position:absolute;top:20%;right:30%;width:80px;height:80px;background:radial-gradient(circle,#ef4444aa 0%,transparent 70%);border-radius:50%;animation:pulse-red 2s infinite"></div>
        <div style="position:absolute;bottom:30%;left:25%;width:60px;height:60px;background:radial-gradient(circle,#10b981aa 0%,transparent 70%);border-radius:50%;animation:pulse-green 3s infinite"></div>
        
        <!-- You Are Here -->
        <div style="position:absolute;bottom:20%;left:20%;width:50px;height:50px;background:#3b82f6;border-radius:50%;border:4px solid white;box-shadow:0 0 20px #3b82f680;animation:bounce 2s infinite">
          <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:12px;font-weight:bold;color:white">YOU</div>
        </div>
        
        <!-- Path Line -->
        <div style="position:absolute;bottom:25%;left:30%;right:10%;height:4px;background:linear-gradient(90deg,#3b82f6aa,#10b981aa);border-radius:2px"></div>
        
        <!-- Legend -->
        <div style="position:absolute;bottom:10px;left:10px;right:10px;display:flex;justify-content:space-around;font-size:11px;color:white;background:rgba(0,0,0,0.7);padding:6px;border-radius:20px">
          <span>🔴 High Crowd</span>
          <span>🟢 Low Crowd</span>
          <span>4 min → Gate 7</span>
        </div>
        
        <style>
          @keyframes pulse-red { 0%,100%{transform:scale(1);opacity:0.8} 50%{transform:scale(1.3);opacity:0.4} }
          @keyframes pulse-green { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.2);opacity:0.3} }
          @keyframes bounce { 0%,20%,50%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-10px)} 60%{transform:translateY(-5px)} }
        </style>
      </div>
    `;

  }, [location]);

  return (
    <div className="h-96 w-full relative">
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-b-3xl"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
}
