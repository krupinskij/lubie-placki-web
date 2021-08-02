import { FormikProvider } from 'formik';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { CardBody } from '../card/Card';

const useStyles = makeStyles({
  cardBody: {
    padding: 50,
  },
  formActionsStyles: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: 10,
  },
});

interface FormProps {
  provider?: any;
  handleSubmit?: any;
  children: any;
}

export function FormContainer({ provider, handleSubmit, children }: FormProps) {
  const styles = useStyles();
  return (
    <FormikProvider value={provider}>
      <form onSubmit={handleSubmit}>
        <CardBody className={styles.cardBody}>{children}</CardBody>
      </form>
    </FormikProvider>
  );
}

interface FormHeaderProps {
  title: string;
}

export function FormHeader({ title }: FormHeaderProps) {
  return (
    <Typography align="center" gutterBottom variant="h3" component="h2">
      {title}
    </Typography>
  );
}

interface FormPartProps {
  children: any;
}

export function FormFields({ children }: FormPartProps) {
  return <div className="form-fields">{children}</div>;
}

export function FormActions({ children }: FormPartProps) {
  const { formActionsStyles } = useStyles();
  return <div className={formActionsStyles}>{children}</div>;
}

interface FormLinkProps {
  prefix?: string;
  suffix?: string;
  text: string;
  to: string;
}

export function FormLink({ prefix, suffix, text, to }: FormLinkProps) {
  return (
    <Typography align="center">
      {prefix && <span>{prefix} </span>}
      <Link color="primary" to={to}>
        {text}
      </Link>
      {suffix && <span> {suffix}</span>}
    </Typography>
  );
}
