import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import cake from '../../assets/cake.svg';

const useStyles = makeStyles({
  headerStyles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyles: {
    height: 60,
    width: 60,
    marginRight: 10,
  },
  titleStyles: {
    textAlign: 'center',
    fontSize: '250%',
    margin: 10,
  },
});

interface NavbarHeaderProps {
  title: string;
}

export function NavbarHeader({ title }: NavbarHeaderProps) {
  const { headerStyles, logoStyles, titleStyles } = useStyles();

  return (
    <header className={headerStyles}>
      <img className={logoStyles} src={cake} alt="logo" />
      <Typography className={titleStyles} component="h1">
        {title}
      </Typography>
    </header>
  );
}
