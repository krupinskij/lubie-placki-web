import cake from '../../assets/cake.svg';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  headerStyles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyles: {
    height: '60px',
    width: '60px',
    marginRight: '10px',
  },
  titleStyles: {
    textAlign: 'center',
    fontSize: '250%',
    margin: '10px',
  },
});

interface NavbarHeaderProps {
  title: string;
}

export default function NavbarHeader({ title }: NavbarHeaderProps) {
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
