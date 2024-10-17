// This declaration file tells TypeScript that 'react-slick' is a valid module and that it exports a default React component.
declare module 'react-slick' {
    import * as React from 'react';
  
    interface Settings {
      dots?: boolean;
      infinite?: boolean;
      speed?: number;
      slidesToShow?: number;
      slidesToScroll?: number;
      autoplay?: boolean;
      autoplaySpeed?: number;
      appendDots?: (dots: React.ReactNode) => React.ReactNode;
      customPaging?: (i: number) => React.ReactNode;
      // Add any additional settings props you use or might need
    }
  
    class Slider extends React.Component<Settings> {}
    export default Slider;
  }
  