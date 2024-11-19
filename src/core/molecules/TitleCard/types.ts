import { Field, TextField, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps, DamImageField } from 'src/global';

interface JsonValueField<T> {
  jsonValue: Field<T>;
}

export type TitleCardProps = ComponentProps & {
  fields: {
    data: {
      item: {
        title: { jsonValue: RichTextField };
        subTitle: { jsonValue: RichTextField };
        pageType: {
          targetItem: {
            pageType: TextField;
            icon: { jsonValue: DamImageField };
          };
        };
        ShowReadTime: { jsonValue: { value: boolean } };
        publishedDate: JsonValueField<string>;
        publishedDateOverrideText: { jsonValue: TextField };
        readTime: { jsonValue: TextField };
        image: { jsonValue: DamImageField };
        backgroundImage: { jsonValue: DamImageField };
      };
      icons: {
        children: {
          results: {
            name: string;
            image: {
              jsonValue: DamImageField;
            };
          }[];
        };
      };
    };
  };
  params: {
    HidePublishedDate: string;
    HideDownload: string;
    HideReadTime: string;
  };
};

export interface DataLayerEvent {
  event: string;
  insight_type: string | number | undefined;
  insight_title?: string | number | undefined;
  insight_authors?: string;
}
export enum bgType {
  white = 'bg-white',
  extraLightGrey = 'bg-extraLightGrey',
  lightPurple = 'bg-lightPurple',
  extraLightPurple = 'bg-extralightPurple',
}

export type styleType = {
  testColor: string;
  tileCardBg: string;
  fill: string;
  linearGradient: string;
};

export interface BreadcrumbItem {
  Title: string;
  Url: string;
  HideInBreadcrumb: boolean;
}
export interface ContextFields {
  EventStartDate: { value: string };
  EventEndDate: { value: string };
  EventStartTime: { value: string };
  EventEndTime: { value: string };
  TimeZone: { name: string };
  CPDorCLEPoints: { value: string };
  PageType: { displayName: string };
  CategoryType: { displayName: string };
}

export interface DataLayerDownloadEvent {
  event: string;
}

export const downloadClick = () => {
  const eventData: DataLayerDownloadEvent = {
    event: 'insight_detail_download_cta_click',
  };
  window.dataLayer.push(eventData);
};
