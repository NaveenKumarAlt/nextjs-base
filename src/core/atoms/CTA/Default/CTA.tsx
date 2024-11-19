import {
  Field,
  withDatasourceCheck,
  Image,
  LinkField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Link from 'core/atoms/Link';
import { getStyles } from 'core/utils/StyleParam';
import { ComponentProps, DamImageField } from 'src/global';
import {
  Tooltip,
  TooltipContent,
  TooltipArrow,
  TooltipProvider,
  TooltipTrigger,
} from 'core/atoms/ui/tooltips';

type CTAProps = ComponentProps & {
  fields: {
    CTALink: LinkField;
    Description: Field<string>;
    Title: Field<string>;
    Image: DamImageField;
  };
};

const CTA = (props: CTAProps): JSX.Element => {
  const { fields } = props;
  const { sitecoreContext } = useSitecoreContext();
  const Alerttooltip = sitecoreContext?.ExternalLinkToolTipText;
  const checkFEIcon = fields?.Image?.value?.src;
  const hasValues = checkFEIcon || fields?.Description?.value || fields?.CTALink?.value?.text;
  const id = props?.params?.RenderingIdentifier;
  if (!hasValues) {
    return <></>;
  }
  return (
    <div id={id || undefined} className={`bg-darkBlue list-disc ${getStyles(props)}`}>
      <div
        className={`gap-[1.875rem] md:flex lg:py-8 md:flex-row flex-col py-6 2xl:max-w-[90rem] w-full items-center md:mx-[2.125rem] justify-center xl:m-auto text-white px-6 md:px-0 mt-4 max-w-[77.3rem]`}
      >
        <div className="grid place-content-center">
          {checkFEIcon !== '' && (
            <Image
              field={fields?.Image}
              className="object-cover flex-none w-[4rem] m-auto h-[4rem] sm:block"
            />
          )}
        </div>
        <p
          className="md:my-0 font-arial my-[2.75rem] flex-1 text-2xl"
          dangerouslySetInnerHTML={{
            __html: fields?.Description?.value,
          }}
        ></p>
        {fields?.CTALink?.value?.text && (
          <>
            {fields?.CTALink?.value?.linktype === 'internal' ||
            sitecoreContext?.pageState !== 'normal' ? (
              <Link
                className={
                  'leading-normal text-white ease-in-out transition delay-100 font-bold min-w-[11.75rem] tracking-[0.035rem] text-[0.875rem] font-arial rounded-xxl px-[2.875rem] py-[1.375rem] flex justify-center bg-aubergine items-center w-auto hover:bg-extralightPurple hover:text-black'
                }
                field={{
                  ...fields?.CTALink,
                  value: {
                    ...fields?.CTALink.value,
                    text: fields?.CTALink?.value?.text?.slice(0, 50),
                  },
                }}
              />
            ) : (
              <TooltipProvider skipDelayDuration={100} delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger
                    asChild
                    className={
                      'bg-aubergine text-white delay-100 transition ease-in-out font-bold leading-normal text-[0.875rem] tracking-[0.035rem] rounded-xxl px-[2.875rem] min-w-[11.75rem] font-arial py-[1.375rem] flex justify-center items-center w-auto hover:bg-extralightPurple hover:text-black'
                    }
                  >
                    <Link
                      field={{
                        ...fields?.CTALink,
                        value: {
                          ...fields?.CTALink?.value,
                          text: fields?.CTALink?.value?.text?.slice(0, 50),
                        },
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="p-0 border-none max-w-[11.25rem]" side="bottom">
                    <div dangerouslySetInnerHTML={{ __html: `${Alerttooltip}` }}></div>
                    <TooltipArrow className="w-6 h-2 fill-white" />
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
