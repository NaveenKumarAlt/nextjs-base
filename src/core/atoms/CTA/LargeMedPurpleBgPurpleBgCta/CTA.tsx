import {
  withDatasourceCheck,
  RichText as JssRichText,
  Text,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  Tooltip,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
  TooltipTrigger,
} from 'core/atoms/ui/tooltips';
import Link from 'core/atoms/Link';
import { CTAProps } from '../types';
import { getStyles } from 'core/utils/StyleParam';
import AlertBEIcon3 from 'core/atoms/Icons/AlertBEIcon3';

const CTA = (props: CTAProps): JSX.Element => {
  const { fields } = props;
  const { sitecoreContext } = useSitecoreContext();
  const TooltipText = sitecoreContext?.ExternalLinkToolTipText;
  const id = props?.params?.RenderingIdentifier;
  const hasValues =
    fields?.Title?.value || fields?.Description?.value || fields?.CTALink?.value?.text;
  if (!hasValues) {
    return <></>;
  }
  return (
    <div id={id || undefined} className={`${getStyles(props)}`}>
      <div
        className={`mx-[1.375rem] py-[3.75rem] lg:pb-[6.438rem] lg:pt-[4.938rem] max-w-[77.3rem] 2xl:max-w-[90rem] md:mx-[2.125rem] xl:m-auto LargeMedPurpleBgPurpleBgCta justify-center lg:w-full px-[1.375rem] md:px-0 text-black z-10 relative list-disc bg-purple2 lg:pl-[6.563rem] lg:pr-[9.625rem]`}
      >
        <div className="flex flex-col md:flex-row gap-x-[3.313rem] z-10 relative">
          <Text
            field={fields?.Title}
            className="w-full md:min-w-[25rem] font-normal text-white text-[2rem] lg:text-[4.875rem] leading-[1em] tracking-[-0.098rem]"
            tag="h2"
          />
          <div className="mt-6 md:block print:items-start flex flex-col items-center">
            <JssRichText
              field={fields?.Description}
              className=" mb-[2.5rem] text-base text-white leading-[156%] font-normal font-arial"
            />

            {fields?.CTALink?.value?.text && (
              <>
                {fields?.CTALink?.value?.linktype === 'internal' ||
                sitecoreContext?.pageState !== 'normal' ? (
                  <Link
                    field={{
                      ...fields?.CTALink,
                      value: {
                        ...props?.fields?.CTALink?.value,
                        text: fields?.CTALink?.value?.text?.slice(0, 50),
                      },
                    }}
                    className={
                      ' text-white text-[0.875rem] max-w-full h-[4rem] hover:bg-extralightPurple hover:text-black w-full md:w-auto min-w-[11.75rem] font-bold leading-normal tracking-[0.035rem] font-arial bg-aubergine rounded-xxl px-[2.875rem] py-[1.375rem] flex md:inline justify-center items-center'
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
                            ' text-white transition ease-in-out delay-100 text-[0.875rem] font-bold leading-normal tracking-[0.035rem] font-arial bg-aubergine hover:bg-extralightPurple hover:text-black rounded-xxl px-[2.875rem] py-[1.375rem] flex justify-center items-center w-[fit-content] min-w-[11.75rem]'
                          }
                        />
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="p-0 max-w-[11.25rem] border-none">
                        <div dangerouslySetInnerHTML={{ __html: `${TooltipText}` }}></div>
                        <TooltipArrow className="fill-white h-2 w-6 " />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 z-0 right-0 h-full">
          <AlertBEIcon3 />
        </div>
      </div>
    </div>
  );
};
export default withDatasourceCheck()<CTAProps>(CTA);
