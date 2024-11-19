import Link from 'core/atoms/Link';
import { SearchResultCard } from 'src/global';

const SectorsSearchResults = ({ searchList }: { searchList: SearchResultCard[] }): JSX.Element => {
  return (
    <div data-testid="sector-search-results-list">
      <div className="flex flex-col gap-y-[0.625rem]">
        {searchList?.map((item: SearchResultCard) => {
          return (
            <Link
              key={item.id}
              field={{ value: { href: item.url } }}
              editable={false}
              className="col-start-2"
            >
              <h4 className="text-base font-arial font-normal hover:font-bold">{item.name}</h4>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SectorsSearchResults;
