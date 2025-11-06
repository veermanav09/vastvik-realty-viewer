import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface ProjectMapProps {
  projectName: string;
  projectLocation: {
    lat: number;
    lng: number;
  };
  nearbyPlaces?: {
    name: string;
    category: string;
    lat: number;
    lng: number;
  }[];
}

const ProjectMap = ({ projectName, projectLocation, nearbyPlaces = [] }: ProjectMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSubmitted, setTokenSubmitted] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !tokenSubmitted || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [projectLocation.lng, projectLocation.lat],
        zoom: 13,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add project location marker (primary)
      const projectMarker = document.createElement('div');
      projectMarker.className = 'w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg flex items-center justify-center cursor-pointer';
      projectMarker.innerHTML = '<div class="w-3 h-3 bg-white rounded-full"></div>';

      new mapboxgl.Marker({ element: projectMarker })
        .setLngLat([projectLocation.lng, projectLocation.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div class="p-2"><h3 class="font-bold text-base mb-1">${projectName}</h3><p class="text-sm text-muted-foreground">Project Location</p></div>`
          )
        )
        .addTo(map.current);

      // Add nearby places markers
      const categoryColors: Record<string, string> = {
        education: '#3b82f6',
        hospital: '#ef4444',
        corporate: '#8b5cf6',
        retail: '#10b981',
      };

      nearbyPlaces.forEach((place) => {
        if (!map.current) return;
        
        const markerElement = document.createElement('div');
        markerElement.className = 'w-6 h-6 rounded-full border-2 border-white shadow-md cursor-pointer';
        markerElement.style.backgroundColor = categoryColors[place.category] || '#6b7280';

        new mapboxgl.Marker({ element: markerElement })
          .setLngLat([place.lng, place.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 15 }).setHTML(
              `<div class="p-2"><h4 class="font-semibold text-sm mb-1">${place.name}</h4><p class="text-xs text-muted-foreground capitalize">${place.category}</p></div>`
            )
          )
          .addTo(map.current);
      });

      // Fit bounds to show all markers
      if (nearbyPlaces.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        bounds.extend([projectLocation.lng, projectLocation.lat]);
        nearbyPlaces.forEach(place => {
          bounds.extend([place.lng, place.lat]);
        });
        map.current.fitBounds(bounds, { padding: 50 });
      }
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, [tokenSubmitted, mapboxToken, projectName, projectLocation, nearbyPlaces]);

  if (!tokenSubmitted) {
    return (
      <div className="bg-card rounded-3xl p-8 card-shadow">
        <h2 className="font-heading font-bold text-3xl mb-4 flex items-center gap-2">
          <MapPin className="w-8 h-8 text-primary" />
          Interactive Location Map
        </h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            To view the interactive map with project location and nearby landmarks, please enter your Mapbox public token.
          </p>
          <p className="text-sm text-muted-foreground">
            Get your free token at{' '}
            <a
              href="https://account.mapbox.com/access-tokens/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com/account/access-tokens
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="pk.eyJ1IjoieW91cl91c2VybmFtZSIsImEiOiJjb..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={() => setTokenSubmitted(true)}
              disabled={!mapboxToken.trim()}
            >
              Load Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl p-8 card-shadow">
      <h2 className="font-heading font-bold text-3xl mb-4 flex items-center gap-2">
        <MapPin className="w-8 h-8 text-primary" />
        Interactive Location Map
      </h2>
      <div className="space-y-4">
        <div ref={mapContainer} className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg" />
        
        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-md"></div>
            <span className="text-sm">Project</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: '#3b82f6' }}></div>
            <span className="text-sm">Education</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: '#ef4444' }}></div>
            <span className="text-sm">Hospital</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: '#8b5cf6' }}></div>
            <span className="text-sm">Corporate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectMap;
