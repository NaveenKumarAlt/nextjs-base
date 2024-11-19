import {
  withDatasourceCheck,
  RichText as JssRichText,
  Text,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'core/atoms/Link';
import { CTAProps } from '../types';
import {
  Tooltip,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
  TooltipTrigger,
} from 'core/atoms/ui/tooltips';
import { getStyles } from 'core/utils/StyleParam';
import AlertBEIcon4 from 'core/atoms/Icons/AlertBEIcon4';

const CTA = (props: CTAProps): JSX.Element => {
  const { fields } = props;
  const id = props?.params?.RenderingIdentifier;
  const { sitecoreContext } = useSitecoreContext();
  const TooltipText = sitecoreContext?.ExternalLinkToolTipText;
  const hasValues =
    fields?.Title?.value || fields?.Description?.value || fields?.CTALink?.value?.text;
  if (!hasValues) {
    return <></>;
  }
  return (
    <div
      id={id || undefined}
      className={`FullWidthPurpleBgBlueBgCta list-disc ${getStyles(props)}`}
    >
      <div
        className={`py-[1.5rem] lg:py-[3.75rem] justify-center w-full px-[1.375rem] md:px-0 text-black max-w-[77.3rem] 2xl:max-w-[90rem] md:mx-[2.125rem] xl:m-auto bg-aubergine relative`}
      >
        <div className="flex flex-col md:flex-row gap-[1.875rem] items-center">
          <div className="w-full md:w-[70%] md:pl-[5.438rem] z-10 relative">
            <Text
              field={fields?.Title}
              className="text-white leading-normal tracking-[-0.06rem] font-gowlingBliss text-[1.5rem] mb-[0.5rem]"
              tag="p"
            />

            <JssRichText field={fields?.Description} className="text-white " />
          </div>
          {fields?.CTALink?.value?.text && (
            <div className="w-full md:w-[30%] md:pr-[5.438rem] grid place-items-center md:place-items-end">
              {fields?.CTALink?.value?.linktype === 'internal' ||
              sitecoreContext?.pageState !== 'normal' ? (
                <Link
                  field={{
                    ...fields?.CTALink,
                    value: {
                      ...fields?.CTALink.value,
                      text: fields?.CTALink?.value?.text?.slice(0, 50),
                    },
                  }}
                  className={
                    'text-white transition ease-in-out delay-100 text-[0.875rem] font-bold leading-normal tracking-[0.035rem] font-arial bg-darkBlue rounded-xxl w-auto h-[4rem] flex justify-center items-center py-[1.375rem] px-[2.875rem] xl:hover:bg-white xl:hover:text-aubergine'
                  }
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
                        className={
                          'text-white transition ease-in-out delay-100 text-[0.875rem] font-bold leading-normal tracking-[0.035rem] font-arial bg-darkBlue rounded-xxl w-auto min-w-[11.75rem] h-[4rem] flex justify-center items-center py-[1.063rem] px-[2.875rem]'
                        }
                      />
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="p-0 max-w-[11.25rem] border-none">
                      <div dangerouslySetInnerHTML={{ __html: `${TooltipText}` }}></div>
                      <TooltipArrow className="w-6 h-2 fill-white " />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          )}
        </div>
        <div className="absolute bottom-0 z-0 h-full md:pl-[0.313rem]">
          <AlertBEIcon4 />
        </div>
      </div>
    </div>
  );
};
export default withDatasourceCheck()<CTAProps>(CTA);
