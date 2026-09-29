import DoctorSearchHeader from "../../components/shared/patient/search-doctors/doctor-search-header.shared";
import DoctorSearchBar from "../../components/shared/patient/search-doctors/doctor-search-bar.shared";
import DoctorFilterLayout from "../../components/shared/patient/search-doctors/doctor-filter-layout.shared";
import DoctorResultsHeader from "../../components/shared/patient/search-doctors/doctor-results-header.shared";
import DoctorList from "../../components/shared/patient/search-doctors/doctor-list.shared";
import DoctorPagination from "../../components/shared/patient/search-doctors/doctor-pagination.shared";
import { useDoctorSearch } from "../../hooks/useDoctorSearch";

const SearchDoctorsPage = () => {
  const {
    searchQuery,
    filters,
    sort,
    currentPage,
    totalPages,
    filteredDoctors,
    paginatedDoctors,
    isLoading,
    hasActiveFilters,
    handleSearchChange,
    handleFilterChange,
    handleClearFilters,
    handleSortChange,
    handlePageChange,
  } = useDoctorSearch();


  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      <div className="space-y-6 bg-white p-6 border border-gray-200 shadow-sm">
        <DoctorSearchHeader />

        <DoctorSearchBar value={searchQuery} onChange={handleSearchChange} />

        <DoctorFilterLayout
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        >
          <DoctorResultsHeader
            count={filteredDoctors.length}
            sort={sort}
            onSortChange={handleSortChange}
          />

          <DoctorList
            doctors={paginatedDoctors}
            isLoading={isLoading}
            onClearFilters={handleClearFilters}
          />

          <DoctorPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          
        </DoctorFilterLayout>
      </div>
    </div>
  );
};

export default SearchDoctorsPage;
