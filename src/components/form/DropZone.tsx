import { useState } from 'react';
import { useFormikContext } from 'formik';
import { DropzoneAreaBase } from 'material-ui-dropzone';

import { makeStyles } from '@material-ui/core/styles';

interface FormDropZoneProps {
  name: string;
  label: string;
}

const useStyles = makeStyles({
  dropzone: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export function FormDropZone({ name, label }: FormDropZoneProps) {
  const { setFieldValue } = useFormikContext();
  const [dropzoneText, setDropzoneText] = useState(label);
  const styles = useStyles();

  const handleDrop = (acceptedFiles: any) => {
    setFieldValue(name, acceptedFiles);
    setDropzoneText(acceptedFiles[0].name);
  };

  return (
    <DropzoneAreaBase
      acceptedFiles={['image/*']}
      dropzoneProps={{
        multiple: false,
      }}
      dropzoneClass={styles.dropzone}
      dropzoneText={dropzoneText}
      showAlerts={false}
      fileObjects={[]}
      onDrop={handleDrop}
    />
  );
}
