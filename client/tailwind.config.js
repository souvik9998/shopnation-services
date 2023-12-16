/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'mybg': '#FBFBFB',
        'textcolor': '#0F5398',
        'cardColor': '#F2F2F2',
        'buttonColor': '#3949AB',
        'navColor': '#242424'
      },
      fontFamily: {
        'Inter': ['Inter', 'sans-serif'],
      },
      dropShadow:{
        'cartShadow':'0px 0px 7px rgba(40, 39, 39, 0.15)',
        'searchShadow':'0px 0px 7px rgba(40, 39, 39, 0.25)',
        'cardShadow' : '4px 6px 4px rgba(0, 0, 0, 0.05)',
        'roleSelectShadow':'0px 0px 7px rgba(40, 39, 39, 0.20)',
      },
      backgroundImage: (theme) => ({
        'gradient-primary': `linear-gradient(-45deg, ${theme('colors.buttonColor')}, ${theme('colors.buttonColor')})`,
      }),
      keyframes:{
        slideIn : {
          '0%': {transform : 'translateX(0px)'},
          '100%': {transform : 'translateX(60%)'},
        },
        slideInBehind : {
          '0%': {transform : 'translateX(0px)'},
          '100%': {transform : 'translateX(59vw)'},
        },
        slideNext :{
          '0%,100%': {transform: 'translateX(25%)'},
          '50%': {transform: 'translateX(0)'},
        },
        slideFull:{
          '0%': {transform : 'translateX(60vw)'},
          '100%': {transform : 'translateX(0%)'},
        },
        bounceRoleSelect:{
          '0%,100%':{
            transform: 'translateY(1%)',
            // animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%' :{
            transform: 'translateY(0)',
            // animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          }
        },
        flip:{
          '0%' :{
              transform: 'rotateY(0)',
            },
            '100%': {
              transform: 'rotateY(180deg)'
            }
          }
      },
      animation:{
        'slideIn' : 'slideIn 800ms ease-in-out forwards',
        'slideInBehind' : 'slideInBehind 850ms ease-in-out forwards',
        'slideNext' : 'slideNext 1s ease-in-out infinite',
        'slideFull' : 'slideFull 400ms linear forwards',
        'bounceRoleSelect' : 'bounceRoleSelect 1s ease-in-out infinite',
        'flip' : 'flip 500ms ease-in-out forwards'
      },
      backgroundImage:{
        'signupSlideIn': "url('./Images/wave.png')", 
      }
    },
  },
  plugins: [],
}

