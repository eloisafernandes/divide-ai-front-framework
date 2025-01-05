declare module 'react-color' {
    import * as React from 'react';
  
    export interface ColorResult {
      hex: string;
      rgb: {
        r: number;
        g: number;
        b: number;
        a: number;
      };
      hsl: {
        h: number;
        s: number;
        l: number;
        a: number;
      };
    }
  
    export interface CirclePickerProps {
      color?: string;
      onChangeComplete?: (color: ColorResult) => void;
      width?: string;
      circleSize?: number;
      circleSpacing?: number;
    }
  
    export class CirclePicker extends React.Component<CirclePickerProps> {}
  
    // Outras cores que você usa, como `SketchPicker`, podem ser declaradas da mesma forma
  }