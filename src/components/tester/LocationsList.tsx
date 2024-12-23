import React from 'react';
import { MapPin } from 'lucide-react';
import type { GBPLocation } from '../../types/gbp-fields';

interface LocationsListProps {
  locations: GBPLocation[];
}

export default function LocationsList({ locations }: LocationsListProps) {
  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center gap-4 mb-4">
        <MapPin size={24} className="text-green-600" />
        <h2 className="text-xl font-semibold">Locations ({locations.length})</h2>
      </div>
      <pre className="bg-gray-50 p-4 rounded-lg overflow-auto">
        {JSON.stringify(locations, null, 2)}
      </pre>
    </div>
  );
}