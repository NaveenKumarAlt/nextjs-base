/* eslint-disable react-hooks/exhaustive-deps */
import { DateField, Text, RichText, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
const DynamicDownloadPageAsPdf = dynamic(() => import('core/atoms/DownloadPageAsPdf'), {
  ssr: false,
});

import Image from 'core/atoms/Image';
import { TitleCardProps, bgType, styleType, BreadcrumbItem, downloadClick } from './types';
import { newFormatDate } from 'core/utils/formatDate';
import IconActions from '../ActionIcons/ActionIcons';
import { useEffect, useState } from 'react';
import { useI18n } from 'next-localization';
import dynamic from 'next/dynamic';
import Breadcrumb from 'components/BreadCrumb';
import { getStyles } from 'core/utils/StyleParam';
import ShareButton from '../ShareButton';
import { getPublicUrl } from 'utils/url';
import { getImage } from 'utils/imageResolver';
import { cn } from 'lib/utils';
const publicUrl = getPublicUrl();

const TitleCard = (props: TitleCardProps): JSX.Element => {
  const { fields, params } = props;
  const { t } = useI18n();
  const id = props?.params?.RenderingIdentifier;
  const { sitecoreContext } = useSitecoreContext();
  const param = (params?.Styles as bgType) ?? bgType.lightPurple;
  const breadcrumbData = (sitecoreContext?.Breadcrumb || []) as BreadcrumbItem[];
  const ShowBreadcrumbComponent = sitecoreContext?.ShowBreadcrumbComponent || true;
  const icons = fields?.data?.icons?.children?.results || [];
  const otherTitleIcons = icons.filter((icon) => icon.name?.toLowerCase() !== 'download');
  const downloadTitleIcon = icons.find((icon) => icon.name?.toLowerCase() === 'download');

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const style = {
    testColor: 'text-white',
    fill: 'white',
    linearGradient: 'linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) )',
  } as styleType;

  const bgColor =
    param &&
    (param.includes(bgType.white) ||
      param.includes(bgType.extraLightGrey) ||
      param.includes(bgType.extraLightPurple));
  if (bgColor) {
    style.testColor = 'text-black';
    style.fill = 'white';
  }

  const publishedDate = fields?.data?.item?.publishedDate?.jsonValue?.value;
  const formatedDate = newFormatDate(publishedDate, sitecoreContext.language as unknown as string);
  const isTopicTitleCard = params?.Styles?.includes('topictitlecard');
  if (isTopicTitleCard) {
    style.linearGradient =
      'linear-gradient(90deg, #EFF0ED 16.45%, rgba(239, 240, 237, 0.00) 99.75%)';
  }
  return (
    <div
      id={id || undefined}
      className={`bg-extraLightGrey ${param} ${getStyles(props)} ${style.testColor} title-cards  ${
        isTopicTitleCard ? 'topictitlecard' : ''
      }`}
      style={{
        backgroundImage: isMobile
          ? 'none'
          : `${style.linearGradient}, url('${
              getImage(fields?.data?.item?.backgroundImage?.jsonValue)?.src
            }')`,
        backgroundSize: isTopicTitleCard ? '80% auto' : 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: isTopicTitleCard ? 'right' : 'center',
      }}
      data-testid="title-card-with-background-image"
    >
      <div className="max-w-[77.3rem] 2xl:max-w-[90rem] pt-[1.875rem] pb-[3.125rem] mx-[1.375rem] md:mx-[2.125rem] xl:m-auto text-white">
        {ShowBreadcrumbComponent && (
          <div
            className={`print:invisible breadcrumb ${isTopicTitleCard ? 'text-black' : style.testColor}`}
          >
            <Breadcrumb fields={breadcrumbData} textColor={style.testColor} />
          </div>
        )}
        <div className="flex flex-row gap-[0.625rem]">
          <Image
            field={fields?.data?.item?.pageType?.targetItem?.icon?.jsonValue}
            className="brightness-0 invert h-[1.563rem]"
          />
          <Text
            className="font-bold"
            field={fields?.data?.item?.pageType?.targetItem?.pageType}
            tag="p"
          />
          {formatedDate === '' || null ? (
            ''
          ) : (
            <span className="flex items-center small-text leading-normal mr-[-0.313rem]">
              {t('Published')}
            </span>
          )}
          <DateField
            editable={true}
            field={{ value: formatedDate }}
            className="flex items-center text-[0.625rem]"
            tag="span"
          />
        </div>
        <RichText
          className={`font-arial py-[1.063rem] text-[2rem] max-w-[51.25rem] leading-[132.5%] xl:py-[0.938rem] ${
            isTopicTitleCard ? 'text-black xl:w-[40.313rem]' : style.testColor
          }`}
          field={fields?.data?.item?.title?.jsonValue}
          tag="h1"
        />
        <RichText
          field={fields?.data?.item?.subTitle?.jsonValue}
          className={`pb-[1.188rem] xl:pb-[0.5rem] max-w-[36.063rem] article_desc ${
            isTopicTitleCard ? 'text-black xl:w-[40.313rem]' : style.testColor
          }`}
        />
        <div className="flex reading_time">
          {fields?.data?.item?.ShowReadTime?.jsonValue?.value === true &&
          fields?.data?.item?.ShowReadTime?.jsonValue?.value ? (
            <div className="flex">
              <Text
                tag="p"
                className="text-small"
                field={fields?.data?.item?.readTime?.jsonValue}
              />
              &nbsp;
              <div className="mr-[1.313rem]">{t('minuteRead')}</div>
            </div>
          ) : null}
          <div className="gap-[1.563rem] xl:gap-[0.938rem] title_icons flex flex-row items-center">
            {otherTitleIcons.map((icon) => (
              <IconActions
                key={icon?.name}
                icons={[icon]}
                iconClassName={cn(
                  `h-[1.563rem] print:hidden ${isTopicTitleCard ? 'icon-blue' : 'brightness-0'}`,
                  {
                    invert: !bgColor,
                  }
                )}
              />
            ))}
            {downloadTitleIcon && props.params.HideDownload !== '1' && (
              <DynamicDownloadPageAsPdf key="download-icon">
                <div title="Download" onClick={downloadClick}>
                  <Image
                    field={downloadTitleIcon?.image?.jsonValue}
                    className={cn(
                      `h-[1.563rem] print:hidden ${isTopicTitleCard ? 'icon-blue' : 'brightness-0'}`,
                      { invert: !bgColor }
                    )}
                  />
                </div>
              </DynamicDownloadPageAsPdf>
            )}
            <div
              className={`share text-white small-text print:hidden relative -left-1 cursor-pointer`}
            >
              <ShareButton
                url={`${publicUrl}${(sitecoreContext.itemPath as string)
                  .substring(1, (sitecoreContext.itemPath as string).length)
                  .replaceAll(' ', '-')
                  .toLocaleLowerCase()}`}
                name={''}
                width="26"
                height="26"
                isTopicTitleCard={isTopicTitleCard}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleCard;
