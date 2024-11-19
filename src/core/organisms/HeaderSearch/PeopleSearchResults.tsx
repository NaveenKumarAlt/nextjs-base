import Link from 'core/atoms/Link';
import { SearchResultCard } from 'src/global';
import Image from 'next/image';

const PeopleSearchResults = ({ searchList }: { searchList: SearchResultCard[] }): JSX.Element => {
  return (
    <div
      className="grid grid-cols-1 gap-y-[1.25rem] md:grid-cols-4 pt-[0.438rem]"
      data-testid="people-search-results-list"
    >
      {searchList?.map((item: SearchResultCard) => {
        return (
          <Link
            field={{ value: { href: item.url } }}
            editable={false}
            className="flex md:grid md:grid-cols-2 hover:font-bold"
            key={item.id}
          >
            {item.profile_image && (
              <div className="bg-extraLightGrey rounded-full h-[6.25rem] w-[7rem] overflow-hidden col-span-2 md:col-span-1 row-span1 md:row-span-5 flex mr-[1.25rem]">
                <Image
                  className="w-[100%] transform !max-h-none h-auto scale-75 object-[center_0.125rem] object-cover max-w-[18rem] m-auto"
                  src={item.profile_image}
                  alt="profile image"
                  width="412"
                  height="512"
                />
              </div>
            )}
            <div className="flex flex-col md:grid">
              <div className="col-start-1">
                <h4 className="text-base font-bold font-arial">{item.name}</h4>
              </div>
              <div className="col-start-1">
                <p className="text-[0.625rem] font-arial font-normal leading-[140%]">
                  {item.authorrole}
                </p>
              </div>
              <div className="col-start-1">
                {item.jurisdictions && item.jurisdictions.length > 0 && (
                  <p className="text-[0.625rem]">{item.jurisdictions.join(', ')}</p>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PeopleSearchResults;
