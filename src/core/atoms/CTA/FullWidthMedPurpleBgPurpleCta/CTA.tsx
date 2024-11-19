import {
  Field,
  withDatasourceCheck,
  LinkField,
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'core/atoms/Link';
import { getStyles } from 'core/utils/StyleParam';
import { ComponentProps } from 'src/global';
import AlertBEIcon2 from 'core/atoms/Icons/AlertBEIcon2';
import {
  Tooltip,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
  TooltipTrigger,
} from 'core/atoms/ui/tooltips';

type CTAProps = ComponentProps & {
  params: {
    Styles: Field<string>;
    FullWidthMedPurpleBgPurpleCta: Field<string>;
  };
  fields: {
    Description: Field<string>;
    CTALink: LinkField;
    Title: Field<string>;
    AlertTitle: Field<string>;
    AlertDescription: Field<string>;
  };
};

const CTA = (props: CTAProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const TooltipText = sitecoreContext?.ExternalLinkToolTipText;
  const hasValues = props?.fields?.Description?.value || props?.fields?.CTALink?.value?.text;
  const id = props?.params?.RenderingIdentifier;
  if (!hasValues) {
    return <></>;
  }
  return (
    <div id={id || undefined} className="mt-[7.5rem] mb-[5rem]">
      <div
        className={`relative max-w-[77.3rem] md:pr-[5.438rem] bg-purple list-disc ${getStyles(
          props
        )} 2xl:max-w-[90rem] md:mx-[2.125rem] xl:m-auto px-6 md:px-0 m-auto lg:pt-[2rem] lg:pb-[2rem] md:flex py-6 justify-center w-full items-center mt-4 text-white  ${
          props.params?.Styles
        } `}
      >
        <JssRichText
          field={props?.fields?.Description}
          className="z-[1] md:pl-[5.438rem] my-11 lg:my-[1.094rem] 
          lg:mr-10 flex-1 text-2xl font-arial"
        />

        <div className="relative">
          {props?.fields?.CTALink?.value?.text && (
            <>
              {props?.fields?.CTALink?.value?.linktype === 'internal' ||
              sitecoreContext?.pageState !== 'normal' ? (
                <Link
                  field={{
                    ...props?.fields?.CTALink,
                    value: {
                      ...props?.fields?.CTALink?.value,
                      text: props?.fields?.CTALink?.value?.text?.slice(0, 50),
                    },
                  }}
                  className={`text-white min-w-full transition ease-in-out delay-100 text-[0.875rem] font-bold leading-normal tracking-[0.035rem] font-arialw-[fit-content] max-w-max bg-aubergine rounded-xxl px-[2.875rem] py-[1.375rem] flex justify-center items-center hover:bg-extralightPurple hover:text-black`}
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
                        className={`text-white min-w-full transition ease-in-out delay-100 text-[0.875rem] font-bold leading-normal tracking-[0.035rem] font-arial w-[fit-content] md:min-w-[12rem] bg-aubergine rounded-xxl px-[2.875rem] py-[1.375rem] flex justify-center items-center hover:bg-extralightPurple hover:text-black`}
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
        <div className="absolute md:left-[0%] bottom-0 z-0 h-full">
          <AlertBEIcon2 />
        </div>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<CTAProps>(CTA);
