
import React from 'react';

type IconProps = {
  className?: string;
};

export const ChartLineIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
    <path d="M500 384c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v308h436zM372.7 203.3l-128 128c-3.1 3.1-8.2 3.1-11.3 0l-48-48c-3.1-3.1-8.2-3.1-11.3 0l-80 80c-3.1 3.1-3.1 8.2 0 11.3l11.3 11.3c3.1 3.1 8.2 3.1 11.3 0l63.3-63.3 42.7 42.7c3.1 3.1 8.2 3.1 11.3 0l139.3-139.3c3.1-3.1 3.1-8.2 0-11.3l-11.3-11.3c-3.1-3.2-8.2-3.2-11.3-.1z" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
    </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 1 0-288 144 144 0 1 1 0 288z" />
    </svg>
);

export const UploadIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
        <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V299.6l-94.7 94.7c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L480 304.4V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM571.3 404.7l-94.7-94.7c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L480 400.4V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V384c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v1.6l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0z"/>
    </svg>
);

export const BatchIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
        <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
        <path d="M233.4 352.6c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 419.7 86.6 589.1c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
    </svg>
);

export const PdfIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor">
        <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
    </svg>
);
// Other icons (CSV, JSON, etc.) would go here.
// For brevity, using simple icons. You can replace with more complex SVGs.

export const CsvIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 13L15 15M9 13V15M12 11V15M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C7.03336 21 3.00391 16.9706 3.00391 12C3.00391 7.02944 7.03336 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
);
export const JsonIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 11.01L12.01 10.9989" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 16.01L12.01 15.9989" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
);
export const BrainIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
        <path d="M304 0c-26.5 0-48 21.5-48 48V96h-1.6c-13.3-2.1-26.8-3.3-40.4-3.3C107.6 92.7 0 200.3 0 315.3c0 47.1 16.5 92.2 46.8 128.9l-1.4 1.4C34.7 456.3 26.2 464 26.2 474.7c0 14.7 10 27.5 24.2 31.1l-1.9 1.9C31.1 510 24 512 16 512C7.2 512 0 504.8 0 496s7.2-16 16-16c1.9 0 3.7 .3 5.4 .9l1.9-1.9c-2.6-4.2-4-9.2-4-14.9c0-6.7 2.4-13.1 6.8-17.9l1.4-1.4c-3-3.6-5.8-7.5-8.2-11.6C7.4 397.6 0 357.5 0 315.3C0 206.2 101.9 98.7 216 98.7c13.9 0 27.6 1.3 40.7 3.7l.9 .2H256v45.4c0 26.5 21.5 48 48 48h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H304zM565.4 337.9c-2.4 4.1-5.2 7.9-8.2 11.6c-30.3-36.7-46.8-81.8-46.8-128.9c0-115 107.6-222.6 222.6-222.6c13.6 0 27.1 1.2 40.4 3.3H528V48c0-26.5-21.5-48-48-48h-1.6c-24.9-30.6-59.9-48-94.4-48c-34.5 0-69.5 17.4-94.4 48H352c-26.5 0-48 21.5-48 48v99.4c0 26.5 21.5 48 48 48h48c26.5 0 48-21.5 48-48V98.9c13.1-2.4 26.8-3.7 40.7-3.7c114.1 0 216 107.5 216 216.6c0 42.2-15.6 82.3-43.8 114.7l1.4 1.4c4.4 4.7 6.8 11.1 6.8 17.9c0 5.7-1.4 10.7-4 14.9l1.9 1.9c1.7-.6 3.5-.9 5.4-.9c8.8 0 16 7.2 16 16s-7.2 16-16 16c-8 0-15.1-2-22.6-5.3l-1.9-1.9c14.2-3.6 24.2-16.4 24.2-31.1c0-10.7-8.5-18.4-19.2-29.1l-1.4-1.4z"/>
    </svg>
);
export const SentimentPositiveIcon = ({ className = '' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm176.4 60c-21.8-43.2 4.1-94.5 47.2-116.4s94.5-4.1 116.4 47.2l1.2 2.3c21.8 43.2-4.1 94.5-47.2 116.4s-94.5 4.1-116.4-47.2c-.6-1.1-1.1-2.2-1.2-3.3zM160.2 384c17.5 0 33.3-6.9 45.1-18.3l2.2-2.1c11.1-10.5 26.3-16.5 42.4-16.5s31.3 6.1 42.4 16.5l2.2 2.1c11.8 11.4 27.6 18.3 45.1 18.3s33.3-6.9 45.1-18.3c14.2-13.6 16.6-35.4 5.9-52.1s-30.8-25-50-25c-1.4 0-2.8 .1-4.2 .2-23.4 1.9-46.7-9.5-59.5-30.1c-14.7-23.6-43.1-35.9-69.5-27.1s-43.1 35.9-27.1 69.5c10.4 21.8 32.7 36.1 57.3 36.1c1.4 0 2.8 0 4.2-.1c19.2-.9 38.3 8.3 50 25s8.3 38.5-5.9 52.1c-11.8 11.4-27.6 18.3-45.1 18.3z"/>
    </svg>
);
export const SentimentNegativeIcon = ({ className = '' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM176.4 196c-21.8 43.2 4.1 94.5 47.2 116.4s94.5 4.1 116.4-47.2l1.2-2.3c21.8-43.2-4.1-94.5-47.2-116.4s-94.5-4.1-116.4 47.2c-.6 1.1-1.1 2.2-1.2 3.3zM304.2 384c-17.5 0-33.3-6.9-45.1-18.3l-2.2-2.1c-11.1-10.5-26.3-16.5-42.4-16.5s-31.3 6.1-42.4 16.5l-2.2 2.1c-11.8 11.4-27.6 18.3-45.1 18.3s-33.3-6.9-45.1-18.3c-14.2-13.6-16.6-35.4-5.9-52.1s30.8-25 50-25c1.4 0 2.8 .1 4.2 .2c23.4 1.9 46.7-9.5 59.5-30.1c14.7-23.6 43.1-35.9 69.5-27.1s43.1 35.9 27.1 69.5c-10.4 21.8-32.7 36.1-57.3 36.1c-1.4 0-2.8 0-4.2-.1c-19.2-.9-38.3 8.3-50 25s-8.3 38.5 5.9 52.1c11.8 11.4 27.6 18.3 45.1 18.3z"/>
    </svg>
);
export const SentimentNeutralIcon = ({ className = '' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm176.4 60c-21.8-43.2 4.1-94.5 47.2-116.4s94.5-4.1 116.4 47.2l1.2 2.3c21.8 43.2-4.1 94.5-47.2 116.4s-94.5 4.1-116.4-47.2c-.6-1.1-1.1-2.2-1.2-3.3zM144.4 400a16 16 0 0 1 0-22.6l16-16a16 16 0 0 1 22.6 0l16 16a16 16 0 0 1 0 22.6l-16 16a16 16 0 0 1-22.6 0l-16-16zm192-32a16 16 0 0 1 22.6 0l16 16a16 16 0 0 1 0 22.6l-16 16a16 16 0 0 1-22.6 0l-16-16a16 16 0 0 1 0-22.6l16-16z"/>
    </svg>
);
