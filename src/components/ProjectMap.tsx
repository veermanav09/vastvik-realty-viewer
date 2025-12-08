import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, GraduationCap, Building2, ShoppingBag, Stethoscope } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

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

const categoryConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  education: { color: '#3b82f6', icon: GraduationCap, label: 'Education' },
  hospital: { color: '#ef4444', icon: Stethoscope, label: 'Hospitals' },
  corporate: { color: '#8b5cf6', icon: Building2, label: 'Corporate' },
  retail: { color: '#10b981', icon: ShoppingBag, label: 'Retail' },
};

const ProjectMap = ({ projectName, projectLocation, nearbyPlaces = [] }: ProjectMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    new Set(['education', 'hospital', 'corporate', 'retail'])
  );

  const toggleCategory = (category: string) => {
    setActiveCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = 'pk.eyJ1IjoidmVlcm1hbmF2IiwiYSI6ImNtaG42emxocjI1dTMya3M3Nno3NWFsOWsifQ.kCFCoF-9Xo5MG0SKEFpDpg';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [projectLocation.lng, projectLocation.lat],
        zoom: 13,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add project location marker (always visible)
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

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, [projectName, projectLocation]);

  // Update markers when activeCategories change
  useEffect(() => {
    if (!map.current) return;

    // Remove existing nearby place markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Filter and add markers based on active categories
    const filteredPlaces = nearbyPlaces.filter(place => activeCategories.has(place.category));

    filteredPlaces.forEach((place) => {
      if (!map.current) return;
      
      const markerElement = document.createElement('div');
      markerElement.className = 'w-6 h-6 rounded-full border-2 border-white shadow-md cursor-pointer transition-transform hover:scale-110';
      markerElement.style.backgroundColor = categoryConfig[place.category]?.color || '#6b7280';

      const marker = new mapboxgl.Marker({ element: markerElement })
        .setLngLat([place.lng, place.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 15 }).setHTML(
            `<div class="p-2"><h4 class="font-semibold text-sm mb-1">${place.name}</h4><p class="text-xs text-muted-foreground capitalize">${place.category}</p></div>`
          )
        )
        .addTo(map.current);

      markersRef.current.push(marker);
    });

    // Fit bounds to show visible markers
    if (filteredPlaces.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend([projectLocation.lng, projectLocation.lat]);
      filteredPlaces.forEach(place => {
        bounds.extend([place.lng, place.lat]);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [activeCategories, nearbyPlaces, projectLocation]);

  return (
    <div className="bg-card rounded-3xl p-8 card-shadow">
      <h2 className="font-heading font-bold text-3xl mb-4 flex items-center gap-2">
        <MapPin className="w-8 h-8 text-primary" />
        Interactive Location Map
      </h2>
      
      {/* Filter Toggles */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(categoryConfig).map(([category, { color, icon: Icon, label }]) => (
          <Toggle
            key={category}
            pressed={activeCategories.has(category)}
            onPressedChange={() => toggleCategory(category)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all data-[state=on]:border-transparent"
            style={{
              backgroundColor: activeCategories.has(category) ? color : 'transparent',
              borderColor: activeCategories.has(category) ? color : 'hsl(var(--border))',
              color: activeCategories.has(category) ? 'white' : 'inherit',
            }}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{label}</span>
            <span className="text-xs opacity-75">
              ({nearbyPlaces.filter(p => p.category === category).length})
            </span>
          </Toggle>
        ))}
      </div>

      <div className="space-y-4">
        <div ref={mapContainer} className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg" />
        
        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-md"></div>
            <span className="text-sm">Project</span>
          </div>
          {Object.entries(categoryConfig).map(([category, { color, label }]) => (
            <div key={category} className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full border-2 border-white shadow-md" 
                style={{ backgroundColor: color }}
              />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectMap;
