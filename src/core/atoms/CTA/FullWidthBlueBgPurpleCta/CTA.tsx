import {
  Field,
  withDatasourceCheck,
  LinkField,
  Image,
  RichText as JssRichText,
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
import { getStyles } from 'core/utils/StyleParam';
import { ComponentProps, DamImageField } from 'src/global';

type CTAProps = ComponentProps & {
  params: {
    Styles: Field<string>;
    FullWidthBlueBgPurpleCta: Field<string>;
  };
  fields: {
    Description: Field<string>;
    CTALink: LinkField;
    Image: DamImageField;
    Title: Field<string>;
    AlertTitle: Field<string>;
    AlertDescription: Field<string>;
  };
};

const CTA = (props: CTAProps): JSX.Element => {
  const { fields } = props;
  const { sitecoreContext } = useSitecoreContext();
  const TooltipText = sitecoreContext?.ExternalLinkToolTipText;
  const checkFEIcon = fields?.Image?.value?.src;
  const hasValues = checkFEIcon || fields?.Description?.value || fields?.CTALink?.value?.text;
  const id = props?.params?.RenderingIdentifier;
  console.log(id);
  if (!hasValues) {
    return <></>;
  }

  return (
    <div id={id || undefined}>
      <div
        className={`pt-[3.125rem] pb-[2.625rem] md:pt-8 md:pb-8  md:px-[5.438rem] bg-darkBlue list-disc ${getStyles(
          props
        )} print:flex print:flex-row flex flex-col md:flex-row md:gap-[1.875rem] justify-center w-full items-center max-w-[77.3rem] 2xl:max-w-[90rem] md:mx-[2.125rem] xl:m-auto px-6 md:px-0 text-white   `}
      >
        <div className="grid place-content-center">
          {checkFEIcon !== '' && (
            <Image
              field={fields?.Image}
              className="sm:block m-auto flex-none w-[4rem] h-[4rem] object-cover"
            />
          )}
        </div>
        <JssRichText
          field={fields?.Description}
          className="flex-1 md:[&_*]:text-[1.5rem] md:[&_*]:leading-normal md:text-[1.5rem] md:leading-normal my-[2.75rem] md:my-0  text-[1.5rem] font-normal font-arial text-center md:text-left md:tracking-normal"
          tag="p"
        />
        {fields?.CTALink?.value?.text && (
          <>
            {fields?.CTALink?.value?.linktype === 'internal' ||
            sitecoreContext?.pageState !== 'normal' ? (
              <Link
                field={{
                  ...fields?.CTALink,
                  value: {
                    ...fields?.CTALink?.value,
                    text: fields?.CTALink?.value?.text?.slice(0, 50),
                  },
                }}
                className={
                  '  text-white transition ease-in-out delay-100 text-[0.875rem] font-bold leading-normal tracking-[0.035rem] font-arial bg-aubergine rounded-xxl px-[2.563rem] py-[1.063rem] flex justify-center items-center w-auto min-w-[11.75rem] hover:bg-extralightPurple hover:text-black w-[fit-content] min-h-[3.75rem]'
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
                        '  text-white transition ease-in-out delay-100 text-[0.875rem] font-bold leading-normal tracking-[0.035rem] font-arial bg-aubergine rounded-xxl px-[2.563rem] py-[1.063rem] flex justify-center items-center w-auto min-w-[11.75rem] hover:bg-extralightPurple hover:text-black w-[fit-content] min-h-[3.75rem]'
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
  );
};

export default withDatasourceCheck()<CTAProps>(CTA);
