import ShareButton from 'core/molecules/ShareButton';
import { Text, RichText, useSitecoreContext, DateField } from '@sitecore-jss/sitecore-jss-nextjs';
import { TitleCardProps, bgType, styleType, BreadcrumbItem, downloadClick } from './types';
import Image from 'core/atoms/Image';
import { newFormatDate } from 'core/utils/formatDate';
import IconActions from '../ActionIcons/ActionIcons';
import dynamic from 'next/dynamic';
import { useI18n } from 'next-localization';
import { getStyles } from 'core/utils/StyleParam';
import Breadcrumb from 'components/BreadCrumb';
import { getPublicUrl } from 'utils/url';
import { cn } from 'lib/utils';

const DynamicDownloadPageAsPdf = dynamic(() => import('core/atoms/DownloadPageAsPdf'), {
  ssr: false,
});
const publicUrl = getPublicUrl();

const TitleCard = (props: TitleCardProps): JSX.Element => {
  const { fields, params } = props;
  const { t } = useI18n();
  const id = props?.params?.RenderingIdentifier;
  const { sitecoreContext } = useSitecoreContext();
  const param = (params?.Styles as bgType) ?? bgType.lightPurple;
  const publishedDate = fields?.data?.item?.publishedDate?.jsonValue?.value;
  const formatedDate = newFormatDate(publishedDate, sitecoreContext.language as unknown as string);
  const breadcrumbData = (sitecoreContext?.Breadcrumb || []) as BreadcrumbItem[];
  const ShowBreadcrumbComponent = sitecoreContext?.ShowBreadcrumbComponent || true;
  const icons = fields?.data?.icons?.children?.results || [];
  const downloadIcon = icons.find((icon) => icon.name?.toLowerCase() === 'download');
  const otherIcons = icons.filter((icon) => icon.name?.toLowerCase() !== 'download');
  const style = {
    testColor: 'text-white',
    fill: 'white',
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

  return (
    <div
      id={id || undefined}
      className={`${param} ${getStyles(props)} ${style.testColor} title-cards relative print:${
        style.testColor
      }`}
      data-testid="title-card-with-side-image"
    >
      <div className="max-w-[77.3rem] 2xl:max-w-[90rem] mx-[1.375rem] md:mx-[2.125rem] xl:m-auto">
        <div className="flex flex-col xl:flex-row">
          <div className="w-full ml-0 mr-0 xl:px-[0] xl:w-[51%] flex">
            <div className="md:grid pt-[1.875rem] pb-[3.125rem] xl:pr-[7.938rem] 2xl:ml-0 xl:h-max xl:min-h-[23.313rem]">
              {ShowBreadcrumbComponent && (
                <div className="print:invisible breadcrumb">
                  <Breadcrumb fields={breadcrumbData} textColor={style.testColor} />
                </div>
              )}
              {fields?.data?.item?.pageType?.targetItem?.icon?.jsonValue ||
              fields?.data?.item?.pageType?.targetItem?.pageType ||
              formatedDate ? (
                <div className="flex flex-row gap-[0.625rem] items-center">
                  <Image
                    field={fields?.data?.item?.pageType?.targetItem?.icon?.jsonValue}
                    className={cn('brightness-0 h-[1.563rem]', { invert: !bgColor })}
                  />

                  <Text
                    tag="p"
                    className="font-bold"
                    field={fields?.data?.item?.pageType?.targetItem?.pageType}
                  />
                  {formatedDate === '' || null ? (
                    ''
                  ) : (
                    <span className="leading-normal items-center flex mr-[-0.313rem] small-text">
                      {t('Published')}
                    </span>
                  )}
                  <DateField
                    tag="span"
                    editable={true}
                    className="text-[0.625rem] items-center flex"
                    field={{ value: formatedDate }}
                  />
                </div>
              ) : null}

              <div>
                <RichText
                  tag="h1"
                  field={fields?.data?.item?.title?.jsonValue}
                  className="py-0 mt-[1.125rem] font-normal font-arial text-[2rem] tracking-[normal] leading-[1em] xl:text-[4.875rem] xl:font-gowlingBliss xl:mt-0"
                />
                <RichText
                  className="mt-[1.125rem]"
                  field={fields?.data?.item?.subTitle?.jsonValue}
                />
                <div className="flex reading_time">
                  {fields?.data?.item?.ShowReadTime?.jsonValue?.value === true &&
                  fields?.data?.item?.ShowReadTime?.jsonValue?.value ? (
                    <div className="flex mt-[1.25rem]">
                      <Text
                        tag="p"
                        className="text-small"
                        field={fields?.data?.item?.readTime?.jsonValue}
                      />
                      &nbsp;
                      <div className="mr-[1.313rem]">{t('minuteRead')}</div>
                    </div>
                  ) : null}
                  <div className="flex mt-[1.25rem] flex-row gap-[1.563rem] xl:gap-[0.938rem] title_icons items-center">
                    {otherIcons.map((icon) => (
                      <IconActions
                        iconClassName={cn('brightness-0 h-[1.563rem] print:invisible', {
                          invert: !bgColor,
                        })}
                        icons={[icon]}
                        key={icon?.name}
                      />
                    ))}
                    {downloadIcon && props.params.HideDownload !== '1' && (
                      <DynamicDownloadPageAsPdf key="download-icon">
                        <div title="Download" onClick={downloadClick}>
                          <Image
                            className={cn('brightness-0 h-[1.563rem] print:hidden', {
                              invert: !bgColor,
                            })}
                            field={downloadIcon?.image?.jsonValue}
                          />
                        </div>
                      </DynamicDownloadPageAsPdf>
                    )}
                    <div
                      className={`-left-1 print:hidden share text-white cursor-pointer relative small-text`}
                    >
                      <ShareButton
                        width="26"
                        name={''}
                        height="26"
                        url={`${publicUrl}${(sitecoreContext.itemPath as string)
                          .substring(1, (sitecoreContext.itemPath as string).length)
                          .replaceAll(' ', '-')
                          .toLocaleLowerCase()}`}
                        bgColor={bgColor}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:w-[49%] xl:absolute xl:right-0 print:mb-4 xl:top-0 h-full">
        <Image
          field={fields?.data?.item?.image?.jsonValue}
          className="w-full h-full xl:min-h-[23.313rem] xl:absolute flex object-cover"
        />
      </div>
    </div>
  );
};

export default TitleCard;
