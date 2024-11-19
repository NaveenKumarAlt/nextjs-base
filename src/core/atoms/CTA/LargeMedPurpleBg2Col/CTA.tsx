import clsx from 'clsx';
import { getStyles } from 'core/utils/StyleParam';
import { ComponentProps, DamImageField } from 'src/global';
import {
  Field,
  RichText as JssRichText,
  LinkField,
  Text,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import {
  Tooltip,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
  TooltipTrigger,
} from 'core/atoms/ui/tooltips';
import Link from 'core/atoms/Link';

export type CTAProps = ComponentProps & {
  fields: {
    Description: Field<string>;
    CTALink: LinkField;
    Image: DamImageField;
    Title: Field<string>;
    AlertTitle: Field<string>;
    AlertDescription: Field<string>;
    IsImageRight: Field<boolean>;
  };
};

const CTA = (props: CTAProps) => {
  const { sitecoreContext } = useSitecoreContext();
  const TooltipText = sitecoreContext?.ExternalLinkToolTipText;
  const hasValues =
    props?.fields?.Title?.value ||
    props?.fields?.Description?.value ||
    props?.fields?.CTALink?.value?.text ||
    props?.fields?.Image?.value?.src;

  if (!hasValues) {
    return null;
  }
  const isImageRight = props?.fields?.IsImageRight?.value;
  const id = props?.params?.RenderingIdentifier;

  return (
    <div
      id={id || undefined}
      data-testid="cta-detail"
      className={clsx(getStyles(props), {
        'pt-[5rem] lg:pt-[6.563rem] pb-[1.88rem] xl:pb-[7rem] bg-extraLightGrey list-disc print:break-inside-avoid':
          isImageRight,
        'my-[2.5rem] print:pb-[2.5rem] list-disc': !isImageRight,
      })}
    >
      <div
        className={clsx(
          'flex flex-col xl:flex-row print:flex-row body-text m-auto max-w-[77.3rem] 2xl:max-w-[90rem] mx-[1.375rem] xl:m-auto gap-y-[2.5rem]',
          {
            'gap-x-[7.688rem] items-center ': isImageRight,
            'gap-x-[4.688rem] bg-extraLightGrey items-stretch': !isImageRight,
          }
        )}
      >
        <div
          className={clsx({
            'order-1 print:w-[50%]': isImageRight,
            'order-2 px-[1.25rem] xl:px-[1.563rem] pb-[3.75rem] xl:pl-[0] xl:pb-[3.125rem] xl:w-[38.6rem] print:max-w-[31.25rem] xl:pr-[6.688rem]':
              !isImageRight,
          })}
        >
          <Text
            tag="h2"
            field={props?.fields?.Title}
            className={`${
              isImageRight
                ? 'font-gowlingBliss xl:text-[3rem] text-[2rem] font-normal tracking-[-0.06rem] mb-[1.25rem]'
                : 'xl:mt-[2.5rem] print:mt-[2.5rem] xl:font-gowlingBliss font-normal text-[2rem] xl:text-[3rem] tracking-[-0.04rem]'
            }text-black leading-[1em]`}
          />
          <JssRichText
            field={props?.fields?.Description}
            tag="p"
            className={clsx(
              {
                'mt-[1.563rem] tet-[1rem] text-trueBlack mb-[2.5rem]': isImageRight,
                'mb-[3.88rem]': !isImageRight,
              },
              'font-arial mt-5 mb-5 text-base font-normal leading-[156%]'
            )}
          />
          {props?.fields?.CTALink?.value?.text && (
            <>
              {props?.fields?.CTALink?.value?.linktype === 'internal' ||
              sitecoreContext?.pageState !== 'normal' ? (
                <Link
                  field={{
                    value: {
                      ...props?.fields?.CTALink?.value,
                      text: props?.fields?.CTALink?.value?.text?.slice(0, 50),
                    },
                  }}
                  className={clsx(
                    'text-white print:hidden transition ease-in-out delay-100 text-[0.875rem] font-bold leading-normal tracking-[0.035rem] font-arialw-[fit-content] max-w-max',
                    {
                      'bg-mainPurple': isImageRight,
                      'bg-darkBlue hover:bg-extradarkBlue': !isImageRight,
                    },
                    'rounded-xxl px-[1.62rem] xl:px-[2.875rem] py-[1.375rem] flex justify-center items-center'
                  )}
                />
              ) : (
                <TooltipProvider delayDuration={100} skipDelayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        field={{
                          ...props?.fields?.CTALink,
                          value: {
                            ...props?.fields?.CTALink?.value,
                            text: props?.fields?.CTALink?.value?.text?.slice(0, 50),
                          },
                        }}
                        className={clsx(
                          'text-white transition ease-in-out delay-100 text-[0.875rem] font-bold leading-normal tracking-[0.035rem] font-arial w-[fit-content] min-w-[12rem]',
                          {
                            'bg-mainPurple': isImageRight,
                            'bg-darkBlue': !isImageRight,
                          },
                          'rounded-xxl px-[2.875rem] py-[1.375rem] flex justify-center items-center'
                        )}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="p-0 max-w-[11.25rem] border-none">
                      <div dangerouslySetInnerHTML={{ __html: `${TooltipText}` }}></div>
                      <TooltipArrow className="w-6 h-2 fill-white " />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </>
          )}
        </div>
        <div
          className={clsx({
            'order-2 xl:min-w-[38.125rem] xl:h-auto': isImageRight,
            'order-1 xl:w-[31.1rem]': !isImageRight,
          })}
        >
          <Image
            field={{ ...props?.fields?.Image, value: props?.fields?.Image?.value }}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CTA;
