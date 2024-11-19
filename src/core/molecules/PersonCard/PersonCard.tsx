import {
  Text,
  useSitecoreContext,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { AuthorCardsProps, OfficeType } from 'core/atoms/Authors/types';
import Link from 'core/atoms/Link';
import Image from 'core/atoms/Image';
import { usePersonTitle } from 'hooks/usePersonTitle';
import { getImage } from 'utils/imageResolver';

interface PersonCardProps extends AuthorCardsProps {
  styleClassName: string;
}

interface DataLayerEvent {
  event: string;
  author_name?: string | number | undefined;
  author_designation?: string;
  author_location?: string;
}

const PersonCard = (props: PersonCardProps): JSX.Element => {
  const { url, profileImage, alternateTitle, professionalTitle, role, offices, styleClassName } =
    props;
  const handleAuthorClick = (name: string | number | undefined, title: string) => {
    const eventData: DataLayerEvent = {
      event: 'author_click',
      author_name: name,
      author_designation: title,
      author_location: offices?.targetItems.map((office) => office.title?.value).join(','),
    };
    window.dataLayer.push(eventData);
  };
  const { getTitle } = usePersonTitle();
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  const hasValues =
    profileImage?.jsonValue?.value?.src ||
    alternateTitle.jsonValue?.value ||
    professionalTitle?.targetItems?.[0]?.title?.value?.toString() ||
    '' ||
    role?.value ||
    offices?.targetItems.length ||
    isEditing;

  const professional_title = getTitle(professionalTitle?.targetItems?.[0]?.title?.value);

  const image = getImage(profileImage.jsonValue);

  if (!hasValues) {
    return <></>;
  }

  return (
    <Link
      editable={false}
      field={{ value: { href: url?.path || '#' } }}
      className={`bg-extraLightGrey w-full border-x-[1.375rem] md:border-0 border-white border-solid md:mb-0 ${styleClassName} flex flex-col md:hover:shadow-custom text-black md:h-auto h-full`}
      onClick={() =>
        handleAuthorClick(
          alternateTitle?.jsonValue?.value,
          professionalTitle?.targetItems?.[0]?.title.value
        )
      }
      data-testid="person-card"
    >
      <div className="h-[12.188rem] relative overflow-hidden print:min-h-[12.188rem] justify-center border-b-[0.188rem] border-b-darkGrey">
        {profileImage?.jsonValue?.value?.src && (
          <Image
            className="w-[100%] transform origin-top !max-h-none h-auto scale-75 object-[center_0.625rem] object-cover max-w-[18rem] m-auto"
            field={{
              value: {
                src: image?.src || '',
                alt: image?.alt,
                width: 412,
                height: 515,
              },
            }}
            editable={false}
          />
        )}
      </div>
      <div className="pt-[1.563rem] print:min-h-[11.875rem] pb-[2rem] pl-[1.25rem] pr-[2.125rem]">
        <h3 className="font-bold text-2xl font-arial leading-[normal]">
          {alternateTitle?.jsonValue?.value}
        </h3>
        {professional_title && (
          <Text
            tag="p"
            field={{ value: professional_title }}
            className="text-base leading-[156%]"
          />
        )}
        <JssRichText tag="p" field={role} className="text-base leading-[156%]" />
        {offices?.targetItems.map((office: OfficeType, index: number) => {
          const isLastItem = index === offices.targetItems.length - 1;
          return (
            <span key={`office-${index}`} className="text-base text-mainPurple leading-[156%]">
              {office?.title?.value}
              {isLastItem ? null : ', '}
            </span>
          );
        })}
      </div>
    </Link>
  );
};

export default PersonCard;
