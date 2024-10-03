export const LogoSection = ({
  logoUrl,
  altText,
}: {
  logoUrl: string;
  altText: string;
}) => (
  <div className="w-1/2 h-full bg-gray-200 flex items-center justify-center">
    <img src={logoUrl} alt={altText} className="w-3/6 h-auto" />
  </div>
);
