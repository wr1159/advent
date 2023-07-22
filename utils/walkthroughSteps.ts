import { Step } from 'react-joyride';

export const Steps: Step[] = [
  {
    target: '#left-section',
    content:
      'Welcome. Please take a moment to familiarize yourself with the editor page.',
    placement: 'center'
  },
  {
    content:
      'Personalize the main landing page using the advanced text editor.',
    target: '#quill',
    placement: 'top'
  },
  {
    content:
      'Customize the background and text colors for both the event landing and registration form pages.',
    target: '#color-picker',
    placement: 'left'
  },
  {
    content:
      'Choose an image to be prominently displayed in the header section.',
    target: '#img-btn',
    placement: 'left'
  },
  {
    content: 'Access the registration form editor by clicking the arrow icon.',
    target: '#nav-btn',
    placement: 'auto'
  },
  {
    content:
      'Remember to save your changes regularly to avoid losing any modifications',
    target: '#save-btn',
    placement: 'left'
  },
  {
    content:
      'Seamlessly integrate your event by copying the generated iframe code.',
    target: '#copy-btn',
    placement: 'left'
  },
  {
    content:
      'Finally, preview your event page to see how it will appear to your audience.',
    target: '#view-btn',
    placement: 'left'
  }
];
