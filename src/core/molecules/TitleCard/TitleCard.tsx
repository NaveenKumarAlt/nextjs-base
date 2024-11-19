'use client';

import { Text, useSitecoreContext, RichText, DateField } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import {
  TitleCardProps,
  DataLayerEvent,
  bgType,
  styleType,
  BreadcrumbItem,
  ContextFields,
  downloadClick,
} from './types';
import { newFormatDate } from 'core/utils/formatDate';
import IconActions from 'core/molecules/ActionIcons/ActionIcons';
import { useI18n } from 'next-localization';
import Breadcrumb from 'components/BreadCrumb';
import { getStyles } from 'core/utils/StyleParam';
import ShareButton from '../ShareButton';
import { getPublicUrl } from 'utils/url';
import { cn } from 'lib/utils';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ArticlePdf from 'components/PDFTemplate/ArticlePDFTemplate';
import { IconType } from 'components/ProfileDetail/ProfileDetails.types';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicDownloadPageAsPdf = dynamic(() => import('core/atoms/DownloadPageAsPdf'), {
  ssr: false,
});
const publicUrl = getPublicUrl();

const handlePageOnload = (
  type: string | number | undefined,
  title: string | number | undefined,
  author: string
) => {
  const authorString = author;
  const eventTitleCardData: DataLayerEvent = {
    event: 'insight_detail_view',
    insight_type: type,
    insight_title: title,
    insight_authors: authorString,
  };
  window.dataLayer.push(eventTitleCardData);
};
const TitleCard = (props: TitleCardProps): JSX.Element => {
  const { fields, params } = props;
  const icons = fields?.data?.icons?.children?.results || [];
  const otherIcons = icons.filter((icon) => icon.name?.toLowerCase() !== 'download');
  const downloadIcon = icons.find((icon) => icon.name?.toLowerCase() === 'download');
  const { t } = useI18n();
  const param = (params?.Styles as bgType) ?? bgType.lightPurple;
  const style = {
    testColor: 'text-white',
    fill: 'white',
  } as styleType;
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  const breadcrumbData = (sitecoreContext?.Breadcrumb || []) as BreadcrumbItem[];
  const ShowBreadcrumbComponent = sitecoreContext?.ShowBreadcrumbComponent || true;
  const publishedDate = fields?.data?.item?.publishedDate?.jsonValue?.value;
  const formatedDate = newFormatDate(publishedDate, sitecoreContext.language as unknown as string);
  const id = props?.params?.RenderingIdentifier;
  const keyContactsField = sitecoreContext?.route?.fields?.['Key Contacts'];
  const alternateTitles: string[] = [];

  if (Array.isArray(keyContactsField)) {
    keyContactsField.forEach((contact) => {
      if (contact && contact.fields && contact.fields['AlternateTitle']) {
        alternateTitles.push((contact.fields['AlternateTitle'] as { value: string }).value);
      }
    });
  }

  useEffect(() => {
    const authorString = alternateTitles.join('|');

    handlePageOnload(
      fields?.data?.item?.pageType?.targetItem?.pageType?.value,
      fields?.data?.item?.title?.jsonValue?.value,
      authorString
    );
  }, []);
  const bgColor =
    param &&
    (param.includes(bgType.white) ||
      param.includes(bgType.extraLightGrey) ||
      param.includes(bgType.extraLightPurple));
  if (bgColor) {
    style.testColor = 'text-black';
    style.fill = 'white';
  }
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const hasContent =
    isEditing ||
    fields?.data?.item?.title?.jsonValue?.value ||
    fields?.data?.item?.subTitle?.jsonValue?.value ||
    fields?.data?.item?.pageType?.targetItem?.icon?.jsonValue?.value ||
    fields?.data?.item?.pageType?.targetItem?.pageType?.value ||
    fields?.data?.item?.publishedDateOverrideText?.jsonValue?.value ||
    fields?.data?.item?.publishedDate?.jsonValue?.value ||
    fields?.data?.item?.readTime?.jsonValue?.value ||
    fields?.data?.icons?.children?.results?.length > 0;

  const contextFields = sitecoreContext?.route?.fields as unknown as ContextFields;
  const pageType = contextFields?.PageType?.displayName?.toLowerCase();
  const categoryType = contextFields?.CategoryType?.displayName?.toLowerCase();
  if (!hasContent) {
    return <></>;
  }
  return (
    <div
      id={id || undefined}
      className={`${param} ${getStyles(props)} ${style.testColor}  w-full title-cards `}
      data-testid="title-card"
    >
      <div className="title-card-vector xl:bg-vector print:bg-vector bg-cover bg-no-repeat relative max-w-[77.3rem] 2xl:max-w-[90rem] mx-[1.375rem] md:mx-[2.125rem] xl:m-auto pb-[2rem] md:pb-[3.375rem] pt-[1.875rem] lg:pb-[3.75rem]">
        <div className="relative z-1">
          {ShowBreadcrumbComponent && (
            <div className="print:invisible breadcrumb">
              <Breadcrumb fields={breadcrumbData} textColor={style.testColor} />
            </div>
          )}
          <div className="flex flex-row gap-[0.625rem] items-center">
            <Image
              field={fields?.data?.item?.pageType?.targetItem?.icon?.jsonValue}
              className={cn('brightness-0 h-[1.641rem]', { invert: !bgColor })}
            />
            <Text
              tag="p"
              className="font-bold leading-normal"
              field={fields?.data?.item?.pageType?.targetItem?.pageType}
            />
            {params?.HidePublishedDate === '1' ? null : (
              <div>
                {formatedDate === '' || null ? (
                  ''
                ) : (
                  <div className="flex flex-wrap small-text leading-140%">
                    <span className="mr-[0.313rem]">{t('Published')}</span>
                    <DateField
                      tag="span"
                      editable={true}
                      className="flex text-[0.625rem] items-center"
                      field={{ value: formatedDate }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <RichText
            tag="h1"
            field={fields?.data?.item?.title?.jsonValue}
            className={`
            ${
              categoryType == 'events' || pageType == 'tool'
                ? 'xl:max-2xl:text-[3.75rem] xl:max-2xl:[&_*]:text-[3.75rem] [&_*]:max-2xl:text-[3.75rem] sm:text-[3.75rem] text-[2rem] md:max-2xl:leading-[1.2em]! leading-[1.2em] font-gowlingBliss tracking-normal !font-bold '
                : categoryType == 'insights' || categoryType == 'news'
                  ? '[&_*]:text-[2.875rem] text-[2rem] sm:text-[2.875rem] md:max-2xl:leading-[1.2em]! leading-[1.2em] tracking-normal font-arial font-normal'
                  : '[&_*]:md:text-[4.875rem] [&_*]:text-[2rem] text-[2rem] sm:text-[4.875rem] xl:max-2xl:[&_*]:text-[4.875rem] xl:text-[4.875rem]  md:max-xl:leading-[1.2em]! leading-[1.2em] tracking-normal md:font-gowlingBliss md:[&_*]:font-gowlingBliss [&_*]:font-arial font-arial !font-bold'
            } max-w-[56.25rem] break-words md:pt-[1.25rem] pt-[0.625rem] font-normal`}
          />
          <RichText
            tag="p"
            field={fields?.data?.item?.subTitle?.jsonValue}
            role="heading"
            className={`pb-0 
            ${
              categoryType == ' events' || pageType == 'tool'
                ? 'text-[2rem] font-bold font-gowlingBliss tracking-[-0.04rem]'
                : 'text-[1.5rem]'
            } mt-[0.9375rem] leading-normal max-w-[51.25rem] article_desc break-words`}
          />
          <p className="font-bold">
            {contextFields?.EventStartDate?.value && (
              <span>
                {newFormatDate(
                  contextFields?.EventStartDate?.value,
                  sitecoreContext.language as string
                )}
              </span>
            )}
            {contextFields?.EventStartDate?.value !== contextFields?.EventEndDate?.value && (
              <>
                {contextFields?.EventStartDate?.value && contextFields?.EventEndDate?.value && (
                  <span className="px-[.35rem]">-</span>
                )}
                <span>
                  {newFormatDate(
                    contextFields?.EventEndDate?.value,
                    sitecoreContext.language as string
                  )}
                </span>
              </>
            )}
          </p>
          <p className="font-bold">
            {contextFields?.EventStartTime?.value && (
              <span>{contextFields?.EventStartTime?.value}</span>
            )}
            {contextFields?.EventStartDate?.value && contextFields?.EventEndDate?.value && (
              <span className="px-[.35rem]">-</span>
            )}
            {contextFields?.EventEndTime?.value && (
              <span>{contextFields?.EventEndTime?.value}</span>
            )}
            {contextFields?.TimeZone?.name && (
              <span aria-hidden="true" className="ps-2">
                {contextFields?.TimeZone?.name}
              </span>
            )}
          </p>
          {contextFields?.CPDorCLEPoints?.value && (
            <p className="font-bold">
              <span>{t('TitleCardCPDOrCLE')}</span>
              {contextFields?.CPDorCLEPoints?.value && (
                <span aria-hidden="true" className="ps-2">
                  {contextFields?.CPDorCLEPoints?.value}
                </span>
              )}
            </p>
          )}
          <div className="flex reading_time items-center pt-[2rem] md:pt-[3.375rem]">
            {fields?.data?.item?.ShowReadTime?.jsonValue?.value === true &&
            fields?.data?.item?.ShowReadTime?.jsonValue?.value ? (
              <div className="flex items-center justify-center">
                <Text
                  tag="p"
                  className="text-small"
                  field={fields?.data?.item?.readTime?.jsonValue}
                />
                &nbsp;
                <div className="mr-[1.313rem]">{t('minuteRead')}</div>
              </div>
            ) : null}
            <div className="gap-[1.563rem] flex flex-row xl:gap-[0.938rem] title_icons items-center">
              {otherIcons.map((icon, index) => (
                <IconActions
                  icons={[icon]}
                  iconClassName={cn('print:hidden h-[1.625rem] brightness-0', { invert: !bgColor })}
                  key={`${icon?.name}_${index}`}
                />
              ))}
              {props.params.HideDownload !== '1' && (
                <>
                  {fields?.data?.item?.pageType?.targetItem?.pageType?.value === 'Article'
                    ? isClient && (
                        <PDFDownloadLink
                          document={
                            <ArticlePdf
                              context={sitecoreContext}
                              published={t('Published')}
                              date={formatedDate}
                              t={t}
                            />
                          }
                          fileName={`${sitecoreContext?.route?.name}.pdf`}
                          onClick={downloadClick}
                        >
                          {icons.map((icon, index) => {
                            if (icon?.name === IconType.Download) {
                              return (
                                <div
                                  title="Download PDF"
                                  key={`profile_download_${icon.name}_${index}`}
                                >
                                  <Image
                                    field={icon?.image?.jsonValue}
                                    className="hover:filter hover:fill-purple hover:opacity-50 cursor-pointer w-[1.75rem] h-[1.625rem] print:hidden"
                                  />
                                </div>
                              );
                            }
                            return null;
                          })}
                        </PDFDownloadLink>
                      )
                    : downloadIcon && (
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
                </>
              )}
              <div
                className={`small-text relative share text-white cursor-pointer -left-1 print:hidden`}
              >
                <ShareButton
                  height="26"
                  name={''}
                  url={`${publicUrl}${(sitecoreContext.itemPath as string)
                    .substring(1, (sitecoreContext.itemPath as string).length)
                    .replaceAll(' ', '-')
                    .toLocaleLowerCase()}`}
                  width="26"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleCard;
