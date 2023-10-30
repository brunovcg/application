import { createGlobalStyle } from 'styled-components';
import { SupportConfigs } from '../configs';

const { maxResolution } = SupportConfigs.resolutions;

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #11A2DD;
    --primary-light-color: #e5f7ff;
    --primary-dark-color: #1175dd;
    --valid-color: #179b03;
    --valid-light-color: #e0ffdb;
    --warning-color: #999301;
    --warning-light-color: #fcfade;
    --error-color: #E12F26;
    --error-light-color: #ffeaea;

    --disabled-color: #cccccc;
    --disabled-primary-color: #65caf2;

    --hover-color: #e8e8e8;
    --hover-dark-color: #a5a5a5;
    
    --typeface-dark-color: #111111;
    --typeface-medium-color: #444;
    --typeface-light-color: #888;
    --typeface-disabled-color: #cccccc;
    --typeface-white-color: #fcfcfc;

    --typeface-sans-serif: Arial, Helvetica, sans-serif;
    --typeface-serif: Times, serif;
    --typeface-monospace: 'Cousine', monospace;

    --placeholder-color: #aaaaaa;
    --placeholder-size: 12px;

    --container-background-color: #F4F5F7;
    --container-grey-color: #d6d6d6;
    --container-hover-color: #e0e0e0;
    --container-dark-color: #444444;
    --container-deep-color: #636363;
    --container-medium-color: #f4f5f7;
    --container-regular-color: #f9f9f9;
    --container-light-color: #fcfcfc;
    --container-white-color: #ffffff;

    --primary-text-shadow: 0 0 1px var(--primary-color), 0 0 1px var(--primary-color);
    --white-text-shadow: 0 0 1px var(--typeface-white-color), 0 0 1px var(--typeface-white-color);
    --valid-text-shadow: 0 0 1px var(--valid-color), 0 0 1px var(--valid-color);
    --error-text-shadow: 0 0 1px var(--error-color), 0 0 1px var(--error-color);
    --typeface-medium-text-shadow: 0 0 1px var(--typeface-medium-color), 0 0 1px var(--typeface-medium-color);

    --container-light-opacity: rgb(0,0,0, 0.8); 
    --container-im-gradient-color: linear-gradient(90deg, 
      rgba(17,117,221,1) 0%, 
      rgba(17,110,221,1) 23%, 
      rgba(17,138,221,1) 50%, 
      rgba(17,162,221,1) 100%);
    
    --border-light-color: #f4f4f4;
    --border-medium-color: #ededed;
    --border-color: #dddddd;
    --border-disabled-color: #e8e8e8;
    --border-hover-color:  #888888;
    --border-focus-color: #11A2DD;
    --border-dark-color: #898989;
    --button-icon-default-color: #000000;
    --button-border-radius: 10px;

    --table-header-color: #efefef;
    --table-border-color: #fff;
    --table-even-color: #ffffff;
    --table-odd-color: #f7f7f7 ;
    --table-hover-color:  #fcfcfc;
    --table-hover-background-color: #11A2DD;
    --table-sticky-border-color: #f4f4f4;

    --debug-color: #0B1521;
    --debug-light-color: #142336;
   
    --gradient-label-input:  linear-gradient(
    0deg,
    rgba(255,255,255,1) 0%, 
    rgba(247,247,247,0.8) 30%, 
    rgba(247,247,247,0.9) 40%, 
    rgba(240,240,240,0) 100%);
    --transparent: transparent;
    --container-border-radius: 4px;
    --container-box-shadow: 3px 2px 10px 0px rgba(150, 150, 150, 0.4);
    --circle-box--shadow: 5px 4px 9px -2px rgba(150, 150, 150, 0.8);
    --inset-box-shadow: inset -3px -3px 10px rgba(70, 70, 70, 0.2), inset 0px 0px 10px rgba(70, 70, 70, 0.12);
  }

  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      outline: none;
      vertical-align: baseline;
      font-family: var(--typeface-sans-serif);
    }
    
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1;
    height: 100vh;
    width: 100vw;

    .im-app{
      display: flex;
      justify-content: center;
      background-color: var(  --container-light-color);
      .im-app-content{
        outline: 1px solid var(--border-color);
        width: 100%;;
        max-width: ${maxResolution};
        height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: var(--container-white-color);
        box-shadow: var(--container-box-shadow);
        main {
          flex: 1;
          width: 100%;
          overflow: hidden;
        }
        
      }
    } 
  } 

  a{
    text-decoration: none;
  }

  .im-global-centered{
    display: flex; 
    justify-content: center;
    align-items: center;
  }

  .im-global-full-size{
    height: 100%;
    width: 100%;
  }

  .im-global-flex-wrap{
    display: flex; 
    flex-wrap: wrap;
  }
      
  .im-global-text-ellipsis{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .Toastify {
    position: absolute;

    .Toastify__toast-body{
      font-size: 14px;
      line-height: 1.2;
    }
}
`;

export default GlobalStyles;
