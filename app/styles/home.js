export default {
  container: ({ theme }) => {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf: 'center',
      height: '100%',
      paddingTop: theme.space[1],
      paddingLeft: theme.space[6],
      paddingRight: theme.space[6],
      ':before': {
      [`@media (max-width: ${theme.breakpoints.desktop})`]: {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: .6,
        zIndex: -1,
        backgroundColor: theme.colors.canvas,
        backgroundImage: 'url("/images/cobuy-bg-sml-1080.jpg")',
        backgroundSize: 'cover'
      },
      [`@media (min-width: ${theme.breakpoints.desktop})`]: {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: .6,
        zIndex: -1,
        backgroundColor: theme.colors.canvas,
        backgroundImage: 'url("/images/cobuy-bg-lrg-1440.jpg")',
        backgroundSize: 'cover'
        }
      }
    }
  },
  titleContainer: ({ theme }) => {
    return {
      marginBottom: theme.space[1]
    }
  },
  // Note for SR:
  // Another way of accessing logo and primary1 directly
  // ({ theme: { fonts: { logo }, colors: { primary1 } } })
  // applied e.g.
  // fontFamily: logo
  // color: primary1
  titleText: ({ theme }) => ({
    fontFamily: theme.fonts.logo,
    fontSize: theme.fontSizes[12],
    color: theme.colors.text,
    margin: theme.space[0],
    textAlign: 'center'
  }),
  taglineText: ({ theme }) => ({
    fontFamily: theme.fonts.primary,
    fontSize: theme.fontSizes[5],
    color: theme.colors.text,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center'
  }),
  bodyContainer: ({ theme }) => {
    return {
    }
  },
  bodyText: ({ theme }) => ({
    fontFamily: theme.fonts.primary,
    fontSize: theme.fontSizes[3],
    color: theme.colors.text
  }),
  buttonsContainer: ({ theme }) => {
    return {
      display: 'flex',
      justifyContent: 'space-around',
      paddingLeft: theme.space[4],
      paddingRight: theme.space[4]
    }
  },
  buttonText: ({ theme }) => ({
    textTransform: 'capitalize',
    color: theme.colors.alternateText
  })
}
