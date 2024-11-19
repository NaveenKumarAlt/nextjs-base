/* eslint-disable react-hooks/exhaustive-deps */
import PaginationExpand from 'core/atoms/Icons/PaginationExpand';
import CheckboxItem from 'core/molecules/JurisdictionCheckbox/JurisdictionCheckbox';
import { useI18n } from 'next-localization';
import { useState } from 'react';

interface JurisdictionFilterProps {
  jurisdictionsFilters: JurisdictionItem[];
  selectedFilters: string[];
  toggleFilter: (id: string) => void;
}
export interface Widgets {
  widgets: {
    facet: [
      {
        label: string;
        name: string;
        value: Array<JurisdictionItem>;
      },
    ];
  }[];
}

interface JurisdictionItem {
  id: string;
  text: string;
}

const JurisdictionFilter = ({
  selectedFilters,
  jurisdictionsFilters,
  toggleFilter,
}: JurisdictionFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();
  const selectedFiltersNames = jurisdictionsFilters
    .filter((filter) => selectedFilters.includes(filter.id))
    .map((filter) => filter.text)
    .join(', ');
  const isScrollEnabled = jurisdictionsFilters.length > 10;

  if (!jurisdictionsFilters?.length) {
    return null;
  }

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="flex w-full min-h-[3.125rem] relative border border-solid placeholder-aubergine border-aubergine rounded-xxl py-[0.75rem] px-[1.25rem] text-left text-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`relative text-ellipsis overflow-hidden whitespace-nowrap mr-[1.25rem] ${
            selectedFiltersNames ? 'top-[0.313rem] text-black ml-[0.25rem]' : ''
          }`}
        >
          {selectedFiltersNames || t('JurisdictionFilterTitle')}
        </span>
        <PaginationExpand
          className={`${
            isOpen ? 'rotate-[270deg]' : 'rotate-[90deg]'
          } absolute right-[1.375rem] top-[1rem]`}
        />
        {selectedFiltersNames && (
          <span className="absolute text-[0.625rem] leading-[140%] font-arial text-black left-[1.563rem] top-[0.5rem]">
            {t('JurisdictionFilterTitle')}
          </span>
        )}
      </button>
      {isOpen && (
        <ul
          className={`top-[3.75rem] lg:top-[4.25rem] max-h-[100vh] w-full absolute z-20 bg-mainPurple text-white ${
            isScrollEnabled ? 'overflow-y-scroll h-[25rem]' : ''
          }`}
        >
          {jurisdictionsFilters?.map((checkbox) => {
            return (
              <CheckboxItem
                checkbox={checkbox}
                key={checkbox.id}
                isChecked={!!selectedFilters.includes(checkbox.id)}
                toggleIsChecked={() => toggleFilter(checkbox.id)}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default JurisdictionFilter;
