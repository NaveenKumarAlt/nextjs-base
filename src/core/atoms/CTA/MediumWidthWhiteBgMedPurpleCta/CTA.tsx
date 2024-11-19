import {
  withDatasourceCheck,
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { getStyles } from 'core/utils/StyleParam';
import Link from 'core/atoms/Link';
import {
  Tooltip,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
  TooltipTrigger,
} from 'core/atoms/ui/tooltips';
import { CTAProps } from '../types';

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
    <div id={id || undefined} className={`bg-white list-disc ${getStyles(props)}`}>
      <div
        className={`justify-center max-w-[77.3rem] 2xl:max-w-[90rem] mx-[1.375rem] md:mx-[2.125rem] xl:m-auto text-black`}
      >
        <div className="lg:pr-[6.438rem]">
          <JssRichText
            tag="h2"
            field={fields?.Title}
            className="font-bold text-[2.25rem] leading-normal font-gowlingBliss"
          />

          <JssRichText
            field={fields?.Description}
            className="text-trueBlack font-normal text-base font-arial mt-[1.125rem]"
          />
          <div className="flex  flex-wrap justify-start">
            {fields?.CTALink?.value?.text && (
              <>
                {fields?.CTALink?.value?.linktype === 'internal' ? (
                  <Link
                    className={
                      'delay-100 text-[0.875rem] font-bold leading-normal justify-center items-center tracking-[0.035rem] text-white transition ease-in-out bg-mainPurple hover:bg-aubergine rounded-xxl font-arial flex px-[2.875rem] py-[1.375rem] mr-6 mt-[1.063rem]'
                    }
                    field={{
                      ...fields?.CTALink,
                      value: {
                        ...fields?.CTALink?.value,
                        text: fields?.CTALink?.value?.text?.slice(0, 50),
                      },
                    }}
                  />
                ) : (
                  <TooltipProvider skipDelayDuration={100} delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          className={
                            'delay-100 text-[0.875rem] font-bold leading-normal justify-center items-center tracking-[0.035rem] text-white transition ease-in-out bg-mainPurple hover:bg-aubergine rounded-xxl font-arial flex px-[2.875rem] py-[1.375rem] mr-6 mt-[1.063rem]'
                          }
                          field={{
                            ...fields?.CTALink,
                            value: {
                              ...fields?.CTALink?.value,
                              text: fields?.CTALink?.value?.text?.slice(0, 50),
                            },
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="border-none p-0 max-w-[11.25rem] ">
                        <div dangerouslySetInnerHTML={{ __html: `${TooltipText}` }}></div>
                        <TooltipArrow className="w-6 fill-white h-2" />
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
                      'delay-100 text-[0.875rem] font-bold leading-normal justify-center items-center tracking-[0.035rem] text-white transition ease-in-out bg-mainPurple hover:bg-aubergine rounded-xxl font-arial flex px-[2.875rem] py-[1.375rem] mt-[1.063rem]'
                    }
                  />
                ) : (
                  <TooltipProvider skipDelayDuration={100} delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          className={
                            'ease-in-out delay-100 text-white transition text-[0.875rem] flex justify-center items-center tracking-[0.035rem] min-h-[3.75rem] font-arial bg-mainPurple font-bold leading-normal rounded-xxl px-[2.875rem] py-[1.375rem] mt-[1.063rem]'
                          }
                          field={{
                            ...fields?.CTALink2,
                            value: {
                              ...fields?.CTALink2?.value,
                              text: fields?.CTALink2?.value?.text?.slice(0, 50),
                            },
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="p-0 max-w-[11.25rem] border-none">
                        <div dangerouslySetInnerHTML={{ __html: `${TooltipText}` }}></div>
                        <TooltipArrow className="w-6 fill-white h-2" />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default withDatasourceCheck()<CTAProps>(CTA);
