interface PropertyFiltersProps {
  searchTerm: string;
  filterType: string;
  filteredCount: number;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export default function PropertyFilters({
  searchTerm,
  filterType,
  filteredCount,
  onSearchChange,
  onTypeChange
}: PropertyFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Properties
          </label>
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type Filter
          </label>
          <select
            value={filterType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="apartment">Appartement</option>
            <option value="house">Maison</option>
            <option value="villa">Villa</option>
            <option value="land">Terrain</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div className="flex items-end">
          <span className="text-sm text-gray-600">
            {filteredCount} properties found
          </span>
        </div>
      </div>
    </div>
  );
} 