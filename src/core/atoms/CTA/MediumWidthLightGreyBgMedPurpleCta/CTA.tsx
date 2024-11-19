import {
  withDatasourceCheck,
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { getStyles } from 'core/utils/StyleParam';
import Link from 'core/atoms/Link';
import { CTAProps } from '../types';
import {
  Tooltip,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
  TooltipTrigger,
} from 'core/atoms/ui/tooltips';

const CTA = (props: CTAProps): JSX.Element => {
  const { fields } = props;
  const { sitecoreContext } = useSitecoreContext();
  const TooltipText = sitecoreContext?.ExternalLinkToolTipText;
  const id = props?.params?.RenderingIdentifier;
  const hasValues =
    fields?.Title?.value ||
    fields?.Description?.value ||
    fields?.CTALink?.value?.text ||
    fields?.CTALink2?.value?.text;

  if (!hasValues) {
    return <></>;
  }

  return (
    <div
      id={id || undefined}
      className={`bg-extraLightGrey list-disc mx-[-1.375rem] lg:mx-[0] ${getStyles(props)}`}
    >
      <div
        className={`max-w-[77.3rem] 2xl:max-w-[90rem] mx-[1.375rem] md:mx-[2.125rem] xl:m-auto py-[2.5rem] text-black gap-[0.9375rem] flex flex-col m-auto px-[1.375rem] md:pl-[1.875rem] md:pr-[1.125rem] justify-center lg:pt-[1.875rem] lg:pb-[3.3125rem]`}
      >
        <JssRichText
          tag="h2"
          field={fields?.Title}
          className="font-gowlingBliss font-normal text-aubergine text-[1.5rem] md:text-[3rem]"
        />
        <JssRichText
          field={fields?.Description}
          className="font-normal text-aubergine text-[1rem]] font-arial "
        />
        <div className="flex">
          {fields?.CTALink?.value?.text && (
            <>
              {fields?.CTALink?.value?.linktype === 'internal' ? (
                <Link
                  field={{
                    ...fields?.CTALink,
                    value: {
                      ...fields?.CTALink?.value,
                      text: fields?.CTALink?.value?.text?.slice(0, 50),
                    },
                  }}
                  className={
                    'mt-[1.5625rem] print:hidden text-white transition font-bold bg-mainPurple rounded-xxl flex justify-center items-center mr-6 leading-normal tracking-[0.035rem]  hover:shadow-custom font-arial ease-in-out delay-100 text-[0.875rem] px-[2.563rem] py-[1.063rem] w-[fit-content] min-h-[3.75rem]'
                  }
                />
              ) : (
                <TooltipProvider delayDuration={100} skipDelayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        field={{
                          ...fields?.CTALink,
                          value: {
                            ...fields?.CTALink?.value,
                            text: fields?.CTALink?.value?.text?.slice(0, 50),
                          },
                        }}
                        className={
                          'mt-[1.5625rem] leading-normal ease-in-out delay-100 text-[0.875rem] text-white transition font-bold tracking-[0.035rem] bg-mainPurple rounded-xxl justify-center items-center mr-6 font-arial flex px-[2.563rem] py-[1.063rem] w-[fit-content] min-h-[3.75rem] '
                        }
                      />
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="p-0 border-none max-w-[11.25rem]">
                      <div dangerouslySetInnerHTML={{ __html: `${TooltipText}` }}></div>
                      <TooltipArrow className="w-6 h-2 fill-white " />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </>
          )}
          {fields?.CTALink2?.value?.text && (
            <>
              {fields?.CTALink2?.value?.linktype === 'internal' ||
              sitecoreContext?.pageState !== 'normal' ? (
                <Link
                  field={{
                    ...fields?.CTALink2,
                    value: {
                      ...fields?.CTALink2?.value,
                      text: fields?.CTALink2?.value?.text?.slice(0, 50),
                    },
                  }}
                  className={
                    ' delay-100 font-bold leading-normal ease-in-out tracking-[0.035rem] text-[0.875rem] font-arial text-white transition bg-mainPurple rounded-xxl flex mr-6 justify-center items-center px-[2.563rem] py-[1.063rem] w-[fit-content] min-h-[3.75rem]'
                  }
                />
              ) : (
                <TooltipProvider delayDuration={100} skipDelayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        field={{
                          ...fields?.CTALink2,
                          value: {
                            ...fields?.CTALink2?.value,
                            text: fields?.CTALink2?.value?.text?.slice(0, 50),
                          },
                        }}
                        className={
                          ' font-bold leading-normal text-white transition ease-in-out delay-100 text-[0.875rem] tracking-[0.035rem] font-arial bg-mainPurple rounded-xxl flex justify-center items-center mr-6 px-[2.563rem] py-[1.063rem] w-[fit-content] min-h-[3.75rem]'
                        }
                      />
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="border-none p-0 max-w-[11.25rem]">
                      <div dangerouslySetInnerHTML={{ __html: `${TooltipText}` }}></div>
                      <TooltipArrow className="w-6 h-2 fill-white " />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default withDatasourceCheck()<CTAProps>(CTA);
